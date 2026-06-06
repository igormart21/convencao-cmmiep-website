import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { ColecaoDestaque } from "@/components/ColecaoDestaque";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, {
          handle,
        });
        const p = data?.data?.product;
        setProduct(p);
        setSelectedVariantId(p?.variants?.edges?.[0]?.node?.id ?? null);
      } finally {
        setLoading(false);
      }
    })();
  }, [handle]);

  const variant =
    product?.variants.edges.find((e: any) => e.node.id === selectedVariantId)
      ?.node ?? product?.variants.edges[0]?.node;

  // Galeria unificada: imagem da variante + media + images + featuredImage (sem duplicatas)
  const galleryImages: { url: string; altText: string | null }[] = (() => {
    if (!product) return [];
    const collected: { url: string; altText: string | null }[] = [];
    const seen = new Set<string>();
    const push = (img?: { url?: string; altText?: string | null } | null) => {
      if (img?.url && !seen.has(img.url)) {
        seen.add(img.url);
        collected.push({ url: img.url, altText: img.altText ?? null });
      }
    };
    push(variant?.image);
    push(product.featuredImage);
    (product.media?.edges ?? []).forEach((e: any) => push(e?.node?.image));
    (product.images?.edges ?? []).forEach((e: any) => push(e?.node));
    return collected;
  })();

  // Reset índice ao trocar de variante quando ela tem imagem própria
  useEffect(() => {
    if (variant?.image?.url) {
      const idx = galleryImages.findIndex((g) => g.url === variant.image.url);
      if (idx >= 0) setActiveImage(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariantId]);

  const handleAdd = async () => {
    if (!variant || !product) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Peça adicionada à sua coleção", {
      description: product.title,
    });
  };

  return (
    <div
      className="min-h-screen-safe text-foreground relative"
      style={{
        backgroundColor: "#070707",
        ["--background" as any]: "0 0% 4%",
        ["--foreground" as any]: "43 55% 78%",
        ["--accent" as any]: "43 65% 55%",
        ["--border" as any]: "43 35% 28%",
        ["--muted-foreground" as any]: "43 25% 60%",
      }}
    >
      {/* HEADER */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/colecao"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Coleções
          </Link>
          <span
            className="hidden md:block font-serif italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            ATELIÊ 3R
          </span>
          <CartDrawer />
        </div>
      </header>

      <main className="pt-24 pb-24 md:pb-0">
        {loading ? (
          <div className="flex justify-center py-40">
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#d4af37" }}
            />
          </div>
        ) : !product ? (
          <div className="container py-32 text-center">
            <h1 className="font-serif italic text-4xl mb-4 text-white/80">
              Peça não encontrada
            </h1>
            <Link
              to="/colecao"
              className="text-[#d4af37] underline text-sm tracking-[0.3em] uppercase"
            >
              Voltar às coleções
            </Link>
          </div>
        ) : (
          <>
            {/* HERO da peça */}
            <section className="relative w-full px-5 sm:px-6 py-10 sm:py-14 md:py-20 animate-fade-in">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start md:items-center">
                {/* Imagem dramática */}
                <div className="relative">
                  <div
                    className="relative aspect-square overflow-hidden"
                    style={{
                      backgroundColor: "#000",
                      backgroundImage:
                        "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(212,175,55,0.18) 0%, transparent 70%)",
                      border: "1px solid rgba(212,175,55,0.25)",
                      boxShadow:
                        "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.1)",
                    }}
                  >
                    {galleryImages[activeImage] ? (
                      <img
                        key={galleryImages[activeImage].url}
                        src={galleryImages[activeImage].url}
                        alt={galleryImages[activeImage].altText || product.title}
                        className="w-full h-full object-contain p-4 sm:p-6 img-premium is-loaded animate-fade-in"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        style={{ willChange: "opacity, transform" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span
                          className="font-serif italic text-sm tracking-[0.4em] uppercase"
                          style={{ color: "rgba(212,175,55,0.55)" }}
                        >
                          Imagem em breve
                        </span>
                      </div>
                    )}
                    {/* Cantos dourados */}
                    <span
                      className="absolute top-3 left-3 h-4 w-4 border-t border-l"
                      style={{ borderColor: "#d4af37" }}
                    />
                    <span
                      className="absolute top-3 right-3 h-4 w-4 border-t border-r"
                      style={{ borderColor: "#d4af37" }}
                    />
                    <span
                      className="absolute bottom-3 left-3 h-4 w-4 border-b border-l"
                      style={{ borderColor: "#d4af37" }}
                    />
                    <span
                      className="absolute bottom-3 right-3 h-4 w-4 border-b border-r"
                      style={{ borderColor: "#d4af37" }}
                    />
                  </div>

                  {galleryImages.length > 1 && (
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      {galleryImages.map((img, i) => (
                        <button
                          key={img.url}
                          onClick={() => setActiveImage(i)}
                          className="aspect-square overflow-hidden transition-all duration-300"
                          style={{
                            border:
                              activeImage === i
                                ? "1px solid #d4af37"
                                : "1px solid rgba(212,175,55,0.15)",
                            opacity: activeImage === i ? 1 : 0.6,
                          }}
                        >
                          <img
                            src={img.url}
                            alt={img.altText || ""}
                            className="w-full h-full object-contain p-1.5 transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="h-px w-12"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(212,175,55,0.7))",
                      }}
                    />
                    <span
                      className="text-[10px] uppercase tracking-[0.5em]"
                      style={{ color: "#d4af37" }}
                    >
                      Peça do Ateliê
                    </span>
                  </div>

                  <h1
                    className="font-serif italic font-light text-[2.25rem] sm:text-5xl md:text-6xl leading-[1.05] mb-5 sm:mb-6"
                    style={{
                      fontFamily:
                        '"Cormorant Garamond","Playfair Display",Georgia,serif',
                      color: "#f4ead0",
                    }}
                  >
                    {product.title}
                  </h1>

                  {product.description && (
                    <p
                      className="font-serif italic text-base md:text-lg leading-relaxed mb-10 whitespace-pre-line"
                      style={{ color: "rgba(244,234,208,0.75)" }}
                    >
                      {product.description}
                    </p>
                  )}

                  {/* Variações elegantes */}
                  {product.variants.edges.length > 1 && (
                    <div className="mb-10">
                      <h3
                        className="text-[10px] uppercase tracking-[0.4em] mb-4"
                        style={{ color: "rgba(212,175,55,0.7)" }}
                      >
                        Variações
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.variants.edges.map((v: any) => {
                          const sel = selectedVariantId === v.node.id;
                          return (
                            <button
                              key={v.node.id}
                              onClick={() => setSelectedVariantId(v.node.id)}
                              disabled={!v.node.availableForSale}
                              className="px-6 py-3 text-[10px] uppercase tracking-[0.35em] transition-all duration-500 disabled:opacity-30 disabled:line-through"
                              style={{
                                border: sel
                                  ? "1px solid #d4af37"
                                  : "1px solid rgba(212,175,55,0.25)",
                                color: sel ? "#070707" : "#e9dcb1",
                                background: sel
                                  ? "linear-gradient(135deg, #f4d77a 0%, #d4af37 50%, #b8860b 100%)"
                                  : "transparent",
                              }}
                            >
                              {v.node.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Preço discreto */}
                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/45 mb-2">
                      Investimento da peça
                    </p>
                    <p
                      className="font-serif text-2xl md:text-3xl"
                      style={{ color: "#d4af37" }}
                    >
                      A partir de {variant.price.currencyCode}{" "}
                      {parseFloat(variant.price.amount).toFixed(2)}
                    </p>
                  </div>

                  {/* CTA principal */}
                  <button
                    onClick={handleAdd}
                    disabled={isLoading || !variant?.availableForSale}
                    className="w-full py-5 text-[11px] uppercase tracking-[0.45em] transition-all duration-500 disabled:opacity-50 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0"
                    style={{
                      color: "#070707",
                      background:
                        "linear-gradient(135deg, #f4d77a 0%, #d4af37 50%, #b8860b 100%)",
                      boxShadow: "0 10px 40px rgba(212,175,55,0.25)",
                    }}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : variant?.availableForSale ? (
                      "Adicionar à sua coleção"
                    ) : (
                      "Indisponível"
                    )}
                  </button>

                  {/* Aviso discreto sob o CTA */}
                  <div className="mt-6 text-center space-y-1.5">
                    <p
                      className="text-[10px] uppercase tracking-[0.4em] font-light"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      Peça produzida sob demanda
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-[0.35em] font-light"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Prazo de entrega: 7 a 12 dias úteis
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* PRODUÇÃO SOB MEDIDA */}
            <section className="relative px-6 py-24 md:py-32">
              <div className="max-w-2xl mx-auto text-center">
                <div
                  className="mx-auto mb-10 h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
                  }}
                />
                <p
                  className="text-[10px] uppercase tracking-[0.6em] mb-8"
                  style={{ color: "rgba(212,175,55,0.75)" }}
                >
                  Produção sob medida
                </p>
                <div
                  className="space-y-7 font-light"
                  style={{
                    fontFamily:
                      '"Fraunces","Cormorant Garamond",Georgia,serif',
                    color: "rgba(244,234,208,0.78)",
                    fontSize: "clamp(15px, 1.25vw, 18px)",
                    lineHeight: 1.85,
                    letterSpacing: "0.015em",
                  }}
                >
                  <p className="italic">
                    Cada peça é criada individualmente após a confirmação do
                    pedido, passando por um processo artesanal que garante
                    acabamento único, precisão e identidade em cada detalhe.
                  </p>
                  <p
                    className="text-[11px] not-italic uppercase tracking-[0.45em]"
                    style={{ color: "#d4af37" }}
                  >
                    Prazo total de produção e envio
                    <br />
                    <span className="text-white/85">7 a 12 dias úteis</span>
                  </p>
                  <p className="italic">
                    Você não está adquirindo um produto pronto — está
                    garantindo uma peça construída especialmente para
                    acompanhar a sua jornada.
                  </p>
                </div>
                <div
                  className="mx-auto mt-12 h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
                  }}
                />
              </div>
            </section>

            {/* BLOCO PERSONALIZAÇÃO */}
            <section
              className="relative py-24 md:py-32 px-6 mt-12"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 70%), #050505",
                borderTop: "1px solid rgba(212,175,55,0.15)",
                borderBottom: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <div className="max-w-3xl mx-auto text-center">
                <Sparkles
                  className="h-6 w-6 mx-auto mb-6"
                  style={{ color: "#d4af37" }}
                />
                <h2
                  className="font-serif italic font-light text-3xl md:text-5xl mb-6"
                  style={{
                    fontFamily:
                      '"Cormorant Garamond","Playfair Display",Georgia,serif',
                    color: "#f4ead0",
                  }}
                >
                  Torne essa peça{" "}
                  <em style={{ color: "#d4af37" }}>única</em>
                </h2>
                <p
                  className="text-base md:text-lg mb-10 italic"
                  style={{ color: "rgba(244,234,208,0.7)" }}
                >
                  Transforme essa criação em um símbolo exclusivo seu.
                </p>
                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-3 px-12 py-4 text-[11px] uppercase tracking-[0.45em] transition-all duration-500 hover:gap-5"
                  style={{
                    color: "#d4af37",
                    border: "1px solid rgba(212,175,55,0.55)",
                  }}
                >
                  <span
                    className="h-px w-6"
                    style={{ background: "rgba(212,175,55,0.7)" }}
                  />
                  Criar versão personalizada
                  <span
                    className="h-px w-6"
                    style={{ background: "rgba(212,175,55,0.7)" }}
                  />
                </Link>
              </div>
            </section>

            {/* Outras peças */}
            <ColecaoDestaque
              title="Outras peças do ateliê"
              subtitle="Criações que conversam com a sua escolha"
              limit={3}
            />
          </>
        )}
      </main>

      {/* Sticky CTA mobile */}
      {product && variant && (
        <div
          className="md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] backdrop-blur-xl animate-fade-in"
          style={{
            background: "linear-gradient(180deg, rgba(7,7,7,0.55) 0%, rgba(7,7,7,0.92) 60%)",
            borderTop: "1px solid rgba(212,175,55,0.18)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/45">
                {product.title}
              </p>
              <p
                className="font-serif text-base leading-tight truncate"
                style={{ color: "#d4af37" }}
              >
                {variant.price.currencyCode}{" "}
                {parseFloat(variant.price.amount).toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleAdd}
              disabled={isLoading || !variant?.availableForSale}
              className="px-6 py-3.5 text-[10px] uppercase tracking-[0.35em] transition-all duration-500 disabled:opacity-50 active:scale-[0.98]"
              style={{
                color: "#070707",
                background:
                  "linear-gradient(135deg, #f4d77a 0%, #d4af37 50%, #b8860b 100%)",
                boxShadow: "0 8px 30px rgba(212,175,55,0.3)",
              }}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : variant?.availableForSale ? (
                "Adicionar"
              ) : (
                "Indisponível"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
