import { useState, useEffect } from "react";
import { ShopifyProduct, STOREFRONT_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";
import valenzaJoia from "@/assets/valenza-joia.jpeg";
import valenzaJoiaPrata from "@/assets/valenza-joia-prata.jpeg";
import monarchJoiaPrata from "@/assets/monarch-joia-prata.jpeg";
import monarchJoiaOuro from "@/assets/monarch-joia-ouro.jpeg";
import dominusJoiaPrata from "@/assets/dominus-prata-novo.jpg";
import dominusJoiaOuro from "@/assets/dominus-ouro-novo.jpg";
import titanJoiaOuro from "@/assets/titan-joia-ouro.jpeg";
import titanJoiaPrata from "@/assets/titan-joia-prata.jpeg";
import velocitaJoiaPrata from "@/assets/velocita-joia-prata.jpeg";
import velocitaJoiaOuro from "@/assets/velocita-joia-ouro.jpeg";

import linhaImperiumOuro from "@/assets/linha-imperium-ouro.jpg";
import linhaImperiumPrata from "@/assets/linha-imperium-prata.jpg";
import linhaImperiumPrataNova from "@/assets/linha-imperium-prata-nova.jpg";
import linhaStrataOuro from "@/assets/linha-strata-ouro.jpg";
import linhaStrataPrata from "@/assets/linha-strata-prata.jpg";
import linhaTriadeOuro from "@/assets/linha-triade-ouro.jpg";
import linhaTriadePrata from "@/assets/linha-triade-prata.jpg";
import linhaVigorOuro from "@/assets/linha-vigor-ouro.jpg";
import linhaVigorPrata from "@/assets/linha-vigor-prata.jpg";
import linhaHalterOuro from "@/assets/linha-halter-ouro.jpg";
import linhaHalterPrata from "@/assets/linha-halter-prata.jpg";
import linhaVeloxOuro from "@/assets/linha-velox-ouro.png";
import linhaVeloxPrata from "@/assets/linha-velox-royale-prata-masculino.jpg";
import veloxRoyaleOuroMasc from "@/assets/linha-velox-royale-ouro-masculino.jpg";
import linhaAeronOuro from "@/assets/linha-aeron-ouro.png";
import linhaAeronPrata from "@/assets/linha-aeron-prata-masculino.jpg";
import placaTriatloOuro from "@/assets/linha-placa-triatlo-ouro.jpg";
import placaTriatloPrata from "@/assets/linha-placa-triatlo-prata.jpg";
import velarionOuro from "@/assets/linha-velarion-ouro.png";
import velarionPrata from "@/assets/linha-triade-prata-clean.jpg";

import novaImperiumCrossfitOuro from "@/assets/linha-imperium-ouro-crossfit.jpg";
import novaHalterOuro from "@/assets/linha-halter-ouro-nova.jpg";
import novaCorridaOuroFem from "@/assets/linha-corrida-ouro-fem.jpg";
import novaCorridaPrataFem from "@/assets/linha-corrida-prata-fem.jpg";
import novaCorridaOuroMasc from "@/assets/linha-corrida-ouro-masc.jpg";
import conjuntoCrossfitOuro from "@/assets/linha-conjunto-crossfit-ouro.jpg";
import conjuntoWodOuro from "@/assets/linha-wod-ouro.jpeg";
import conjuntoEliteOuro from "@/assets/linha-elite-ouro.jpeg";
import corridaAtletaOuroImg from "@/assets/corrida-atleta-ouro-novo.jpg";
import corridaAtletaPrataImg from "@/assets/corrida-atleta-novo.jpg";

const STATIC = [
  { nome: "Imperium", mat: "Ouro 18k", img: linhaImperiumOuro, hot: true },
  { nome: "Imperium", mat: "Prata",    img: linhaImperiumPrata },
  { nome: "Tríade",   mat: "Ouro 18k", img: linhaTriadeOuro },
  { nome: "Tríade",   mat: "Prata",    img: linhaTriadePrata },
  { nome: "Halter",   mat: "Ouro 18k", img: linhaHalterOuro },
  { nome: "Halter",   mat: "Prata",    img: linhaHalterPrata },
  { nome: "Corrida",  mat: "Ouro 18k", img: linhaVeloxOuro },
  { nome: "Corrida",  mat: "Prata",    img: linhaVeloxPrata },
  { nome: "Imperium CrossFit", mat: "Ouro 18k", img: novaImperiumCrossfitOuro, preco: 3200 },
  { nome: "Halter Elite",      mat: "Ouro 18k", img: novaHalterOuro, preco: 3487 },
  { nome: "Corrida Atleta",    mat: "Ouro 18k", img: novaCorridaOuroFem, preco: 3597 },
  { nome: "Corrida Elite",     mat: "Ouro 18k", img: novaCorridaOuroMasc, preco: 3597 },
  { nome: "Corrente e Pingente CrossFit", mat: "Ouro 18k", img: conjuntoCrossfitOuro, preco: 3487 },
];

const ATELIE_EXTRA = [
  { nome: "Imperium CrossFit", mat: "Ouro 18k", img: novaImperiumCrossfitOuro, preco: 3200 },
  { nome: "Halter Elite",      mat: "Ouro 18k", img: novaHalterOuro, preco: 3487 },
  { nome: "Corrida Atleta",    mat: "Ouro 18k", img: novaCorridaOuroFem, preco: 3597 },
  { nome: "Corrida Elite",     mat: "Ouro 18k", img: novaCorridaOuroMasc, preco: 3597 },
  { nome: "Corrente e Pingente CrossFit", mat: "Ouro 18k", img: conjuntoCrossfitOuro, preco: 3487 },
];

const WPP = "https://wa.me/5548991486304?text=Ol%C3%A1!%20Tenho%20interesse%20em%20uma%20joia%203R%20Fitness.%20Pode%20me%20informar%20mais%3F";

const isGold = (title: string) =>
  title.toLowerCase().includes("ouro") || title.toLowerCase().includes("gold");

const getProductMaterials = (product: ShopifyProduct) => {
  return ["Ouro 18k", "Prata"];
};

const fmtBRL = (amount: string) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parseFloat(amount));

const getAtelieProductMock = (nome: string, mat: string, img: string, preco: number): ShopifyProduct => {
  const isOuro = mat.toLowerCase().includes("ouro");
  let variantId = "";
  let handle = "";

  if (nome.toLowerCase().includes("halter elite")) {
    handle = "halter-elite";
    variantId = isOuro ? "gid://shopify/ProductVariant/48912055468259" : "gid://shopify/ProductVariant/48912055501027";
  } else if (nome.toLowerCase().includes("imperium crossfit")) {
    handle = "imperium-crossfit";
    variantId = isOuro ? "gid://shopify/ProductVariant/48916550746339" : "gid://shopify/ProductVariant/48916550811875";
  } else if (nome.toLowerCase().includes("corrente e pingente crossfit")) {
    handle = "conjunto-crossfit-ouro";
    variantId = "gid://shopify/ProductVariant/48916550746339";
  } else if (nome.toLowerCase().includes("corrida atleta")) {
    handle = "corrida-atleta";
    variantId = isOuro ? "gid://shopify/ProductVariant/48914322391267" : "gid://shopify/ProductVariant/48914322424035";
  } else if (nome.toLowerCase().includes("corrida elite")) {
    handle = "corrida-elite";
    variantId = isOuro ? "gid://shopify/ProductVariant/48914311708899" : "gid://shopify/ProductVariant/48914311741667";
  } else {
    handle = "halter-elite";
    variantId = isOuro ? "gid://shopify/ProductVariant/48912055468259" : "gid://shopify/ProductVariant/48912055501027";
  }

  const priceStr = preco.toString();

  // Corrida Atleta: produto com DUAS variantes (Ouro 18k + Prata)
  if (handle === "corrida-atleta") {
    return {
      node: {
        id: "gid://shopify/Product/Atelie-Corrida-Atleta",
        title: "Corrida Atleta",
        description: "Edição especial produzida com acabamento premium em Ouro 18k ou Prata.",
        handle: "corrida-atleta",
        featuredImage: { url: novaCorridaOuroFem, altText: "Corrida Atleta" },
        priceRange: { minVariantPrice: { amount: "297", currencyCode: "BRL" } },
        images: { edges: [{ node: { url: novaCorridaOuroFem, altText: "Corrida Atleta" } }] },
        options: [{ name: "Material", values: ["Ouro 18k", "Prata"] }],
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/48914322391267",
                title: "Ouro 18k",
                price: { amount: "3597", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Ouro 18k" }],
                image: { url: novaCorridaOuroFem, altText: "Corrida Atleta Ouro 18k" },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/48914322424035",
                title: "Prata",
                price: { amount: "297", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Prata" }],
                image: { url: novaCorridaPrataFem, altText: "Corrida Atleta Prata" },
              },
            },
          ],
        },
      },
    };
  }

  // Halter Elite: produto com DUAS variantes (Ouro 18k + Prata)
  if (handle === "halter-elite") {
    return {
      node: {
        id: "gid://shopify/Product/Atelie-Halter-Elite",
        title: "Halter Elite",
        description: "Edição especial produzida com acabamento premium em Ouro 18k ou Prata.",
        handle: "halter-elite",
        featuredImage: { url: novaHalterOuro, altText: "Halter Elite" },
        priceRange: { minVariantPrice: { amount: "297", currencyCode: "BRL" } },
        images: { edges: [{ node: { url: novaHalterOuro, altText: "Halter Elite" } }] },
        options: [{ name: "Material", values: ["Ouro 18k", "Prata"] }],
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/48912055468259",
                title: "Ouro 18k",
                price: { amount: "3487", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Ouro 18k" }],
                image: { url: linhaHalterOuro, altText: "Halter Elite Ouro 18k" },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/48912055501027",
                title: "Prata",
                price: { amount: "297", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Prata" }],
                image: { url: linhaHalterPrata, altText: "Halter Elite Prata" },
              },
            },
          ],
        },
      },
    };
  }

  // Corrente e Pingente CrossFit: produto com DUAS variantes (Ouro 18k + Prata)
  if (handle === "conjunto-crossfit-ouro") {
    return {
      node: {
        id: "gid://shopify/Product/Atelie-Conjunto-CrossFit",
        title: "Corrente e Pingente CrossFit",
        description: "Edição especial produzida com acabamento premium em Ouro 18k ou Prata.",
        handle: "conjunto-crossfit-ouro",
        featuredImage: { url: conjuntoCrossfitOuro, altText: "Corrente e Pingente CrossFit" },
        priceRange: { minVariantPrice: { amount: "297", currencyCode: "BRL" } },
        images: { edges: [{ node: { url: conjuntoCrossfitOuro, altText: "Corrente e Pingente CrossFit" } }] },
        options: [{ name: "Material", values: ["Ouro 18k", "Prata"] }],
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/48916550746339",
                title: "Ouro 18k",
                price: { amount: "3487", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Ouro 18k" }],
                image: { url: conjuntoWodOuro, altText: "Corrente e Pingente CrossFit Ouro 18k" },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/48916550811875",
                title: "Prata",
                price: { amount: "297", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Prata" }],
                image: { url: conjuntoEliteOuro, altText: "Corrente e Pingente CrossFit Prata" },
              },
            },
          ],
        },
      },
    };
  }

  // Corrida Elite: produto com DUAS variantes (Ouro 18k + Prata)
  if (handle === "corrida-elite") {
    return {
      node: {
        id: "gid://shopify/Product/Atelie-Corrida-Elite",
        title: "Corrida Elite",
        description: "Edição especial produzida com acabamento premium em Ouro 18k ou Prata.",
        handle: "corrida-elite",
        featuredImage: { url: novaCorridaOuroMasc, altText: "Corrida Elite" },
        priceRange: { minVariantPrice: { amount: "297", currencyCode: "BRL" } },
        images: { edges: [{ node: { url: novaCorridaOuroMasc, altText: "Corrida Elite" } }] },
        options: [{ name: "Material", values: ["Ouro 18k", "Prata"] }],
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/48914311708899",
                title: "Ouro 18k",
                price: { amount: "3597", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Ouro 18k" }],
                image: { url: titanJoiaOuro, altText: "Corrida Elite Ouro 18k" },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/48914311741667",
                title: "Prata",
                price: { amount: "297", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Prata" }],
                image: { url: titanJoiaPrata, altText: "Corrida Elite Prata" },
              },
            },
          ],
        },
      },
    };
  }

  // Imperium CrossFit: produto com DUAS variantes (Ouro 18k + Prata)
  if (handle === "imperium-crossfit") {
    return {
      node: {
        id: "gid://shopify/Product/Atelie-Imperium-CrossFit",
        title: "Imperium CrossFit",
        description: "Edição especial produzida com acabamento premium em Ouro 18k ou Prata.",
        handle: "imperium-crossfit",
        featuredImage: { url: novaImperiumCrossfitOuro, altText: "Imperium CrossFit" },
        priceRange: { minVariantPrice: { amount: "297", currencyCode: "BRL" } },
        images: { edges: [{ node: { url: novaImperiumCrossfitOuro, altText: "Imperium CrossFit" } }] },
        options: [{ name: "Material", values: ["Ouro 18k", "Prata"] }],
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/48916550746339",
                title: "Ouro 18k",
                price: { amount: "3200", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Ouro 18k" }],
                image: { url: linhaStrataOuro, altText: "Imperium CrossFit Ouro 18k" },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/48916550811875",
                title: "Prata",
                price: { amount: "297", currencyCode: "BRL" },
                availableForSale: true,
                selectedOptions: [{ name: "Material", value: "Prata" }],
                image: { url: linhaStrataPrata, altText: "Imperium CrossFit Prata" },
              },
            },
          ],
        },
      },
    };
  }

  return {
    node: {
      id: `gid://shopify/Product/Atelie-${nome.replace(/\s+/g, "-")}`,
      title: nome,
      description: `Edição especial produzida com acabamento premium em ${mat}.`,
      handle: handle,
      featuredImage: {
        url: img,
        altText: nome
      },
      priceRange: {
        minVariantPrice: {
          amount: priceStr,
          currencyCode: "BRL"
        }
      },
      images: {
        edges: [
          {
            node: {
              url: img,
              altText: nome
            }
          }
        ]
      },
      options: [
        {
          name: "Material",
          values: [mat]
        }
      ],
      variants: {
        edges: [
          {
            node: {
              id: variantId,
              title: mat,
              price: {
                amount: priceStr,
                currencyCode: "BRL"
              },
              availableForSale: true,
              selectedOptions: [
                {
                  name: "Material",
                  value: mat
                }
              ],
              image: {
                url: img,
                altText: nome
              }
            }
          }
        ]
      }
    }
  };
};

type ShopifyPreview = { product: ShopifyProduct; variantIdx: number; overrideImage?: string };
type StaticPreview  = { img: string; nome: string; mat: string; preco?: number };
type Preview = { kind: "shopify"; data: ShopifyPreview } | { kind: "static"; data: StaticPreview } | null;

export const ProductShowcase = () => {
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading]   = useState(true);
  const [preview, setPreview]   = useState<Preview>(null);
  const [adding, setAdding]     = useState(false);
  const [activePreviewImage, setActivePreviewImage] = useState<string>("");

  useEffect(() => {
    if (preview) {
      if (preview.kind === "shopify") {
        if (preview.data.overrideImage) {
          setActivePreviewImage(preview.data.overrideImage);
        } else {
          const img = preview.data.product.node.images?.edges?.[0]?.node?.url ?? "";
          setActivePreviewImage(img);
        }
      } else if (preview.kind === "static") {
        setActivePreviewImage(preview.data.img);
      }
    } else {
      setActivePreviewImage("");
    }
  }, [preview]);

  const addItem  = useCartStore(s => s.addItem);
  const openCart = useCartUIStore(s => s.openCart);

  useEffect(() => {
    storefrontApiRequest(STOREFRONT_QUERY, { first: 20 })
      .then(data => {
        const edges: ShopifyProduct[] = data?.data?.products?.edges ?? [];
        const exclusoes = ["vigor", "titan", "velocità", "velocita", "strata", "aeron", "joia-personalizada", "joia personalizada"];
        const filtrados = edges.filter(p => {
          const title = p.node.title.toLowerCase();
          const handle = p.node.handle.toLowerCase();
          return !exclusoes.some(ex => title.includes(ex) || handle.includes(ex));
        });
        setShopifyProducts(filtrados);
      })
      .catch(() => {/* silently fall back to static */})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = preview ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [preview]);

  const useShopify = shopifyProducts.length > 0;

  const handleAddToCart = async () => {
    if (!preview || preview.kind !== "shopify") return;
    const { product, variantIdx } = preview.data;
    const variant = product.node.variants.edges[variantIdx]?.node;
    if (!variant || !variant.availableForSale) return;
    setAdding(true);
    try {
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions,
        thumbnailImage: product.node.images?.edges?.[0]?.node ?? null,
      });
      setPreview(null);
      openCart();
    } finally {
      setAdding(false);
    }
  };

  return (
    <section id="produtos" className="sec" style={{ background: "#F8F5F0", padding: "96px 0 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div className="showcase-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A220", marginBottom: 10 }}>
              Catálogo
            </p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, color: "#1C1814", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Linha de joias <em>do Ateliê</em>
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "#6B5E52", marginTop: 10, lineHeight: 1.6, maxWidth: "46ch" }}>
              Cada joia é produzida com acabamento premium em Ouro 18k ou Prata. Personalize para a sua modalidade.
            </p>
          </div>
        </div>

        <style>{`
          @media(max-width:480px){.prod-grid{grid-template-columns:repeat(2,1fr)!important;}}
          .prod-card:hover .prod-zoom { opacity: 1 !important; }
        `}</style>

        {/* Loading skeleton */}
        {loading && (
          <div className="prod-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(28,24,20,0.07)" }}>
                <div style={{ aspectRatio: "2/3", background: "linear-gradient(90deg,#f0ebe4 25%,#e8e1d8 50%,#f0ebe4 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ height: 18, background: "#ede7df", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 12, background: "#ede7df", borderRadius: 4, width: "60%" }} />
                </div>
              </div>
            ))}
            <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
          </div>
        )}

        {/* Shopify products grid */}
        {!loading && useShopify && (
          <div className="prod-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {shopifyProducts.map((p) => {
              const product = p;
              const img = product.node.images?.edges?.[0]?.node?.url ?? "";
              const name = product.node.title;
              const price = product.node.priceRange.minVariantPrice;
              const hasMultipleVariants = product.node.variants.edges.length > 1;
              return (
                <div
                  key={product.node.id}
                  className="prod-card"
                  style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(28,24,20,0.07)", boxShadow: "0 2px 12px rgba(28,24,20,0.06)", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(28,24,20,0.14)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 2px 12px rgba(28,24,20,0.06)"; }}
                >
                  <div
                    style={{ position: "relative", aspectRatio: "2/3", background: "#F2EDE6", overflow: "hidden", cursor: "zoom-in" }}
                    onClick={() => setPreview({ kind: "shopify", data: { product, variantIdx: 0 } })}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={name}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.6s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "")}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: "#C9A220" }}>3R</span>
                      </div>
                    )}
                    <div className="prod-zoom" style={{ position: "absolute", inset: 0, background: "rgba(28,24,20,0.35)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.25s" }}>
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F8F5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px 16px" }}>
                    <div style={{ height: 68, display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: 8 }}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 400, color: "#1C1814", lineHeight: 1.2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {name}
                      </div>
                      {(() => {
                        const mats = getProductMaterials(product);
                        return (
                          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#6B5E52", display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <div style={{ display: "flex", gap: 2 }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#C9A220,#E8C84A)", display: "inline-block", flexShrink: 0 }} />
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#A0A0A0,#D4D4D4)", display: "inline-block", flexShrink: 0 }} />
                              </div>
                              {mats.join(" / ")}
                            </div>
                            <span style={{ fontSize: 9.5, color: "#C9A220", fontWeight: 600, letterSpacing: "0.03em" }}>Corrente + Pingente</span>
                          </div>
                        );
                      })()}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: "#C9A220" }}>
                        {fmtBRL(price.amount)}
                      </span>
                    </div>
                    <button
                      onClick={() => setPreview({ kind: "shopify", data: { product, variantIdx: 0 } })}
                      style={{
                        width: "100%",
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        color: "#1C1814",
                        background: "none",
                        border: "1px solid rgba(28,24,20,0.15)",
                        borderRadius: 8,
                        padding: "8px 12px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4
                      }}
                      onMouseEnter={e => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = "#1C1814";
                        target.style.color = "#F8F5F0";
                        target.style.borderColor = "#1C1814";
                      }}
                      onMouseLeave={e => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = "none";
                        target.style.color = "#1C1814";
                        target.style.borderColor = "rgba(28,24,20,0.15)";
                      }}
                    >
                      Ver detalhes →
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Renderizar as joias adicionais do ateliê (estáticas convertidas em mock Shopify) */}
            {ATELIE_EXTRA.map(({ nome, mat, img, preco }: any, i) => {
              const mockProduct = getAtelieProductMock(nome, mat, img, preco);
              return (
                <div
                  key={`extra-${i}`}
                  className="prod-card"
                  style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(28,24,20,0.07)", boxShadow: "0 2px 12px rgba(28,24,20,0.06)", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(28,24,20,0.14)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 2px 12px rgba(28,24,20,0.06)"; }}
                >
                  <div
                    style={{ position: "relative", aspectRatio: "2/3", background: "#F2EDE6", overflow: "hidden", cursor: "zoom-in" }}
                    onClick={() => setPreview({ kind: "shopify", data: { product: mockProduct, variantIdx: 0 } })}
                  >
                    <img
                      src={img}
                      alt={`${nome} ${mat}`}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.6s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "")}
                    />
                    <div className="prod-zoom" style={{ position: "absolute", inset: 0, background: "rgba(28,24,20,0.35)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.25s" }}>
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F8F5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px 16px" }}>
                    <div style={{ minHeight: 76, display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: 8 }}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 400, color: "#1C1814", lineHeight: 1.25, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {nome}
                      </div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#6B5E52", display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ display: "flex", gap: 2 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#C9A220,#E8C84A)", display: "inline-block", flexShrink: 0 }} />
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#A0A0A0,#D4D4D4)", display: "inline-block", flexShrink: 0 }} />
                          </div>
                          Ouro 18k / Prata
                        </div>
                        <span style={{ fontSize: 9.5, color: "#C9A220", fontWeight: 600, letterSpacing: "0.03em" }}>Corrente + Pingente</span>
                      </div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: "#C9A220" }}>
                        {preco ? fmtBRL(String(preco)) : "Sob consulta"}
                      </span>
                    </div>
                    <button
                      onClick={() => setPreview({ kind: "shopify", data: { product: mockProduct, variantIdx: 0 } })}
                      style={{
                        width: "100%",
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        color: "#1C1814",
                        background: "none",
                        border: "1px solid rgba(28,24,20,0.15)",
                        borderRadius: 8,
                        padding: "8px 12px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4
                      }}
                      onMouseEnter={e => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = "#1C1814";
                        target.style.color = "#F8F5F0";
                        target.style.borderColor = "#1C1814";
                      }}
                      onMouseLeave={e => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = "none";
                        target.style.color = "#1C1814";
                        target.style.borderColor = "rgba(28,24,20,0.15)";
                      }}
                    >
                      Ver detalhes →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Static fallback grid (when Shopify has no products) */}
        {!loading && !useShopify && (
          <div className="prod-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {STATIC.map(({ nome, mat, img, hot, preco }: any, i) => (
              <div
                key={i}
                className="prod-card"
                style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(28,24,20,0.07)", boxShadow: "0 2px 12px rgba(28,24,20,0.06)", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(28,24,20,0.14)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 2px 12px rgba(28,24,20,0.06)"; }}
              >
                <div
                  style={{ position: "relative", aspectRatio: "2/3", background: "#F2EDE6", overflow: "hidden", cursor: "zoom-in" }}
                  onClick={() => setPreview({ kind: "static", data: { img, nome, mat, preco } })}
                >
                  <img
                    src={img}
                    alt={`${nome} ${mat}`}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.6s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "")}
                  />
                  {hot && (
                    <div style={{ position: "absolute", top: 10, left: 10, background: "linear-gradient(135deg,#C9A220,#E8C84A)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, fontFamily: "'Inter',sans-serif" }}>
                      Popular
                    </div>
                  )}
                  <div className="prod-zoom" style={{ position: "absolute", inset: 0, background: "rgba(28,24,20,0.35)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.25s" }}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F8F5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ height: 68, display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 400, color: "#1C1814", marginBottom: 2 }}>{nome}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#6B5E52", display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ display: "flex", gap: 2 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#C9A220,#E8C84A)", display: "inline-block" }} />
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#A0A0A0,#D4D4D4)", display: "inline-block" }} />
                        </div>
                        Ouro 18k / Prata
                      </div>
                      <span style={{ fontSize: 9.5, color: "#C9A220", fontWeight: 600, letterSpacing: "0.03em" }}>Corrente + Pingente</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: "#C9A220" }}>
                      {preco ? fmtBRL(String(preco)) : "Sob consulta"}
                    </span>
                  </div>
                  <button
                    onClick={() => setPreview({ kind: "static", data: { img, nome, mat, preco } })}
                    style={{
                      width: "100%",
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      color: "#1C1814",
                      background: "none",
                      border: "1px solid rgba(28,24,20,0.15)",
                      borderRadius: 8,
                      padding: "8px 12px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4
                    }}
                    onMouseEnter={e => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = "#1C1814";
                      target.style.color = "#F8F5F0";
                      target.style.borderColor = "#1C1814";
                    }}
                    onMouseLeave={e => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = "none";
                      target.style.color = "#1C1814";
                      target.style.borderColor = "rgba(28,24,20,0.15)";
                    }}
                  >
                    Ver detalhes →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox — Static */}
      {preview?.kind === "static" && (() => {
        const { img, nome, mat, preco } = preview.data;
        return (
          <div
            onClick={() => setPreview(null)}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(28,24,20,0.88)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out" }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", background: "#fff", borderRadius: 20, overflow: "hidden", maxWidth: 520, width: "100%", boxShadow: "0 40px 100px rgba(28,24,20,0.50)" }}
            >
              <img src={img} alt={`${nome} ${mat}`} style={{ width: "100%", display: "block", objectFit: "cover" }} />
              <div style={{ padding: "20px 24px 24px", borderTop: "1px solid rgba(28,24,20,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 400, color: "#1C1814", marginBottom: 4 }}>{nome}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: "#C9A220" }}>
                      <div style={{ display: "flex", gap: 2 }}>
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "linear-gradient(135deg,#C9A220,#E8C84A)", display: "inline-block" }} />
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "linear-gradient(135deg,#A0A0A0,#D4D4D4)", display: "inline-block" }} />
                      </div>
                      Ouro 18k / Prata
                    </div>
                  </div>
                  <button onClick={() => setPreview(null)} style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid rgba(28,24,20,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B5E52", flexShrink: 0, cursor: "pointer", background: "none" }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                
                {/* Badge Corrente + Pingente */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start", background: "rgba(28,24,20,0.04)", border: "1px solid rgba(28,24,20,0.15)", borderRadius: 8, padding: "8px 14px", marginBottom: preco ? 16 : 20 }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#1C1814" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8M12 8v8" />
                  </svg>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em", color: "#1C1814" }}>
                    Conjunto: Corrente + Pingente
                  </span>
                </div>
                {preco && (
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 400, color: "#1C1814" }}>
                      {fmtBRL(String(preco))}
                    </span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(28,24,20,0.35)" }}>BRL</span>
                  </div>
                )}
                <a
                  href={WPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#1C1814", color: "#F8F5F0", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, padding: "14px 24px", borderRadius: 12, textDecoration: "none" }}
                >
                  Pedir no WhatsApp →
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Lightbox — Shopify */}
      {preview?.kind === "shopify" && (() => {
        const { product, variantIdx } = preview.data;
        const node = product.node;
        let variants = node.variants.edges;
        const selectedVariant = variants[variantIdx]?.node;
        const img = node.images?.edges?.[0]?.node?.url ?? "";
        const hasVariants = node.variants.edges.length > 1;

        return (
          <div
            onClick={() => setPreview(null)}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(28,24,20,0.88)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", cursor: "zoom-out" }}
          >
            <style>{`
              @media(max-width:640px){
                .lb-inner {
                  flex-direction: column !important;
                  max-height: 90vh !important;
                }
                .lb-img {
                  width: 100% !important;
                  height: 300px !important;
                  min-height: auto !important;
                  max-height: none !important;
                  flex-shrink: 0 !important;
                }
                .lb-image-container {
                  min-height: auto !important;
                  height: 100% !important;
                  flex: 1 !important;
                }
                .lb-info {
                  padding: 20px 24px 24px !important;
                  overflow-y: auto !important;
                  max-height: calc(90vh - 300px) !important;
                  flex: 1 !important;
                }
              }
              @keyframes spin{to{transform:rotate(360deg)}}
            `}</style>
            <div
              onClick={e => e.stopPropagation()}
              className="lb-inner"
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                maxWidth: 900,
                width: "100%",
                maxHeight: "88vh",
                boxShadow: "0 40px 100px rgba(28,24,20,0.55)",
                cursor: "auto",
              }}
            >
              {/* Botão de Fechar Absoluto (Design Premium Flutuante) */}
              <button
                onClick={() => setPreview(null)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "1px solid rgba(28,24,20,0.15)",
                  background: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1C1814",
                  cursor: "pointer",
                  zIndex: 90,
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              {/* Image — left panel */}
              <div
                className="lb-img"
                style={{ width: "48%", flexShrink: 0, background: (node.handle === "valenza" || node.title.toLowerCase().includes("valenza") || node.handle === "monarch" || node.title.toLowerCase().includes("monarch") || node.handle === "dominus" || node.title.toLowerCase().includes("dominus") || node.handle === "trion-elite" || node.title.toLowerCase().includes("trion") || node.handle === "velarion" || node.title.toLowerCase().includes("velarion") || node.handle === "imperium" || node.title.toLowerCase().includes("imperium") || ((node.handle === "titan" || node.title.toLowerCase().includes("titan") || node.handle === "velocita" || node.title.toLowerCase().includes("velocita") || node.title.toLowerCase().includes("velocità")) && !node.title.toLowerCase().includes("clássico") && !node.title.toLowerCase().includes("classico"))) ? "#000000" : "#F2EDE6", position: "relative", minHeight: 480, display: "flex", flexDirection: "column" }}
              >
                <div className="lb-image-container" style={{ flex: 1, position: "relative", minHeight: 380 }}>
                  {activePreviewImage ? (
                    <img
                      src={activePreviewImage}
                      alt={node.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
                    />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#C9A220" }}>3R</span>
                    </div>
                  )}
                </div>
                {(() => {
                  const handleLower = (node.handle || node.title).toLowerCase();
                  const isCorridaAtleta = handleLower.includes("corrida-atleta") || handleLower.includes("corrida atleta");
                  const isCorridaElite = handleLower.includes("corrida-elite") || handleLower.includes("corrida elite");
                  const isConjuntoCrossfit = handleLower.includes("conjunto-crossfit");
                  const isHalterElite = handleLower.includes("halter-elite") || handleLower.includes("halter elite");
                  const isHalter   = handleLower.includes("halter") && !handleLower.includes("elite");
                  const isVelox    = handleLower.includes("velox");
                  const isValenza  = handleLower.includes("valenza");
                  const isMonarch  = handleLower.includes("monarch");
                  const isDominus  = handleLower.includes("dominus");
                  const isTitan    = handleLower.includes("titan");
                  const isVelocita = handleLower.includes("velocita") || handleLower.includes("velocità");
                  const isTrion    = handleLower.includes("trion");
                  const isVelarion = handleLower.includes("velarion");
                  const isImperiumCrossfit = handleLower.includes("imperium-crossfit");
                  const isImperium = handleLower.includes("imperium") && !isImperiumCrossfit;
                  const showThumbs = isHalter || isHalterElite || isCorridaAtleta || isCorridaElite || isConjuntoCrossfit || isVelox || isTrion || isVelarion || isImperiumCrossfit || isImperium || isValenza || isMonarch || isDominus || isTitan || isVelocita;
                  if (!showThumbs) return null;

                  const isPrata = selectedVariant?.title.toLowerCase().includes("prata") ||
                    selectedVariant?.selectedOptions.some(o => o.value.toLowerCase().includes("prata"));

                  let thumbs: { src: string; alt: string }[] = [];

                  if (isConjuntoCrossfit) {
                    thumbs = [
                      { src: img,               alt: "Capa"      },
                      { src: conjuntoWodOuro,   alt: "OURO 18K"  },
                      { src: conjuntoEliteOuro, alt: "PRATA 925" },
                    ];
                  } else if (isCorridaAtleta) {
                    thumbs = [
                      { src: img,                   alt: "Capa"      },
                      { src: corridaAtletaOuroImg,  alt: "OURO 18K"  },
                      { src: corridaAtletaPrataImg, alt: "PRATA 925" },
                    ];
                  } else if (isCorridaElite) {
                    thumbs = [
                      { src: img,            alt: "Capa"      },
                      { src: titanJoiaOuro,  alt: "OURO 18K"  },
                      { src: titanJoiaPrata, alt: "PRATA 925" },
                    ];
                  } else if (isHalterElite) {
                    thumbs = [
                      { src: img,              alt: "Capa"      },
                      { src: linhaHalterOuro,  alt: "OURO 18K"  },
                      { src: linhaHalterPrata, alt: "PRATA 925" },
                    ];
                  } else if (isHalter) {
                    thumbs = [
                      { src: img,              alt: "Capa"      },
                      { src: linhaHalterOuro,  alt: "OURO 18K"  },
                      { src: linhaHalterPrata, alt: "PRATA 925" },
                    ];
                  } else if (isVelox) {
                    thumbs = [
                      { src: img,                 alt: "Capa"      },
                      { src: veloxRoyaleOuroMasc, alt: "OURO 18K"  },
                      { src: linhaVeloxPrata,     alt: "PRATA 925" },
                    ];
                  } else if (isTrion) {
                    thumbs = [
                      { src: img,               alt: "Capa"      },
                      { src: placaTriatloOuro,  alt: "OURO 18K"  },
                      { src: placaTriatloPrata, alt: "PRATA 925" },
                    ];
                  } else if (isVelarion) {
                    thumbs = [
                      { src: img,           alt: "Capa"      },
                      { src: velarionOuro,  alt: "OURO 18K"  },
                      { src: velarionPrata, alt: "PRATA 925" },
                    ];
                  } else if (isImperiumCrossfit) {
                    thumbs = [
                      { src: img,              alt: "Capa"      },
                      { src: linhaStrataOuro,  alt: "OURO 18K"  },
                      { src: linhaStrataPrata, alt: "PRATA 925" },
                    ];
                  } else if (isImperium) {
                    thumbs = [
                      { src: img,                    alt: "Capa"      },
                      { src: linhaImperiumOuro,      alt: "OURO 18K"  },
                      { src: linhaImperiumPrataNova, alt: "PRATA 925" },
                    ];
                  } else if (isDominus) {
                    thumbs = [
                      { src: img,              alt: "Capa"      },
                      { src: dominusJoiaOuro,  alt: "OURO 18K"  },
                      { src: dominusJoiaPrata, alt: "PRATA 925" },
                    ];
                  } else if (isMonarch) {
                    thumbs = [
                      { src: img,              alt: "Capa"      },
                      { src: monarchJoiaOuro,  alt: "OURO 18K"  },
                      { src: monarchJoiaPrata, alt: "PRATA 925" },
                    ];
                  } else if (isValenza) {
                    thumbs = [
                      { src: img,              alt: "Capa"      },
                      { src: valenzaJoia,      alt: "OURO 18K"  },
                      { src: valenzaJoiaPrata, alt: "PRATA 925" },
                    ];
                  } else {
                    let joiaImg = "";
                    if (isValenza)  joiaImg = isPrata ? valenzaJoiaPrata  : valenzaJoia;
                    else if (isMonarch)  joiaImg = isPrata ? monarchJoiaPrata  : monarchJoiaOuro;
                    else if (isDominus)  joiaImg = isPrata ? dominusJoiaPrata  : dominusJoiaOuro;
                    else if (isTitan)    joiaImg = isPrata ? titanJoiaPrata    : titanJoiaOuro;
                    else                 joiaImg = isPrata ? velocitaJoiaPrata : velocitaJoiaOuro;
                    thumbs = [
                      { src: img,     alt: "Campanha" },
                      { src: joiaImg, alt: "Joia"     },
                    ];
                  }

                  return (
                    <div style={{ display: "flex", gap: 8, padding: 12, background: "#fff", borderTop: "1px solid #eee", justifyContent: "center", zIndex: 10 }}>
                      {thumbs.map(({ src, alt }) => (
                        <button
                          key={alt}
                          onClick={() => setActivePreviewImage(src)}
                          style={{ width: 50, height: 50, padding: 0, border: activePreviewImage === src ? "2px solid #C9A220" : "1px solid #ddd", borderRadius: 4, overflow: "hidden", cursor: "pointer", background: "none" }}
                        >
                          <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </button>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Info — right panel (scrollable) */}
              <div
                className="lb-info"
                style={{ flex: 1, overflowY: "auto", padding: "36px 32px 32px", display: "flex", flexDirection: "column" }}
              >
                {/* Espaço compensatório para não bater com o botão de fechar absoluto no desktop */}
                <div style={{ height: 12 }} className="mobile-close-spacer" />
                <style>{`@media(max-width:640px){.mobile-close-spacer{display:none!important;}}`}</style>

                {/* Title */}
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 400, color: "#1C1814", lineHeight: 1.15, marginBottom: 14 }}>{node.title}</div>

                {/* Description */}
                {node.description && (
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 300, color: "#6B5E52", lineHeight: 1.75, marginBottom: 16 }}>{node.description}</p>
                )}

                {/* Detalhes do Conjunto e Tamanho */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start", background: "rgba(28,24,20,0.04)", border: "1px solid rgba(28,24,20,0.15)", borderRadius: 8, padding: "8px 14px" }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#1C1814" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8M12 8v8" />
                    </svg>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em", color: "#1C1814" }}>
                      Conjunto: Corrente + Pingente
                    </span>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,162,32,0.08)", border: "1px solid rgba(201,162,32,0.30)", borderRadius: 8, padding: "8px 14px" }}>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#C9A220" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 3 3 21" /><path d="M3 8V3h5" /><path d="M21 16v5h-5" />
                      </svg>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em", color: "#9a7c16" }}>
                        Tamanho do pingente: 2,5 cm
                      </span>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(63,122,74,0.08)", border: "1px solid rgba(63,122,74,0.30)", borderRadius: 8, padding: "8px 14px" }}>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#3f7a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                      </svg>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em", color: "#356b40" }}>
                        Prazo de produção e entrega: até 20 dias
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "auto" }}>
                  {/* Variant selector */}
                  {variants.length >= 1 && (() => {
                    const renderedMaterials: string[] = [];
                    const selectedVariantNode = variants[variantIdx]?.node;
                    const selectedMat = selectedVariantNode?.selectedOptions.find(o => o.name.toLowerCase().includes("material") || o.name.toLowerCase().includes("tipo"))?.value ?? selectedVariantNode?.title;

                    return (
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(28,24,20,0.40)", marginBottom: 10 }}>
                          Material
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {variants.map((ve, vi) => {
                            const v = ve.node;
                            const mat = v.selectedOptions.find(o => o.name.toLowerCase().includes("material") || o.name.toLowerCase().includes("tipo"))?.value ?? v.title;
                            
                            if (renderedMaterials.includes(mat)) {
                              return null;
                            }
                            renderedMaterials.push(mat);
                            
                            const selected = mat === selectedMat;
                            return (
                              <button
                                key={v.id}
                                onClick={() => {
                                  const matVal = v.selectedOptions.find(o => o.name.toLowerCase().includes("material"))?.value ?? v.title;
                                  const handleLb = (node.handle || node.title).toLowerCase();
                                  const isPrataLb = matVal.toLowerCase().includes("prata");
                                  let overrideImg: string | undefined;
                                  if (handleLb === "halter" || handleLb.includes("halter-elite")) {
                                    overrideImg = isPrataLb ? linhaHalterPrata : linhaHalterOuro;
                                  } else if (handleLb.includes("velox")) {
                                    overrideImg = isPrataLb ? linhaVeloxPrata : veloxRoyaleOuroMasc;
                                  } else if (handleLb.includes("trion")) {
                                    overrideImg = isPrataLb ? placaTriatloPrata : placaTriatloOuro;
                                  } else if (handleLb.includes("velarion")) {
                                    overrideImg = isPrataLb ? velarionPrata : velarionOuro;
                                  } else if (handleLb.includes("imperium-crossfit")) {
                                    overrideImg = isPrataLb ? linhaStrataPrata : linhaStrataOuro;
                                  } else if (handleLb.includes("imperium")) {
                                    overrideImg = isPrataLb ? linhaImperiumPrataNova : linhaImperiumOuro;
                                  } else if (handleLb.includes("conjunto-crossfit")) {
                                    overrideImg = isPrataLb ? conjuntoEliteOuro : conjuntoWodOuro;
                                  } else if (handleLb.includes("corrida-atleta")) {
                                    overrideImg = isPrataLb ? corridaAtletaPrataImg : corridaAtletaOuroImg;
                                  } else if (handleLb.includes("corrida-elite")) {
                                    overrideImg = isPrataLb ? titanJoiaPrata : titanJoiaOuro;
                                  } else if (handleLb.includes("dominus")) {
                                    overrideImg = isPrataLb ? dominusJoiaPrata : dominusJoiaOuro;
                                  } else if (handleLb.includes("monarch")) {
                                    overrideImg = isPrataLb ? monarchJoiaPrata : monarchJoiaOuro;
                                  } else if (handleLb.includes("valenza")) {
                                    overrideImg = isPrataLb ? valenzaJoiaPrata : valenzaJoia;
                                  }
                                  setPreview({ kind: "shopify", data: { product, variantIdx: vi, overrideImage: overrideImg } });
                                }}
                                disabled={!v.availableForSale}
                                style={{
                                  fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500,
                                  padding: "8px 18px", borderRadius: 100,
                                  border: selected ? "2px solid #C9A220" : "1.5px solid rgba(28,24,20,0.15)",
                                  background: selected ? "rgba(201,162,32,0.08)" : "transparent",
                                  color: selected ? "#C9A220" : "#6B5E52",
                                  cursor: v.availableForSale ? "pointer" : "not-allowed",
                                  opacity: v.availableForSale ? 1 : 0.4,
                                  transition: "all 0.2s",
                                }}
                              >
                                {mat}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Price */}
                  {(() => {
                    const isHalterLb = (node.handle || node.title).toLowerCase().includes("halter") && !node.title.toLowerCase().includes("elite");
                    const isPrataLb  = selectedVariant?.title.toLowerCase().includes("prata") ||
                      selectedVariant?.selectedOptions.some(o => o.value.toLowerCase().includes("prata"));
                    let displayPrice = selectedVariant ? selectedVariant.price.amount : node.priceRange.minVariantPrice.amount;
                    let parcelas: string | null = null;
                    if (isHalterLb) {
                      if (isPrataLb) {
                        displayPrice = "297";
                        parcelas = "em até 3x de R$ 99,00";
                      } else {
                        displayPrice = "3487";
                        parcelas = "em até 10x de R$ 348,70";
                      }
                    }
                    return (
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 400, color: "#1C1814" }}>
                            {fmtBRL(displayPrice)}
                          </span>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(28,24,20,0.35)" }}>BRL</span>
                        </div>
                        {parcelas && (
                          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#6B5E52", marginTop: 4 }}>
                            {parcelas}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Add to cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={adding || !selectedVariant?.availableForSale}
                    style={{
                      width: "100%", padding: "16px 24px", borderRadius: 12, border: "none",
                      background: selectedVariant?.availableForSale ? "#1C1814" : "rgba(28,24,20,0.10)",
                      color: selectedVariant?.availableForSale ? "#F8F5F0" : "#6B5E52",
                      fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
                      cursor: (adding || !selectedVariant?.availableForSale) ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "background 0.25s",
                    }}
                    onMouseEnter={e => { if (selectedVariant?.availableForSale && !adding) (e.currentTarget as HTMLElement).style.background = "#C9A220"; }}
                    onMouseLeave={e => { if (selectedVariant?.availableForSale) (e.currentTarget as HTMLElement).style.background = "#1C1814"; }}
                  >
                    {adding ? (
                      <>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Adicionando...
                      </>
                    ) : selectedVariant?.availableForSale ? (
                      "Adicionar ao Carrinho"
                    ) : (
                      "Indisponível"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default ProductShowcase;
