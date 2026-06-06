import { useEffect, useRef, useState } from "react";

type Props = {
  /** Pequena etiqueta acima — ex: "Capítulo 02" */
  eyebrow?: string;
  /** Frase editorial principal */
  phrase: string;
  /** Variante visual: padrão escuro com ouro */
  tone?: "dark" | "darker";
};

/**
 * Ponte cinematográfica entre seções da home.
 * - Une visualmente seções com gradientes que se fundem
 * - Frase editorial premium revelada com fade + shimmer dourado ao entrar na viewport
 * - Linha vertical pulsando sugere continuidade (estilo campanha de alta joalheria)
 */
export const EditorialBridge = ({ eyebrow, phrase, tone = "dark" }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const baseColor = tone === "darker" ? "#070605" : "#0a0908";

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative w-full overflow-hidden"
      style={{
        // Gradiente que sai da cor da seção anterior, passa por uma ténue luz dourada e entra na próxima
        background: `linear-gradient(180deg, ${baseColor} 0%, #131110 50%, ${baseColor} 100%)`,
        paddingTop: "clamp(48px, 6vw, 96px)",
        paddingBottom: "clamp(48px, 6vw, 96px)",
        marginTop: "-1px",
        marginBottom: "-1px",
      }}
    >
      {/* Halo dourado central, atmosférico */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(244,215,122,0.08) 0%, transparent 70%)",
        }}
      />

      <style>{`
        @keyframes bridge-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bridge-pulse-line {
          0%, 100% { transform: scaleY(0.35); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        .bridge-fade {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 1400ms cubic-bezier(0.22,1,0.36,1), transform 1400ms cubic-bezier(0.22,1,0.36,1);
        }
        .bridge-fade.is-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="relative container mx-auto max-w-3xl px-6 flex flex-col items-center text-center">
        {/* Linha vertical fina pulsando — continuidade cinematográfica */}
        <span
          aria-hidden
          style={{
            display: "block",
            width: "1px",
            height: "44px",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(244,215,122,0.85) 50%, transparent 100%)",
            transformOrigin: "center",
            animation: "bridge-pulse-line 2.6s ease-in-out infinite",
          }}
        />

        {eyebrow && (
          <span
            className={`bridge-fade mt-7 text-[10px] sm:text-[11px] uppercase font-light ${visible ? "is-in" : ""}`}
            style={{
              letterSpacing: "0.55em",
              paddingLeft: "0.55em",
              color: "rgba(244,215,122,0.6)",
              transitionDelay: "120ms",
            }}
          >
            {eyebrow}
          </span>
        )}

        <p
          className={`bridge-fade mt-4 italic font-light ${visible ? "is-in" : ""}`}
          style={{
            fontFamily: '"Fraunces","Cormorant Garamond",serif',
            fontSize: "clamp(20px, 2.4vw, 34px)",
            lineHeight: 1.35,
            letterSpacing: "0.02em",
            background:
              "linear-gradient(90deg, rgba(244,215,122,0.35) 0%, rgba(244,215,122,0.95) 50%, rgba(244,215,122,0.35) 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "bridge-shimmer 7s ease-in-out infinite",
            transitionDelay: "260ms",
          }}
        >
          {phrase}
        </p>

        <span
          aria-hidden
          className={`bridge-fade mt-7 ${visible ? "is-in" : ""}`}
          style={{
            display: "block",
            width: "64px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(244,215,122,0.85), transparent)",
            transitionDelay: "400ms",
          }}
        />
      </div>
    </section>
  );
};

export default EditorialBridge;
