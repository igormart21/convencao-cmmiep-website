import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, X, ArrowRight, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";

const fmtBRL = (amount: string) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parseFloat(amount));

type CartDrawerProps = {
  showTrigger?: boolean;
  triggerVariant?: "default" | "header";
};

export const CartDrawer = ({ showTrigger = true, triggerVariant = "default" }: CartDrawerProps = {}) => {
  const isOpen    = useCartUIStore((s) => s.isOpen);
  const setIsOpen = useCartUIStore((s) => s.setOpen);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + parseFloat(i.price.amount) * i.quantity, 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (!url) return;
    setIsOpen(false);
    window.location.replace(url);
  };

  const getThumb = (item: typeof items[number]) =>
    item.thumbnailImage ||
    item.product.node.variants?.edges?.find((e) => e.node.id === item.variantId)?.node.image ||
    item.product.node.featuredImage ||
    item.product.node.images?.edges?.[0]?.node ||
    null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {showTrigger && (
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`relative transition-colors ${
              triggerVariant === "header"
                ? "w-[42px] h-[42px] rounded-[10px] border-[1.5px] border-[#1f1f1f]/20 text-[#1f1f1f] hover:bg-transparent hover:border-[#1f1f1f]/35"
                : "rounded-full hover:bg-transparent"
            }`}
          >
            <ShoppingCart className={triggerVariant === "header" ? "h-[18px] w-[18px]" : "h-5 w-5"} strokeWidth={1.5} />
            {totalItems > 0 && (
              <Badge className={`absolute rounded-full p-0 px-1 flex items-center justify-center font-bold bg-[#C9A220] text-black border-0 ${
                triggerVariant === "header"
                  ? "-top-1 -right-1 h-[18px] min-w-[18px] text-[10px]"
                  : "-top-0.5 -right-0.5 h-4 min-w-4 text-[9px]"
              }`}>
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
      )}

      <SheetContent
        side="right"
        className="w-full sm:max-w-[420px] p-0 flex flex-col h-full bg-[#0E0B08] border-l border-white/[0.06] [&>button]:hidden"
      >
        {/* Header */}
        <SheetHeader className="flex-shrink-0 px-6 pt-6 pb-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-4 w-4 text-[#C9A220]" strokeWidth={1.5} />
              <SheetTitle className="text-[13px] font-semibold tracking-[0.2em] uppercase text-[#F8F5F0]">
                Carrinho
              </SheetTitle>
              {totalItems > 0 && (
                <span className="text-[11px] text-[#C9A220] font-light">
                  {totalItems} {totalItems === 1 ? "peça" : "peças"}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors"
              aria-label="Fechar"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </SheetHeader>

        {/* Body */}
        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-white/10 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white/20" strokeWidth={1} />
                </div>
                <p className="text-sm text-white/30 font-light">Seu carrinho está vazio.</p>
                <p className="text-xs text-white/20 mt-1">Adicione uma joia para começar.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                {items.map((item) => {
                  const thumb = getThumb(item);
                  return (
                    <div key={item.variantId} className="flex gap-4">
                      {/* Thumb */}
                      <div className="w-20 h-24 bg-[#1A1410] rounded-xl overflow-hidden flex-shrink-0 border border-white/[0.06] flex items-center justify-center">
                        {thumb?.url ? (
                          <img
                            src={thumb.url}
                            alt={thumb.altText || item.product.node.title}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                          />
                        ) : (
                          <span style={{ fontFamily: "'Playfair Display',serif" }} className="text-[#C9A220] text-sm tracking-widest">3R</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <p style={{ fontFamily: "'Playfair Display',serif" }} className="text-[15px] font-normal text-white/85 leading-tight">
                            {item.product.node.title}
                          </p>
                          {item.variantTitle !== "Default Title" && (
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mt-1">
                              {item.selectedOptions.map((o) => o.value).join(" · ")}
                            </p>
                          )}
                          <p className="text-[13px] text-[#C9A220] mt-2 font-medium">
                            {fmtBRL(item.price.amount)}
                          </p>
                        </div>

                        {/* Qty + Remove */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-white/10 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                            >
                              <Minus className="h-3 w-3" strokeWidth={1.5} />
                            </button>
                            <span className="text-[13px] text-white/70 tabular-nums w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                            >
                              <Plus className="h-3 w-3" strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-[10px] uppercase tracking-[0.15em] text-white/20 hover:text-red-400/70 transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-5 border-t border-white/[0.06] space-y-4 bg-[#0A0806]">
                {/* Subtotal */}
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-white/30">Subtotal</span>
                  <span style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-light text-white/90">
                    {fmtBRL(totalPrice.toString())}
                  </span>
                </div>

                <p className="text-[10px] text-white/20 tracking-wide">
                  Frete calculado na próxima etapa
                </p>

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || isSyncing}
                  className="w-full h-12 rounded-xl bg-[#C9A220] hover:bg-[#E8C84A] text-[#1C1814] text-[12px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-colors disabled:opacity-40"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Finalizar compra
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </>
                  )}
                </button>

                {/* Continue shopping */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full h-10 rounded-xl border border-white/10 text-white/30 hover:text-white/50 hover:border-white/20 text-[11px] uppercase tracking-[0.2em] transition-colors"
                >
                  Continuar comprando
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
