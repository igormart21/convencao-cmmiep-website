import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    { n: "01", icon: "🏆", title: t("how.step1.title"), desc: t("how.step1.desc") },
    { n: "02", icon: "✦", title: t("how.step2.title"), desc: t("how.step2.desc") },
    { n: "03", icon: "📦", title: t("how.step3.title"), desc: t("how.step3.desc") },
  ];

  return (
    <section className="sec" style={{ background: "#F8F5F0", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A220", marginBottom: 10 }}>
            {t("how.badge")}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, color: "#1C1814", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            {t("how.title.1")}<em>{t("how.title.italic")}</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 48 }} className="steps-grid">
          <style>{`@media(max-width:768px){.steps-grid{grid-template-columns:1fr!important;}}`}</style>
          {steps.map(({ n, icon, title, desc }, i) => (
            <div
              key={i}
              style={{
                background: "#fff", borderRadius: 20, padding: "36px 32px",
                border: "1px solid rgba(28,24,20,0.07)",
                boxShadow: "0 2px 16px rgba(28,24,20,0.05)",
                position: "relative", transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 36px rgba(28,24,20,0.10)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 2px 16px rgba(28,24,20,0.05)"; }}
            >
              <div style={{ position: "absolute", top: 20, right: 24, fontFamily: "'Playfair Display',serif", fontSize: "2.8rem", fontWeight: 400, color: "rgba(201,162,32,0.12)", lineHeight: 1, letterSpacing: "-0.04em" }}>{n}</div>
              <div style={{ fontSize: 28, marginBottom: 20 }}>{icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "#1C1814", marginBottom: 12 }}>{title}</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 300, color: "#6B5E52", lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="cta-strip" style={{ background: "#1C1814", borderRadius: 20, padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="cta-strip-title" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 400, color: "#F8F5F0", marginBottom: 6 }}>{t("how.cta.title")}</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(248,245,240,0.50)" }}>{t("how.cta.desc")}</div>
          </div>
          <Link
              to="/atelie/modalidades"
              style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid rgba(248,245,240,0.20)", color: "rgba(248,245,240,0.70)", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 500, padding: "13px 24px", borderRadius: 12 }}
            >
              {t("how.cta.btn")}
            </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
