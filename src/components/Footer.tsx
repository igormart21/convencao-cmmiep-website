import { Link } from "react-router-dom";
import logo from "@/assets/3r-logo.png";

const WPP = "https://wa.me/5548991486304?text=Ol%C3%A1!%20Quero%20conhecer%20as%20medalhas%203R%20Fitness.";
const IG  = "https://www.instagram.com/3rfitnessjr";

export const Footer = () => (
  <footer id="contato" style={{ background: "#1C1814", borderTop: "1px solid rgba(248,245,240,0.06)" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px 64px", marginBottom: 48 }} className="footer-grid">
        <style>{`@media(max-width:640px){.footer-grid{grid-template-columns:1fr!important;}}`}</style>

        <div>
          <img src={logo} alt="3R Fitness" style={{ height: 150, marginBottom: 18 }} />
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(248,245,240,0.45)", lineHeight: 1.75, maxWidth: "30ch", marginBottom: 24 }}>
            Joias 100% personalizadas em Ouro 18k e Prata para atletas de alta performance.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { href: IG, label: "Instagram", icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              { href: WPP, label: "WhatsApp", icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.5 3.5A12 12 0 0 0 3.5 20.5L2 22l1.5-.5A12 12 0 1 0 20.5 3.5zm-8.5 18a10 10 0 0 1-5.4-1.6l-.4-.3-3.6.9.9-3.5-.3-.4A10 10 0 1 1 12 21.5zm5.5-7.5c-.3-.1-1.7-.9-2-.9s-.5.1-.6.3l-.9 1.1c-.1.2-.3.2-.5.1a8 8 0 0 1-2.4-1.5 8.5 8.5 0 0 1-1.7-2c-.1-.3 0-.5.1-.6l.5-.6.3-.6v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.1a17 17 0 0 0 2 .7c.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.4-.2-.8-.4z"/></svg> },
            ].map(({ href, label, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ width: 40, height: 40, borderRadius: 10, border: "1px solid rgba(248,245,240,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(248,245,240,0.50)", transition: "all 0.25s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#C9A220"; el.style.color = "#C9A220"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(248,245,240,0.12)"; el.style.color = "rgba(248,245,240,0.50)"; }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A220", marginBottom: 18 }}>Loja</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ to:"/", l:"Início" }, { to:"/colecao", l:"Coleções" }, { to:"/#personalizar", l:"Personalizar" }].map(({ to, l }) => (
              <Link key={to} to={to} style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(248,245,240,0.48)", transition: "color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8C84A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(248,245,240,0.48)")}
              >{l}</Link>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A220", marginBottom: 18 }}>Contato</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {[{ href: WPP, l: "WhatsApp" }, { href: IG, l: "@3rfitnessjr" }].map(({ href, l }) => (
              <a key={l} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(248,245,240,0.48)", transition: "color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8C84A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(248,245,240,0.48)")}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ borderTop: "1px solid rgba(248,245,240,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(248,245,240,0.22)" }}>© {new Date().getFullYear()} 3R Fitness. Todos os direitos reservados.</span>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(248,245,240,0.18)" }}>Joias premium para atletas</span>
      </div>
    </div>
  </footer>
);
