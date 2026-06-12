import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";

type Props = {
  title?: string;
  subtitle?: string;
  limit?: number;
};

export const ColecaoDestaque = ({
  title = "Peças já criadas",
  subtitle = "Algumas histórias já nasceram prontas",
  limit = 4,
}: Props) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
        const edges = data?.data?.products?.edges ?? [];
        const exclusoes = ["vigor", "titan", "velocità", "velocita", "strata", "aeron", "joia-personalizada", "joia personalizada"];
        const filtrados = edges.filter((p: any) => {
          const title = p.node.title.toLowerCase();
          const handle = p.node.handle.toLowerCase();
          return !exclusoes.some(ex => title.includes(ex) || handle.includes(ex));
        });
        setProducts(filtrados);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [limit]);

  return (
    <section
      className="relative w-full"
      style={{
        background: "linear-gradient(180deg, #000 0%, #050505 50%, #000 100%)",
        paddingTop: "140px",
        paddingBottom: "160px",
      }}
    >
      <div className="container mx-auto max-w-7xl px-6 text-center mb-16 sm:mb-20">
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-medium"
          style={{ color: "rgba(244,215,122,0.75)" }}
        >
          Coleção
        </span>
        <h2
          className="font-display font-light text-3xl sm:text-4xl md:text-5xl mt-4 leading-[1.2]"
          style={{
            background: "linear-gradient(180deg, #f4f4f4 0%, #d9d9d9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h2>
        <p className="mt-4 italic font-light text-base sm:text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
          {subtitle}
        </p>
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#d4af37" }} />
          </div>
        ) : (
          <div className={`grid gap-8 sm:gap-12 ${products.length >= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
            {products.slice(0, limit).map(({ node }) => {
              const img = node.images.edges[0]?.node;
              return (
                <Link
                  key={node.id}
                  to={`/product/${node.handle}`}
                  className="group block"
                >
                  <div
                    className="relative aspect-[4/5] overflow-hidden"
                    style={{
                      background: "#0a0a0a",
                      border: "1px solid rgba(212,175,55,0.2)",
                      boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
                    }}
                  >
                    {img && (
                      <img
                        src={img.url}
                        alt={img.altText || node.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(244,215,122,0.18) 0%, transparent 70%)",
                      }}
                    />
                  </div>
                  <h3
                    className="mt-5 text-center font-display text-base sm:text-lg font-light text-white/90 tracking-wide"
                  >
                    {node.title}
                  </h3>
                  <div
                    className="mx-auto mt-3 h-px w-0 group-hover:w-12 transition-all duration-700"
                    style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ColecaoDestaque;
