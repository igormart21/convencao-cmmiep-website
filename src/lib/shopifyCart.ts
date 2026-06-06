// Shopify cart permalinks por linha + material.
// Formato: https://3rfitness.com.br/cart/VARIANT_ID:1
// Ao adicionar uma nova variante configurada na Shopify, basta inserir aqui.

import type { Material } from "@/data/atelie";

const CART_BASE = "https://3rfitness.com.br/cart";

// Mapa: slug da linha -> material -> variant ID numérico do Shopify.
// Deixe `undefined` (não inclua a chave) para variações ainda não configuradas.
const VARIANT_IDS: Record<string, Partial<Record<Material, string>>> = {
  halter: {
    ouro: "48912055468259",
    prata: "48912055501027",
  },
};

export function getShopifyCartUrl(
  slug: string,
  material: Material,
  quantity = 1,
): string | undefined {
  const variantId = VARIANT_IDS[slug]?.[material];
  if (!variantId) return undefined;
  return `${CART_BASE}/${variantId}:${quantity}`;
}
