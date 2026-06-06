import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/3r-logo.png";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";

const NAV = [
  { to: "/colecao", label: "Coleções" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const totalItems = useCartStore(s => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart   = useCartUIStore(s => s.openCart);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
        paddingTop: 68,
        display: "flex", flexDirection: "column",
      }}>
        <nav style={{ padding: "24px 28px", display: "flex", flexDirection: "column" }}>
          {[{ to: "/", label: "Início" }, ...NAV].map(({ to, label }) => (
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
      </div>
    </>
  );
};
