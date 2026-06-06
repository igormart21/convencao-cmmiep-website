import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";
import { LINHAS, type Material, type Forma } from "@/data/atelie";

// Mapa: slug da linha (rota) → handle do produto Shopify
const ATELIE_HANDLES: Record<string, string> = {
  elite: "trion-elite",
  velarion: "velarion",
  // legados / outras linhas (mantidos para compatibilidade)
  halter: "halter-1",
  vigor: "vigor",
};

function normalize(s: string | undefined | null) {
  return (s ?? "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function materialMatches(value: string, material: Material) {
  const v = normalize(value);
  return material === "ouro" ? v.includes("ouro") : v.includes("prata");
}

function formaMatches(value: string, forma: Forma) {
  const v = normalize(value);
  if (forma === "feminino") return v.startsWith("femin"); // feminino / feminina
  return v.startsWith("masc");
}

function matchVariant(product: any, material: Material, forma?: Forma) {
  const variants: any[] = (product?.variants?.edges ?? []).map((e: any) => e.node);

  // 1) match estrito material + forma quando houver opção Forma
  if (forma) {
    const strict = variants.find((v) => {
      const mat = v.selectedOptions?.find((o: any) => normalize(o.name).includes("material"));
      const fr = v.selectedOptions?.find((o: any) => normalize(o.name).includes("forma"));
      return (
        (mat ? materialMatches(mat.value, material) : false) &&
        (fr ? formaMatches(fr.value, forma) : false)
      );
    });
    if (strict) return strict;

    // fallback: parse pelo title "Ouro 18K / masculino"
    const byTitle = variants.find((v) => {
      const parts = (v.title ?? "").split("/").map((s: string) => s.trim());
      const matPart = parts[0] ?? v.title;
      const frPart = parts[1] ?? "";
      return materialMatches(matPart, material) && formaMatches(frPart, forma);
    });
    if (byTitle) return byTitle;
  }

  // 2) match apenas material
  const byMaterial = variants.find((v) =>
    v.selectedOptions?.some((o: any) => materialMatches(o.value, material)),
  );
  if (byMaterial) return byMaterial;

  const byMaterialTitle = variants.find((v) => materialMatches(v.title ?? "", material));
  if (byMaterialTitle) return byMaterialTitle;

  return variants[0];
}

export async function addAtelieLineToCart(
  slug: string,
  material: Material,
  forma?: Forma,
  options: { openDrawer?: boolean } = {},
): Promise<{ success: boolean; error?: string; checkoutUrl?: string | null }> {
  const openDrawer = options.openDrawer ?? true;
  const handle = ATELIE_HANDLES[slug];
  if (!handle) return { success: false, error: "Linha ainda não configurada." };

  try {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
    const product = data?.data?.product;
    if (!product) return { success: false, error: "Produto não encontrado na loja." };

    const variant = matchVariant(product, material, forma);
    if (!variant) return { success: false, error: "Variação não disponível." };

    const variantImg = variant.image?.url
      ? { url: variant.image.url, altText: variant.image.altText ?? null }
      : null;
    const featuredImg = product.featuredImage?.url
      ? { url: product.featuredImage.url, altText: product.featuredImage.altText ?? null }
      : null;
    const productImgs: Array<{ url: string; altText: string | null }> =
      product.images?.edges?.map((e: any) => ({ url: e.node.url, altText: e.node.altText ?? null })) ?? [];
    const mediaImgs: Array<{ url: string; altText: string | null }> =
      product.media?.edges
        ?.map((e: any) => e.node?.image)
        .filter(Boolean)
        .map((i: any) => ({ url: i.url, altText: i.altText ?? null })) ?? [];
    const atelieImg = LINHAS[slug]?.imagens?.[material]
      ? {
          url: LINHAS[slug].imagens[material],
          altText: `${LINHAS[slug].nome} ${material === "ouro" ? "Ouro" : "Prata"}`,
        }
      : null;

    const orderedImgs = [variantImg, featuredImg, ...productImgs, ...mediaImgs, atelieImg].filter(
      (img): img is { url: string; altText: string | null } => !!img?.url,
    );
    const seen = new Set<string>();
    const dedupedImgs = orderedImgs.filter((i) => (seen.has(i.url) ? false : (seen.add(i.url), true)));

    const productForCart: ShopifyProduct = {
      node: {
        id: product.id,
        title: product.title,
        description: product.description,
        handle: product.handle,
        featuredImage: featuredImg,
        priceRange: product.priceRange ?? { minVariantPrice: variant.price },
        images: { edges: dedupedImgs.map((node) => ({ node })) },
        media: product.media ?? { edges: [] },
        variants: product.variants,
        options: product.options ?? [],
      },
    };

    await useCartStore.getState().addItem({
      product: productForCart,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
      thumbnailImage: dedupedImgs[0] ?? null,
    });

    useCartStore.setState((state) => ({
      items: state.items.map((it) =>
        it.variantId === variant.id
          ? { ...it, product: productForCart, thumbnailImage: dedupedImgs[0] ?? null }
          : it,
      ),
    }));

    if (openDrawer) useCartUIStore.getState().openCart();
    const checkoutUrl = useCartStore.getState().getCheckoutUrl();
    return { success: true, checkoutUrl };
  } catch (err: any) {
    console.error("addAtelieLineToCart failed:", err);
    return { success: false, error: "Não foi possível adicionar ao carrinho." };
  }
}
