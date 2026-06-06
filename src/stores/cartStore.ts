import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  ShopifyProduct,
  CART_QUERY,
  storefrontApiRequest,
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
} from '@/lib/shopify';

type CartImage = { url: string; altText: string | null };

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
  thumbnailImage?: CartImage | null;
}

const normalizeImage = (image?: { url?: string | null; altText?: string | null } | null): CartImage | null =>
  image?.url ? { url: image.url, altText: image.altText ?? null } : null;

const getLineThumbnail = (line: any): CartImage | null => {
  const merchandise = line?.merchandise;
  const product = merchandise?.product;
  return (
    normalizeImage(merchandise?.image) ||
    normalizeImage(product?.featuredImage) ||
    normalizeImage(product?.images?.edges?.[0]?.node) ||
    normalizeImage(product?.media?.edges?.[0]?.node?.image)
  );
};

const getFallbackProduct = (fallback?: Omit<CartItem, 'lineId'> | CartItem): ShopifyProduct | null =>
  fallback?.product ?? null;

const itemFromCartLine = (
  line: any,
  fallback?: Omit<CartItem, 'lineId'> | CartItem,
): CartItem | null => {
  const merchandise = line?.merchandise;
  const product = merchandise?.product;
  if (!merchandise?.id) return null;

  const fallbackProduct = getFallbackProduct(fallback);
  const productForCart: ShopifyProduct | null = product
    ? {
        node: {
          id: product.id,
          title: product.title,
          description: product.description ?? fallbackProduct?.node.description ?? '',
          handle: product.handle,
          featuredImage: product.featuredImage ?? null,
          priceRange: product.priceRange ?? fallbackProduct?.node.priceRange,
          images: product.images ?? { edges: [] },
          media: product.media ?? { edges: [] },
          variants: product.variants ?? fallbackProduct?.node.variants ?? { edges: [] },
          options: product.options ?? fallbackProduct?.node.options ?? [],
        },
      }
    : fallbackProduct;

  if (!productForCart) return null;

  return {
    lineId: line.id ?? ('lineId' in (fallback ?? {}) ? (fallback as CartItem).lineId : null),
    product: productForCart,
    variantId: merchandise.id,
    variantTitle: merchandise.title ?? fallback?.variantTitle ?? 'Default Title',
    price: merchandise.price ?? fallback?.price ?? productForCart.node.priceRange.minVariantPrice,
    quantity: line.quantity ?? fallback?.quantity ?? 1,
    selectedOptions: merchandise.selectedOptions ?? fallback?.selectedOptions ?? [],
    thumbnailImage: getLineThumbnail(line) ?? fallback?.thumbnailImage ?? null,
  };
};

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<void>;
  patchItem: (variantId: string, patch: Partial<Omit<CartItem, 'lineId' | 'variantId'>>) => void;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        set({ isLoading: true });
        try {
          if (existingItem && !existingItem.lineId) {
            clearCart();
            const result = await createShopifyCart({ variantId: item.variantId, quantity: item.quantity });
            if (result) {
              const cartLineItem = itemFromCartLine(result.line, item);
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: [cartLineItem ?? { ...item, lineId: result.lineId }],
              });
            }
          } else if (!cartId) {
            const result = await createShopifyCart({ variantId: item.variantId, quantity: item.quantity });
            if (result) {
              const cartLineItem = itemFromCartLine(result.line, item);
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: [cartLineItem ?? { ...item, lineId: result.lineId }],
              });
            }
          } else if (existingItem) {
            const newQuantity = existingItem.quantity + item.quantity;
            if (!existingItem.lineId) return;
            const result = await updateShopifyCartLine(cartId, existingItem.lineId, newQuantity);
            if (result.success) {
              const currentItems = get().items;
              set({ items: currentItems.map(i => i.variantId === item.variantId ? { ...i, ...item, quantity: newQuantity, lineId: i.lineId } : i) });
            } else if (result.cartNotFound) clearCart();
          } else {
            const result = await addLineToShopifyCart(cartId, { variantId: item.variantId, quantity: item.quantity });
            if (result.success) {
              const currentItems = get().items;
              const cartLineItem = itemFromCartLine(result.line, item);
              set({ items: [...currentItems, cartLineItem ?? { ...item, lineId: result.lineId ?? null }] });
            } else if (result.cartNotFound) clearCart();
          }
        } catch (error) {
          console.error('Failed to add item:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) { await get().removeItem(variantId); return; }
        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            const currentItems = get().items;
            set({ items: currentItems.map(i => i.variantId === variantId ? { ...i, quantity } : i) });
          } else if (result.cartNotFound) clearCart();
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const currentItems = get().items;
            const newItems = currentItems.filter(i => i.variantId !== variantId);
            newItems.length === 0 ? clearCart() : set({ items: newItems });
          } else if (result.cartNotFound) clearCart();
        } finally {
          set({ isLoading: false });
        }
      },

      patchItem: (variantId, patch) => {
        const currentItems = get().items;
        set({ items: currentItems.map(i => i.variantId === variantId ? { ...i, ...patch } : i) });
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
          else {
            const currentItems = get().items;
            const syncedItems = (cart.lines?.edges ?? [])
              .map((edge: any) => {
                const line = edge.node;
                const fallback = currentItems.find((item) => item.variantId === line?.merchandise?.id);
                return itemFromCartLine(line, fallback);
              })
              .filter(Boolean) as CartItem[];
            set({
              checkoutUrl: cart.checkoutUrl ? cart.checkoutUrl : get().checkoutUrl,
              items: syncedItems.length > 0 ? syncedItems : currentItems,
            });
          }
        } catch (error) {
          console.error('Failed to sync cart:', error);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, cartId: state.cartId, checkoutUrl: state.checkoutUrl }),
    }
  )
);
