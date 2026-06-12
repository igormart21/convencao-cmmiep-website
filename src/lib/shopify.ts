import { toast } from "sonner";
import aeronJoia from "@/assets/8c5b91a8-d2a6-4785-9930-9c9dec489c2b.png";
import veloxRoyaleOuroMasc from "@/assets/linha-velox-royale-ouro-masculino.jpg";

export const SHOPIFY_API_VERSION = '2026-04';
export const SHOPIFY_STORE_PERMANENT_DOMAIN = 'store-store-builder-joaax.myshopify.com';
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = '5da1ec1247816f2b379b4204005b92ad';
export const HALTER_OURO_VARIANT_GID = 'gid://shopify/ProductVariant/48912055468259';

export function normalizeShopifyCheckoutUrl(checkoutUrl: string): string {
  const parsed = new URL(checkoutUrl);
  return `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${parsed.pathname}${parsed.search}`;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    featuredImage?: { url: string; altText: string | null } | null;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    media?: { edges: Array<{ node: { image?: { url: string; altText: string | null } | null } }> };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
          image?: { url: string; altText: string | null } | null;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

export const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id title description handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 10) {
            edges {
              node {
                id title
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id title description handle
      priceRange { minVariantPrice { amount currencyCode } }
      featuredImage { url altText }
      images(first: 20) { edges { node { url altText } } }
      media(first: 20) {
        edges {
          node {
            ... on MediaImage { image { url altText } }
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id title
            price { amount currencyCode }
            availableForSale
            selectedOptions { name value }
            image { url altText }
          }
        }
      }
      options { name values }
    }
  }
`;

const CART_LINE_FRAGMENT = `
  fragment CartLineFields on CartLine {
    id
    quantity
    merchandise {
      ... on ProductVariant {
        id
        title
        image { url altText }
        price { amount currencyCode }
        selectedOptions { name value }
        product {
          id title description handle
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
          media(first: 1) {
            edges {
              node {
                ... on MediaImage { image { url altText } }
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id title
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
                image { url altText }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) { edges { node { ...CartLineFields } } }
    }
  }
  ${CART_LINE_FRAGMENT}
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id checkoutUrl
        lines(first: 100) { edges { node { ...CartLineFields } } }
      }
      userErrors { field message }
    }
  }
  ${CART_LINE_FRAGMENT}
`;

export const HEADLESS_CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id checkoutUrl
        lines(first: 100) { edges { node { ...CartLineFields } } }
      }
      userErrors { field message }
    }
  }
  ${CART_LINE_FRAGMENT}
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

// Tabela de preços sobressalentes para contornar limitações da API do Shopify
const PRECOS_OVERRIDE: Record<string, { basePrice: string; variantPrices?: Record<string, string> }> = {
  halter: {
    basePrice: "3487.00",
    variantPrices: {
      "ouro": "3487.00",
      "prata": "297.00"
    }
  },
  "velox-royale": {
    basePrice: "3487.00",
    variantPrices: {
      "ouro": "3487.00",
      "prata": "297.00"
    }
  },
  "velox-royale-fem-speed": {
    basePrice: "2487.00",
    variantPrices: {
      "ouro": "2487.00",
      "prata": "297.00"
    }
  },
  "velox-royale-fem-mtb": {
    basePrice: "2487.00",
    variantPrices: {
      "ouro": "2487.00",
      "prata": "297.00"
    }
  },
  aeron: {
    basePrice: "3387.00",
    variantPrices: {
      "prata": "3387.00",
      "ouro": "4704.17"
    }
  },
  "trion-elite": {
    basePrice: "4387.00",
    variantPrices: {
      "ouro": "4387.00",
      "prata": "297.00"
    }
  },
  velarion: {
    basePrice: "4297.00",
    variantPrices: {
      "ouro": "4297.00",
      "prata": "297.00"
    }
  },
  imperium: {
    basePrice: "2987.00",
    variantPrices: {
      "ouro": "2987.00",
      "prata": "297.00"
    }
  },
  "imperium-ouro": {
    basePrice: "2987.00",
    variantPrices: {
      "ouro": "2987.00"
    }
  },
  "imperium-prata": {
    basePrice: "297.00",
    variantPrices: {
      "prata": "297.00"
    }
  },
  strata: {
    basePrice: "549.90",
    variantPrices: {
      "ouro": "549.90",
      "prata": "297.00"
    }
  },
  dominus: {
    basePrice: "3997.00",
    variantPrices: {
      "clássico ouro": "2487.00",
      "classico ouro": "2487.00",
      "clássico prata": "297.00",
      "classico prata": "297.00",
      "ouro": "3997.00",
      "prata": "297.00"
    }
  },
  monarch: {
    basePrice: "3997.00",
    variantPrices: {
      "underground ouro": "2987.00",
      "underground prata": "297.00",
      "ouro": "3997.00",
      "prata": "297.00"
    }
  },
  valenza: {
    basePrice: "3997.00",
    variantPrices: {
      "clássico ouro": "2357.00",
      "classico ouro": "2357.00",
      "clássico prata": "297.00",
      "classico prata": "297.00",
      "underground ouro": "2787.00",
      "underground prata": "297.00",
      "ouro": "3997.00",
      "prata": "297.00"
    }
  },
  "imperium-crossfit": {
    basePrice: "3200.00",
    variantPrices: {
      "ouro": "3200.00",
      "prata": "297.00"
    }
  },
  "corrida-atleta": {
    basePrice: "3597.00",
    variantPrices: {
      "ouro": "3597.00",
      "prata": "297.00"
    }
  },
  "corrida-elite": {
    basePrice: "3597.00",
    variantPrices: {
      "ouro": "3597.00"
    }
  },
  "halter-elite": {
    basePrice: "3487.00",
    variantPrices: {
      "ouro": "3487.00"
    }
  },
  "kettlebell-crossfit": {
    basePrice: "2490.00",
    variantPrices: {
      "ouro": "2490.00",
      "prata": "327.00"
    }
  },
  "conjunto-crossfit-ouro": {
    basePrice: "3487.00",
    variantPrices: {
      "ouro": "3487.00"
    }
  },
  "conjunto-crossfit-elite": {
    basePrice: "4397.00",
    variantPrices: {
      "ouro": "4397.00"
    }
  },
  "placa-triatlo": {
    basePrice: "2587.00",
    variantPrices: {
      "ouro": "2587.00",
      "prata": "327.00"
    }
  },
  sprint: {
    basePrice: "297.00",
    variantPrices: {
      "ouro": "297.00"
    }
  },
  ritmo: {
    basePrice: "2187.00",
    variantPrices: {
      "ouro": "2187.00",
      "prata": "297.00"
    }
  },
  cartier: {
    basePrice: "1700.00",
    variantPrices: {
      "ouro": "1700.00",
      "prata": "259.00"
    }
  },
  veneziana: {
    basePrice: "1500.00",
    variantPrices: {
      "ouro": "1500.00",
      "prata": "287.00"
    }
  },
  brinco: {
    basePrice: "1300.00",
    variantPrices: {
      "ouro": "1300.00",
      "prata": "299.00"
    }
  }
};

const IMAGENS_OVERRIDE: Record<string, { productFeatured?: string; variants?: Record<string, string> }> = {
  aeron: {
    variants: {
      "ouro": aeronJoia
    }
  },
  "velox-royale": {
    variants: {
      "ouro": veloxRoyaleOuroMasc
    }
  }
};

const DESCRICAO_OVERRIDE: Record<string, string> = {
  "velox-royale": "Criada para quem transforma resistência em assinatura. A linha VELOX ROYALE representa o ciclismo em sua forma mais refinada: potência, precisão e elegância em movimento. Inspirada nos atletas que enxergam a estrada como extensão da própria identidade, cada peça carrega uma estética minimalista com presença absoluta. Disponível nas versões Ouro 18k e Prata 925. Luxo esportivo elevado ao máximo nível. VELOX ROYALE.Para quem pedala acima do comum."
};

export function overridePrices(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;

  if (obj.handle && DESCRICAO_OVERRIDE[obj.handle]) {
    obj.description = DESCRICAO_OVERRIDE[obj.handle];
  }

  // Se o objeto for um produto
  if (obj.handle && PRECOS_OVERRIDE[obj.handle]) {
    const override = PRECOS_OVERRIDE[obj.handle];
    let minPrice = Infinity;

    if (obj.variants && Array.isArray(obj.variants.edges)) {
      obj.variants.edges.forEach((edge: any) => {
        if (edge.node) {
          const v = edge.node;
          const titleLower = (v.title || "").toLowerCase();
          let priceSet = false;
          if (override.variantPrices) {
            for (const [key, val] of Object.entries(override.variantPrices)) {
              if (titleLower.includes(key)) {
                v.price = { ...v.price, amount: val };
                priceSet = true;
                break;
              }
            }
          }
          if (!priceSet && v.price) {
            v.price.amount = override.basePrice;
          }
          const pAmount = parseFloat(v.price.amount);
          if (pAmount < minPrice) {
            minPrice = pAmount;
          }
        }
      });
    }

    if (obj.priceRange && obj.priceRange.minVariantPrice) {
      if (minPrice !== Infinity) {
        obj.priceRange.minVariantPrice.amount = minPrice.toString();
      } else {
        obj.priceRange.minVariantPrice.amount = override.basePrice;
      }
    }
  }

  // Sobrescrever imagens do produto e variante no Shopify
  if (obj.handle && IMAGENS_OVERRIDE[obj.handle]) {
    const imgOverride = IMAGENS_OVERRIDE[obj.handle];
    if (obj.variants && Array.isArray(obj.variants.edges)) {
      obj.variants.edges.forEach((edge: any) => {
        if (edge.node) {
          const v = edge.node;
          const titleLower = (v.title || "").toLowerCase();
          if (imgOverride.variants) {
            for (const [key, val] of Object.entries(imgOverride.variants)) {
              if (titleLower.includes(key)) {
                v.image = { url: val, altText: v.title };
                break;
              }
            }
          }
        }
      });
    }
    if (obj.handle !== "velox-royale" && obj.variants && Array.isArray(obj.variants.edges) && obj.variants.edges[0]?.node) {
      const firstVariant = obj.variants.edges[0].node;
      const titleLower = (firstVariant.title || "").toLowerCase();
      if (imgOverride.variants) {
        for (const [key, val] of Object.entries(imgOverride.variants)) {
          if (titleLower.includes(key)) {
            if (obj.featuredImage) {
              obj.featuredImage.url = val;
            }
            if (obj.images && Array.isArray(obj.images.edges) && obj.images.edges[0]?.node) {
              obj.images.edges[0].node.url = val;
            }
            break;
          }
        }
      }
    }
  }

  // Se for uma variante contida em merchandise (como no carrinho)
  if (obj.merchandise && obj.merchandise.product) {
    const product = obj.merchandise.product;
    if (product.handle && PRECOS_OVERRIDE[product.handle]) {
      const override = PRECOS_OVERRIDE[product.handle];
      const titleLower = (obj.merchandise.title || "").toLowerCase();
      let priceSet = false;
      if (override.variantPrices) {
        for (const [key, val] of Object.entries(override.variantPrices)) {
          if (titleLower.includes(key)) {
            obj.merchandise.price = { ...obj.merchandise.price, amount: val };
            priceSet = true;
            break;
          }
        }
      }
      if (!priceSet && obj.merchandise.price) {
        obj.merchandise.price.amount = override.basePrice;
      }
    }

    if (product.handle && IMAGENS_OVERRIDE[product.handle]) {
      const imgOverride = IMAGENS_OVERRIDE[product.handle];
      const titleLower = (obj.merchandise.title || "").toLowerCase();
      if (imgOverride.variants) {
        for (const [key, val] of Object.entries(imgOverride.variants)) {
          if (titleLower.includes(key)) {
            obj.merchandise.image = { url: val, altText: obj.merchandise.title };
            break;
          }
        }
      }
    }
  }

  // Percorre recursivamente
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] === 'object') {
      overridePrices(obj[key]);
    }
  }

  return obj;
}

export async function storefrontApiRequest(query: string, variables: any = {}) {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const responseText = await response.text();
    let data: any = null;
    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch (parseError) {
      console.error('[Shopify] resposta não-JSON:', responseText, parseError);
    }

    if (response.status === 402) {
      console.error('[Shopify] status HTTP:', response.status);
      console.error('[Shopify] resposta completa:', data ?? responseText);
      toast.error("Shopify: pagamento necessário", {
        description: "É necessário um plano Shopify ativo. Acesse admin.shopify.com para fazer upgrade.",
      });
      return;
    }

    if (!response.ok) {
      console.error('[Shopify] status HTTP:', response.status);
      console.error('[Shopify] resposta completa:', data ?? responseText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (data?.errors) {
      console.error('[Shopify] status HTTP:', response.status);
      console.error('[Shopify] resposta completa:', data);
      throw new Error(`Erro no Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
    }

    if (data) {
      overridePrices(data);
    }

    return data;
  } catch (error) {
    console.error('[Shopify] mensagem de erro do fetch:', error);
    throw error;
  }
}

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: Array<{ field: string[] | null; message: string }>): boolean {
  return userErrors.some(e =>
    e.message.toLowerCase().includes('cart not found') ||
    e.message.toLowerCase().includes('does not exist')
  );
}

type LineAttribute = { key: string; value: string };

function buildLine(item: { variantId: string; quantity: number; attributes?: LineAttribute[] }) {
  const line: { quantity: number; merchandiseId: string; attributes?: LineAttribute[] } = {
    quantity: item.quantity,
    merchandiseId: item.variantId,
  };
  if (item.attributes?.length) line.attributes = item.attributes;
  return line;
}

export async function createShopifyCart(item: { variantId: string; quantity: number; attributes?: LineAttribute[] }) {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [buildLine(item)] },
  });
  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error('[Shopify] resposta completa:', data);
    console.error('[Shopify] cartCreate.userErrors:', data.data.cartCreate.userErrors);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) {
    console.error('[Shopify] resposta completa:', data);
    console.error('[Shopify] cartCreate.userErrors:', data?.data?.cartCreate?.userErrors ?? []);
    return null;
  }
  const line = cart.lines.edges[0]?.node;
  const lineId = line?.id;
  if (!lineId) return null;
  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId, line };
}

export async function createDirectCheckout(variantId: string, quantity = 1) {
  const data = await storefrontApiRequest(HEADLESS_CART_CREATE_MUTATION, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });
  const cartCreate = data?.data?.cartCreate;
  const userErrors = cartCreate?.userErrors ?? [];

  if (userErrors.length > 0 || !cartCreate?.cart?.checkoutUrl) {
    console.error('[Shopify] resposta completa:', data);
    console.error('[Shopify] cartCreate.userErrors:', userErrors);
    return { success: false, checkoutUrl: null, data, userErrors };
  }

  return {
    success: true,
    checkoutUrl: formatCheckoutUrl(cartCreate.cart.checkoutUrl),
    cartId: cartCreate.cart.id,
    data,
    userErrors,
  };
}

export async function addLineToShopifyCart(cartId: string, item: { variantId: string; quantity: number; attributes?: LineAttribute[] }) {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [buildLine(item)],
  });
  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l: any) => l.node.merchandise.id === item.variantId);
  return { success: true, lineId: newLine?.node?.id, line: newLine?.node };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId, lines: [{ id: lineId, quantity }],
  });
  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string) {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId, lineIds: [lineId],
  });
  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}
