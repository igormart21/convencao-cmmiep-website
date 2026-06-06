import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  normalizeModalidade,
  useModalidadeStore,
  type ModalidadeSlug,
} from "@/stores/modalidadeStore";
import {
  buildAtelieModalidadePath,
  buildPersonalizarPath,
} from "@/lib/continuar";

import musculacaoBg from "@/assets/musculacao-hero-bg.png";
import corridaBg from "@/assets/corrida-hero-bg.png";
import ciclismoBg from "@/assets/ciclismo-hero-bg.png";
import crossfitBg from "@/assets/crossfit-hero-bg.png";
import triathlonBg from "@/assets/triathlon-hero-bg.png";
import fisiBg from "@/assets/fisiculturismo-hero-bg.png";

type ModalidadeKey = ModalidadeSlug | "geral";

type Atmosfera = {
  nome: string;
  fraseHero: string;
  bg?: string;
  overlay: string;
  glow: string;
  accent: string;
};

const ATMOSFERAS: Record<ModalidadeKey, Atmosfera> = {
  musculacao: {
    nome: "Musculação",
    fraseHero: "Força também é identidade.",
    bg: musculacaoBg,
    overlay:
      "linear-gradient(180deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.7) 50%, rgba(5,5,5,0.95) 100%)",
    glow: "radial-gradient(ellipse at 70% 50%, rgba(212,175,55,0.18) 0%, transparent 60%)",
    accent: "#d4af37",
  },
  corrida: {
    nome: "Corrida",
    fraseHero: "O movimento deixa marcas.",
    bg: corridaBg,
    overlay:
      "linear-gradient(180deg, rgba(8,10,14,0.78) 0%, rgba(8,10,14,0.55) 45%, rgba(5,5,5,0.92) 100%)",
    glow: "radial-gradient(ellipse at 30% 40%, rgba(230,220,200,0.10) 0%, transparent 55%)",
    accent: "#d4af37",
  },
  ciclismo: {
    nome: "Ciclismo",
    fraseHero: "Precisão construída em quilômetros.",
    bg: ciclismoBg,
    overlay:
      "linear-gradient(180deg, rgba(5,8,12,0.82) 0%, rgba(5,8,12,0.65) 50%, rgba(5,5,5,0.92) 100%)",
    glow: "radial-gradient(ellipse at 60% 45%, rgba(180,200,230,0.10) 0%, transparent 55%)",
    accent: "#d4af37",
  },
  crossfit: {
    nome: "Crossfit",
    fraseHero: "Intensidade também é assinatura.",
    bg: crossfitBg,
    overlay:
      "linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.96) 100%)",
    glow: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 60%)",
    accent: "#d4af37",
  },
  triathlon: {
    nome: "Triatlo",
    fraseHero: "Três forças. Uma identidade.",
    bg: triathlonBg,
    overlay:
      "linear-gradient(180deg, rgba(5,10,16,0.82) 0%, rgba(5,10,16,0.6) 50%, rgba(5,5,5,0.94) 100%)",
    glow: "radial-gradient(ellipse at 50% 40%, rgba(140,180,210,0.12) 0%, transparent 60%)",
    accent: "#d4af37",
  },
  fisiculturismo: {
    nome: "Fisiculturismo",
    fraseHero: "O corpo como obra. A joia como assinatura.",
    bg: fisiBg,
    overlay:
      "linear-gradient(180deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.68) 50%, rgba(0,0,0,0.96) 100%)",
    glow: "radial-gradient(ellipse at 40% 50%, rgba(212,175,55,0.20) 0%, transparent 55%)",
    accent: "#d4af37",
  },
  geral: {
    nome: "3R",
    fraseHero: "Continue construindo sua coleção.",
    overlay: "linear-gradient(180deg, #050505 0%, #0a0a0a 100%)",
    glow: "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.14) 0%, transparent 60%)",
    accent: "#d4af37",
  },
};

const MODALIDADE_OPTIONS: { slug: ModalidadeSlug; nome: string }[] = [
  { slug: "musculacao", nome: "Musculação" },
  { slug: "corrida", nome: "Corrida" },
  { slug: "ciclismo", nome: "Ciclismo" },
  { slug: "crossfit", nome: "Crossfit" },
  { slug: "triathlon", nome: "Triatlo" },
  { slug: "fisiculturismo", nome: "Fisiculturismo" },
];

const Continuar = () => {
  const { modalidade } = useParams();
  const navigate = useNavigate();
  const setModalidade = useModalidadeStore((s) => s.setModalidade);

  const isGeral = modalidade === "geral";
  const norm = useMemo(
    () => (isGeral ? null : normalizeModalidade(modalidade)),
    [modalidade, isGeral],
  );

  // Rota inválida → fallback elegante
  if (modalidade && !isGeral && !norm) {
    return <Navigate to="/continuar/geral" replace />;
  }

  const key: ModalidadeKey = norm ?? "geral";
  const atmosfera = ATMOSFERAS[key];

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [modalidade]);

  const targetPersonalizar = buildPersonalizarPath(key);
  const targetLinhas = buildAtelieModalidadePath(key);

  const handleSwitchModalidade = (s: ModalidadeSlug) => {
    setModalidade(s);
    setOpenModal(false);
    navigate(`/continuar/${s}`);
  };

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden" style={{ backgroundColor: "#050505" }}>
      {/* Background atmosférico */}
      {atmosfera.bg && (
        <img
          src={atmosfera.bg}
          alt=""
          aria-hidden
          className="fixed inset-0 w-full h-full object-cover pointer-events-none"
          style={{ zIndex: 0, filter: "contrast(1.08) saturate(1.05)" }}
        />
      )}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, background: atmosfera.overlay }}
      />
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, background: atmosfera.glow }}
      />

      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Início
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            CONTINUAR · {atmosfera.nome.toUpperCase()}
          </span>
          <span className="w-16" />
        </div>
      </header>

      {/* Conteúdo */}
      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Hero compacto — não obriga rolar */}
        <section className="pt-28 md:pt-32 pb-10 px-6 text-center">
          <p
            className="text-[10px] uppercase tracking-[0.55em] mb-5 continuar-fade"
            style={{ color: "rgba(212,175,55,0.85)" }}
          >
            Sua jornada continua
          </p>
          <h1
            className="font-display font-light leading-[0.95] continuar-fade"
            style={{
              fontSize: "clamp(34px, 4.5vw, 64px)",
              letterSpacing: "0.04em",
              color: "#f4ead0",
            }}
          >
            {atmosfera.fraseHero}
          </h1>
        </section>

        {/* 3 universos */}
        <section className="flex-1 px-6 pb-20">
          <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Bloco 1 — Criar minha joia */}
            <BlocoUniverso
              eyebrow="01 · Autoral"
              titulo="Criar minha joia"
              subtitulo="Desenvolva uma peça autoral inspirada na sua disciplina, história e modalidade."
              cta="Iniciar criação"
              onClick={() => navigate(targetPersonalizar)}
              priority
            />
            {/* Bloco 2 — Peças neutras */}
            <BlocoUniverso
              eyebrow="02 · Essenciais"
              titulo="Peças neutras"
              subtitulo="Explore anéis, brincos e colares desenvolvidos para compor sua presença fora do treino."
              cta="Explorar peças"
              onClick={() => navigate("/essenciais")}
            />
            {/* Bloco 3 — Completar minha coleção */}
            <BlocoUniverso
              eyebrow="03 · Coleção"
              titulo="Completar minha coleção"
              subtitulo="Combine sua peça principal com outros símbolos do mesmo universo esportivo."
              cta="Ver recomendações"
              onClick={() => navigate(targetLinhas)}
            />
          </div>

          {/* Ateliê Home + trocar universo */}
          <div className="mt-14 flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/atelie")}
              className="inline-flex items-center gap-3 px-8 py-3 transition-all duration-500"
              style={{
                color: "#d4af37",
                border: "1px solid rgba(212,175,55,0.45)",
                background: "transparent",
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
              <span className="h-px w-5" style={{ background: "currentColor" }} />
              Ateliê Home
              <span className="h-px w-5" style={{ background: "currentColor" }} />
            </button>
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="text-[10px] uppercase tracking-[0.45em] transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d4af37")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              Explorar outro universo
            </button>
          </div>
        </section>
      </main>

      {/* Modal trocar modalidade */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-lg border-[hsl(43,30%,20%)] bg-[hsl(0,0%,5%)] text-white p-0 overflow-hidden [&>button]:hidden">
          <div className="px-8 pt-8 pb-6 border-b border-[hsl(43,30%,15%)] flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] mb-2" style={{ color: "rgba(212,175,55,0.85)" }}>
                Universos
              </p>
              <DialogTitle className="font-display text-2xl font-light tracking-wide" style={{ color: "#f4ead0" }}>
                Escolha sua modalidade
              </DialogTitle>
            </div>
            <button
              onClick={() => setOpenModal(false)}
              className="h-8 w-8 flex items-center justify-center text-white/60 hover:text-[#d4af37] transition-colors"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </div>
          <div className="p-4">
            {MODALIDADE_OPTIONS.map((m) => (
              <button
                key={m.slug}
                onClick={() => handleSwitchModalidade(m.slug)}
                className="w-full text-left px-4 py-4 transition-colors flex items-center justify-between border-b border-[hsl(43,30%,10%)] last:border-b-0 hover:bg-[hsl(43,30%,8%)]"
              >
                <span
                  className="font-display text-base font-light tracking-[0.18em] uppercase"
                  style={{ color: "#f4ead0" }}
                >
                  {m.nome}
                </span>
                <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.7)" }}>
                  Entrar
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes continuar-fade {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .continuar-fade { animation: continuar-fade 1s cubic-bezier(0.22,1,0.36,1) both; }
        .continuar-bloco {
          animation: continuar-fade 1.1s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>
    </div>
  );
};

const BlocoUniverso = ({
  eyebrow,
  titulo,
  subtitulo,
  cta,
  onClick,
  priority,
}: {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  cta: string;
  onClick: () => void;
  priority?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="continuar-bloco group relative text-left flex flex-col justify-between p-8 md:p-10 min-h-[360px] md:min-h-[420px] transition-all duration-700"
      style={{
        background: priority
          ? "linear-gradient(180deg, rgba(212,175,55,0.07) 0%, rgba(0,0,0,0.4) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.4) 100%)",
        border: priority
          ? "1px solid rgba(212,175,55,0.4)"
          : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(6px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.7)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = priority
          ? "rgba(212,175,55,0.4)"
          : "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "";
      }}
    >
      <div>
        <p
          className="text-[9px] uppercase tracking-[0.5em] mb-6"
          style={{ color: "rgba(212,175,55,0.85)" }}
        >
          {eyebrow}
        </p>
        <h3
          className="font-display font-light leading-tight"
          style={{
            fontSize: "clamp(24px, 2.2vw, 34px)",
            letterSpacing: "0.04em",
            color: "#f4ead0",
          }}
        >
          {titulo}
        </h3>
        <p
          className="mt-4 italic font-light"
          style={{
            fontFamily: '"Fraunces",serif',
            color: "rgba(255,255,255,0.7)",
            fontSize: "15px",
          }}
        >
          {subtitulo}
        </p>
      </div>
      <div className="mt-10 inline-flex items-center gap-3">
        <span className="h-px w-6" style={{ background: "#d4af37" }} />
        <span
          className="text-[10px] uppercase font-light transition-colors duration-500 group-hover:text-[#f4d77a]"
          style={{
            color: "#d4af37",
            letterSpacing: "0.42em",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {cta}
        </span>
      </div>
    </button>
  );
};

export default Continuar;
