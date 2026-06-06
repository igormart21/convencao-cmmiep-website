import { useEffect, useState } from "react";
import { ShopifyProduct, STOREFRONT_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, Package } from "lucide-react";

export const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 24 });
        setProducts(data?.data?.products?.edges ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="produtos" className="container py-20 md:py-28">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Produtos</span>
          <h2 className="font-display text-4xl md:text-5xl font-medium mt-2">A coleção</h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          Tudo que você vê é feito sob medida e em pequena escala.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : products.length === 0 ? (
        <div className="border border-dashed border-border rounded-sm py-24 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
          <h3 className="font-display text-2xl mb-2">Nenhum produto ainda</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Crie um produto me dizendo o que é e qual o preço, no chat aqui do Lovable.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </section>
  );
};
