import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

type Props = { to?: string; label?: string; size?: "md" | "lg" };

export const GoldCTA = ({ to = "/catalogo", label = "Criar minha joia", size = "md" }: Props) => {
  const padding = size === "lg" ? "px-12 sm:px-16 py-5 sm:py-6" : "px-8 sm:px-12 py-4 sm:py-5";
  const fontSize = size === "lg" ? "text-sm sm:text-base" : "text-xs sm:text-sm";
  return (
    <>
      <style>{`
        @keyframes goldcta-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes goldcta-shine { 0% { transform: translateX(-150%) skewX(-20deg); } 60%, 100% { transform: translateX(250%) skewX(-20deg); } }
      `}</style>
      <Link
        to={to}
        translate="no"
        aria-label={label}
        className={`group notranslate relative inline-flex items-center gap-3 ${padding} overflow-hidden border border-black/40 transition-all duration-500 hover:-translate-y-0.5 whitespace-nowrap`}
        style={{
          background:
            "linear-gradient(110deg, rgba(184,134,11,0.95) 0%, rgba(212,175,55,0.95) 25%, rgba(244,215,122,0.95) 50%, rgba(212,175,55,0.95) 75%, rgba(184,134,11,0.95) 100%)",
          backgroundSize: "300% 100%",
          animation: "goldcta-shimmer 4s linear infinite",
          boxShadow: "0 14px 40px rgba(0,0,0,0.55), 0 0 30px rgba(212,175,55,0.35)",
        }}
      >
        <span
          className="pointer-events-none absolute top-0 left-0 h-full w-1/3"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
            animation: "goldcta-shine 3.5s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        />
        <Sparkles className="h-4 w-4 text-black relative z-10 shrink-0" strokeWidth={1.5} />
        <span className={`notranslate relative z-10 font-display ${fontSize} tracking-[0.4em] uppercase text-black`}>
          {label}
        </span>
      </Link>
    </>
  );
};

export default GoldCTA;
