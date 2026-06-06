import { Link } from "react-router-dom";
import bg from "@/assets/atelie-cta-bg.png";

export const CinematicTransition = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "62vh", backgroundColor: "#0a0908", marginTop: "-1px", marginBottom: "-1px" }}
      aria-label="Explorar coleções"
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 20%", transform: "scale(1.05)", filter: "contrast(1.02) saturate(1.02) brightness(1.06)" }}
      />
      {/* Fade topo + base + vinheta atmosférica — luz cinematográfica natural */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #0a0908 0%, rgba(10,9,8,0.28) 18%, rgba(0,0,0,0.04) 45%, rgba(10,9,8,0.30) 82%, #0a0908 100%), radial-gradient(ellipse 75% 65% at 55% 45%, rgba(244,215,122,0.11) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(244,215,122,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-12 sm:bottom-10 z-10">
        <Link
          to="/atelie/modalidades"
          aria-label="Entrar no Ateliê"
          style={{
            display: "inline-block",
            padding: "13px 30px",
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            color: "rgba(230,201,119,0.92)",
            border: "1px solid rgba(217,189,114,0.42)",
            background: "rgba(0,0,0,0.12)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            textDecoration: "none",
            transition: "background-color 900ms cubic-bezier(0.22,1,0.36,1), color 900ms cubic-bezier(0.22,1,0.36,1), border-color 900ms cubic-bezier(0.22,1,0.36,1), letter-spacing 900ms cubic-bezier(0.22,1,0.36,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(217,189,114,0.10)";
            e.currentTarget.style.color = "#f7dfa1";
            e.currentTarget.style.borderColor = "rgba(217,189,114,0.66)";
            e.currentTarget.style.letterSpacing = "0.40em";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.12)";
            e.currentTarget.style.color = "rgba(230,201,119,0.92)";
            e.currentTarget.style.borderColor = "rgba(217,189,114,0.42)";
            e.currentTarget.style.letterSpacing = "0.36em";
          }}
        >
          Entrar no Ateliê
        </Link>
      </div>
    </section>
  );
};

export default CinematicTransition;
