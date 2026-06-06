const stats = [
  { value: "+1.000", label: "Peças entregues" },
  { value: "+50",    label: "Eventos atendidos" },
  { value: "6",      label: "Modalidades" },
  { value: "100%",   label: "Personalizado" },
];

export const StatsBar = () => (
  <div style={{ background: "#0A0806", borderTop: "1px solid rgba(212,175,55,0.10)", borderBottom: "1px solid rgba(212,175,55,0.10)" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="stats-bar">
        <style>{`
          @media (max-width: 640px) { .stats-bar { grid-template-columns: repeat(2,1fr) !important; } }
        `}</style>
        {stats.map(({ value, label }, i) => (
          <div
            key={i}
            style={{
              padding: "32px 24px",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(212,175,55,0.07)" : "none",
            }}
          >
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "clamp(2rem, 3vw, 2.8rem)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8, background: "linear-gradient(135deg, #F8E86E 0%, #D4AF37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {value}
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 500, color: "rgba(245,240,232,0.38)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StatsBar;
