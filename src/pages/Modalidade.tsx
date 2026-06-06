import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { ArrowLeft, Check, Loader2, Sparkles, Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { getShopifyProductUrl } from "@/lib/shopifyExternal";
import { supabase } from "@/integrations/supabase/client";
import fisiculturismoHero from "@/assets/fisiculturismo-hero.png";
import fisiculturismoHeroBg from "@/assets/fisiculturismo-hero-bg.png";
import ciclismoHeroBg from "@/assets/ciclismo-hero-bg.png";
import corridaHeroBg from "@/assets/corrida-hero-bg.png";
import crossfitHeroBg from "@/assets/crossfit-hero-bg.png";
import musculacaoHeroBg from "@/assets/musculacao-hero-bg.png";
import triathlonHeroBg from "@/assets/triathlon-hero-bg.png";

// Bonecos FISICULTURISMO
import bonecoFisiFemClassicoOuro from "@/assets/boneco-fisiculturismo-fem-classico-ouro.jpg";
import bonecoFisiFemUndergroundOuro from "@/assets/boneco-fisiculturismo-fem-underground-ouro.jpg";
import bonecoFisiMascClassicoOuro from "@/assets/boneco-fisiculturismo-masc-classico-ouro.jpg";
import bonecoFisiMascUndergroundOuro from "@/assets/boneco-fisiculturismo-masc-underground-ouro.jpg";
import bonecoFisiFemClassicoPrata from "@/assets/boneco-fisiculturismo-fem-classico-prata.jpg";
import bonecoFisiFemUndergroundPrata from "@/assets/boneco-fisiculturismo-fem-underground-prata.jpg";
import bonecoFisiMascClassicoPrata from "@/assets/boneco-fisiculturismo-masc-classico-prata.jpg";
import bonecoFisiMascUndergroundPrata from "@/assets/boneco-fisiculturismo-masc-underground-prata.jpg";

// Bonecos MUSCULAÇÃO
import bonecoMuscFemClassicoOuro from "@/assets/boneco-musculacao-fem-classico-ouro.jpg";
import bonecoMuscFemUndergroundOuro from "@/assets/boneco-musculacao-fem-underground-ouro.jpg";
import bonecoMuscMascClassicoOuro from "@/assets/boneco-musculacao-masc-classico-ouro.jpg";
import bonecoMuscMascUndergroundOuro from "@/assets/boneco-musculacao-masc-underground-ouro.jpg";
import bonecoMuscFemClassicoPrata from "@/assets/boneco-musculacao-fem-classico-prata.jpg";
import bonecoMuscFemUndergroundPrata from "@/assets/boneco-musculacao-fem-underground-prata.jpg";
import bonecoMuscMascClassicoPrata from "@/assets/boneco-musculacao-masc-classico-prata.jpg";
import bonecoMuscMascUndergroundPrata from "@/assets/boneco-musculacao-masc-underground-prata.jpg";

// Bonecos TRIATHLON
import bonecoTriFemClassicoOuro from "@/assets/boneco-triatlon-fem-classico-ouro.jpg";
import bonecoTriFemUndergroundOuro from "@/assets/boneco-triatlon-fem-underground-ouro.jpg";
import bonecoTriMascClassicoOuro from "@/assets/boneco-triatlon-masc-classico-ouro.jpg";
import bonecoTriMascUndergroundOuro from "@/assets/boneco-triatlon-masc-underground-ouro.jpg";
import bonecoTriFemClassicoPrata from "@/assets/boneco-triatlon-fem-classico-prata.jpg";
import bonecoTriFemUndergroundPrata from "@/assets/boneco-triatlon-fem-underground-prata.jpg";
import bonecoTriMascClassicoPrata from "@/assets/boneco-triatlon-masc-classico-prata.jpg";
import bonecoTriMascUndergroundPrata from "@/assets/boneco-triatlon-masc-underground-prata.jpg";

// Bikes CICLISMO (Speed como default)
import bikeSpeedClassicoOuro from "@/assets/bike-speed-classico-ouro.jpg";
import bikeSpeedClassicoPrata from "@/assets/bike-speed-classico-prata.jpg";
import bikeSpeedUndergroundMascOuro from "@/assets/bike-speed-underground-masculino-ouro.jpg";
import bikeSpeedUndergroundMascPrata from "@/assets/bike-speed-underground-masculino-prata.jpg";
import bikeSpeedUndergroundFemOuro from "@/assets/bike-speed-underground-feminino-ouro.jpg";
import bikeSpeedUndergroundFemPrata from "@/assets/bike-speed-underground-feminino-prata.jpg";

// Bonecos CROSSFIT
import bonecoCrossFemClassicoOuro from "@/assets/boneco-crossfit-fem-classico-ouro.jpg";
import bonecoCrossFemUndergroundOuro from "@/assets/boneco-crossfit-fem-underground-ouro.jpg";
import bonecoCrossMascClassicoOuro from "@/assets/boneco-crossfit-masc-classico-ouro.jpg";
import bonecoCrossMascUndergroundOuro from "@/assets/boneco-crossfit-masc-underground-ouro.jpg";
import bonecoCrossFemClassicoPrata from "@/assets/boneco-crossfit-fem-classico-prata.jpg";
import bonecoCrossFemUndergroundPrata from "@/assets/boneco-crossfit-fem-underground-prata.jpg";
import bonecoCrossMascClassicoPrata from "@/assets/boneco-crossfit-masc-classico-prata.jpg";
import bonecoCrossMascUndergroundPrata from "@/assets/boneco-crossfit-masc-underground-prata.jpg";

// Bonecos CORRIDA
import bonecoCorrFemClassicoOuro from "@/assets/boneco-corredores-fem-classico-ouro.jpg";
import bonecoCorrFemUndergroundOuro from "@/assets/boneco-corredores-fem-underground-ouro.jpg";
import bonecoCorrMascClassicoOuro from "@/assets/boneco-corredores-masc-classico-ouro.jpg";
import bonecoCorrMascUndergroundOuro from "@/assets/boneco-corredores-masc-underground-ouro.jpg";
import bonecoCorrFemClassicoPrata from "@/assets/boneco-corredores-fem-classico-prata.jpg";
import bonecoCorrFemUndergroundPrata from "@/assets/boneco-corredores-fem-underground-prata.jpg";
import bonecoCorrMascClassicoPrata from "@/assets/boneco-corredores-masc-classico-prata.jpg";
import bonecoCorrMascUndergroundPrata from "@/assets/boneco-corredores-masc-underground-prata.jpg";

/* ===================== Configuração por modalidade ===================== */

type Genero = "Masculino" | "Feminino";
type Material = "Prata 925" | "Ouro 18K";
type Estilo = "Clássico" | "Underground";
type CtaFieldKey = "nome" | "palavra" | "km" | "data" | "tempo";

type ModalidadeConfig = {
  slug: string;
  nome: string;
  fraseImpacto: string;
  /** Imagem de hero (background). Se não definida, usa o hero padrão (fisiculturismo). */
  heroBg?: string;
  /** Posição do background (CSS background-position). Default: "center top". */
  heroBgPosition?: string;
  /** Tamanho do background (CSS background-size). Default: "cover". */
  heroBgSize?: string;
  bonecos: Record<Material, Record<Genero, Record<Estilo, string>>>;
  // Quais campos de gravação habilitar para esta modalidade
  camposGravacao: CtaFieldKey[];
};

const MODALIDADES: Record<string, ModalidadeConfig> = {
  "1": {
    slug: "fisiculturismo",
    nome: "Fisiculturismo",
    fraseImpacto: "Seu corpo é sua obra. Merece ser representado.",
    heroBg: fisiculturismoHeroBg,
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoFisiMascClassicoOuro, Underground: bonecoFisiMascUndergroundOuro },
        Feminino: { "Clássico": bonecoFisiFemClassicoOuro, Underground: bonecoFisiFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoFisiMascClassicoPrata, Underground: bonecoFisiMascUndergroundPrata },
        Feminino: { "Clássico": bonecoFisiFemClassicoPrata, Underground: bonecoFisiFemUndergroundPrata },
      },
    },
    camposGravacao: [],
  },
  "2": {
    slug: "musculacao",
    nome: "Musculação",
    fraseImpacto: "Cada repetição é uma promessa cumprida.",
    heroBg: musculacaoHeroBg,
    heroBgPosition: "center top",
    heroBgSize: "100% auto",
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoMuscMascClassicoOuro, Underground: bonecoMuscMascUndergroundOuro },
        Feminino: { "Clássico": bonecoMuscFemClassicoOuro, Underground: bonecoMuscFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoMuscMascClassicoPrata, Underground: bonecoMuscMascUndergroundPrata },
        Feminino: { "Clássico": bonecoMuscFemClassicoPrata, Underground: bonecoMuscFemUndergroundPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "data"],
  },
  "3": {
    slug: "triathlon",
    nome: "Triatlo",
    fraseImpacto: "Resistência em todos os níveis.",
    heroBg: triathlonHeroBg,
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoTriMascClassicoOuro, Underground: bonecoTriMascUndergroundOuro },
        Feminino: { "Clássico": bonecoTriFemClassicoOuro, Underground: bonecoTriFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoTriMascClassicoPrata, Underground: bonecoTriMascUndergroundPrata },
        Feminino: { "Clássico": bonecoTriFemClassicoPrata, Underground: bonecoTriFemUndergroundPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "data"],
  },
  "4": {
    slug: "ciclismo",
    nome: "Ciclismo",
    fraseImpacto: "Cada pedalada conta uma história.",
    heroBg: ciclismoHeroBg,
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bikeSpeedClassicoOuro, Underground: bikeSpeedUndergroundMascOuro },
        Feminino: { "Clássico": bikeSpeedClassicoOuro, Underground: bikeSpeedUndergroundFemOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bikeSpeedClassicoPrata, Underground: bikeSpeedUndergroundMascPrata },
        Feminino: { "Clássico": bikeSpeedClassicoPrata, Underground: bikeSpeedUndergroundFemPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "km", "data", "tempo"],
  },
  "5": {
    slug: "crossfit",
    nome: "Crossfit",
    fraseImpacto: "Força forjada em cada movimento.",
    heroBg: crossfitHeroBg,
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoCrossMascClassicoOuro, Underground: bonecoCrossMascUndergroundOuro },
        Feminino: { "Clássico": bonecoCrossFemClassicoOuro, Underground: bonecoCrossFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoCrossMascClassicoPrata, Underground: bonecoCrossMascUndergroundPrata },
        Feminino: { "Clássico": bonecoCrossFemClassicoPrata, Underground: bonecoCrossFemUndergroundPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "data"],
  },
  "6": {
    slug: "corrida",
    nome: "Corrida",
    fraseImpacto: "Cada quilômetro, uma conquista.",
    heroBg: corridaHeroBg,
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoCorrMascClassicoOuro, Underground: bonecoCorrMascUndergroundOuro },
        Feminino: { "Clássico": bonecoCorrFemClassicoOuro, Underground: bonecoCorrFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoCorrMascClassicoPrata, Underground: bonecoCorrMascUndergroundPrata },
        Feminino: { "Clássico": bonecoCorrFemClassicoPrata, Underground: bonecoCorrFemUndergroundPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "km", "data", "tempo"],
  },
};

/* ===================== Componentes auxiliares ===================== */

const SectionTitle = ({ numeral, label }: { numeral: string; label: string }) => (
  <div className="flex items-center justify-center gap-2 mb-1.5 text-center">
    <span className="font-display text-[8px] tracking-[0.5em] text-white">{numeral}</span>
    <h3 className="font-display text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white whitespace-nowrap">
      {label}
    </h3>
  </div>
);

const ChoiceButton = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`relative font-display tracking-[0.2em] uppercase text-[9px] md:text-[10px] transition-all duration-300 border rounded-none px-2.5 py-1.5 ${
      selected
        ? "border-accent text-accent-foreground shadow-[0_0_24px_-4px_hsl(var(--accent)/0.55)]"
        : "border-border/60 text-foreground/85 hover:border-accent/70 hover:text-accent"
    }`}
    style={
      selected
        ? {
            backgroundImage:
              "linear-gradient(135deg, hsl(43 65% 22% / 0.9) 0%, hsl(43 75% 35% / 0.85) 50%, hsl(43 65% 22% / 0.9) 100%)",
          }
        : undefined
    }
  >
    {selected && (
      <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md">
        <Check className="h-2.5 w-2.5" strokeWidth={3} />
      </span>
    )}
    {children}
  </button>
);

/* ===================== Página ===================== */

const Modalidade = () => {
  const { id, slug } = useParams();
  const config = useMemo(() => {
    if (slug) return Object.values(MODALIDADES).find((m) => m.slug === slug);
    if (id) return MODALIDADES[id];
    return undefined;
  }, [id, slug]);

  // Se a modalidade não existe ainda, redireciona para a página antiga (legado)
  if (!config) {
    return <Navigate to="/catalogo" replace />;
  }

  return <ModalidadePage config={config} />;
};

const ModalidadePage = ({ config }: { config: ModalidadeConfig }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  useEffect(() => {
    import("@/stores/modalidadeStore").then(({ useModalidadeStore }) =>
      useModalidadeStore.getState().setModalidade(config.slug),
    );
  }, [config.slug]);

  const [genero, setGenero] = useState<Genero | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);
  const [estilo, setEstilo] = useState<Estilo | null>(null);
  const [estiloHover, setEstiloHover] = useState<Estilo | null>(null);

  // Fisiculturismo — campos de significado + jornada guiada
  const [eternizar, setEternizar] = useState("");
  const [palavraSig, setPalavraSig] = useState("");
  const [momento, setMomento] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const isLuxury = true;

  // Gravação (apenas uma opção por joia)
  const [nome, setNome] = useState("");
  const [palavra, setPalavra] = useState("");
  const [km, setKm] = useState("");
  const [data, setData] = useState("");
  const [tempo, setTempo] = useState("");

  const personalizacaoEscolhida: CtaFieldKey | null = nome.trim()
    ? "nome"
    : palavra.trim()
    ? "palavra"
    : km
    ? "km"
    : data.trim()
    ? "data"
    : tempo.trim()
    ? "tempo"
    : null;

  const setExclusivo = (key: CtaFieldKey, value: string) => {
    // Limpa os outros, mantém apenas o atual
    if (key !== "nome") setNome("");
    if (key !== "palavra") setPalavra("");
    if (key !== "km") setKm("");
    if (key !== "data") setData("");
    if (key !== "tempo") setTempo("");
    if (key === "nome") setNome(value);
    if (key === "palavra") setPalavra(value);
    if (key === "km") setKm(value);
    if (key === "data") setData(value);
    if (key === "tempo") setTempo(value);
  };

  const valorGravacao = () => nome || palavra || km || data || tempo || "";

  // Regra: para crossfit e triathlon, só liberar gravação no estilo "Personalizado" (Underground)
  const exigeUnderground = config.slug === "crossfit" || config.slug === "triathlon";
  const gravacaoLiberada = config.camposGravacao.length > 0 && (!exigeUnderground || estilo === "Underground");

  // Posicionamento da gravação em tempo real sobre o pingente (preview)
  type OverlayStyle = {
    top: string;
    left: string;
    width: string;
    transform?: string;
    rotate?: number;
  };
  const overlayPos: OverlayStyle = useMemo(() => {
    const fem = genero === "Feminino";
    switch (config.slug) {
      case "musculacao":
        if (fem) return { top: "48%", left: "50%", width: "16%", transform: "translate(-50%,-50%)" };
        return { top: "46%", left: "47%", width: "22%", transform: "translate(-50%,-50%)" };
      case "corrida":
        if (fem) return { top: "48%", left: "50%", width: "16%", transform: "translate(-50%,-50%)" };
        return { top: "46%", left: "47%", width: "22%", transform: "translate(-50%,-50%)" };
      case "fisiculturismo":
        if (fem) return { top: "48%", left: "50%", width: "16%", transform: "translate(-50%,-50%)" };
        return { top: "46%", left: "47%", width: "22%", transform: "translate(-50%,-50%)" };
      case "triathlon":
        if (fem) return { top: "48%", left: "42%", width: "16%", transform: "translate(-50%,-50%) rotate(-8deg)" };
        return { top: "48%", left: "43%", width: "22%", transform: "translate(-50%,-50%) rotate(-8deg)" };
      case "crossfit":
        return { top: "88%", left: "50%", width: "44%", transform: "translate(-50%,-50%)" };
      default:
        return { top: "45%", left: "50%", width: "26%", transform: "translate(-50%,-50%)" };
    }
  }, [config.slug, genero]);

  const overlayTexto = (gravacaoLiberada ? valorGravacao() : "").trim();
  // Ajuste automático: quanto mais caracteres, menor a fonte (cabe sempre dentro do boneco)
  const overlayFontSize = useMemo(() => {
    const len = Math.max(overlayTexto.length, 1);
    // base
    let size: number;
    if (len <= 4) size = 18;
    else if (len <= 8) size = 14;
    else if (len <= 12) size = 11;
    else if (len <= 16) size = 9;
    else size = 8;
    // Boneca feminina musculação tem peito menor — reduz pra caber
    if (genero === "Feminino" && ["musculacao", "corrida", "fisiculturismo", "triathlon"].includes(config.slug)) {
      size = Math.max(5, Math.round(size * 0.5));
    }
    return size;
  }, [overlayTexto, config.slug, genero]);

  // Foto → pingente IA
  const fotoInputRef = useRef<HTMLInputElement>(null);
  const [fotoCliente, setFotoCliente] = useState<string | null>(null);
  const [pingenteGerado, setPingenteGerado] = useState<string | null>(null);
  const [gerandoPingente, setGerandoPingente] = useState(false);

  const [adicionando, setAdicionando] = useState(false);

  // Imagem de preview (fundo preto, à esquerda)
  const previewSrc = useMemo(() => {
    if (pingenteGerado) return pingenteGerado;
    const mat = material ?? "Prata 925";
    const gen = genero ?? "Masculino";
    const est = estilo ?? "Clássico";
    return config.bonecos[mat][gen][est];
  }, [pingenteGerado, material, genero, estilo, config]);

  const fetchAsDataUrl = async (url: string): Promise<string | null> => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onloadend = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  };

  const gerarPingente = async (dataUrl: string) => {
    setPingenteGerado(null);
    setGerandoPingente(true);
    try {
      const refUrl = config.bonecos[material ?? "Prata 925"][genero ?? "Masculino"][estilo ?? "Clássico"];
      const referenceImageDataUrl = await fetchAsDataUrl(refUrl);
      const { data: result, error } = await supabase.functions.invoke("gerar-pingente", {
        body: {
          imageDataUrl: dataUrl,
          referenceImageDataUrl,
          categoria: config.nome,
          material: material ?? "Prata 925",
          estilo: estilo ?? "Clássico",
          genero: genero ?? "Masculino",
          inscricao: valorGravacao(),
        },
      });
      if (error) {
        const status = (error as any)?.context?.status;
        if (status === 402) {
          toast.error("Os créditos de IA acabaram. A pré-visualização com IA está temporariamente indisponível — sua joia pode ser solicitada normalmente.");
          setFotoCliente(null);
          return;
        }
        if (status === 429) {
          toast.error("Muitas solicitações no momento. Aguarde alguns instantes e tente novamente.");
          return;
        }
        throw error;
      }
      if (!result?.imageUrl) throw new Error("Imagem não retornada");
      setPingenteGerado(result.imageUrl);
      toast.success("Sua joia foi modelada!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Não foi possível gerar o pingente.");
    } finally {
      setGerandoPingente(false);
    }
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A foto deve ter no máximo 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      setFotoCliente(url);
      gerarPingente(url);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const podeAdicionar = !!genero && !!material && !!estilo;

  const handleAdicionar = async () => {
    if (!podeAdicionar) {
      toast.error("Escolha gênero, metal e estilo.");
      return;
    }
    setAdicionando(true);
    try {
      const data1 = await storefrontApiRequest(STOREFRONT_QUERY, { first: 5, query: null });
      const products: ShopifyProduct[] = data1?.data?.products?.edges || [];
      const product = products.find((p) =>
        p.node.variants.edges.some((v) => v.node.availableForSale)
      );
      if (!product) {
        toast.message("Abrindo nossa coleção.");
        setTimeout(() => navigate("/colecao"), 400);
        return;
      }
      const variant = product.node.variants.edges.find((v) => v.node.availableForSale)!.node;

      const personalizacao = [
        { name: "Modalidade", value: config.nome },
        { name: "Gênero", value: genero! },
        { name: "Material", value: material! },
        { name: "Estilo", value: estilo! },
        ...(nome ? [{ name: "Nome gravado", value: nome }] : []),
        ...(palavra ? [{ name: "Palavra", value: palavra }] : []),
        ...(km ? [{ name: "KM", value: km }] : []),
        ...(data ? [{ name: "Data", value: data }] : []),
        ...(tempo ? [{ name: "Tempo", value: tempo }] : []),
        ...(pingenteGerado ? [{ name: "Pingente por foto", value: "Gerado por IA" }] : []),
      ];

      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: personalizacao,
      });
      toast.success("Joia personalizada adicionada ao carrinho!");
      setTimeout(() => navigate("/colecao?after=1"), 600);
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível adicionar ao carrinho.");
    } finally {
      setAdicionando(false);
    }
  };

  const handleComprar = async () => {
    // Headless: cria carrinho via Storefront API e redireciona para o
    // checkoutUrl oficial Shopify na mesma aba (sem popup, sem /cart).
    await handleAdicionar();
    const checkoutUrl = useCartStore.getState().getCheckoutUrl();
    if (!checkoutUrl) {
      console.error("[Checkout] checkoutUrl ausente após cartCreate");
      toast.error("Não foi possível iniciar o checkout. Tente novamente.");
      return;
    }
    console.log("checkoutUrl oficial Shopify:", checkoutUrl);
    console.log("redirecionando externo para checkout oficial");
    window.location.replace(checkoutUrl);
  };

  return (
    <div
      className="min-h-screen text-foreground relative"
      style={{
        backgroundColor: "#0a0a0a",
        ["--background" as any]: "0 0% 4%",
        ["--foreground" as any]: "43 65% 70%",
        ["--card" as any]: "0 0% 6%",
        ["--card-foreground" as any]: "43 65% 70%",
        ["--primary" as any]: "43 65% 55%",
        ["--primary-foreground" as any]: "0 0% 7%",
        ["--secondary" as any]: "0 0% 10%",
        ["--secondary-foreground" as any]: "43 65% 70%",
        ["--muted" as any]: "0 0% 10%",
        ["--muted-foreground" as any]: "43 30% 60%",
        ["--accent" as any]: "43 65% 55%",
        ["--accent-foreground" as any]: "0 0% 7%",
        ["--border" as any]: "43 55% 45%",
        ["--input" as any]: "43 55% 45%",
        ["--ring" as any]: "43 65% 55%",
      }}
    >
      <style>{`
        @keyframes shimmer-gold {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .gold-text {
          background: linear-gradient(110deg, #b8860b 0%, #d4af37 25%, #f4d77a 50%, #d4af37 75%, #b8860b 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer-gold 6s linear infinite;
        }
        @keyframes spotlight-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>


      {/* ============== EXPERIÊNCIA LUXURY (Fisiculturismo) ============== */}
      {isLuxury ? (
        <LuxuryConfigurator
          config={config}
          previewSrc={previewSrc}
          gerandoPingente={gerandoPingente}
          pingenteGerado={pingenteGerado}
          fotoCliente={fotoCliente}
          fotoInputRef={fotoInputRef}
          handleFotoUpload={handleFotoUpload}
          genero={genero} setGenero={setGenero}
          material={material} setMaterial={setMaterial}
          estilo={estilo} setEstilo={setEstilo}
          estiloHover={estiloHover} setEstiloHover={setEstiloHover}
          eternizar={eternizar} setEternizar={setEternizar}
          palavraSig={palavraSig} setPalavraSig={setPalavraSig}
          momento={momento} setMomento={setMomento}
          currentStep={currentStep} setCurrentStep={setCurrentStep}
          handleAdicionar={handleAdicionar}
          adicionando={adicionando}
          podeAdicionar={podeAdicionar}
        />
      ) : (
      <>
      {/* Hero da modalidade (LEGADO outras modalidades) */}
      <section
        className="relative w-full overflow-hidden border-b border-accent/10"
        style={{ backgroundColor: "#0a0a0a", height: "clamp(180px, 22vw, 260px)" }}
        aria-label={`Espaço reservado para foto de ${config.nome}`}
      >
        <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-4 sm:pl-8 md:pl-12 max-w-[55%]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-3 w-3 text-accent" />
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h1
              className="font-serif italic text-base sm:text-xl md:text-2xl tracking-[0.04em] gold-text leading-tight"
              style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif' }}
            >
              {config.fraseImpacto}
            </h1>
          </div>
        </div>
      </section>

      {/* Conteúdo principal LEGADO (2 colunas) */}
      <main className="container mx-auto px-4 pt-6 pb-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] gap-3 lg:gap-6">
          {/* COLUNA ESQUERDA — Preview sticky */}
          <div className="lg:sticky lg:top-4 lg:self-start max-w-[380px] mx-auto lg:mx-0 w-full">
            <div className="relative flex items-start gap-3">
              <div
                className="relative aspect-[4/5] w-[280px] flex-shrink-0 overflow-hidden border border-accent/30"
                style={{
                  backgroundColor: "#000",
                  boxShadow:
                    "0 30px 80px -20px rgba(0,0,0,0.8), 0 0 60px -20px hsl(43 65% 35% / 0.4)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 mix-blend-screen"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 50% at 50% 30%, hsl(43 75% 60% / 0.35) 0%, hsl(43 65% 30% / 0.15) 35%, transparent 70%)",
                    animation: "spotlight-pulse 4s ease-in-out infinite",
                  }}
                />
                <span className="absolute top-2 left-2 h-4 w-4 border-t border-l border-accent z-20" />
                <span className="absolute top-2 right-2 h-4 w-4 border-t border-r border-accent z-20" />
                <span className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-accent z-20" />
                <span className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-accent z-20" />

                {gerandoPingente && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm gap-3">
                    <Loader2 className="h-10 w-10 text-accent animate-spin" />
                    <p className="text-xs uppercase tracking-[0.3em] text-accent">Modelando sua joia…</p>
                  </div>
                )}

                {(() => {
                  const bonecosGrandes = ["fisiculturismo", "musculacao", "corrida"];
                  let escala = bonecosGrandes.includes(config.slug) ? 1.25 : 1;
                  if (config.slug === "musculacao" && genero === "Feminino") escala = 1.9;
                  return (
                    <div className="absolute inset-0 z-5" style={{ transform: `scale(${escala})`, transformOrigin: "center center" }}>
                      <img src={previewSrc} alt={`Pré-visualização de joia ${config.nome}`} className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500" />
                      {overlayTexto && (
                        <div className="absolute z-20 pointer-events-none text-center" style={{ top: overlayPos.top, left: overlayPos.left, width: overlayPos.width, transform: overlayPos.transform }}>
                          <span className="block uppercase leading-none whitespace-nowrap overflow-hidden" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: `${overlayFontSize}px`, color: material === "Ouro 18K" ? "#d4af37" : "#c0c0c0", fontWeight: 700, letterSpacing: "0.02em", WebkitTextStroke: "0.5px rgba(0,0,0,0.95)", textShadow: "0 0 1px rgba(0,0,0,0.9), 0 1px 1px rgba(0,0,0,0.8)" }}>
                            {overlayTexto}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {(genero || material || estilo) && (
                <ul className="flex flex-col gap-1.5 pt-2 min-w-[80px]">
                  {[genero, material, estilo].filter(Boolean).map((item, i) => (
                    <li key={i} className="text-[9px] uppercase tracking-[0.25em] text-accent/90 whitespace-nowrap">• {item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* COLUNA DIREITA — Escolhas em sequência (LEGADO) */}
          <div className="space-y-3">
            <section>
              <SectionTitle numeral="I" label="Escolha quem você se tornou" />
              <div className="flex gap-2 flex-wrap justify-center">
                {(["Masculino", "Feminino"] as Genero[]).map((g) => (
                  <ChoiceButton key={g} selected={genero === g} onClick={() => setGenero(genero === g ? null : g)}>{g}</ChoiceButton>
                ))}
              </div>
            </section>
            <section>
              <SectionTitle numeral="II" label="Defina o material da sua conquista" />
              <div className="flex gap-2 flex-wrap justify-center">
                {(["Ouro 18K", "Prata 925"] as Material[]).map((m) => (
                  <ChoiceButton key={m} selected={material === m} onClick={() => setMaterial(material === m ? null : m)}>{m}</ChoiceButton>
                ))}
              </div>
            </section>
            <section>
              <SectionTitle numeral="III" label="Forma da sua história" />
              <div className="flex gap-2 flex-wrap justify-center">
                {(["Clássico", "Underground"] as Estilo[]).map((e) => (
                  <ChoiceButton key={e} selected={estilo === e} onClick={() => setEstilo(estilo === e ? null : e)}>
                    {e === "Underground" ? "Personalizado" : e}
                  </ChoiceButton>
                ))}
              </div>
            </section>
            {gravacaoLiberada && (
              <section>
                <SectionTitle numeral="IV" label="Dê significado à sua peça" />
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {config.camposGravacao.includes("nome") && (
                    <div><label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">Nome</label><Input value={nome} maxLength={20} onChange={(e) => setExclusivo("nome", e.target.value)} placeholder="Ex: Renata" className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs" /></div>
                  )}
                  {config.camposGravacao.includes("palavra") && (
                    <div><label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">Palavra</label><Input value={palavra} maxLength={15} onChange={(e) => setExclusivo("palavra", e.target.value)} placeholder="Ex: Força" className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs" /></div>
                  )}
                  {config.camposGravacao.includes("km") && (
                    <div><label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">KM</label><Input value={km} onChange={(e) => setExclusivo("km", e.target.value)} placeholder="Ex: 21K" className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs" /></div>
                  )}
                  {config.camposGravacao.includes("data") && (
                    <div><label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">Data</label><Input value={data} maxLength={10} onChange={(e) => setExclusivo("data", e.target.value)} placeholder="DD/MM/AAAA" className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs" /></div>
                  )}
                  {config.camposGravacao.includes("tempo") && (
                    <div><label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">Tempo</label><Input value={tempo} maxLength={10} onChange={(e) => setExclusivo("tempo", e.target.value)} placeholder="Ex: 1h45" className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs" /></div>
                  )}
                </div>
                {personalizacaoEscolhida && (
                  <button onClick={() => setExclusivo("nome", "")} className="mt-3 text-[10px] uppercase tracking-[0.3em] text-accent/70 hover:text-accent underline">Limpar gravação</button>
                )}
              </section>
            )}
            <section>
              <SectionTitle numeral="V" label="Torne isso único" />
              <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 mb-2 italic text-center">Transforme em uma jóia que só você tem</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => fotoInputRef.current?.click()} disabled={!genero || !material || !estilo} className="relative aspect-square border border-dashed border-accent/40 hover:border-accent transition-all flex flex-col items-center justify-center gap-1.5 bg-card/20 hover:bg-card/40 disabled:opacity-40 disabled:cursor-not-allowed group">
                  {fotoCliente ? (
                    <><img src={fotoCliente} alt="Sua foto" className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="text-[10px] uppercase tracking-[0.3em] text-accent">Trocar foto</span></div></>
                  ) : (
                    <><Upload className="h-6 w-6 text-accent/60" /><span className="text-[9px] uppercase tracking-[0.3em] text-accent/80">Upload da foto</span>{(!genero || !material || !estilo) && (<span className="text-[8px] text-muted-foreground/60 px-2 text-center leading-tight">Escolha gênero, metal e estilo</span>)}</>
                  )}
                  <input ref={fotoInputRef} type="file" accept="image/*" onChange={handleFotoUpload} className="hidden" />
                </button>
                <div className="relative aspect-square border border-accent/30 bg-black/60 flex items-center justify-center overflow-hidden">
                  {gerandoPingente ? (<div className="flex flex-col items-center gap-2"><Loader2 className="h-5 w-5 text-accent animate-spin" /><span className="text-[9px] uppercase tracking-[0.3em] text-accent">Gerando…</span></div>) : pingenteGerado ? (<img src={pingenteGerado} alt="Pingente gerado por IA" className="w-full h-full object-contain" />) : (<div className="flex flex-col items-center gap-1.5 text-center px-3"><Camera className="h-5 w-5 text-accent/40" /><span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60 leading-tight">Prévia IA</span></div>)}
                </div>
              </div>
            </section>
            <section className="pt-2 border-t border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Investimento</span>
                <span className="font-display text-lg gold-text">a partir de R$ 890</span>
              </div>
              <Button onClick={handleAdicionar} disabled={adicionando || !podeAdicionar} className="w-full bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] text-black hover:opacity-90 font-display tracking-[0.3em] uppercase text-xs py-3 h-auto">
                {adicionando ? (<><Loader2 className="h-4 w-4 animate-spin mr-2" />Adicionando…</>) : (<><Sparkles className="h-4 w-4 mr-2" />Adicionar ao carrinho</>)}
              </Button>
              <button onClick={handleComprar} disabled={adicionando || !podeAdicionar} className="mt-2 w-full text-center text-[10px] uppercase tracking-[0.3em] text-accent/80 hover:text-accent disabled:opacity-40 underline-offset-4 hover:underline">Comprar agora</button>
            </section>
          </div>
        </div>
      </main>
      </>
      )}
    </div>
  );
};

/* ============================================================
   LUXURY CONFIGURATOR — Jornada guiada premium (Fisiculturismo)
   ============================================================ */

type LuxuryProps = {
  config: ModalidadeConfig;
  previewSrc: string;
  gerandoPingente: boolean;
  pingenteGerado: string | null;
  fotoCliente: string | null;
  fotoInputRef: React.RefObject<HTMLInputElement>;
  handleFotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  genero: Genero | null; setGenero: (g: Genero | null) => void;
  material: Material | null; setMaterial: (m: Material | null) => void;
  estilo: Estilo | null; setEstilo: (e: Estilo | null) => void;
  estiloHover: Estilo | null; setEstiloHover: (e: Estilo | null) => void;
  eternizar: string; setEternizar: (s: string) => void;
  palavraSig: string; setPalavraSig: (s: string) => void;
  momento: string; setMomento: (s: string) => void;
  currentStep: number; setCurrentStep: (n: number) => void;
  handleAdicionar: () => void;
  adicionando: boolean;
  podeAdicionar: boolean;
};

const LuxuryConfigurator = (p: LuxuryProps) => {
  const totalSteps = 6;
  const [iaAberta, setIaAberta] = useState(false);
  const next = () => p.setCurrentStep(Math.min(totalSteps, p.currentStep + 1));
  const prev = () => p.setCurrentStep(Math.max(1, p.currentStep - 1));

  // Estilo "preview" no hover do passo 4
  const estiloEfetivo = p.estiloHover ?? p.estilo;

  // src do preview considerando hover de estilo
  const previewEfetivo = useMemo(() => {
    if (p.pingenteGerado) return p.pingenteGerado;
    const mat = p.material ?? "Prata 925";
    const gen = p.genero ?? "Masculino";
    const est = estiloEfetivo ?? "Clássico";
    return p.config.bonecos[mat][gen][est];
  }, [p.pingenteGerado, p.material, p.genero, estiloEfetivo, p.config]);

  const stepTitles = [
    "Identidade", "Modalidade", "Material", "Estilo", "Significado", "Finalizar"
  ];

  return (
    <main
      className="relative w-full overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ============= HERO INTEGRADO (imagem de fundo contínua) ============= */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{
          height: "min(110vh, 1200px)",
          backgroundImage: `url(${p.config.heroBg ?? fisiculturismoHeroBg})`,
          backgroundSize: p.config.heroBgSize ?? "cover",
          backgroundPosition: p.config.heroBgPosition ?? "center top",
          backgroundRepeat: "no-repeat",
          filter: "saturate(1.1) brightness(1.05)",
        }}
      />
      {/* Vinheta lateral */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{
          height: "min(110vh, 1200px)",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Fade inferior para o preto do site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{
          height: "min(110vh, 1200px)",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 88%, #050505 100%)",
        }}
      />
      {/* Glow dourado sutil na parte inferior central (reflexo de joia) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-0"
        style={{
          top: "min(70vh, 760px)",
          width: "80%",
          height: "40vh",
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.05) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1500px]" style={{ paddingTop: "clamp(360px, 55vh, 620px)", paddingBottom: "clamp(40px, 6vh, 80px)" }}>
        {/* Stepper topo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {stepTitles.map((t, i) => {
            const n = i + 1;
            const active = n === p.currentStep;
            const done = n < p.currentStep;
            return (
              <button
                key={t}
                onClick={() => p.setCurrentStep(n)}
                className="flex items-center gap-2 group"
              >
                <span
                  className={`h-1.5 transition-all duration-500 ${active ? "w-10 bg-[#d4af37]" : done ? "w-6 bg-[#d4af37]/60" : "w-6 bg-white/15"}`}
                  style={active ? { boxShadow: "0 0 12px rgba(212,175,55,0.6)" } : undefined}
                />
                <span className={`hidden md:inline text-[9px] tracking-[0.3em] uppercase transition-colors ${active ? "text-[#d4af37]" : done ? "text-[#d4af37]/50" : "text-white/30"}`}>
                  {t}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-center min-h-[70vh]">
          {/* ESQUERDA — Pingente */}
          <div className="relative flex items-center justify-center">
            <div
              className="relative aspect-[4/5] w-full max-w-[460px]"
              style={{
                background: "radial-gradient(ellipse at center, #1a1410 0%, #050403 70%)",
                boxShadow: "inset 0 0 120px rgba(0,0,0,0.9), 0 40px 100px -30px rgba(212,175,55,0.18)",
              }}
            >
              {/* Glow dourado sutil */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(212,175,55,0.12) 0%, transparent 70%)",
                  animation: "spotlight-pulse 5s ease-in-out infinite",
                }}
              />
              {p.gerandoPingente && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm gap-4">
                  <Loader2 className="h-12 w-12 animate-spin" style={{ color: "#d4af37" }} />
                  <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#d4af37" }}>
                    Modelando sua peça…
                  </p>
                </div>
              )}
              <img
                key={previewEfetivo}
                src={previewEfetivo}
                alt={`Pingente ${p.config.nome}`}
                className="absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-out animate-in fade-in zoom-in-95"
                style={{
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 30px rgba(212,175,55,0.15))",
                  transform: estiloEfetivo === "Underground" ? "rotate(-3deg) scale(1.02)" : "rotate(0deg) scale(1)",
                  transitionProperty: "transform, filter, opacity",
                }}
              />
              {/* Cantos dourados */}
              <span className="absolute top-3 left-3 h-5 w-5 border-t border-l z-20" style={{ borderColor: "#d4af37" }} />
              <span className="absolute top-3 right-3 h-5 w-5 border-t border-r z-20" style={{ borderColor: "#d4af37" }} />
              <span className="absolute bottom-3 left-3 h-5 w-5 border-b border-l z-20" style={{ borderColor: "#d4af37" }} />
              <span className="absolute bottom-3 right-3 h-5 w-5 border-b border-r z-20" style={{ borderColor: "#d4af37" }} />
            </div>
          </div>

          {/* DIREITA — Etapa atual */}
          <div className="relative">
            <div key={p.currentStep} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: "rgba(212,175,55,0.6)" }}>
                {String(p.currentStep).padStart(2, "0")} · {stepTitles[p.currentStep - 1]}
              </div>

              {/* PASSO 1 — IDENTIDADE */}
              {p.currentStep === 1 && (
                <StepLayout
                  title="Escolha quem você se tornou"
                  subtitle="A identidade é o primeiro traço da sua história."
                >
                  <div className="flex gap-4 flex-wrap">
                    {(["Masculino", "Feminino"] as Genero[]).map((g) => (
                      <LuxuryChoice key={g} selected={p.genero === g} onClick={() => p.setGenero(g)}>
                        {g}
                      </LuxuryChoice>
                    ))}
                  </div>
                </StepLayout>
              )}

              {/* PASSO 2 — MODALIDADE */}
              {p.currentStep === 2 && (
                <StepLayout
                  title="Sua disciplina tem forma"
                  subtitle={`Você escolheu o caminho do ${p.config.nome.toLowerCase()}. Cada movimento conta.`}
                >
                  <div className="inline-flex items-center gap-3 px-5 py-3 border" style={{ borderColor: "rgba(212,175,55,0.5)", background: "rgba(212,175,55,0.05)" }}>
                    <Sparkles className="h-4 w-4" style={{ color: "#d4af37" }} />
                    <span className="font-display tracking-[0.3em] uppercase text-sm" style={{ color: "#d4af37" }}>
                      {p.config.nome}
                    </span>
                  </div>
                </StepLayout>
              )}

              {/* PASSO 3 — MATERIAL */}
              {p.currentStep === 3 && (
                <StepLayout
                  title="Defina o material da sua conquista"
                  subtitle="O metal que vai eternizar sua jornada."
                >
                  <div className="flex gap-3 flex-wrap">
                    {(["Ouro 18K", "Prata 925"] as Material[]).map((m) => (
                      <LuxuryChoice key={m} selected={p.material === m} onClick={() => p.setMaterial(m)}>
                        {m}
                      </LuxuryChoice>
                    ))}
                  </div>
                </StepLayout>
              )}

              {/* PASSO 4 — ESTILO */}
              {p.currentStep === 4 && (
                <StepLayout
                  title="Escolha a presença da sua peça"
                  subtitle="Hover para visualizar. Clique para fixar."
                >
                  <div className="flex gap-3 flex-wrap">
                    {(["Clássico", "Underground"] as Estilo[]).map((e) => (
                      <LuxuryChoice
                        key={e}
                        selected={p.estilo === e}
                        onClick={() => p.setEstilo(e)}
                        onMouseEnter={() => p.setEstiloHover(e)}
                        onMouseLeave={() => p.setEstiloHover(null)}
                      >
                        {e === "Underground" ? "Personalizado" : e}
                      </LuxuryChoice>
                    ))}
                  </div>
                </StepLayout>
              )}

              {/* PASSO 5 — SIGNIFICADO */}
              {p.currentStep === 5 && (
                <StepLayout
                  title="Dê significado à sua joia"
                  subtitle="Três traços que tornam a peça inconfundivelmente sua."
                >
                  <div className="space-y-5 max-w-md">
                    <LuxuryField label="Quem você quer eternizar?" value={p.eternizar} onChange={p.setEternizar} placeholder="Ex: Você. Sua mãe. Seu mentor." />
                    <LuxuryField label="Qual palavra define sua jornada?" value={p.palavraSig} onChange={p.setPalavraSig} placeholder="Disciplina, Superação, Olympia" />
                    <LuxuryField label="O momento que mudou tudo" value={p.momento} onChange={p.setMomento} placeholder="A primeira competição, a recaída, o palco" />
                  </div>
                </StepLayout>
              )}

              {/* PASSO 6 — FINALIZAR (com upgrade IA opcional) */}
              {p.currentStep === 6 && (
                <StepLayout
                  title="Sua peça está pronta para nascer"
                  subtitle="Agora você decide como deseja eternizar sua jornada."
                >
                  <div className="space-y-3 max-w-md mb-6">
                    <ResumoLinha label="Modalidade" value={p.config.nome} />
                    <ResumoLinha label="Identidade" value={p.genero ?? "—"} />
                    <ResumoLinha label="Material" value={p.material ?? "—"} />
                    <ResumoLinha label="Estilo" value={p.estilo ?? "—"} />
                    {(p.eternizar || p.palavraSig || p.momento) && (
                      <ResumoLinha label="Gravação" value={[p.eternizar, p.palavraSig, p.momento].filter(Boolean).join(" · ")} />
                    )}
                  </div>

                  {/* OPÇÃO PRINCIPAL — DESIGN EXCLUSIVO 3R */}
                  <div
                    className="relative p-6 mb-5 border"
                    style={{
                      borderColor: "rgba(212,175,55,0.5)",
                      background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0.4) 100%)",
                      boxShadow: "0 0 40px rgba(212,175,55,0.08) inset",
                    }}
                  >
                    <div className="absolute -top-2 left-4 px-2 text-[8px] tracking-[0.4em] uppercase" style={{ background: "#050505", color: "#d4af37" }}>
                      Recomendado
                    </div>
                    <h3 className="font-display text-xl text-white mb-2">Finalizar com design exclusivo 3R</h3>
                    <p className="text-[12px] text-white/60 leading-relaxed mb-4">
                      Uma peça criada a partir da sua jornada, com acabamento premium e identidade definida.
                    </p>
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="text-[9px] tracking-[0.4em] uppercase text-white/40">Investimento da peça</span>
                      <span className="font-display text-base gold-text">a partir de R$ 890</span>
                    </div>
                    <button
                      onClick={p.handleAdicionar}
                      disabled={p.adicionando || !p.podeAdicionar}
                      className="w-full px-8 py-4 font-display tracking-[0.3em] uppercase text-xs transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
                      style={{ background: "linear-gradient(135deg, #b8860b 0%, #d4af37 50%, #b8860b 100%)", color: "#0a0a0a" }}
                    >
                      {p.adicionando ? "Enviando…" : "Solicitar criação da minha joia"}
                    </button>
                  </div>

                  {/* DIVISOR SUTIL */}
                  <div className="flex items-center gap-3 my-6 max-w-md">
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }} />
                    <span className="text-[8px] tracking-[0.5em] uppercase text-white/30">ou</span>
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }} />
                  </div>

                  {/* OPÇÃO PREMIUM — IA */}
                  <div
                    className="relative p-5 border transition-all duration-500"
                    style={{
                      borderColor: iaAberta ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.2)",
                      background: "rgba(212,175,55,0.02)",
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Sparkles className="h-4 w-4 mt-1 shrink-0" style={{ color: "#d4af37" }} />
                      <div>
                        <h3 className="font-display text-base text-white/90 mb-1">Elevar ao nível máximo de exclusividade</h3>
                        <p className="text-[12px] text-white/50 leading-relaxed">
                          Transforme sua aparência em uma peça única, baseada em você.
                        </p>
                      </div>
                    </div>

                    {!iaAberta ? (
                      <button
                        onClick={() => setIaAberta(true)}
                        className="mt-2 px-6 py-3 font-display tracking-[0.3em] uppercase text-[10px] border transition-all duration-500 hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:border-[#d4af37]"
                        style={{ borderColor: "rgba(212,175,55,0.4)", color: "rgba(212,175,55,0.9)", background: "rgba(0,0,0,0.3)" }}
                      >
                        Transformar minha aparência em joia
                      </button>
                    ) : (
                      <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="mb-4">
                          <p className="font-display text-sm text-white/90 mb-1">Envie sua imagem</p>
                          <p className="text-[11px] text-white/40 leading-relaxed">
                            Sua foto será usada como referência para criar uma peça exclusiva baseada em você.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => p.fotoInputRef.current?.click()}
                            className="relative aspect-square border border-dashed transition-all duration-500 flex flex-col items-center justify-center gap-2 group hover:border-[#d4af37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)_inset]"
                            style={{ borderColor: "rgba(212,175,55,0.4)", background: "rgba(212,175,55,0.03)" }}
                          >
                            {p.fotoCliente ? (
                              <img src={p.fotoCliente} alt="Sua imagem" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                              <>
                                <Camera className="h-6 w-6" style={{ color: "rgba(212,175,55,0.7)" }} />
                                <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(212,175,55,0.8)" }}>
                                  Enviar sua imagem
                                </span>
                              </>
                            )}
                            <input ref={p.fotoInputRef} type="file" accept="image/*" onChange={p.handleFotoUpload} className="hidden" />
                          </button>
                          <div className="relative aspect-square border flex items-center justify-center overflow-hidden" style={{ borderColor: "rgba(212,175,55,0.3)", background: "rgba(0,0,0,0.6)" }}>
                            {p.gerandoPingente ? (
                              <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" style={{ color: "#d4af37" }} />
                                <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "#d4af37" }}>IA gerando…</span>
                              </div>
                            ) : p.pingenteGerado ? (
                              <img src={p.pingenteGerado} alt="Prévia da peça" className="w-full h-full object-contain" />
                            ) : (
                              <div className="flex flex-col items-center gap-1.5 px-3 text-center">
                                <Sparkles className="h-5 w-5" style={{ color: "rgba(212,175,55,0.4)" }} />
                                <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Prévia da peça</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {p.pingenteGerado && (
                          <button
                            onClick={p.handleAdicionar}
                            disabled={p.adicionando}
                            className="mt-4 w-full px-6 py-3 font-display tracking-[0.3em] uppercase text-[11px] border transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                            style={{ borderColor: "#d4af37", color: "#d4af37", background: "rgba(212,175,55,0.06)" }}
                          >
                            {p.adicionando ? "Enviando…" : "Solicitar criação com minha imagem"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => p.setCurrentStep(1)}
                      className="text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-white/80 transition-colors"
                    >
                      ← Refinar minha peça
                    </button>
                  </div>
                </StepLayout>
              )}
            </div>

            {/* Navegação entre passos */}
            {p.currentStep < 6 && (
              <div className="mt-10 flex items-center gap-4">
                {p.currentStep > 1 && (
                  <button
                    onClick={prev}
                    className="text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-white/80 transition-colors"
                  >
                    ← Voltar
                  </button>
                )}
                <button
                  onClick={next}
                  className="px-7 py-3 font-display tracking-[0.3em] uppercase text-[11px] border transition-all duration-500 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                  style={{ borderColor: "#d4af37", color: "#d4af37", background: "rgba(212,175,55,0.04)" }}
                >
                  Continuar →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const StepLayout = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div>
    <h2
      className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-3 tracking-[-0.01em]"
      style={{ color: "#f5e9c8", fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif', fontStyle: "italic", fontWeight: 400 }}
    >
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm text-white/50 mb-8 max-w-md leading-relaxed">{subtitle}</p>
    )}
    <div>{children}</div>
  </div>
);

const LuxuryChoice = ({
  selected, onClick, onMouseEnter, onMouseLeave, children,
}: {
  selected: boolean; onClick: () => void;
  onMouseEnter?: () => void; onMouseLeave?: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="relative px-7 py-4 font-display tracking-[0.3em] uppercase text-[11px] border transition-all duration-500 hover:scale-[1.02]"
    style={{
      borderColor: selected ? "#d4af37" : "rgba(255,255,255,0.15)",
      color: selected ? "#d4af37" : "rgba(255,255,255,0.75)",
      background: selected ? "rgba(212,175,55,0.08)" : "transparent",
      boxShadow: selected ? "0 0 30px rgba(212,175,55,0.35), inset 0 0 20px rgba(212,175,55,0.05)" : "none",
    }}
  >
    {children}
  </button>
);

const LuxuryField = ({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (s: string) => void; placeholder?: string;
}) => (
  <div>
    <label className="block text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: "rgba(212,175,55,0.7)" }}>
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border-b py-2.5 text-base font-light tracking-wide outline-none transition-colors focus:border-[#d4af37] placeholder:text-white/25"
      style={{ borderColor: "rgba(212,175,55,0.35)", color: "#f5e9c8" }}
    />
  </div>
);

const ResumoLinha = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between gap-4 border-b py-2" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
    <span className="text-[9px] tracking-[0.4em] uppercase text-white/40">{label}</span>
    <span className="font-display text-sm" style={{ color: "#f5e9c8" }}>{value}</span>
  </div>
);


export default Modalidade;
