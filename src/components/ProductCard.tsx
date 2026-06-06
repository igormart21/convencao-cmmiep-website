import { Link } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado à sacola", { description: product.node.title });
  };

  return (
    <Link to={`/product/${product.node.handle}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.node.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
        <Button
          onClick={handleAdd}
          disabled={isLoading || !variant?.availableForSale}
          size="icon"
          className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-background text-foreground hover:bg-accent hover:text-accent-foreground shadow-soft opacity-0 group-hover:opacity-100 transition-smooth"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex justify-between items-baseline gap-2">
        <h3 className="font-medium group-hover:text-accent transition-smooth">{product.node.title}</h3>
        <p className="font-display font-semibold whitespace-nowrap">
          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};
