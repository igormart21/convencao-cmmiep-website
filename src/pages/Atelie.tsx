import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Atelie = () => {
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen-safe w-full text-white relative overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("nav.home")}
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            {t("nav.atelier3r")}
          </span>
          <span className="w-16" />
        </div>
      </header>

      {/* Ambient light */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(212,175,55,0.10) 0%, transparent 70%)",
        }}
      />

      <main className="relative w-full min-h-screen-safe flex items-center justify-center px-6 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-[10px] uppercase tracking-[0.6em] mb-8"
            style={{ color: "rgba(212,175,55,0.75)" }}
          >
            {t("atelie.welcome.badge")}
          </p>
          <h1
            className="font-display font-light leading-[1.05]"
            style={{
              fontSize: "clamp(48px, 7vw, 92px)",
              letterSpacing: "0.04em",
              background: "linear-gradient(180deg, #f4ead0 0%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("atelie.welcome.title1")}
            <br />
            {t("atelie.welcome.title2")}
          </h1>

          <div
            className="mx-auto my-10 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
            }}
          />

          <p
            className="font-light italic max-w-xl mx-auto"
            style={{
              fontFamily: '"Fraunces","Cormorant Garamond",serif',
              color: "rgba(255,255,255,0.78)",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
            }}
          >
            {t("atelie.welcome.desc")}
          </p>

          <div className="mt-16">
            <Link
              to="/atelie/modalidades"
              className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 transition-all duration-500"
              style={{
                color: "#d4af37",
                border: "1px solid rgba(212,175,55,0.55)",
                background: "transparent",
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d4af37";
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(212,175,55,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#d4af37";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="h-px w-6"
                style={{ background: "currentColor" }}
              />
              {t("atelie.welcome.enter")}
              <span
                className="h-px w-6"
                style={{ background: "currentColor" }}
              />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Atelie;
