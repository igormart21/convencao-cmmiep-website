import brandVideo from "@/assets/brand-video.mp4";
import { useLanguage } from "@/context/LanguageContext";


export const BrandStory = () => {
  const { t } = useLanguage();

  const stats = [
    { n: "+300", l: t("story.metric.pieces") },
    { n: "+50",    l: t("story.metric.events") },
    { n: "100%",   l: t("story.metric.customized") },
  ];

  return (
    <section className="brand-section" style={{ background: "#F8F5F0", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="brand-grid">
        <style>{`@media(max-width:768px){.brand-grid{grid-template-columns:1fr!important;}}`}</style>

        {/* Video */}
        <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(28,24,20,0.14)" }}>
          <video
            loop
            playsInline
            controls
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          >
            <source src={brandVideo} type="video/mp4" />
          </video>
          <div style={{ position: "absolute", inset: 0, borderRadius: 24, border: "1px solid rgba(201,162,32,0.20)", pointerEvents: "none" }} />
        </div>

        {/* Text */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,162,32,0.10)", border: "1px solid rgba(201,162,32,0.30)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A220", display: "block" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A220" }}>
              {t("story.badge")}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, color: "#1C1814", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20 }}>
            {t("story.title.1")}<br />
            <em style={{ color: "#C9A220" }}>{t("story.title.italic")}</em>
          </h2>

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(28,24,20,0.60)", lineHeight: 1.8, marginBottom: 16 }}>
            {t("story.desc.1")}
          </p>

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(28,24,20,0.60)", lineHeight: 1.8, marginBottom: 40 }}>
            {t("story.desc.2")}
          </p>

          <div style={{ display: "flex", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
            {stats.map(({ n, l }) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "#C9A220", lineHeight: 1, marginBottom: 4 }}>{n}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 500, color: "rgba(28,24,20,0.40)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;
