import { useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MODALIDADES, LINHAS } from "@/data/atelie";
import triathlonCinematic from "@/assets/triathlon-cinematic.jpg";
import musculacaoCampaign from "@/assets/modalidade-musculacao-campaign.jpg";
import musculacaoHalter from "@/assets/modalidade-musculacao-halter.jpg";
import ciclismoCampaign from "@/assets/modalidade-ciclismo-campaign.jpg";
import crossfitCampaign from "@/assets/modalidade-crossfit-campaign.jpg";
import crossfitStrata from "@/assets/modalidade-crossfit-strata.jpg";
import ciclismoBg from "@/assets/atelie-ciclismo-bg.jpg";
import bgMusculacao from "@/assets/fundo-card-musculacao.png";
import bgCrossfit from "@/assets/fundo-card-crossfit.png";
import bgCorrida from "@/assets/fundo-card-corrida.png";
import bgCiclismo from "@/assets/fundo-card-ciclismo.png";
import bgFisiculturismo from "@/assets/fundo-card-fisiculturismo.png";
import crossfitImperiumCard from "@/assets/crossfit-imperium-card.png";
import crossfitStrataCard from "@/assets/crossfit-strata-card.png";

// Override por modalidade → linha → imagem do card
const CARD_IMAGE_OVERRIDE: Record<string, Record<string, string>> = {
  crossfit: {
    imperium: crossfitImperiumCard,
    strata: crossfitStrataCard,
  },
};

const MODALIDADE_BG: Record<string, string> = {
  musculacao: bgMusculacao,
  crossfit: bgCrossfit,
  corrida: bgCorrida,
  ciclismo: bgCiclismo,
  fisiculturismo: bgFisiculturismo,
};

const AtelieModalidade = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const modalidade = MODALIDADES.find((m) => m.slug === slug);

  const linhas = (modalidade?.linhas ?? [])
    .map((id) => LINHAS[id])
    .filter(Boolean);

  const [activeSlug, setActiveSlug] = useState<string | undefined>(
    linhas[0]?.slug,
  );
  const [revealKey, setRevealKey] = useState(0);
  const [hoverSlug, setHoverSlug] = useState<string | undefined>(undefined);

  useEffect(() => {
    setActiveSlug(linhas[0]?.slug);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (slug) {
      import("@/stores/modalidadeStore").then(({ useModalidadeStore }) =>
        useModalidadeStore.getState().setModalidade(slug),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);


  useEffect(() => {
    setRevealKey((k) => k + 1);
    // preload
    linhas.forEach((l) => {
      const img = new Image();
      img.src = l.campaign;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug, hoverSlug]);

  if (!modalidade) return <Navigate to="/atelie/modalidades" replace />;

  // Background cinematográfico por modalidade (usa imagem da própria modalidade como fallback)
  const heroBg = MODALIDADE_BG[modalidade.slug] ?? (modalidade.slug === "ciclismo" ? ciclismoBg : modalidade.img);
  const cardsBg = MODALIDADE_BG[modalidade.slug];

  return (
    <div className="w-full text-white atelie-page-fade-in" style={{ backgroundColor: "#050505" }}>
      <style>{`
        @keyframes atelie-page-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .atelie-page-fade-in { animation: atelie-page-fade-in 700ms ease-out both; }
        @media (prefers-reduced-motion: reduce) { .atelie-page-fade-in { animation: none !important; } }
      `}</style>
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/atelie/modalidades"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Modalidades
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            {modalidade.nome.toUpperCase()}
          </span>
          <span className="w-16" />
        </div>
      </header>

      {/* Removido: hero + faixa — abre direto nas linhas */}

      {/* 3. PRODUTOS */}
      <section
        id="modalidade-linhas"
        className="relative w-full py-16 md:py-20 overflow-hidden min-h-screen flex items-center"
        style={{ backgroundColor: "#000" }}
      >
        {modalidade.slug === "triathlon" && (
          <>
            <img
              src={triathlonCinematic}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover triathlon-linhas-zoom"
              style={{
                objectPosition: "center 38%",
                filter: "contrast(1.06) saturate(0.92) brightness(0.9)",
              }}
            />
            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "rgba(0,0,0,0.62)" }} />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 28%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 8% 48%, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0.05) 14%, rgba(212,175,55,0) 32%)",
                mixBlendMode: "screen",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{ height: "22%", background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)" }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{ height: "30%", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 100%)" }}
            />
            <style>{`
              @keyframes triathlon-linhas-zoom {
                0% { transform: scale(1); }
                100% { transform: scale(1.02); }
              }
              .triathlon-linhas-zoom {
                animation: triathlon-linhas-zoom 28s ease-in-out infinite alternate;
                will-change: transform;
              }
              @media (prefers-reduced-motion: reduce) {
                .triathlon-linhas-zoom { animation: none !important; }
              }
            `}</style>
          </>
        )}
        {modalidade.slug !== "triathlon" && cardsBg && (
          <>
            <img
              src={cardsBg}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: "center center",
                filter: "contrast(1.05) saturate(1.0) brightness(0.9)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{ height: "22%", background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)" }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{ height: "28%", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 100%)" }}
            />
          </>
        )}
        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10 md:mb-14 atelie-linhas-fade">
            <p
              className="text-[10px] uppercase mb-5"
              style={{ color: "rgba(212,175,55,0.7)", letterSpacing: "0.7em" }}
            >
              {modalidade.slug === "triathlon"
                ? "Endurance Collection"
                : modalidade.slug === "fisiculturismo"
                ? "Sculpture Collection"
                : "Assinaturas"}
            </p>
            <h2
              className="font-display font-extralight"
              style={{
                fontSize: "clamp(30px, 3.4vw, 52px)",
                letterSpacing: "0.14em",
                color: "#f4ead0",
                textTransform: "uppercase",
              }}
            >
              {modalidade.slug === "triathlon"
                ? "O Ateliê Triatlo"
                : modalidade.slug === "fisiculturismo"
                ? "Explore outras interpretações da disciplina."
                : `As linhas de ${modalidade.nome.toLowerCase()}`}
            </h2>
            {modalidade.slug === "fisiculturismo" && (
              <p
                className="mx-auto mt-6 italic font-light max-w-xl"
                style={{
                  fontFamily: '"Fraunces",serif',
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "14px",
                  letterSpacing: "0.02em",
                }}
              >
                Cada criação representa uma estética distinta da alta performance.
              </p>
            )}
            <div
              className="mx-auto mt-8 h-px"
              style={{
                width: "64px",
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.85), transparent)",
              }}
            />
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 ${linhas.length >= 3 ? "lg:grid-cols-3" : ""} gap-6 md:gap-8 ${linhas.length === 2 ? "max-w-2xl mx-auto" : "max-w-5xl mx-auto"} justify-items-center items-stretch`}>
            {linhas.map((l, idx) => {
              const isFisi = true;
              return (
              <div
                key={l.slug}
                className="atelie-linha-card group flex flex-col items-center text-center w-full max-w-[220px] h-full"
                style={{
                  position: "relative",
                  padding: "12px 12px 16px",
                  background: isFisi
                    ? "linear-gradient(180deg, #f4d77a 0%, #d4af37 55%, #b8902a 100%)"
                    : "linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(5,5,5,0.62) 100%)",
                  backdropFilter: isFisi ? undefined : "blur(14px) saturate(1.05)",
                  WebkitBackdropFilter: isFisi ? undefined : "blur(14px) saturate(1.05)",
                  border: isFisi
                    ? "1px solid rgba(0,0,0,0.55)"
                    : "1px solid rgba(212,175,55,0.18)",
                  boxShadow: isFisi
                    ? "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.35)"
                    : "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
                  animation: `atelie-card-rise 900ms cubic-bezier(0.22,1,0.36,1) ${idx * 120}ms both`,
                  transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 700ms ease, border-color 700ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  if (!isFisi) {
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.30)";
                    e.currentTarget.style.boxShadow =
                      "0 28px 64px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.05)";
                  } else {
                    e.currentTarget.style.boxShadow =
                      "0 32px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.45)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  if (!isFisi) {
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)";
                    e.currentTarget.style.boxShadow =
                      "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)";
                  } else {
                    e.currentTarget.style.boxShadow =
                      "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.35)";
                  }
                }}
              >
                <div
                  className="relative w-full aspect-[4/5] overflow-hidden mb-4 flex items-center justify-center"
                  style={{
                    background: isFisi
                      ? "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.12) 100%)"
                      : l.cardFit === "contain"
                      ? "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.14) 0%, #050505 70%)"
                      : "radial-gradient(ellipse at 50% 55%, rgba(212,175,55,0.10) 0%, transparent 65%)",
                    border: isFisi ? "1px solid rgba(0,0,0,0.25)" : undefined,
                  }}
                >
                  <img
                    src={CARD_IMAGE_OVERRIDE[modalidade.slug]?.[l.slug] ?? l.imagens.ouro}
                    alt={l.nome}
                    loading="lazy"
                    decoding="async"
                    className={`${l.cardFit === "contain" ? "max-w-full max-h-full object-contain" : "w-full h-full object-cover"} transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]`}
                    style={{ filter: "contrast(1.04) saturate(1.02) brightness(1.01)" }}
                  />
                  {!isFisi && (
                    <>
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-700 group-hover:opacity-70"
                        style={{
                          background:
                            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(244,215,122,0.10) 0%, transparent 70%)",
                          mixBlendMode: "screen",
                        }}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 100%)",
                        }}
                      />
                    </>
                  )}
                </div>
                <h3
                  className={`font-display ${isFisi ? "font-bold" : "font-extralight"}`}
                  style={{
                    fontSize: "clamp(18px, 1.4vw, 22px)",
                    letterSpacing: "0.34em",
                    color: isFisi ? "#0a0a0a" : "#f4ead0",
                    textTransform: "uppercase",
                  }}
                >
                  {l.nome}
                </h3>
                <p
                  className="mt-2 italic font-light"
                  style={{
                    fontFamily: '"Fraunces",serif',
                    color: isFisi ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.55)",
                    fontSize: "12.5px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {l.assinatura}
                </p>
                <button
                  type="button"
                  onClick={() => navigate(`/atelie/linha/${l.slug}`)}
                  className="mt-auto pt-4 inline-flex items-center gap-3 transition-all duration-700"
                  style={{
                    padding: "11px 24px",
                    color: isFisi ? "#0a0a0a" : "#d4af37",
                    border: isFisi
                      ? "1px solid rgba(0,0,0,0.7)"
                      : "1px solid rgba(212,175,55,0.45)",
                    background: "transparent",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9.5px",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    if (isFisi) {
                      e.currentTarget.style.background = "#0a0a0a";
                      e.currentTarget.style.color = "#d4af37";
                      e.currentTarget.style.boxShadow = "0 0 24px rgba(0,0,0,0.45)";
                    } else {
                      e.currentTarget.style.background = "#d4af37";
                      e.currentTarget.style.color = "#0a0a0a";
                      e.currentTarget.style.boxShadow = "0 0 30px rgba(212,175,55,0.32)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = isFisi ? "#0a0a0a" : "#d4af37";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="h-px w-4" style={{ background: "currentColor" }} />
                  Explorar linha
                  <span className="h-px w-4" style={{ background: "currentColor" }} />
                </button>
              </div>
              );
            })}
          </div>
        </div>
        <style>{`
          @keyframes atelie-card-rise {
            0% { opacity: 0; transform: translateY(28px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes atelie-linhas-fade {
            0% { opacity: 0; transform: translateY(14px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .atelie-linhas-fade { animation: atelie-linhas-fade 1100ms cubic-bezier(0.22,1,0.36,1) both; }
          @media (prefers-reduced-motion: reduce) {
            .atelie-linha-card, .atelie-linhas-fade { animation: none !important; }
          }
        `}</style>
      </section>

      {/* Removido: storytelling, autoridade e CTA final — apenas a seção de cards permanece */}

      <style>{`
        @keyframes modalidade-hero-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.04); }
        }
        .modalidade-hero-zoom {
          animation: modalidade-hero-zoom 10s ease-in-out infinite alternate;
        }
        @keyframes modalidade-fade-in {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .modalidade-fade-in {
          animation: modalidade-fade-in 1.2s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>
    </div>
  );
};

export default AtelieModalidade;
