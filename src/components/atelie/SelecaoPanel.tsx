import { useNavigate } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { startShopifyCheckout, type VariantId } from "@/lib/shopifyVariants";
import { useEffect, useMemo, useState } from "react";
import { storefrontApiRequest } from "@/lib/shopify";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variantId: VariantId;
  linhaNome: string;
  modalidadeNome?: string;
  modalidadeSlug?: string;
  material: "ouro" | "prata";
  imagem?: string;
};

const VARIANT_PRICE_QUERY = `
  query VariantPrice($id: ID!) {
    node(id: $id) {
      ... on ProductVariant {
        id
        price { amount currencyCode }
      }
    }
  }
`;

const priceCache = new Map<string, { amount: string; currencyCode: string }>();

function formatPrice(amount: number, currencyCode = "BRL"): string {
  if (!isFinite(amount)) return "";
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `R$ ${Math.round(amount)}`;
  }
}

/* ----------------------------------------------------------------------------
 * ATELIÊ DE COMPOSIÇÃO — correntes opcionais
 * Estrutura global e reutilizável. O metal acompanha automaticamente o pingente.
 * ------------------------------------------------------------------------- */
type CorrenteId = "signature" | "imperial" | "performance" | null;

const CORRENTES: Array<{
  id: Exclude<CorrenteId, null>;
  nome: string;
  descricao: string;
}> = [
  {
    id: "signature",
    nome: "Signature",
    descricao: "Elo fino, traço minimalista — o discreto da maison.",
  },
  {
    id: "imperial",
    nome: "Imperial",
    descricao: "Elo encorpado, presença marcada com sobriedade.",
  },
  {
    id: "performance",
    nome: "Performance",
    descricao: "Linha contemporânea, geometria esportiva refinada.",
  },
];

/** Render visual da corrente (sem imagem externa) — gradiente fino simulando elos. */
function CorrentePreview({
  variant,
  material,
}: {
  variant: Exclude<CorrenteId, null>;
  material: "ouro" | "prata";
}) {
  const tone =
    material === "ouro"
      ? { core: "#e8c97a", glow: "rgba(232,201,122,0.55)", base: "rgba(212,175,55,0.25)" }
      : { core: "#e8edf2", glow: "rgba(220,230,240,0.55)", base: "rgba(200,215,235,0.22)" };

  // densidade e espessura distintas por modelo
  const config =
    variant === "signature"
      ? { thickness: 1.2, gap: 6, height: 18 }
      : variant === "imperial"
      ? { thickness: 2.4, gap: 8, height: 22 }
      : { thickness: 1.6, gap: 4, height: 20 };

  return (
    <div
      aria-hidden
      className="relative w-12 shrink-0 overflow-hidden"
      style={{
        height: config.height,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.4) 100%)",
        border: `1px solid ${tone.base}`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent ${config.gap}px, ${tone.core} ${config.gap}px, ${tone.core} ${config.gap + config.thickness}px)`,
          opacity: 0.85,
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${tone.glow} 0%, transparent 70%)`,
          mixBlendMode: "screen",
          opacity: 0.4,
        }}
      />
    </div>
  );
}

export const SelecaoPanel = ({
  open,
  onOpenChange,
  variantId,
  linhaNome,
  modalidadeNome,
  modalidadeSlug,
  material,
  imagem,
}: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<{ amount: string; currencyCode: string } | null>(
    variantId ? priceCache.get(variantId) ?? null : null,
  );
  const [priceLoading, setPriceLoading] = useState(false);
  const [corrente, setCorrente] = useState<CorrenteId>(null);
  const disponivel = !!variantId;

  // Reset corrente ao trocar de peça/material
  useEffect(() => {
    setCorrente(null);
  }, [variantId, material]);

  useEffect(() => {
    if (!open || !variantId) return;
    const cached = priceCache.get(variantId);
    if (cached) {
      setPrice(cached);
      return;
    }
    let cancelled = false;
    setPriceLoading(true);
    setPrice(null);
    storefrontApiRequest(VARIANT_PRICE_QUERY, { id: variantId })
      .then((data) => {
        const p = data?.data?.node?.price;
        if (!cancelled && p?.amount) {
          priceCache.set(variantId, p);
          setPrice(p);
        }
      })
      .catch((err) => console.error("[SelecaoPanel] preço falhou", err))
      .finally(() => {
        if (!cancelled) setPriceLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, variantId]);

  const handleFinalizar = async () => {
    if (!disponivel || loading) return;
    // A composição (corrente) integra a experiência editorial; o checkout
    // segue exclusivamente com o variantId Shopify do pingente.
    await startShopifyCheckout(variantId, {
      quantity: 1,
      onLoadingChange: setLoading,
    });
  };

  const handleContinuar = () => {
    onOpenChange(false);
    const slug = modalidadeSlug ?? "geral";
    navigate(`/continuar/${slug}`);
  };

  const materialLabel = material === "ouro" ? "Ouro 18K" : "Prata 925";
  const pendantAmount = price ? Number(price.amount) : null;
  const currency = price?.currencyCode ?? "BRL";
  const priceLabel = useMemo(
    () => (pendantAmount != null ? formatPrice(pendantAmount, currency) : null),
    [pendantAmount, currency],
  );
  const correnteSelecionada = useMemo(
    () => CORRENTES.find((c) => c.id === corrente) ?? null,
    [corrente],
  );

  const goldLine = "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.45) 50%, transparent 100%)";
  const goldLineSoft = "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.22) 50%, transparent 100%)";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 border-0 text-white [&>button]:hidden flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse at 70% 0%, rgba(212,175,55,0.10) 0%, transparent 55%), linear-gradient(180deg, #050505 0%, #0a0a0a 100%)",
          borderLeft: "1px solid rgba(212,175,55,0.25)",
          boxShadow: "-30px 0 80px rgba(0,0,0,0.7)",
        }}
      >
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Fechar"
          className="absolute right-5 top-5 h-9 w-9 inline-flex items-center justify-center text-white/55 hover:text-[#d4af37] transition-colors z-20"
        >
          <X className="h-4 w-4" strokeWidth={1.25} />
        </button>

        {/* Conteúdo rolável — respira generosamente */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-8 pt-12 pb-6">
            <p
              className="text-[10px] uppercase tracking-[0.5em] mb-5"
              style={{ color: "rgba(212,175,55,0.85)" }}
            >
              Ateliê · Sua peça
            </p>
            <SheetTitle asChild>
              <h2
                className="font-display font-light leading-tight"
                style={{
                  fontSize: "clamp(26px, 3vw, 32px)",
                  letterSpacing: "0.04em",
                  color: "#f4ead0",
                }}
              >
                Sua peça foi selecionada.
              </h2>
            </SheetTitle>
            <p
              className="mt-3 italic font-light"
              style={{
                fontFamily: '"Fraunces",serif',
                color: "rgba(255,255,255,0.65)",
                fontSize: "14px",
              }}
            >
              Componha sua joia com a serenidade de uma maison.
            </p>
          </div>

          {/* Quadrante da peça */}
          <div
            className="relative mx-8 my-2 flex items-center gap-5 p-4 pr-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(212,175,55,0.22)",
            }}
          >
            {imagem && (
              <div
                className="h-20 w-20 shrink-0 overflow-hidden relative"
                style={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(212,175,55,0.18)",
                }}
              >
                <img
                  src={imagem}
                  alt={linhaNome}
                  className="h-full w-full object-contain transition-opacity duration-700"
                />
                {/* Overlay corrente sobre o pingente quando selecionada */}
                {correnteSelecionada && (
                  <div
                    key={correnteSelecionada.id}
                    className="absolute inset-x-0 top-1 flex items-center justify-center pointer-events-none"
                    style={{ animation: "atelie-fade 1s ease-out both" }}
                  >
                    <CorrentePreview
                      variant={correnteSelecionada.id}
                      material={material}
                    />
                  </div>
                )}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p
                className="font-display text-base tracking-[0.18em] uppercase truncate"
                style={{ color: "#f4ead0" }}
              >
                {linhaNome}
              </p>
              {modalidadeNome && (
                <p
                  className="text-[10px] uppercase tracking-[0.4em] mt-1"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {modalidadeNome}
                </p>
              )}
              <p
                className="text-[10px] uppercase tracking-[0.4em] mt-2"
                style={{ color: "rgba(212,175,55,0.85)" }}
              >
                {materialLabel}
                {correnteSelecionada && (
                  <span
                    className="ml-2 normal-case tracking-[0.2em]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    · {correnteSelecionada.nome}
                  </span>
                )}
              </p>
            </div>

            {disponivel && (
              <div
                className="absolute bottom-3 right-4 flex flex-col items-end leading-none"
                aria-live="polite"
              >
                <span
                  className="text-[8.5px] uppercase tracking-[0.42em]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Valor da peça
                </span>
                <span
                  className="mt-1.5 font-display"
                  style={{
                    color: "#d4af37",
                    fontSize: "13px",
                    letterSpacing: "0.12em",
                    fontWeight: 300,
                  }}
                >
                  {priceLoading && !priceLabel ? "—" : priceLabel ?? "—"}
                </span>
              </div>
            )}
          </div>

          {/* ATELIÊ DE COMPOSIÇÃO */}
          <section className="px-8 pt-16 pb-4">
            <div
              className="h-px w-full mb-14"
              style={{ background: goldLineSoft }}
            />
            <p
              className="text-[10px] uppercase tracking-[0.55em]"
              style={{ color: "rgba(212,175,55,0.8)" }}
            >
              Ateliê de Composição
            </p>
            <p
              className="mt-5 italic font-light"
              style={{
                fontFamily: '"Fraunces",serif',
                color: "rgba(255,255,255,0.55)",
                fontSize: "13.5px",
                lineHeight: 1.6,
                letterSpacing: "0.01em",
              }}
            >
              Selecione a corrente que acompanhará sua joia.
            </p>

            <div className="mt-12 space-y-5">
              {CORRENTES.map((c, idx) => {
                const selected = corrente === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCorrente(selected ? null : c.id)}
                    className="group relative w-full flex items-center gap-5 px-5 py-5 text-left transition-all duration-700"
                    style={{
                      background: selected
                        ? "linear-gradient(180deg, rgba(212,175,55,0.07) 0%, rgba(0,0,0,0.5) 100%)"
                        : "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.4) 100%)",
                      border: selected
                        ? "1px solid rgba(212,175,55,0.55)"
                        : "1px solid rgba(212,175,55,0.14)",
                      boxShadow: selected
                        ? "0 0 30px rgba(212,175,55,0.18), inset 0 0 20px rgba(212,175,55,0.05)"
                        : "none",
                      animation: open
                        ? `atelie-rise 0.9s ${0.15 + idx * 0.12}s ease-out both`
                        : undefined,
                    }}
                    onMouseEnter={(e) => {
                      if (selected) return;
                      e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      if (selected) return;
                      e.currentTarget.style.borderColor = "rgba(212,175,55,0.14)";
                    }}
                  >
                    <CorrentePreview variant={c.id} material={material} />
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-display tracking-[0.32em] uppercase"
                        style={{
                          color: selected ? "#f4ead0" : "rgba(244,234,208,0.88)",
                          fontSize: "11px",
                        }}
                      >
                        {c.nome}
                      </p>
                      <p
                        className="mt-2 font-light"
                        style={{
                          fontFamily: '"Fraunces",serif',
                          color: "rgba(255,255,255,0.45)",
                          fontSize: "11.5px",
                          lineHeight: 1.55,
                        }}
                      >
                        {c.descricao}
                      </p>
                    </div>
                    <span
                      className="text-[9px] uppercase tracking-[0.45em] shrink-0 transition-colors duration-700"
                      style={{
                        color: selected ? "#d4af37" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {selected ? "Selecionada" : "Selecionar"}
                    </span>
                  </button>
                );
              })}
            </div>

            <p
              className="mt-10 text-[9.5px] uppercase tracking-[0.4em]"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              Composição opcional · Sob consulta no Ateliê
            </p>
          </section>

          <div className="px-8 mt-12">
            <div className="h-px w-full" style={{ background: goldLineSoft }} />
          </div>
        </div>

        {/* Rodapé fixo — TOTAL + ações */}
        <div
          className="px-8 pb-10 pt-7 shrink-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #050505 35%)",
          }}
        >
          {disponivel && (
            <div className="mb-6">
              <div className="h-px w-full mb-4" style={{ background: goldLine }} />
              <div className="flex items-baseline justify-between">
                <span
                  className="text-[10px] uppercase"
                  style={{
                    letterSpacing: "0.5em",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Total
                </span>
                <span
                  className="font-display"
                  style={{
                    color: "#f4ead0",
                    fontSize: "20px",
                    letterSpacing: "0.08em",
                    fontWeight: 300,
                  }}
                >
                  {priceLoading && !priceLabel ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin inline-block" />
                  ) : (
                    priceLabel ?? "—"
                  )}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleFinalizar}
              disabled={!disponivel || loading}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                color: "#0a0a0a",
                background: "#d4af37",
                border: "1px solid #d4af37",
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                boxShadow: "0 0 30px rgba(212,175,55,0.25)",
              }}
              onMouseEnter={(e) => {
                if (!disponivel || loading) return;
                e.currentTarget.style.background = "#f4d77a";
                e.currentTarget.style.borderColor = "#f4d77a";
              }}
              onMouseLeave={(e) => {
                if (!disponivel || loading) return;
                e.currentTarget.style.background = "#d4af37";
                e.currentTarget.style.borderColor = "#d4af37";
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Iniciando checkout
                </>
              ) : disponivel ? (
                "Finalizar compra"
              ) : (
                "Em breve"
              )}
            </button>

            <button
              type="button"
              onClick={handleContinuar}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 transition-all duration-500"
              style={{
                color: "#d4af37",
                background: "transparent",
                border: "1px solid rgba(212,175,55,0.45)",
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.85)";
                e.currentTarget.style.color = "#f4d77a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
                e.currentTarget.style.color = "#d4af37";
              }}
            >
              Continuar comprando
            </button>
          </div>
        </div>

        <style>{`
          @keyframes atelie-fade {
            0% { opacity: 0; transform: translateY(-4px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes atelie-rise {
            0% { opacity: 0; transform: translateY(14px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </SheetContent>
    </Sheet>
  );
};

export default SelecaoPanel;
