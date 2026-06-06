import { GoldCTA } from "@/components/home/GoldCTA";

export const PersonalizationCTA = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000 0%, #0a0806 50%, #000 100%)",
        paddingTop: "160px",
        paddingBottom: "160px",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(244,215,122,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative container mx-auto max-w-3xl px-6 text-center">
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-medium"
          style={{ color: "rgba(244,215,122,0.75)" }}
        >
          Personalização
        </span>
        <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl mt-4 leading-[1.2] text-white">
          Ou crie algo que{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(180deg, #f4d77a 0%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            só você pode ter
          </span>
        </h2>
        <p className="mt-6 text-base sm:text-lg font-light italic text-white/65">
          Transforme sua trajetória em uma peça única.
        </p>
        <div className="mt-12">
          <GoldCTA size="lg" />
        </div>
      </div>
    </section>
  );
};

export default PersonalizationCTA;
