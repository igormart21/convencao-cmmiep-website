/**
 * Faixa premium de anúncio de frete grátis.
 * Estilo silencioso, dourado, sutil — referência Apple / Farfetch.
 */
export const ShippingAnnouncementBar = () => {
  const messages = [
    "Entrega segurada em todo o Brasil",
    "Cortesia em pedidos acima de R$ 847",
    "Produção artesanal · 7 a 12 dias úteis",
  ];

  return (
    <div
      className="relative w-full overflow-hidden border-b"
      style={{
        backgroundColor: "#070707",
        borderColor: "rgba(212,175,55,0.18)",
      }}
    >
      {/* Brilho sutil de fundo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-6">
        {messages.map((msg, i) => (
          <div key={i} className="flex items-center gap-6">
            {i > 0 && (
              <span
                className="hidden md:inline-block h-px w-6"
                style={{ background: "rgba(212,175,55,0.35)" }}
              />
            )}
            <span
              className={`text-[10px] uppercase font-light tracking-[0.32em] ${
                i === 0 ? "" : "hidden md:inline-block"
              }`}
              style={{
                color:
                  i === 1
                    ? "#d4af37"
                    : "rgba(244,234,208,0.78)",
                letterSpacing: "0.32em",
              }}
            >
              {i === 1 && (
                <span
                  aria-hidden
                  className="inline-block mr-2"
                  style={{ color: "#d4af37" }}
                >
                  ✦
                </span>
              )}
              {msg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
