import { useState, useEffect } from "react";
import modelLeft from "@/assets/model-left-new.png";
import testimonialThais from "@/assets/testimonial-thais.png";
import testimonialCarin from "@/assets/testimonial-carin.jpg";
import testimonialNew1 from "@/assets/testimonial-new-1.png";
import testimonialNew2 from "@/assets/testimonial-new-2.png";
import testimonialNew3 from "@/assets/testimonial-new-3.png";
import testimonialNew4 from "@/assets/testimonial-new-4.png";
import testimonialNew5 from "@/assets/testimonial-new-5.png";
import { useLanguage } from "@/context/LanguageContext";

export const Testimonials = () => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);

  const list = [
    { quote: t("testimonial.1.quote"), name: "Cinthia", city: "Florianópolis, SC", sport: t("testimonial.1.sport"), img: modelLeft, fit: "cover" },
    { quote: t("testimonial.2.quote"), name: "Thais", city: "Florianópolis, SC", sport: t("testimonial.2.sport"), img: testimonialThais, fit: "cover" },
    { quote: t("testimonial.3.quote"), name: "Carin", city: "Florianópolis, SC", sport: t("testimonial.3.sport"), img: testimonialCarin, fit: "contain" },
    { quote: t("testimonial.4.quote"), name: "Elizandra", city: "Florianópolis, SC", sport: t("testimonial.4.sport"), img: testimonialNew1, fit: "contain" },
    { quote: t("testimonial.5.quote"), name: "Catiucia", city: "Florianópolis, SC", sport: t("testimonial.5.sport"), img: testimonialNew2, fit: "contain" },
    { quote: t("testimonial.6.quote"), name: "Juliana", city: "Florianópolis, SC", sport: t("testimonial.6.sport"), img: testimonialNew3, fit: "contain" },
    { quote: t("testimonial.7.quote"), name: "Mariana", city: "Florianópolis, SC", sport: t("testimonial.7.sport"), img: testimonialNew4, fit: "contain" },
    { quote: t("testimonial.8.quote"), name: "Aline", city: "Florianópolis, SC", sport: t("testimonial.8.sport"), img: testimonialNew5, fit: "contain" },
  ];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % list.length); setFade(true); }, 280);
    }, 5200);
    return () => clearInterval(id);
  }, [paused, list.length]);

  const go = (i: number) => { setFade(false); setTimeout(() => { setIdx(i); setFade(true); }, 280); };
  const testimonialItem = list[idx];

  return (
    <section id="depoimentos" className="testi-section" style={{ background: "#fff", padding: "96px 0" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="testi-wrap">
          <style>{`@media(max-width:768px){.testi-wrap{grid-template-columns:1fr!important;gap:40px!important;} .testi-photo{display:none!important;}}`}</style>

          {/* Photo */}
          <div className="testi-photo" style={{ position: "relative" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", transition: "opacity 0.3s", opacity: fade ? 1 : 0, background: testimonialItem.fit === "contain" ? "#F9F8F6" : "transparent" }}>
              <img src={testimonialItem.img} alt={testimonialItem.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: testimonialItem.fit === "contain" ? "contain" : "cover", objectPosition: testimonialItem.fit === "contain" ? "center" : "center 15%" }} />
            </div>
            <div style={{ position: "absolute", bottom: 24, right: -20, background: "#fff", borderRadius: 14, padding: "14px 20px", boxShadow: "0 8px 32px rgba(28,24,20,0.12)", border: "1px solid rgba(28,24,20,0.07)" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 400, color: "#C9A220", lineHeight: 1 }}>★★★★★</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500, color: "#6B5E52", marginTop: 4 }}>{t("testimonials.athlete")}</div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A220", marginBottom: 24 }}>
              {t("testimonials.badge")}
            </p>
            <div style={{ transition: "opacity 0.3s", opacity: fade ? 1 : 0 }}>
              <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,2.5vw,2.2rem)", fontWeight: 400, fontStyle: "italic", color: "#1C1814", lineHeight: 1.35, marginBottom: 28 }}>
                "{testimonialItem.quote}"
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: testimonialItem.fit === "contain" ? "#F9F8F6" : "transparent" }}>
                  <img src={testimonialItem.img} alt={testimonialItem.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: testimonialItem.fit === "contain" ? "center" : "center 10%" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: "#1C1814" }}>{testimonialItem.name}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 400, color: "#6B5E52" }}>{testimonialItem.city} · {testimonialItem.sport}</div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
              {list.map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  style={{ width: i === idx ? 28 : 8, height: 8, borderRadius: 100, background: i === idx ? "#C9A220" : "rgba(28,24,20,0.12)", border: "none", cursor: "pointer", transition: "all 0.4s", padding: 0 }}
                />
              ))}
            </div>

            <a href="https://www.instagram.com/3rfitnessjr" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: "#C9A220", display: "inline-flex", alignItems: "center", gap: 6, borderBottom: "1.5px solid rgba(201,162,32,0.30)", paddingBottom: 4 }}
            >
              {t("testimonials.more")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
