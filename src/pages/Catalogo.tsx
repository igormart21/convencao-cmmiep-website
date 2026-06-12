import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Package, ShoppingBag } from "lucide-react";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";

const CATEGORIA_TODAS = "Todas";

const Catalogo = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>(CATEGORIA_TODAS);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
        const edges = data?.data?.products?.edges ?? [];
        const exclusoes = ["vigor", "titan", "velocità", "velocita", "strata", "aeron", "joia-personalizada", "joia personalizada", "personalizada", "personalizado"];
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
  }, []);

  // Categorias derivadas do productType / tipos do Shopify (fallback: nome do produto)
  const categorias = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      const opt = p.node.options?.find((o) =>
        ["category", "categoria", "tipo", "type"].includes(o.name.toLowerCase())
      );
      opt?.values.forEach((v) => set.add(v));
    });
    return [CATEGORIA_TODAS, ...Array.from(set)];
  }, [products]);

  const produtosFiltrados = useMemo(() => {
    if (categoriaAtiva === CATEGORIA_TODAS) return products;
    return products.filter((p) =>
      p.node.options?.some((o) =>
        ["category", "categoria", "tipo", "type"].includes(o.name.toLowerCase()) &&
        o.values.includes(categoriaAtiva)
      )
    );
  }, [products, categoriaAtiva]);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{
        ["--background" as any]: "0 0% 7%",
        ["--foreground" as any]: "43 65% 70%",
        ["--card" as any]: "0 0% 9%",
        ["--card-foreground" as any]: "43 65% 70%",
        ["--primary" as any]: "43 65% 55%",
        ["--primary-foreground" as any]: "0 0% 7%",
        ["--secondary" as any]: "0 0% 12%",
        ["--secondary-foreground" as any]: "43 65% 70%",
        ["--muted" as any]: "0 0% 12%",
        ["--muted-foreground" as any]: "43 30% 60%",
        ["--accent" as any]: "43 65% 55%",
        ["--accent-foreground" as any]: "0 0% 7%",
        ["--border" as any]: "43 55% 45%",
        ["--input" as any]: "43 55% 45%",
        ["--ring" as any]: "43 65% 55%",
      }}
    >
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para personalização
          </Link>
          <div className="text-sm text-muted-foreground hidden md:block">
            Continue comprando
          </div>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-10 pb-16 max-w-7xl">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-accent/60" />
            <ShoppingBag className="h-3.5 w-3.5 text-accent" />
            <span className="h-px w-10 bg-accent/60" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-2">
            Coleção Completa
          </p>
          <h1 className="font-display text-3xl md:text-4xl tracking-tight mb-2">
            Adicione mais joias à sua sacola
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Escolha entre as categorias abaixo e finalize tudo em uma única compra.
          </p>
        </div>

        {/* Filtros por categoria */}
        {categorias.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categorias.map((cat) => {
              const ativa = cat === categoriaAtiva;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoriaAtiva(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-all ${
                    ativa
                      ? "border-accent text-accent bg-accent/[0.06]"
                      : "border-border/60 text-foreground/70 hover:border-accent/70 hover:text-accent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="border border-dashed border-border rounded-sm py-24 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
            <h3 className="font-display text-2xl mb-2">Nenhuma joia disponível</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Volte em breve — estamos preparando novas peças para você.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {produtosFiltrados.map((p) => (
              <Link
                key={p.node.id}
                to={`/product/${p.node.handle}`}
                className="group block"
              >
                <div className="aspect-square overflow-hidden bg-card mb-4 border border-border/40">
                  {p.node.images?.edges?.[0]?.node ? (
                    <img
                      src={p.node.images.edges[0].node.url}
                      alt={p.node.images.edges[0].node.altText || p.node.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-10 w-10 text-muted-foreground" strokeWidth={1} />
                    </div>
                  )}
                </div>
                <h3 className="font-display text-sm tracking-wide mb-1 group-hover:text-accent transition-colors">
                  {p.node.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {p.node.priceRange.minVariantPrice.currencyCode}{" "}
                  {parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link to="/catalogo">
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-none px-8 py-6 text-xs uppercase tracking-[0.3em]"
            >
              Voltar e personalizar outra joia
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Catalogo;
