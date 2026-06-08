import heroCapa from "@/assets/hero-capa-3r.png";
import heroVideo from "@/assets/hero-video.mp4";
import { useLanguage } from "@/context/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section style={{ position: "relative", minHeight: "100svh", background: "#1C1814", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Background video */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          style={{
            position: "absolute",
            top: 0, left: "50%",
            transform: "translateX(-50%) translateY(-40%)",
            width: "100%", height: "180%",
            objectFit: "cover", objectPosition: "center top",
          }}
        >
          <source src={heroVideo} type="video/mp4" />
          <img src={heroCapa} alt="" fetchPriority="high" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </video>
      </div>

      {/* Overlay — keeps content readable */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(28,24,20,0.52)" }} />

      {/* Bottom vignette */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(28,24,20,0.65) 100%)" }} />

      {/* Warm gold accent */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 30% 60%, rgba(201,162,32,0.08) 0%, transparent 70%)" }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, flex: 1,
        maxWidth: 1280, margin: "0 auto", width: "100%",
        padding: "clamp(80px,10vh,110px) 24px clamp(40px,6vh,80px)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center",
      }}>
        <div style={{ maxWidth: 680 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,162,32,0.15)", border: "1px solid rgba(201,162,32,0.35)", borderRadius: 100, padding: "6px 14px", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A220", display: "block" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#E8C84A" }}>
              {t("hero.badge")}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#F8F5F0",
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}>
            {t("hero.headline.1")}
            <em style={{ color: "#E8C84A" }}>{t("hero.headline.italic")}</em>
            <br />
            {t("hero.headline.2")}
          </h1>

          {/* Sub */}
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 300, lineHeight: 1.7, color: "rgba(248,245,240,0.60)", maxWidth: "44ch", margin: "0 auto" }}>
            {t("hero.sub")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
