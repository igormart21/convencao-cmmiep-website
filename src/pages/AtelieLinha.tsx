import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { getVariantId } from "@/lib/shopifyVariants";
import { ArrowLeft } from "lucide-react";
import { LINHAS, MODALIDADES, type Material, type Forma } from "@/data/atelie";
import SelecaoPanel from "@/components/atelie/SelecaoPanel";
import { useLanguage } from "@/context/LanguageContext";
import vigorMasculino from "@/assets/linha-vigor-masculino.jpg";
import vigorMasculinoPrata from "@/assets/linha-vigor-masculino-prata.jpg";
import veloxRoyaleOuroMasc from "@/assets/linha-velox-royale-ouro-masculino.jpg";
import veloxRoyaleOuroFem from "@/assets/linha-velox-royale-ouro-feminino.jpg";
import veloxRoyalePrataMasc from "@/assets/linha-velox-royale-prata-masculino.jpg";
import veloxRoyalePrataFem from "@/assets/linha-velox-royale-prata-feminino.jpg";
import aeronPrataMasc from "@/assets/linha-aeron-prata-masculino.jpg";
import aeronPrataFem from "@/assets/aeron-atleta-fem-prata.jpg";
import strataOuro from "@/assets/linha-strata-ouro.jpg";
import strataPrata from "@/assets/linha-strata-prata.jpg";
import imperiumOuro from "@/assets/linha-imperium-ouro.jpg";
import imperiumPrata from "@/assets/linha-imperium-prata.jpg";
import ciclismoBg from "@/assets/atelie-ciclismo-bg.jpg";
import pingenteValenzaOuro from "@/assets/pingente-valenza-ouro.png";
import pingenteValenzaPrata from "@/assets/pingente-valenza-prata.png";
import pingenteDominusOuro from "@/assets/pingente-dominus-ouro.png";
import pingenteDominusPrata from "@/assets/pingente-dominus-prata.png";
import pingenteMonarchOuro from "@/assets/pingente-monarch-ouro.png";
import pingenteMonarchPrata from "@/assets/pingente-monarch-prata.png";

const FLOATING_PENDANTS: Record<string, { ouro: string; prata: string }> = {
  valenza: { ouro: pingenteValenzaOuro, prata: pingenteValenzaPrata },
  dominus: { ouro: pingenteDominusOuro, prata: pingenteDominusPrata },
  monarch: { ouro: pingenteMonarchOuro, prata: pingenteMonarchPrata },
};
// Mapa de slug da linha → handle do produto Shopify (importado pelo Storefront API).

const AtelieLinha = () => {
  const { t } = useLanguage();
  const { slug } = useParams();
  const linha = slug ? LINHAS[slug] : undefined;

  const [material, setMaterial] = useState<Material>("ouro");
  const [forma, setForma] = useState<Forma>("masculino");
  const [revealKey, setRevealKey] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setRevealKey((k) => k + 1);
  }, [material, forma, slug]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!linha) return;
    Object.values(linha.imagens).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    const parent = MODALIDADES.find((m) => m.linhas.includes(linha.slug));
    if (parent) {
      import("@/stores/modalidadeStore").then(({ useModalidadeStore }) =>
        useModalidadeStore.getState().setModalidade(parent.slug),
      );
    }
  }, [linha]);

  if (!linha) return <Navigate to="/atelie/modalidades" replace />;

  const parentModalidade = MODALIDADES.find((m) =>
    m.linhas.includes(linha.slug),
  );
  const noFormaLines = new Set(["valenza", "dominus", "monarch", "ritmo"]);
  const showFormaSelector =
    linha.slug !== "halter" &&
    !noFormaLines.has(linha.slug) &&
    (parentModalidade?.slug !== "crossfit" || linha.slug === "imperium");
  const hideLeftImage = linha.slug === "imperium";

  const variantId = getVariantId(
    linha.slug,
    material,
    showFormaSelector ? forma : undefined,
    parentModalidade?.slug,
  );
  const variantDisponivel = !!variantId;

  const handleSelecionar = () => {
    setPanelOpen(true);
  };

  const imgSrc =
    linha.slug === "imperium" && material === "ouro"
      ? imperiumOuro
      : linha.slug === "imperium" && material === "prata"
      ? imperiumPrata
      : linha.slug === "strata" && material === "ouro"
      ? strataOuro
      : linha.slug === "strata" && material === "prata"
      ? strataPrata
      : linha.slug === "vigor" && forma === "masculino" && material === "ouro"
      ? vigorMasculino
      : linha.slug === "vigor" && forma === "masculino" && material === "prata"
      ? vigorMasculinoPrata
      : linha.slug === "velox" && forma === "masculino" && material === "ouro"
      ? veloxRoyaleOuroMasc
      : linha.slug === "velox" && forma === "feminino" && material === "ouro"
      ? veloxRoyaleOuroFem
      : linha.slug === "velox" && forma === "masculino" && material === "prata"
      ? veloxRoyalePrataMasc
      : linha.slug === "velox" && forma === "feminino" && material === "prata"
      ? veloxRoyalePrataFem
      : linha.slug === "cadencia" && forma === "masculino" && material === "prata"
      ? aeronPrataMasc
      : linha.slug === "cadencia" && forma === "feminino" && material === "prata"
      ? aeronPrataFem
      : linha.imagens[material];
  const lightTone =
    material === "ouro"
      ? "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(244,200,90,0.22) 0%, transparent 70%)"
      : "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(200,215,235,0.16) 0%, transparent 70%)";

  const isCiclismo = parentModalidade?.slug === "ciclismo";
  const hasEditorial = !!linha.editorial;
  const hasCinematic = !!linha.cinematic;

  return (
    <div
      className="relative min-h-screen w-full text-white overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {isCiclismo && !hasEditorial && (
        <>
          <img
            src={ciclismoBg}
            alt=""
            aria-hidden
            className="fixed inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              zIndex: 0,
              filter: "contrast(1.08) saturate(1.05)",
              animation: "ciclismo-bg-zoom 12s ease-in-out infinite alternate",
              objectPosition: "50% 50%",
            }}
          />
          <div
            aria-hidden
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 0,
              background:
                "linear-gradient(180deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.75) 50%, rgba(5,5,5,0.92) 100%), radial-gradient(ellipse at 70% 50%, rgba(212,175,55,0.08) 0%, transparent 60%)",
            }}
          />
          <style>{`
            @keyframes ciclismo-bg-zoom {
              0% { transform: scale(1.0); }
              100% { transform: scale(1.05); }
            }
          `}</style>
        </>
      )}
      {hasEditorial && linha.editorial && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 pointer-events-none grid grid-cols-2"
            style={{ zIndex: 0 }}
          >
            {/* Lado feminino: stack OURO/PRATA com crossfade */}
            <div className="relative h-full w-full overflow-hidden">
              {[
                { src: linha.editorial.feminino.ouro, active: material === "ouro" },
                { src: linha.editorial.feminino.prata, active: material === "prata" },
              ].map((layer, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${layer.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 38%",
                    filter:
                      material === "ouro"
                        ? "contrast(1.06) saturate(1.02) brightness(0.98)"
                        : "contrast(1.1) saturate(0.92) brightness(0.96)",
                    opacity: layer.active ? 1 : 0,
                    transition: "opacity 550ms ease-in-out, filter 600ms ease",
                  }}
                />
              ))}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 70% at 55% 55%, transparent 35%, rgba(0,0,0,0.65) 100%)",
                }}
              />
            </div>
            {/* Lado masculino: stack OURO/PRATA com crossfade */}
            <div className="relative h-full w-full overflow-hidden">
              {[
                { src: linha.editorial.masculino.ouro, active: material === "ouro" },
                { src: linha.editorial.masculino.prata, active: material === "prata" },
              ].map((layer, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${layer.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 38%",
                    filter:
                      material === "ouro"
                        ? "contrast(1.06) saturate(1.02) brightness(0.98)"
                        : "contrast(1.1) saturate(0.92) brightness(0.96)",
                    opacity: layer.active ? 1 : 0,
                    transition: "opacity 550ms ease-in-out, filter 600ms ease",
                  }}
                />
              ))}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 70% at 45% 55%, transparent 35%, rgba(0,0,0,0.65) 100%)",
                }}
              />
            </div>
          </div>
          {/* Center seam gradient */}
          <div
            aria-hidden
            className="fixed inset-y-0 pointer-events-none"
            style={{
              zIndex: 0,
              left: "30%",
              right: "30%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 50%, transparent 100%)",
            }}
          />
          {/* Atmosfera global — quente para ouro, fria sutil para prata */}
          <div
            aria-hidden
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 0,
              background:
                material === "ouro"
                  ? "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%), radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 70%)"
                  : "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%), radial-gradient(ellipse 60% 50% at 50% 50%, rgba(170,200,230,0.06) 0%, transparent 70%)",
              transition: "background 600ms ease-in-out",
            }}
          />
        </>
      )}

      {hasCinematic && linha.cinematic && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
          >
            {(() => {
              const set = (linha.cinematic && (forma === "feminino" ? linha.cinematic.feminino : linha.cinematic.masculino)) || { ouro: linha.cinematic!.ouro, prata: linha.cinematic!.prata };
              return [
                { src: set.ouro, active: material === "ouro", key: `${forma}-ouro` },
                { src: set.prata, active: material === "prata", key: `${forma}-prata` },
              ];
            })().map((layer) => (
              <div
                key={layer.key}
                className="absolute inset-0 cinematic-breathing"
                style={{
                  backgroundImage: `url(${layer.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "78% 38%",
                  opacity: layer.active ? 1 : 0,
                  transform: `scale(${layer.active ? 1.05 : 1.12}) translate3d(${parallax.x * -8}px, ${parallax.y * -8}px, 0)`,
                  filter:
                    material === "ouro"
                      ? "contrast(1.12) saturate(1.08) brightness(0.95)"
                      : "contrast(1.15) saturate(0.85) brightness(0.92) hue-rotate(-6deg)",
                  transition:
                    "opacity 750ms cubic-bezier(0.4,0,0.2,1), transform 1200ms cubic-bezier(0.22,1,0.36,1), filter 800ms ease",
                }}
              />
            ))}
            {/* vinheta cinematográfica — escurece bordas, preserva centro do pingente */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 60% at 78% 42%, transparent 30%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)",
              }}
            />
            {/* overlay atmosfera — densidade fora do foco */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  material === "ouro"
                    ? "linear-gradient(180deg, rgba(20,10,0,0.35) 0%, rgba(0,0,0,0.5) 100%)"
                    : "linear-gradient(180deg, rgba(0,5,15,0.45) 0%, rgba(0,0,0,0.6) 100%)",
                transition: "background 700ms ease-in-out",
              }}
            />
            {/* partículas */}
            <div className="absolute inset-0 cinematic-particles" />
          </div>
          <style>{`
            @keyframes cinematic-breathing {
              0%, 100% { background-position: 50% 38%; }
              50% { background-position: 50% 41%; }
            }
            .cinematic-breathing { animation: cinematic-breathing 14s ease-in-out infinite; }
            @keyframes pendant-glow-pulse {
              0%, 100% { opacity: 0.85; }
              50% { opacity: 1; }
            }
            .pendant-glow { animation: pendant-glow-pulse 4s ease-in-out infinite; }
            .cinematic-particles {
              background-image:
                radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.5), transparent 60%),
                radial-gradient(1px 1px at 78% 34%, rgba(255,255,255,0.35), transparent 60%),
                radial-gradient(1.5px 1.5px at 28% 68%, rgba(255,255,255,0.4), transparent 60%),
                radial-gradient(1px 1px at 62% 80%, rgba(255,255,255,0.3), transparent 60%),
                radial-gradient(1px 1px at 88% 18%, rgba(255,255,255,0.4), transparent 60%),
                radial-gradient(1.5px 1.5px at 42% 14%, rgba(255,255,255,0.35), transparent 60%);
              animation: cinematic-particles-drift 22s linear infinite;
              opacity: 0.55;
            }
            @keyframes cinematic-particles-drift {
              0% { transform: translateY(0) translateX(0); }
              100% { transform: translateY(-30px) translateX(10px); }
            }
            @media (max-width: 768px) {
              .cinematic-breathing { background-position: 50% 48% !important; background-size: cover; }
              .pendant-spotlight, .pendant-glow { background-position: 50% 55% !important; }
            }
            @media (prefers-reduced-motion: reduce) {
              .cinematic-breathing, .pendant-glow, .cinematic-particles { animation: none !important; }
            }
          `}</style>
        </>
      )}

      {slug && FLOATING_PENDANTS[slug] && (
        <>
          <div
            aria-hidden
            className="hidden md:block fixed pointer-events-none floating-pendant-wrap"
            style={{
              right: "4vw",
              top: "50%",
              transform: "translateY(-50%)",
              width: "min(34vw, 460px)",
              height: "min(82vh, 760px)",
              zIndex: 5,
            }}
          >
            {(["ouro", "prata"] as const).map((m) => (
              <img
                key={m}
                src={FLOATING_PENDANTS[slug][m]}
                alt=""
                className="absolute inset-0 w-full h-full floating-pendant-img"
                style={{
                  objectFit: "contain",
                  opacity: material === m ? 1 : 0,
                  transition:
                    "opacity 900ms cubic-bezier(0.4,0,0.2,1), filter 700ms ease",
                  filter:
                    m === "ouro"
                      ? "drop-shadow(0 30px 60px rgba(0,0,0,0.65)) drop-shadow(0 0 28px rgba(212,175,55,0.28)) drop-shadow(0 0 60px rgba(212,175,55,0.12))"
                      : "drop-shadow(0 30px 60px rgba(0,0,0,0.65)) drop-shadow(0 0 28px rgba(220,225,235,0.28)) drop-shadow(0 0 60px rgba(200,210,225,0.12))",
                  transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -10}px, 0)`,
                  willChange: "transform, opacity",
                }}
              />
            ))}
          </div>
          {/* Mobile: pendant menor, ancorado canto inferior direito */}
          <div
            aria-hidden
            className="md:hidden fixed pointer-events-none floating-pendant-wrap"
            style={{
              right: "3vw",
              bottom: "14vh",
              width: "44vw",
              height: "52vh",
              zIndex: 5,
            }}
          >
            {(["ouro", "prata"] as const).map((m) => (
              <img
                key={m}
                src={FLOATING_PENDANTS[slug][m]}
                alt=""
                className="absolute inset-0 w-full h-full floating-pendant-img"
                style={{
                  objectFit: "contain",
                  opacity: material === m ? 1 : 0,
                  transition: "opacity 900ms cubic-bezier(0.4,0,0.2,1)",
                  filter:
                    m === "ouro"
                      ? "drop-shadow(0 18px 36px rgba(0,0,0,0.6)) drop-shadow(0 0 22px rgba(212,175,55,0.25))"
                      : "drop-shadow(0 18px 36px rgba(0,0,0,0.6)) drop-shadow(0 0 22px rgba(220,225,235,0.25))",
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes floating-pendant-breathe {
              0%, 100% { transform: translateY(0) rotate(-0.4deg); }
              50%      { transform: translateY(-10px) rotate(0.4deg); }
            }
            .floating-pendant-img {
              animation: floating-pendant-breathe 7s ease-in-out infinite;
            }
            .floating-pendant-wrap:hover .floating-pendant-img,
            .floating-pendant-wrap:focus-within .floating-pendant-img {
              transform: scale(1.04);
            }
            @media (prefers-reduced-motion: reduce) {
              .floating-pendant-img { animation: none !important; }
            }
          `}</style>
        </>
      )}


      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to={
              parentModalidade
                ? `/atelie/modalidade/${parentModalidade.slug}`
                : "/atelie/modalidades"
            }
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {parentModalidade ? t("sport." + parentModalidade.slug) : t("atelie.modalidades.back")}
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            {t("line." + linha.slug + ".nome")}
          </span>
          <span className="w-16" />
        </div>
      </header>

      <main className="relative z-10 w-full min-h-screen pt-20 md:pt-24 pb-8">
        <div className={`container mx-auto max-w-6xl px-6 ${hasCinematic ? "flex justify-start items-center min-h-[calc(100vh-140px)]" : (hasEditorial || hideLeftImage ? `flex justify-center items-center min-h-[calc(100vh-140px)]` : "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center")}`}>
          {/* ESQUERDA — imagem (omitida no Velox Royale ciclismo: o fundo split é o produto) */}
          {!hasEditorial && !hasCinematic && !hideLeftImage && (
            <section className="lg:col-span-6 relative">
            <div
              className="relative w-full overflow-hidden mx-auto group"
              style={{
                aspectRatio: linha.slug === "strata" || linha.slug === "imperium" ? "1536 / 1024" : "1122 / 946",
                maxHeight: "calc(100vh - 140px)",
                background:
                  "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
                border: "1px solid rgba(212,175,55,0.18)",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08) inset",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-80"
                style={{ background: lightTone }}
              />
              <img
                key={revealKey}
                src={imgSrc}
                alt={`${linha.nome} — ${material === "ouro" ? "Ouro 18K" : "Prata 925"}`}
                className={`absolute inset-0 w-full h-full ${linha.slug === "strata" || linha.slug === "imperium" ? "object-cover" : "object-contain"} reveal-piece will-change-transform`}
                style={{
                  filter:
                    material === "ouro"
                      ? "saturate(1.05) contrast(1.04) brightness(1.02)"
                      : "saturate(0.92) contrast(1.05) brightness(1) hue-rotate(-2deg)",
                  transformOrigin: "50% 42%",
                  transition:
                    "transform 600ms cubic-bezier(0.22,1,0.36,1), filter 600ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.filter =
                    material === "ouro"
                      ? "saturate(1.1) contrast(1.08) brightness(1.05)"
                      : "saturate(0.95) contrast(1.08) brightness(1.03) hue-rotate(-2deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.filter =
                    material === "ouro"
                      ? "saturate(1.05) contrast(1.04) brightness(1.02)"
                      : "saturate(0.92) contrast(1.05) brightness(1) hue-rotate(-2deg)";
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)",
                }}
              />
            </div>
            </section>
          )}

          {/* DIREITA — interface */}
          <section className={hasEditorial || hasCinematic || hideLeftImage ? "w-full max-w-md lg:max-w-[560px]" : "lg:col-span-6"}>
            <div
              className={`max-w-md mx-auto lg:mx-0 ${hasCinematic ? "p-6 md:p-7" : ""}`}
              style={hasCinematic ? {
                background: "linear-gradient(180deg, rgba(15,15,18,0.45) 0%, rgba(5,5,8,0.6) 100%)",
                backdropFilter: "blur(20px) saturate(1.1)",
                WebkitBackdropFilter: "blur(20px) saturate(1.1)",
                border: "1px solid rgba(212,175,55,0.22)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05)",
                transition: "border-color 700ms ease, box-shadow 700ms ease",
              } : undefined}
            >
              <p
                className="text-[10px] uppercase tracking-[0.5em] mb-3"
                style={{ color: "rgba(212,175,55,0.75)" }}
              >
                {t("atelie.linha.step_badge")}
              </p>
              <h1
                className="font-display font-light leading-none"
                style={{
                  fontSize: "clamp(34px, 4vw, 52px)",
                  letterSpacing: "0.04em",
                  color: "#f4ead0",
                }}
              >
                {t("line." + linha.slug + ".nome")}
              </h1>
              <p
                className="mt-3 italic font-light"
                style={{
                  fontFamily: '"Fraunces","Cormorant Garamond",serif',
                  color: "rgba(244,215,122,0.9)",
                  fontSize: "14px",
                  letterSpacing: "0.06em",
                }}
              >
                {t("line." + linha.slug + ".assinatura")}
              </p>

              <div
                className="my-5 h-px w-20"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.7), transparent)",
                }}
              />

              <p
                className="font-light leading-relaxed italic"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "14.5px",
                  fontFamily: '"Fraunces",serif',
                }}
              >
                {t("line." + linha.slug + ".frase")}
              </p>

              <div className="mt-7 space-y-6">
                <Selector
                  label={t("atelie.linha.material")}
                  options={[
                    { value: "ouro", label: t("atelie.linha.material.ouro") },
                    { value: "prata", label: t("atelie.linha.material.prata") },
                  ]}
                  value={material}
                  onChange={(v) => setMaterial(v as Material)}
                />
                {showFormaSelector && (
                  <Selector
                    label={t("atelie.linha.gender")}
                    options={[
                      { value: "masculino", label: t("atelie.linha.gender.masc") },
                      { value: "feminino", label: t("atelie.linha.gender.fem") },
                    ]}
                    value={forma}
                    onChange={(v) => setForma(v as Forma)}
                  />
                )}
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleSelecionar}
                  className="group relative inline-flex items-center justify-center gap-3 px-9 py-3.5 transition-all duration-500"
                  style={{
                    color: "#d4af37",
                    border: "1px solid rgba(212,175,55,0.55)",
                    background: "transparent",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#d4af37";
                    e.currentTarget.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#d4af37";
                  }}
                >
                  <span className="h-px w-5" style={{ background: "currentColor" }} />
                  {variantDisponivel ? t("atelie.linha.btn.select") : t("atelie.linha.btn.coming_soon")}
                  <span className="h-px w-5" style={{ background: "currentColor" }} />
                </button>
              </div>

            </div>
          </section>
        </div>
      </main>

      <style>{`
        @keyframes reveal-piece {
          0% { opacity: 0; transform: scale(0.985); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1.02); filter: blur(0); }
        }
        .reveal-piece { animation: reveal-piece 0.4s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <SelecaoPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        variantId={variantId}
        linhaNome={t("line." + linha.slug + ".nome")}
        modalidadeNome={parentModalidade ? t("sport." + parentModalidade.slug) : undefined}
        modalidadeSlug={parentModalidade?.slug}
        material={material}
        imagem={imgSrc}
      />
    </div>
  );
};

const Selector = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div>
      <p
        className="text-[10px] uppercase tracking-[0.45em] mb-4"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className="transition-all duration-500"
              style={{
                padding: "10px 22px",
                fontFamily: "Inter, sans-serif",
                fontSize: "10.5px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: active ? "#0a0a0a" : "rgba(244,215,122,0.85)",
                background: active ? "#d4af37" : "transparent",
                border: active
                  ? "1px solid #d4af37"
                  : "1px solid rgba(212,175,55,0.32)",
                boxShadow: active
                  ? "0 0 24px rgba(212,175,55,0.35)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor =
                    "rgba(212,175,55,0.7)";
                  e.currentTarget.style.color = "#f4d77a";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor =
                    "rgba(212,175,55,0.32)";
                  e.currentTarget.style.color =
                    "rgba(244,215,122,0.85)";
                }
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AtelieLinha;
