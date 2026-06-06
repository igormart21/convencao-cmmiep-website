import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * Página de teste — 4 variações sofisticadas para o botão "Criar minha joia".
 * Acesse em /teste-botoes
 */
const TesteBotoes = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="text-center space-y-3">
          <p className="text-[10px] uppercase tracking-[0.5em] text-accent/80">
            Comparativo
          </p>
          <h1 className="font-display text-3xl md:text-4xl tracking-[0.2em] uppercase text-foreground">
            Estilos do botão
          </h1>
          <p className="text-sm text-muted-foreground">
            Escolha o que mais combina com a marca.
          </p>
        </header>

        {/* Opção 1 — Dourado luxuoso com brilho */}
        <Card label="Opção 1 — Dourado Luxuoso">
          <Link
            to="/catalogo"
            className="group relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #B8860B 0%, #D4AF37 35%, #F4D77A 50%, #D4AF37 65%, #B8860B 100%)",
              backgroundSize: "200% 200%",
              boxShadow:
                "0 10px 40px -10px rgba(212,175,55,0.6), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.3)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles className="h-4 w-4 text-black/80 relative z-10" strokeWidth={1.5} />
            <span className="relative z-10 font-display text-sm tracking-[0.35em] uppercase text-black/90">
              Criar minha joia
            </span>
          </Link>
        </Card>

        {/* Opção 2 — Outline minimalista com cantos */}
        <Card label="Opção 2 — Outline Minimalista">
          <Link
            to="/catalogo"
            className="group relative inline-flex items-center gap-4 px-12 py-5 transition-all duration-500 hover:bg-accent/5"
          >
            <span className="absolute -top-[2px] -left-[2px] h-3 w-3 border-t border-l border-accent transition-all duration-500 group-hover:h-4 group-hover:w-4" />
            <span className="absolute -top-[2px] -right-[2px] h-3 w-3 border-t border-r border-accent transition-all duration-500 group-hover:h-4 group-hover:w-4" />
            <span className="absolute -bottom-[2px] -left-[2px] h-3 w-3 border-b border-l border-accent transition-all duration-500 group-hover:h-4 group-hover:w-4" />
            <span className="absolute -bottom-[2px] -right-[2px] h-3 w-3 border-b border-r border-accent transition-all duration-500 group-hover:h-4 group-hover:w-4" />
            <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <span className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <span className="font-display text-sm tracking-[0.4em] uppercase text-accent">
              Criar minha joia
            </span>
            <ArrowRight className="h-4 w-4 text-accent transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </Card>

        {/* Opção 3 — Preto fosco premium com detalhe ouro */}
        <Card label="Opção 3 — Preto Fosco Premium">
          <Link
            to="/catalogo"
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-black border border-accent/40 hover:border-accent transition-all duration-500"
            style={{
              boxShadow:
                "0 20px 50px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(212,175,55,0.15)",
            }}
          >
            <span className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-accent to-transparent" />
            <span className="absolute bottom-0 right-0 h-px w-1/3 bg-gradient-to-l from-accent to-transparent" />
            <span className="font-display text-sm tracking-[0.4em] uppercase text-accent group-hover:text-accent/100 transition-colors">
              Criar minha joia
            </span>
            <span className="h-4 w-px bg-accent/40 group-hover:bg-accent transition-colors" />
            <ArrowRight className="h-4 w-4 text-accent transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </Card>

        {/* Opção 4 — Gradiente metálico animado */}
        <Card label="Opção 4 — Metálico Animado">
          <Link
            to="/catalogo"
            className="group relative inline-flex items-center gap-3 px-12 py-5 overflow-hidden border border-accent/60"
            style={{
              background:
                "linear-gradient(110deg, #1a1a1a 0%, #2a2418 30%, #4a3a1a 50%, #2a2418 70%, #1a1a1a 100%)",
              backgroundSize: "300% 100%",
              animation: "shimmer 4s linear infinite",
            }}
          >
            <style>{`
              @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}</style>
            <Sparkles className="h-4 w-4 text-accent relative z-10" strokeWidth={1.5} />
            <span className="relative z-10 font-display text-sm tracking-[0.4em] uppercase text-accent">
              Criar minha joia
            </span>
            <span className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
          </Link>
        </Card>

        <footer className="text-center pt-8 border-t border-accent/20">
          <p className="text-sm text-muted-foreground">
            Me diga: <span className="text-accent">Opção 1, 2, 3 ou 4</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

const Card = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <p className="text-[10px] uppercase tracking-[0.4em] text-accent/70">{label}</p>
    <div className="flex items-center justify-center bg-card/30 border border-accent/10 py-16 px-6">
      {children}
    </div>
  </div>
);

export default TesteBotoes;
