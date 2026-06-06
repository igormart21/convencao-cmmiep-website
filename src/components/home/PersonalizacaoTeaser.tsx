import { useRef, useState, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";
import { createShopifyCart, ShopifyProduct } from "@/lib/shopify";
import { Loader2, ShoppingBag, Zap } from "lucide-react";

const PRECO_OURO  = 1497;
const PRECO_PRATA = 347;

const MSGS_GERANDO = [
  "Analisando a pose e proporções da foto...",
  "Esculpindo os detalhes do rosto em metal...",
  "Gravando detalhes do cabelo e roupas...",
  "Aplicando polimento e reflexos metálicos...",
  "Finalizando a peça com qualidade de joalheria...",
  "Quase pronto, ajustando os últimos detalhes...",
];

const VARIANT_ID_OURO_PERS = "gid://shopify/ProductVariant/48912055468259"; 
const VARIANT_ID_PRATA_PERS = "gid://shopify/ProductVariant/48912055501027";

const getPersonalizadoProductMock = (material: "ouro" | "prata", imageUrl: string): ShopifyProduct => {
  const isOuro = material === "ouro";
  const variantId = isOuro ? VARIANT_ID_OURO_PERS : VARIANT_ID_PRATA_PERS;
  const priceAmount = isOuro ? "1497.00" : "347.00";
  
  return {
    node: {
      id: "gid://shopify/Product/Personalizado",
      title: `Pingente Personalizado (IA - ${isOuro ? "Ouro 18k" : "Prata 925"})`,
      description: "Você acabou de eternizar sua paixão com uma joia exclusiva gerada por IA.",
      handle: "pingente-personalizado-ia",
      featuredImage: {
        url: imageUrl,
        altText: "Pingente Personalizado"
      },
      priceRange: {
        minVariantPrice: {
          amount: priceAmount,
          currencyCode: "BRL"
        }
      },
      images: {
        edges: [
          {
            node: {
              url: imageUrl,
              altText: "Pingente Personalizado"
            }
          }
        ]
      },
      options: [
        {
          name: "Material",
          values: ["Ouro 18k", "Prata 925"]
        }
      ],
      variants: {
        edges: [
          {
            node: {
              id: variantId,
              title: isOuro ? "Ouro 18k" : "Prata 925",
              price: {
                amount: priceAmount,
                currencyCode: "BRL"
              },
              availableForSale: true,
              selectedOptions: [
                {
                  name: "Material",
                  value: isOuro ? "Ouro 18k" : "Prata 925"
                }
              ],
              image: {
                url: imageUrl,
                altText: "Pingente Personalizado"
              }
            }
          }
        ]
      }
    }
  };
};

const STEPS = [
  { n: "01", title: "Envie sua Foto de Referência", desc: "Uma foto sua correndo, pedalando, no palco ou treinando. Nossa IA de visão analisará sua pose com precisão para transformá-la na silhueta da joia." },
  { n: "02", title: "Escolha a Nobreza do Metal", desc: "Trabalhamos com Ouro 18k legítimo ou Prata 925 pura. O valor e o brilho do pingente se adaptam à sua escolha." },
  { n: "03", title: "Gere a Prévia e Compre", desc: "Veja o pingente virtual criado sob medida. Se amar o resultado, compre instantaneamente." },
];

type Estado = "idle" | "gerando" | "pronto" | "erro";

export const PersonalizacaoTeaser = () => {
  const inputRef      = useRef<HTMLInputElement>(null);
  const addItem       = useCartStore(s => s.addItem);
  const patchItem     = useCartStore(s => s.patchItem);
  const openCart      = useCartUIStore(s => s.openCart);

  const [foto, setFoto]               = useState<string | null>(null);
  const [fotoUrl, setFotoUrl]         = useState<string | null>(null);
  const [material, setMaterial]       = useState<"ouro" | "prata">("ouro");
  const [estado, setEstado]           = useState<Estado>("idle");
  const [resultado, setResultado]     = useState<string | null>(null);
  const [erro, setErro]               = useState<string | null>(null);
  const [comprando, setComprando]     = useState(false);
  const [adicionando, setAdicionando] = useState(false);
  const [adicionado, setAdicionado]   = useState(false);
  const [segundos, setSegundos]       = useState(0);
  const [msgIdx, setMsgIdx]           = useState(0);
  const timerRef                      = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (estado === "gerando") {
      setSegundos(0); setMsgIdx(0);
      timerRef.current = setInterval(() => {
        setSegundos(s => {
          const next = s + 1;
          setMsgIdx(Math.min(Math.floor(next / 12), MSGS_GERANDO.length - 1));
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [estado]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoUrl(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = ev => setFoto(ev.target?.result as string);
    reader.readAsDataURL(file);
    setResultado(null);
    setErro(null);
    setEstado("idle");
  };

  const handleGerar = async () => {
    console.log("[gerar-joia] handleGerar chamado, foto:", foto ? `${(foto.length/1024).toFixed(0)}KB` : "null");
    if (!foto) { console.warn("[gerar-joia] foto é null"); return; }
    setEstado("gerando");
    setErro(null);
    setResultado(null);
    try {
      console.log("[gerar-joia] enviando requisição...");
      const res = await fetch("/api/gerar-joia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: foto, material }),
      });
      console.log("[gerar-joia] status:", res.status);
      const data = await res.json();
      console.log("[gerar-joia] keys:", Object.keys(data), "imageUrl?", !!data.imageUrl);
      if (data.error) throw new Error(data.error);
      setResultado(data.imageUrl);
      setEstado("pronto");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao gerar imagem.";
      console.error("[gerar-joia] ERRO:", msg);
      setErro(msg);
      setEstado("erro");
    }
  };

  const preco     = material === "ouro" ? PRECO_OURO : PRECO_PRATA;
  const fmtPreco  = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

  const handleAddCart = async () => {
    if (!resultado) return;
    setAdicionando(true);
    const isOuro    = material === "ouro";
    const variantId = isOuro ? VARIANT_ID_OURO_PERS : VARIANT_ID_PRATA_PERS;
    const priceAmt  = isOuro ? "1497.00" : "347.00";
    const mockProduct = getPersonalizadoProductMock(material, resultado);
    const thumb     = { url: resultado, altText: "Pingente Personalizado" };
    try {
      await addItem({
        product: mockProduct,
        variantId,
        variantTitle: isOuro ? "Ouro 18k" : "Prata 925",
        price: { amount: priceAmt, currencyCode: "BRL" },
        quantity: 1,
        selectedOptions: [{ name: "Material", value: isOuro ? "Ouro 18k" : "Prata 925" }],
        thumbnailImage: thumb,
      });
      patchItem(variantId, { thumbnailImage: thumb, product: mockProduct, price: { amount: priceAmt, currencyCode: "BRL" } });
      setAdicionado(true);
      setTimeout(() => { setAdicionado(false); openCart(); }, 900);
    } catch (err) {
      console.error("[Shopify] Erro ao adicionar:", err);
      setErro("Erro ao adicionar ao carrinho. Tente novamente.");
      setEstado("erro");
    } finally {
      setAdicionando(false);
    }
  };

  const handleComprarAgora = async () => {
    if (!resultado) return;
    setComprando(true);
    try {
      const isOuro    = material === "ouro";
      const variantId = isOuro ? VARIANT_ID_OURO_PERS : VARIANT_ID_PRATA_PERS;
      const r = await createShopifyCart({ variantId, quantity: 1 });
      if (r?.checkoutUrl) {
        window.location.href = r.checkoutUrl;
      } else {
        setErro("Erro ao iniciar checkout. Tente adicionar ao carrinho.");
        setEstado("erro");
      }
    } catch (err) {
      console.error("[Shopify] Erro no checkout:", err);
      setErro("Erro ao conectar com o Shopify.");
      setEstado("erro");
    } finally {
      setComprando(false);
    }
  };

  return (
    <section id="personalizar" style={{ background: "radial-gradient(circle at top, #1A1512 0%, #0A0807 100%)", padding: "100px 0", position: "relative", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,32,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,32,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)", borderRadius: 100, padding: "6px 18px", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8C84A", display: "block", animation: "pers-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "#d4af37" }}>
              Exclusividade & Tecnologia
            </span>
          </div>
          <style>{`@keyframes pers-pulse{0%,100%{opacity:1}50%{opacity:0.35}} @keyframes pers-spin{to{transform:rotate(360deg)}}`}</style>

          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 300, color: "#f4ead0", lineHeight: 1.1, marginBottom: 16 }}>
            Eternize seu momento em uma <em style={{ fontStyle: "italic", color: "#E8C84A" }}>joia única</em>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.40)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Envie sua foto favorita praticando seu esporte e nossa IA gerará a gravação perfeita de silhueta no pingente. Escolha seu material e veja o design instantaneamente.
          </p>
        </div>

        {/* Grid */}
        <div className="pers-grid" style={{ display: "grid", gap: 56, alignItems: "start" }}>
          <style>{`
            .pers-grid {
              grid-template-columns: 1.1fr 0.9fr;
            }
            .pers-instructions {
              grid-column: 1;
              grid-row: 1;
            }
            .pers-material-panel {
              grid-column: 1;
              grid-row: 2;
            }
            .pers-preview-panel {
              grid-column: 2;
              grid-row: 1 / span 2;
            }
            .pers-result-img {
              max-width: 340px;
              height: auto;
            }
            @media(max-width:900px){
              .pers-grid {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }
              .pers-instructions {
                grid-column: 1 !important;
                grid-row: 3 !important;
                order: 3 !important;
              }
              .pers-material-panel {
                grid-column: 1 !important;
                grid-row: 2 !important;
                order: 2 !important;
              }
              .pers-preview-panel {
                grid-column: 1 !important;
                grid-row: 1 !important;
                order: 1 !important;
                min-height: auto !important;
              }
            }
            @media(max-width:600px){
              .pers-result-img {
                max-width: 260px !important;
              }
            }
            @media(max-width:480px){
              .pers-preview-panel {
                padding: 20px 16px !important;
              }
            }
          `}</style>

          {/* Passos do Processo */}
          <div className="pers-instructions" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 300, color: "#f4ead0", marginBottom: 10, borderBottom: "1px solid rgba(212,175,55,0.12)", paddingBottom: 12 }}>
                Como Funciona
              </h3>
              {STEPS.map(({ n, title, desc }) => (
                <div key={n} style={{ display: "flex", gap: 20 }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, border: "1px solid rgba(212,175,55,0.20)", background: "rgba(212,175,55,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 400, color: "#E8C84A" }}>{n}</span>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "#f4ead0", marginBottom: 6, fontWeight: 400 }}>{title}</h4>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Painel de Configurações de Material e Preço */}
            <div style={{ background: "rgba(20,16,12,0.4)", backdropFilter: "blur(10px)", border: "1px solid rgba(212,175,55,0.10)", borderRadius: 16, padding: "28px 24px" }}>
              <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", marginBottom: 16 }}>
                Selecione o Material da Joia
              </h4>
              
              <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
                {/* Botão Ouro */}
                <button 
                  onClick={() => { setMaterial("ouro"); setResultado(null); setEstado("idle"); }} 
                  disabled={estado === "gerando"}
                  style={{ 
                    flex: 1, 
                    padding: "16px 20px", 
                    borderRadius: 12, 
                    fontFamily: "'Inter',sans-serif", 
                    border: material === "ouro" ? "1.5px solid #E8C84A" : "1px solid rgba(255,255,255,0.08)", 
                    background: material === "ouro" ? "rgba(232,200,74,0.08)" : "transparent", 
                    color: material === "ouro" ? "#E8C84A" : "rgba(255,255,255,0.35)", 
                    cursor: estado === "gerando" ? "not-allowed" : "pointer", 
                    transition: "all 0.25s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>Ouro 18k</span>
                </button>

                {/* Botão Prata */}
                <button 
                  onClick={() => { setMaterial("prata"); setResultado(null); setEstado("idle"); }} 
                  disabled={estado === "gerando"}
                  style={{ 
                    flex: 1, 
                    padding: "16px 20px", 
                    borderRadius: 12, 
                    fontFamily: "'Inter',sans-serif", 
                    border: material === "prata" ? "1.5px solid #f0e6c8" : "1px solid rgba(255,255,255,0.08)", 
                    background: material === "prata" ? "rgba(255,255,255,0.05)" : "transparent", 
                    color: material === "prata" ? "#f0e6c8" : "rgba(255,255,255,0.35)", 
                    cursor: estado === "gerando" ? "not-allowed" : "pointer", 
                    transition: "all 0.25s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>Prata 925</span>
                </button>
              </div>

              {/* Botão de Ação de Geração */}
              <button 
                onClick={handleGerar} 
                disabled={!foto || estado === "gerando"}
                style={{ 
                  width: "100%", 
                  padding: "16px 0", 
                  borderRadius: 12, 
                  border: "none", 
                  background: !foto 
                    ? "rgba(255,255,255,0.04)" 
                    : estado === "gerando" 
                      ? "rgba(212,175,55,0.15)" 
                      : "linear-gradient(135deg,#C9A220,#E8C84A)", 
                  color: !foto 
                    ? "rgba(255,255,255,0.20)" 
                    : estado === "gerando" 
                      ? "rgba(255,255,255,0.40)" 
                      : "#1C1814", 
                  fontFamily: "'Inter',sans-serif", 
                  fontSize: 13, 
                  fontWeight: 700, 
                  letterSpacing: "0.05em", 
                  cursor: !foto || estado === "gerando" ? "not-allowed" : "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: 10,
                  transition: "all 0.2s"
                }}
              >
                {estado === "gerando" ? (
                  <>
                    <Loader2 size={16} style={{ animation: "col-spin 1s linear infinite" }} />
                    Criando design da joia...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    {resultado ? "Gerar Nova Versão" : "Gerar Meu Pingente Exclusivo"}
                  </>
                )}
              </button>
              {!foto && (
                <p style={{ textAlign: "center", fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(212,175,55,0.40)", marginTop: 10, marginBottom: 0 }}>
                  * Envie sua foto no painel acima primeiro para liberar a criação por IA
                </p>
              )}
            </div>

          {/* Lado Direito - Preview / Upload Box */}
          <div className="pers-preview-panel" style={{ display: "flex", flexDirection: "column" }}>
            
            {/* Box Interativo Principal */}
            <div style={{
              background: "rgba(15,12,10,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: 24,
              padding: estado === "pronto" ? "24px" : "28px 24px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              ...(estado !== "pronto" && { minHeight: 520, justifyContent: "center" }),
            }}>
              
              {/* ESTADO 1: Idle (Apenas Upload de Foto) */}
              {estado === "idle" && !resultado && (
                <div 
                  onClick={() => inputRef.current?.click()}
                  style={{ 
                    flex: 1, 
                    border: "2px dashed rgba(212,175,55,0.25)", 
                    borderRadius: 18, 
                    cursor: "pointer", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    padding: 40, 
                    textAlign: "center",
                    transition: "all 0.3s",
                    background: "rgba(255,255,255,0.01)"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#E8C84A";
                    e.currentTarget.style.background = "rgba(212,175,55,0.02)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.01)";
                  }}
                >
                  <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
                  
                  {fotoUrl ? (
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto", borderRadius: "50%", overflow: "hidden", border: "2px solid #E8C84A", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                        <img src={fotoUrl} alt="Foto Carregada" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#E8C84A", fontWeight: 600, display: "block", marginBottom: 4 }}>✓ Imagem Carregada</span>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.30)", textDecoration: "underline" }}>Trocar Foto</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(212,175,55,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#E8C84A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                      <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#f4ead0", marginBottom: 8, fontWeight: 400 }}>
                        Envie sua Foto Esportiva
                      </h4>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: 260, margin: 0 }}>
                        Arraste ou clique para carregar fotos in JPG, PNG ou WEBP.
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* ESTADO 2: Gerando (Loader e Efeitos de Carregamento) */}
              {estado === "gerando" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
                  <div style={{ position: "relative", marginBottom: 30 }}>
                    <div style={{ width: 90, height: 90, borderRadius: "50%", border: "2px solid rgba(212,175,55,0.08)", borderTopColor: "#E8C84A", animation: "col-spin 1.2s linear infinite" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#E8C84A" strokeWidth="1.5" style={{ animation: "pulse 2s infinite" }}>
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                  </div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#f4ead0", marginBottom: 8, fontWeight: 400 }}>
                    Nossa IA está esculpindo sua joia
                  </h4>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 300, margin: "0 auto", minHeight: 40 }}>
                    {MSGS_GERANDO[msgIdx]}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: "#E8C84A", minWidth: 32 }}>
                      {segundos}s
                    </span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>·</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                      pode levar até 60 segundos
                    </span>
                  </div>
                  <div style={{ width: 240, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginTop: 14, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      background: "linear-gradient(90deg, #E8C84A, #f4ead0)",
                      borderRadius: 3,
                      width: `${Math.min((segundos / 60) * 100, 95)}%`,
                      transition: "width 1s linear"
                    }} />
                  </div>
                </div>
              )}

              {/* ESTADO 3: Pronto (Exibição da Joia Gerada) */}
              {estado === "pronto" && resultado && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                  {/* Imagem — sem container fixo */}
                  <img
                    src={resultado}
                    alt="Joia gerada por IA"
                    className="pers-result-img"
                    style={{
                      display: "block",
                      width: "90%",
                      margin: "0 auto",
                      borderRadius: 14,
                      border: material === "ouro" ? "1.5px solid rgba(232,200,74,0.35)" : "1.5px solid rgba(255,255,255,0.18)",
                      boxShadow: material === "ouro"
                        ? "0 16px 48px rgba(232,200,74,0.12), 0 4px 16px rgba(0,0,0,0.4)"
                        : "0 16px 48px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.4)",
                    }}
                  />

                  {/* Mensagem + Preço em destaque */}
                  <div style={{ textAlign: "center", padding: "0 8px" }}>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8C84A", marginBottom: 8 }}>
                      ✦ Personalizado
                    </div>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontStyle: "italic", color: "#f4ead0", margin: "0 0 14px", lineHeight: 1.3 }}>
                      "Você acabou de eternizar sua paixão."
                    </p>

                    {/* Preço destacado */}
                    <div style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: 12, 
                      background: material === "ouro" ? "rgba(232,200,74,0.08)" : "rgba(255,255,255,0.05)", 
                      border: material === "ouro" ? "1px solid rgba(232,200,74,0.25)" : "1px solid rgba(255,255,255,0.12)", 
                      borderRadius: 14, 
                      padding: "12px 24px" 
                    }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.50)" }}>
                        Pingente {material === "ouro" ? "Ouro 18k" : "Prata 925"}
                      </span>
                      <span style={{ 
                        fontFamily: "'Cormorant Garamond',serif", 
                        fontSize: "1.8rem", 
                        fontWeight: 600, 
                        color: material === "ouro" ? "#E8C84A" : "#f0e6c8",
                        letterSpacing: "-0.02em"
                      }}>
                        {fmtPreco(preco)}
                      </span>
                    </div>
                  </div>

                  {/* Botões de Compra */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button 
                      onClick={handleComprarAgora} 
                      disabled={comprando}
                      style={{ 
                        width: "100%", 
                        padding: "15px 0", 
                        borderRadius: 12, 
                        border: "none", 
                        background: "linear-gradient(135deg,#C9A220,#E8C84A)", 
                        color: "#1C1814", 
                        fontFamily: "'Inter',sans-serif", 
                        fontSize: 13, 
                        fontWeight: 700, 
                        letterSpacing: "0.05em", 
                        cursor: comprando ? "not-allowed" : "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        gap: 8,
                        boxShadow: "0 8px 24px rgba(232,200,74,0.20)",
                        transition: "all 0.2s"
                      }}
                    >
                      {comprando ? (
                        <Loader2 size={14} style={{ animation: "pers-spin 1s linear infinite" }} />
                      ) : (
                        <>
                          <Zap size={14} strokeWidth={2} />
                          Comprar Agora
                        </>
                      )}
                    </button>

                    <button 
                      onClick={handleAddCart} 
                      disabled={adicionando || adicionado}
                      style={{ 
                        width: "100%", 
                        padding: "13px 0", 
                        borderRadius: 12, 
                        border: "1px solid rgba(212,175,55,0.30)", 
                        background: adicionado ? "rgba(42,122,71,0.1)" : "transparent", 
                        color: adicionado ? "#4ade80" : "#E8C84A", 
                        fontFamily: "'Inter',sans-serif", 
                        fontSize: 12, 
                        fontWeight: 600, 
                        letterSpacing: "0.05em", 
                        cursor: adicionando || adicionado ? "not-allowed" : "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        gap: 8,
                        borderColor: adicionado ? "#4ade80" : "rgba(212,175,55,0.30)",
                        transition: "all 0.2s"
                      }}
                    >
                      {adicionando ? (
                        <Loader2 size={14} style={{ animation: "pers-spin 1s linear infinite" }} />
                      ) : adicionado ? (
                        "✓ Adicionado ao Carrinho!"
                      ) : (
                        <>
                          <ShoppingBag size={14} strokeWidth={1.5} />
                          Adicionar ao Carrinho
                        </>
                      )}
                    </button>

                    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 4 }}>
                      <button 
                        onClick={handleGerar}
                        disabled={estado === "gerando"}
                        style={{ background: "none", border: "none", color: "rgba(255,255,255,0.30)", fontFamily: "'Inter',sans-serif", fontSize: 11, cursor: "pointer", textDecoration: "underline" }}
                      >
                        Gerar novamente
                      </button>
                      <button 
                        onClick={() => { setFoto(null); setFotoUrl(null); setResultado(null); setEstado("idle"); }} 
                        style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif", fontSize: 11, cursor: "pointer", textDecoration: "underline" }}
                      >
                        Nova foto
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* ESTADO 4: Erro */}
              {estado === "erro" && erro && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(224,112,112,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#E07070" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "#f4ead0", marginBottom: 8, fontWeight: 400 }}>
                    Falha na Criação
                  </h4>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.40)", lineHeight: 1.6, marginBottom: 20 }}>
                    Não conseguimos converter a foto em silhueta de joia neste momento. Pode ter ocorrido uma instabilidade temporária na IA.
                  </p>
                  <button 
                    onClick={handleGerar}
                    style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: "rgba(255,255,255,0.08)", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    Tentar Novamente
                  </button>
                  <button 
                    onClick={() => { setFoto(null); setFotoUrl(null); setResultado(null); setEstado("idle"); }} 
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif", fontSize: 11, cursor: "pointer", textDecoration: "underline", marginTop: 12 }}
                  >
                    Trocar Foto
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PersonalizacaoTeaser;
