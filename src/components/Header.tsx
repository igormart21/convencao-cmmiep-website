import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/3r-logo.png";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

export const FlagIcon = ({ lang }: { lang: string }) => {
  switch (lang) {
    case "pt":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" style={{ borderRadius: "50%", display: "block" }}>
          <rect width="24" height="24" fill="#009c3b" />
          <polygon points="12,3 21,12 12,21 3,12" fill="#ffdf00" />
          <circle cx="12" cy="12" r="4.5" fill="#002776" />
          <path d="M7.8,12 C9.5,10.2 14.5,10.2 16.2,12" stroke="#ffffff" strokeWidth="0.8" fill="none" />
        </svg>
      );
    case "en":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" style={{ borderRadius: "50%", display: "block" }}>
          <rect width="24" height="24" fill="#ffffff" />
          <rect width="24" height="1.8" y="0" fill="#B31942" />
          <rect width="24" height="1.8" y="3.6" fill="#B31942" />
          <rect width="24" height="1.8" y="7.2" fill="#B31942" />
          <rect width="24" height="1.8" y="10.8" fill="#B31942" />
          <rect width="24" height="1.8" y="14.4" fill="#B31942" />
          <rect width="24" height="1.8" y="18" fill="#B31942" />
          <rect width="24" height="1.8" y="21.6" fill="#B31942" />
          <rect width="11" height="12.6" fill="#0A3161" />
          <circle cx="2" cy="2" r="0.6" fill="#fff" />
          <circle cx="5" cy="2" r="0.6" fill="#fff" />
          <circle cx="8" cy="2" r="0.6" fill="#fff" />
          <circle cx="3.5" cy="4" r="0.6" fill="#fff" />
          <circle cx="6.5" cy="4" r="0.6" fill="#fff" />
          <circle cx="2" cy="6" r="0.6" fill="#fff" />
          <circle cx="5" cy="6" r="0.6" fill="#fff" />
          <circle cx="8" cy="6" r="0.6" fill="#fff" />
          <circle cx="3.5" cy="8" r="0.6" fill="#fff" />
          <circle cx="6.5" cy="8" r="0.6" fill="#fff" />
          <circle cx="2" cy="10" r="0.6" fill="#fff" />
          <circle cx="5" cy="10" r="0.6" fill="#fff" />
          <circle cx="8" cy="10" r="0.6" fill="#fff" />
        </svg>
      );
    case "es":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" style={{ borderRadius: "50%", display: "block" }}>
          <rect width="24" height="6" fill="#C60B1E" />
          <rect width="24" height="12" y="6" fill="#FBE122" />
          <rect width="24" height="6" y="18" fill="#C60B1E" />
          <circle cx="6" cy="12" r="2" fill="#C60B1E" />
          <circle cx="6" cy="12" r="1" fill="#FBE122" />
        </svg>
      );
    case "it":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" style={{ borderRadius: "50%", display: "block" }}>
          <rect width="8" height="24" fill="#009246" />
          <rect width="8" height="24" x="8" fill="#F1F2F1" />
          <rect width="8" height="24" x="16" fill="#CE2B37" />
        </svg>
      );
    case "fr":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" style={{ borderRadius: "50%", display: "block" }}>
          <rect width="8" height="24" fill="#002395" />
          <rect width="8" height="24" x="8" fill="#FFFFFF" />
          <rect width="8" height="24" x="16" fill="#ED2939" />
        </svg>
      );
    default:
      return null;
  }
};

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const totalItems = useCartStore(s => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart   = useCartUIStore(s => s.openCart);

  const NAV = [
    { to: "/colecao", label: t("nav.collections") },
    { to: "/atelie", label: t("nav.atelier") }
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header style={{
        position: "sticky",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        height: 100,
        background: scrolled ? "rgba(28,24,20,0.72)" : "#1C1814",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: "1px solid rgba(248,245,240,0.06)",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link to="/" style={{ flexShrink: 0 }}>
            <img src={logo} alt="3R Fitness" style={{ height: 130, width: "auto", objectFit: "contain" }} />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden-mobile">
            <style>{`.hidden-mobile { display:flex; } @media(max-width:768px){.hidden-mobile{display:none!important;}}`}</style>
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(248,245,240,0.80)",
                  transition: "color 0.25s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8C84A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(248,245,240,0.80)")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            
            {/* Language Selector Desktop */}
            <div ref={dropdownRef} style={{ position: "relative" }} className="hidden-mobile">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                aria-label="Idioma"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  height: 42,
                  padding: "0 12px",
                  borderRadius: 10,
                  border: "1.5px solid rgba(248,245,240,0.15)",
                  background: "none",
                  cursor: "pointer",
                  color: "#F8F5F0",
                  transition: "border-color 0.25s, color 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A220"; }}
                onMouseLeave={e => { if (!showLangDropdown) e.currentTarget.style.borderColor = "rgba(248,245,240,0.15)"; }}
              >
                <FlagIcon lang={language} />
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {language === "pt" ? "PT-BR" : language}
                </span>
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: showLangDropdown ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showLangDropdown && (
                <div style={{
                  position: "absolute",
                  top: 50,
                  right: 0,
                  background: "#1C1814",
                  border: "1px solid rgba(201,162,32,0.25)",
                  borderRadius: 10,
                  padding: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minWidth: 130,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
                  zIndex: 100
                }}>
                  {(["pt", "en", "es", "it", "fr"] as Language[]).map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLangDropdown(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        borderRadius: 6,
                        background: language === lang ? "rgba(201,162,32,0.15)" : "transparent",
                        border: "none",
                        color: language === lang ? "#E8C84A" : "rgba(248,245,240,0.8)",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left",
                        fontSize: 12,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: language === lang ? 600 : 400,
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(248,245,240,0.06)";
                        e.currentTarget.style.color = "#E8C84A";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = language === lang ? "rgba(201,162,32,0.15)" : "transparent";
                        e.currentTarget.style.color = language === lang ? "#E8C84A" : "rgba(248,245,240,0.8)";
                      }}
                    >
                      <FlagIcon lang={lang} />
                      <span style={{ textTransform: "uppercase" }}>{lang === "pt" ? "pt-br" : lang}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart icon */}
            <button
              onClick={openCart}
              aria-label="Carrinho"
              style={{ position: "relative", width: 42, height: 42, borderRadius: 10, border: "1.5px solid rgba(248,245,240,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F8F5F0", background: "none", cursor: "pointer", transition: "border-color 0.25s, color 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A220"; (e.currentTarget as HTMLElement).style.color = "#E8C84A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,245,240,0.15)"; (e.currentTarget as HTMLElement).style.color = "#F8F5F0"; }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span style={{ position: "absolute", top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 100, background: "#C9A220", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Menu"
              className="show-mobile"
              style={{
                width: 42, height: 42, borderRadius: 10,
                border: "1.5px solid rgba(248,245,240,0.20)",
                display: "none", alignItems: "center", justifyContent: "center",
                color: "#F8F5F0",
                flexDirection: "column", gap: 5, padding: 11,
                cursor: "pointer"
              }}
            >
              <style>{`.show-mobile{display:flex!important;} @media(min-width:769px){.show-mobile{display:none!important;}}`}</style>
              <span style={{ display: "block", height: 2, borderRadius: 2, background: "currentColor", width: open ? "100%" : "100%", transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", height: 2, borderRadius: 2, background: "currentColor", width: "75%", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
              <span style={{ display: "block", height: 2, borderRadius: 2, background: "currentColor", width: "100%", transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 49,
        background: "rgba(255,255,255,0.98)",
        backdropFilter: "blur(24px)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        paddingTop: 100,
        display: "flex",
        flexDirection: "column",
      }}>
        <nav style={{ padding: "24px 28px", display: "flex", flexDirection: "column" }}>
          {[{ to: "/", label: t("nav.home") }, ...NAV].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 26, fontWeight: 400,
                color: "#1C1814",
                padding: "16px 0",
                borderBottom: "1px solid rgba(28,24,20,0.07)",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Language Selector Mobile */}
        <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(28,24,20,0.07)", marginTop: "auto", marginBottom: 32 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(28,24,20,0.45)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>
            Idioma / Language
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            {(["pt", "en", "es", "it", "fr"] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: language === lang ? "2px solid #C9A220" : "1px solid rgba(28,24,20,0.15)",
                  background: "none",
                  padding: 0,
                  cursor: "pointer",
                  boxShadow: language === lang ? "0 4px 12px rgba(201,162,32,0.25)" : "none",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >
                <FlagIcon lang={lang} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
