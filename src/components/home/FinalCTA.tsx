import atelieBg from "@/assets/atelie-cta-bg.png";


export const FinalCTA = () => (
  <section className="final-cta" style={{ position: "relative", overflow: "hidden", padding: "120px 0" }}>
    <img src={atelieBg} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", filter: "brightness(0.30) saturate(0.9)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(28,24,20,0.85) 0%, rgba(28,24,20,0.55) 100%)" }} />

    <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,162,32,0.15)", border: "1px solid rgba(201,162,32,0.35)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A220", display: "block" }} />
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#E8C84A" }}>Pronto para começar?</span>
      </div>

      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 400, color: "#F8F5F0", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 18 }}>
        Crie agora a sua <em style={{ color: "#E8C84A" }}>joia única</em>
      </h2>

      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 300, color: "rgba(248,245,240,0.60)", lineHeight: 1.7, marginBottom: 40, maxWidth: "42ch", margin: "0 auto 40px" }}>
        Atendimento personalizado pelo WhatsApp. Joias entregues para todo o Brasil com embalagem premium.
      </p>


      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 20 }}>
        {["Entrega nacional", "Ouro 18k e Prata", "+1.000 atletas"].map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#C9A220" }}>✓</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 400, color: "rgba(248,245,240,0.45)" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FinalCTA;
