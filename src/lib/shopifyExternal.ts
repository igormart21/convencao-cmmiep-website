// Configuração universal de navegação para Shopify.
// Todo botão de compra do site deve usar `getShopifyProductUrl(slug)`
// para abrir o produto correspondente em nova aba, fora do Lovable.

export const HALTER_SHOPIFY_PRODUCT_URL = "https://3rfitness.com.br/products/halter";
export const VIGOR_SHOPIFY_PRODUCT_URL = "https://3rfitness.com.br/products/vigor";

const SHOPIFY_PUBLIC_BASE = "https://3rfitness.com.br/products";

// Mapeia o slug da linha (ou produto) para o handle do produto no Shopify.
// Ao adicionar uma nova linha, basta adicionar uma entrada aqui.
export const SHOPIFY_PRODUCT_HANDLES: Record<string, string> = {
  halter: "halter-1",
  vigor: "vigor",
};

const SHOPIFY_PRODUCT_URLS: Record<string, string> = {
  halter: HALTER_SHOPIFY_PRODUCT_URL,
  vigor: VIGOR_SHOPIFY_PRODUCT_URL,
};

/**
 * Retorna a URL absoluta do produto no Shopify para o slug informado,
 * ou `undefined` se o slug ainda não estiver mapeado.
 *
 * Validações de segurança:
 * - Sempre retorna URL absoluta começando com https://3rfitness.com.br
 * - Nunca retorna domínio do Lovable
 * - Nunca retorna rota relativa
 */
export function getShopifyProductUrl(slug?: string | null): string | undefined {
  if (!slug) return undefined;
  if (slug === "halter") return HALTER_SHOPIFY_PRODUCT_URL;

  const mappedUrl = SHOPIFY_PRODUCT_URLS[slug];
  if (mappedUrl) return mappedUrl;

  const handle = SHOPIFY_PRODUCT_HANDLES[slug];
  if (!handle) return undefined;
  const url = `${SHOPIFY_PUBLIC_BASE}/${handle}`;
  if (!url.startsWith("https://3rfitness.com.br/")) return undefined;
  return url;
}

/**
 * Atributos padrão para qualquer <a> de compra externa.
 * Garante abertura em nova aba e isolamento de contexto.
 */
export const EXTERNAL_LINK_ATTRS = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

/**
 * Abre o produto Shopify em nova aba de forma programática.
 * Se o link for inválido, mantém o usuário na página atual (não redireciona).
 */
export function openShopifyProduct(slug?: string | null): boolean {
  const url = getShopifyProductUrl(slug);
  if (!url) return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
