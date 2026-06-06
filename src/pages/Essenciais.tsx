import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { buildContinuarPath } from "@/lib/continuar";

const Essenciais = () => {
  return (
    <div className="relative min-h-screen w-full text-white" style={{ backgroundColor: "#050505" }}>
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to={buildContinuarPath()}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            ESSENCIAIS
          </span>
          <span className="w-16" />
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <p
            className="text-[10px] uppercase tracking-[0.55em] mb-8"
            style={{ color: "rgba(212,175,55,0.85)" }}
          >
            Coleção essencial
          </p>
          <h1
            className="font-display font-light leading-[0.95]"
            style={{
              fontSize: "clamp(44px, 6vw, 88px)",
              letterSpacing: "0.04em",
              color: "#f4ead0",
            }}
          >
            Além da modalidade.
          </h1>
          <p
            className="mt-8 italic font-light max-w-lg mx-auto"
            style={{
              fontFamily: '"Fraunces",serif',
              color: "rgba(255,255,255,0.7)",
              fontSize: "18px",
              letterSpacing: "0.02em",
            }}
          >
            Colares, anéis e brincos. Peças essenciais para qualquer trajetória.
          </p>

          <div
            className="my-14 mx-auto h-px w-24"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)" }}
          />

          <p
            className="text-[11px] uppercase tracking-[0.45em]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Coleção essencial em desenvolvimento
          </p>
          <p
            className="mt-4 italic font-light"
            style={{
              fontFamily: '"Fraunces",serif',
              color: "rgba(255,255,255,0.5)",
              fontSize: "15px",
            }}
          >
            Novas peças serão reveladas em breve.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Essenciais;
