import { GoldCTA } from "@/components/home/GoldCTA";

export const ClosingCTA = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 65%), linear-gradient(180deg, #000 0%, #050505 100%)",
        paddingTop: "180px",
        paddingBottom: "200px",
      }}
    >
      <div className="container mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-white">
          Sua evolução
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
            merece ser representada
          </span>
        </h2>

        <div
          className="mx-auto mt-10 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
        />

        <div className="mt-14">
          <GoldCTA size="lg" />
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
