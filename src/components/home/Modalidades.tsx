import { Link } from "react-router-dom";
import sportFisiculturismo from "@/assets/sport-fisiculturismo.jpg";
import sportMusculacao from "@/assets/sport-musculacao.jpg";
import sportTriathlon from "@/assets/sport-triathlon.jpg";
import sportCiclismo from "@/assets/sport-ciclismo.jpg";
import sportCrossfit from "@/assets/hero-crossfit.png";
import sportCorrida from "@/assets/sport-corrida.jpg";

const mods = [
  { id: 1, nome: "Fisiculturismo", sport: "Fisiculturismo", img: sportFisiculturismo, focal: "center 22%", aspect: "3/4" },
  { id: 2, nome: "Musculação", sport: "Musculação", img: sportMusculacao, focal: "center 20%", aspect: "3/4" },
  { id: 6, nome: "Corrida", sport: "Corrida", img: sportCorrida, focal: "center 25%", aspect: "3/4" },
  { id: 4, nome: "Ciclismo", sport: "Ciclismo", img: sportCiclismo, focal: "center 30%", aspect: "3/4" },
  { id: 5, nome: "Crossfit", sport: "Crossfit", img: sportCrossfit, focal: "center 30%", aspect: "3/4" },
  { id: 3, nome: "Triatlo", sport: "Triatlo", img: sportTriathlon, focal: "center 24%", aspect: "3/4" },
];

export const Modalidades = () => (
  <section id="modalidades" className="sec" style={{ background: "#fff", padding: "96px 0" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A220", marginBottom: 10 }}>
          MODALIDADES
        </p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, color: "#1C1814", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          Joias para o <em>seu esporte</em>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "#6B5E52", marginTop: 10, lineHeight: 1.6, maxWidth: "50ch", margin: "10px auto 0" }}>
          Cada modalidade tem linha própria com design exclusivo.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="mods-grid">
        <style>{`@media(max-width:640px){.mods-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
        {mods.map(({ id, nome, sport, img, focal, aspect }) => (
          <Link
            key={id}
            to={`/colecao?sport=${encodeURIComponent(sport)}`}
            style={{ display: "block", position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: aspect }}
            className="mod-card"
          >
            <style>{`
              .mod-card img { transition: transform 1.4s cubic-bezier(0.22,1,0.36,1); }
              .mod-card:hover img { transform: scale(1.06); }
              .mod-card .mod-btn { transform: translateY(6px); opacity:0; transition: all 0.35s; }
              .mod-card:hover .mod-btn { transform: translateY(0); opacity:1; }
            `}</style>
            <img src={img} alt={nome} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: focal }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(28,24,20,0) 30%, rgba(28,24,20,0.88) 100%)" }} />
            <div style={{ position: "absolute", inset: "auto 0 0", padding: "20px" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 400, color: "#F8F5F0", marginBottom: 8 }}>{nome}</div>
              <div className="mod-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(201,162,32,0.20)", border: "1px solid rgba(232,200,74,0.50)", borderRadius: 100, padding: "6px 14px" }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "#E8C84A", letterSpacing: "0.2em", textTransform: "uppercase" }}>Ver joias</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Modalidades;
