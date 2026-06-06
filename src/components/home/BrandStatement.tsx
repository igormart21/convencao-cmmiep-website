const pillars = [
  { titulo: "Feito sob medida", desc: "Cada peça nasce da sua história única." },
  { titulo: "Materiais premium", desc: "Ouro 18k, prata 950 e acabamento joalheria." },
  { titulo: "Representação pessoal", desc: "Símbolos que só fazem sentido para você." },
];

export const BrandStatement = () => {
  return (
    <section
      className="relative w-full"
      style={{
        background: "linear-gradient(180deg, #000 0%, #050505 100%)",
        paddingTop: "160px",
        paddingBottom: "160px",
      }}
    >
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] text-white">
          Você não usa uma joia.
          <br />
          <span
            className="italic"
            style={{
              background: "linear-gradient(180deg, #f4d77a 0%, #d4af37 60%, #b8860b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Você carrega um significado.
          </span>
        </h2>

        <div
          className="mx-auto mt-12 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {pillars.map((p) => (
            <div key={p.titulo} className="flex flex-col items-center">
              <span
                className="block h-2 w-2 rotate-45 mb-6"
                style={{
                  background: "linear-gradient(135deg, #f4d77a 0%, #d4af37 100%)",
                  boxShadow: "0 0 12px rgba(212,175,55,0.6)",
                }}
              />
              <h3
                className="font-display text-lg sm:text-xl font-light tracking-wide"
                style={{ color: "#d4af37" }}
              >
                {p.titulo}
              </h3>
              <p className="mt-3 text-sm sm:text-base font-light text-white/60 max-w-xs leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
