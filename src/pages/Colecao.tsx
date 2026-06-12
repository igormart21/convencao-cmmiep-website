import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Zap, Loader2, ChevronRight, Home, User } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";
import { useLanguage } from "@/context/LanguageContext";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  ShopifyProduct,
  createShopifyCart,
} from "@/lib/shopify";
import { downscaleImage } from "@/lib/downscaleImage";
import colecoesHero from "@/assets/colecoes-hero.jpg";
import logo3r from "@/assets/3r-logo.png";
import sportFisiculturismo from "@/assets/sport-fisiculturismo.jpg";
import sportMusculacao from "@/assets/sport-musculacao.jpg";
import sportTriathlon from "@/assets/sport-triathlon.jpg";
import sportCiclismo from "@/assets/sport-ciclismo.jpg";
import sportCrossfit from "@/assets/hero-crossfit.png";
import sportCorrida from "@/assets/sport-corrida.jpg";

// ── Imagens ──────────────────────────────────────────────────────────────────
import halterOuro    from "@/assets/linha-halter-ouro.jpg";
import halterPrata   from "@/assets/linha-halter-prata.jpg";
import vigorOuro     from "@/assets/linha-vigor-ouro.jpg";
import vigorPrata    from "@/assets/linha-vigor-prata.jpg";
import imperiumOuro  from "@/assets/linha-imperium-ouro.jpg";
import imperiumPrata from "@/assets/linha-imperium-prata.jpg";
import imperiumOuroNova from "@/assets/linha-imperium-ouro-nova.jpg";
import imperiumPrataNova from "@/assets/linha-imperium-prata-nova.jpg";
import novaHalterOuro from "@/assets/linha-halter-ouro-nova.jpg";
import novaImperiumOuroCrossfit from "@/assets/linha-imperium-ouro-crossfit.jpg";
import strataOuro    from "@/assets/linha-strata-ouro.jpg";
import strataPrata   from "@/assets/linha-strata-prata.jpg";
import kettlebellOuro from "@/assets/linha-kettlebell-ouro.jpg";
import kettlebellPrata from "@/assets/linha-kettlebell-prata.jpg";
import conjuntoCrossfitOuro from "@/assets/linha-conjunto-crossfit-ouro.jpg";
import conjuntoCrossfitElite from "@/assets/linha-conjunto-crossfit-elite.jpg";
import placaTriatloOuro from "@/assets/linha-placa-triatlo-ouro.jpg";
import placaTriatloPrata from "@/assets/linha-placa-triatlo-prata.jpg";
import wodOuro from "@/assets/linha-wod-ouro.jpeg";
import wodPrata from "@/assets/linha-wod-prata.jpeg";
import eliteCrossOuro from "@/assets/linha-elite-ouro.jpeg";
import eliteCrossPrata from "@/assets/linha-elite-prata.jpeg";
import veloxOuro     from "@/assets/linha-velox-royale-ouro-masculino.jpg";
import veloxPrata    from "@/assets/linha-velox-royale-prata-masculino.jpg";
import veloxFemSpeedOuro from "@/assets/linha-velox-royale-ouro-feminino-speed.jpg";
import veloxFemSpeedPrata from "@/assets/linha-velox-royale-prata-feminino-speed.jpg";
import veloxFemMtbOuro from "@/assets/linha-velox-royale-ouro-feminino-mtb.jpg";
import veloxFemMtbPrata from "@/assets/linha-velox-royale-prata-feminino-mtb.jpg";
import aeronOuro     from "@/assets/8c5b91a8-d2a6-4785-9930-9c9dec489c2b.png";
import aeronPrata    from "@/assets/linha-aeron-prata-masculino.jpg";
import trionOuro     from "@/assets/linha-trion-elite-ouro.png";
import trionPrata    from "@/assets/trion-elite-atleta-prata.jpg";
import velarionOuro  from "@/assets/linha-velarion-ouro.png";
import triadeOuro    from "@/assets/linha-triade-ouro.jpg";
import triadePrata   from "@/assets/linha-triade-prata.jpg";
import dominusOuro   from "@/assets/linha-dominus-ouro.png";
import dominusPrata  from "@/assets/dominus-prata-banner.png";
import dominusJoiaPrata from "@/assets/dominus-joia-prata.jpeg";
import dominusJoiaOuro from "@/assets/dominus-joia-ouro.jpeg";
import monarchOuro   from "@/assets/linha-monarch-ouro.png";
import monarchPrata  from "@/assets/802988ab-baa6-48ce-89e9-109263359edc.png";
import monarchJoiaPrata from "@/assets/monarch-joia-prata.jpeg";
import monarchJoiaOuro from "@/assets/monarch-joia-ouro.jpeg";
import valenzaOuro   from "@/assets/linha-valenza-ouro.png";
import valenzaPrata  from "@/assets/valenza-prata-banner.png";
import valenzaJoia   from "@/assets/valenza-joia.jpeg";
import valenzaJoiaPrata from "@/assets/valenza-joia-prata.jpeg";
import bonecoFisiMascClassicoOuro  from "@/assets/boneco-fisiculturismo-masc-classico-ouro.jpg";
import bonecoFisiMascClassicoPrata from "@/assets/boneco-fisiculturismo-masc-classico-prata.jpg";
import bonecoFisiFemClassicoOuro   from "@/assets/boneco-fisiculturismo-fem-classico-ouro.jpg";
import bonecoFisiFemClassicoPrata  from "@/assets/boneco-fisiculturismo-fem-classico-prata.jpg";
import bonecoFisiMascUndergroundOuro  from "@/assets/boneco-fisiculturismo-masc-underground-ouro.jpg";
import bonecoFisiMascUndergroundPrata from "@/assets/boneco-fisiculturismo-masc-underground-prata.jpg";
import bonecoFisiFemUndergroundOuro   from "@/assets/boneco-fisiculturismo-fem-underground-ouro.jpg";
import bonecoFisiFemUndergroundPrata  from "@/assets/boneco-fisiculturismo-fem-underground-prata.jpg";
import titanOuro     from "@/assets/titan-atleta-masc-ouro.png";
import titanPrata    from "@/assets/titan-atleta-masc-prata.png";
import titanJoiaOuro from "@/assets/titan-joia-ouro.jpeg";
import titanJoiaPrata from "@/assets/titan-joia-prata.jpeg";
import velocitaOuro  from "@/assets/velocita-atleta-fem-ouro.png";
import velocitaPrata from "@/assets/velocita-atleta-fem-prata.png";
import novaCorridaOuroFem from "@/assets/linha-corrida-ouro-fem.jpg";
import novaCorridaPrataFem from "@/assets/linha-corrida-prata-fem.jpg";
import novaCorridaOuroMasc from "@/assets/linha-corrida-ouro-masc.jpg";
import velocitaJoiaPrata from "@/assets/velocita-joia-prata.jpeg";
import velocitaJoiaOuro from "@/assets/velocita-joia-ouro.jpeg";
import sprintJoia from "@/assets/linha-sprint.jpeg";
import ritmoJoia from "@/assets/linha-ritmo.jpeg";
import passadaJoia from "@/assets/linha-passada.jpeg";
import bikeSpeedClassicoOuro  from "@/assets/bike-speed-classico-ouro.jpg";
import bikeSpeedClassicoPrata from "@/assets/bike-speed-classico-prata.jpg";
import bonecoTriMascClassicoOuro  from "@/assets/boneco-triatlon-masc-classico-ouro.jpg";
import bonecoTriMascClassicoPrata from "@/assets/boneco-triatlon-masc-classico-prata.jpg";
import anelCorridaOuro       from "@/assets/anel-corrida-ouro.jpg";
import anelCorridaPrata      from "@/assets/anel-corrida-prata.jpg";
import anelFisiOuro          from "@/assets/anel-fisiculturismo-ouro.jpg";
import anelFisiPrata         from "@/assets/anel-fisiculturismo-prata.jpg";
import anelTriatloOuro       from "@/assets/anel-triatlo-ouro.jpg";
import anelTriatloPrata      from "@/assets/anel-triatlo-prata.jpg";
import anelCrossfitOuro      from "@/assets/anel-crossfit-ouro.jpg";
import anelCrossfitPrata     from "@/assets/anel-crossfit-prata.jpg";
import anelCiclismoOuro      from "@/assets/anel-ciclismo-ouro.jpg";
import anelCiclismoPrata     from "@/assets/anel-ciclismo-prata.jpg";
import anelCorridaMascOuro   from "@/assets/anel-corrida-masc-ouro.jpg";
import anelCorridaMascPrata  from "@/assets/anel-corrida-masc-prata.jpg";
import anelMuscOuro          from "@/assets/anel-musculacao-ouro.jpg";
import anelMuscPrata         from "@/assets/anel-musculacao-prata.jpg";
import brincoCorridaOuro  from "@/assets/brinco-corrida-ouro.jpg";
import brincoCorridaPrata from "@/assets/brinco-corrida-prata.jpg";
import colarCartierOuro   from "@/assets/colar-cartier-ouro.jpg";
import colarCartierPrata  from "@/assets/colar-cartier-prata.jpg";
import colarVenezianaOuro  from "@/assets/colar-veneziana-ouro.jpg";
import colarVenezianaPrata from "@/assets/colar-veneziana-prata.jpg";
import bonecoCrossMascClassicoOuro  from "@/assets/boneco-crossfit-masc-classico-ouro.jpg";
import bonecoCrossMascClassicoPrata from "@/assets/boneco-crossfit-masc-classico-prata.jpg";
import bonecoCrossFemClassicoOuro   from "@/assets/boneco-crossfit-fem-classico-ouro.jpg";
import bonecoCrossFemClassicoPrata  from "@/assets/boneco-crossfit-fem-classico-prata.jpg";
import bonecoCorrMascClassicoOuro  from "@/assets/boneco-corredores-masc-classico-ouro.jpg";
import bonecoCorrMascClassicoPrata from "@/assets/boneco-corredores-masc-classico-prata.jpg";
import bonecoCorrFemClassicoOuro   from "@/assets/boneco-corredores-fem-classico-ouro.jpg";
import bonecoCorrFemClassicoPrata  from "@/assets/boneco-corredores-fem-classico-prata.jpg";
import bonecoMuscMascClassicoOuro  from "@/assets/boneco-musculacao-masc-classico-ouro.jpg";
import bonecoMuscMascClassicoPrata from "@/assets/boneco-musculacao-masc-classico-prata.jpg";
import bonecoMuscFemClassicoOuro   from "@/assets/boneco-musculacao-fem-classico-ouro.jpg";
import bonecoMuscFemClassicoPrata  from "@/assets/boneco-musculacao-fem-classico-prata.jpg";

// ── Utils ────────────────────────────────────────────────────────────────────
const fmtBRL = (v: string) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parseFloat(v));

const WPP =
  "https://wa.me/5548991486304?text=Ol%C3%A1!%20Tenho%20interesse%20em%20uma%20joia%203R%20Fitness.%20Pode%20me%20informar%20mais%3F";

// ── Dados das coleções ───────────────────────────
const COLECOES = [
  { n:"01", name:"Halter",            handle:"halter",  sport:"Musculação", img:halterOuro,             imgPrata:halterPrata,            desc:"Força que esculpe. Disciplina que constrói." },
  { n:"02", name:"Vigor",             handle:"vigor",   sport:"Musculação", img:vigorOuro,              imgPrata:vigorPrata,             desc:"Evolução contínua. Presença marcante." },
  { n:"19", name:"Clássico Masc",     handle:"halter",  sport:"Musculação", img:bonecoMuscMascClassicoOuro, imgPrata:bonecoMuscMascClassicoPrata, desc:"Constância e disciplina representadas em cada detalhe." },
  { n:"20", name:"Clássico Fem",      handle:"vigor",   sport:"Musculação", img:bonecoMuscFemClassicoOuro,  imgPrata:bonecoMuscFemClassicoPrata,  desc:"Evolução feminina. Força e elegância em ouro e prata." },
  { n:"15", name:"Clássico Masc",     handle:"dominus",      sport:"Fisiculturismo", img:bonecoFisiMascClassicoOuro,    imgPrata:bonecoFisiMascClassicoPrata,    desc:"Postura clássica. Força representada em cada detalhe." },
  { n:"16", name:"Clássico Fem",      handle:"valenza",      sport:"Fisiculturismo", img:bonecoFisiFemClassicoOuro,     imgPrata:bonecoFisiFemClassicoPrata,     desc:"Elegância e postura que definem a campeã." },
  { n:"17", name:"Underground Masc",  handle:"monarch",      sport:"Fisiculturismo", img:bonecoFisiMascUndergroundOuro, imgPrata:bonecoFisiMascUndergroundPrata, desc:"Identidade raw. Intensidade que não pede licença." },
  { n:"18", name:"Underground Fem",   handle:"valenza",      sport:"Fisiculturismo", img:bonecoFisiFemUndergroundOuro,  imgPrata:bonecoFisiFemUndergroundPrata,  desc:"Atitude, estética e força sem concessões." },
  { n:"06", name:"Imperium",      handle:"imperium", sport:"Crossfit", img:imperiumOuro,             desc:"Construída para quem nasceu para dominar.", skipPrata: true },
  { n:"06C", name:"Imperium", handle:"imperium-prata", sport:"Crossfit", imgPrata:imperiumPrataNova, desc:"Estética premium esculpida em prata 925.", skipOuro: true },
  { n:"06B", name:"Imperium", handle:"imperium-ouro", sport:"Crossfit", img:imperiumOuroNova,     desc:"Estética premium esculpida em ouro 18k.", skipPrata: true },
  { n:"06D", name:"Imperium",      handle:"imperium", sport:"Crossfit", imgPrata:imperiumPrata,          desc:"Construída para quem nasceu para dominar.", skipOuro: true },
  { n:"07", name:"Strata",        handle:"strata",   sport:"Crossfit", img:strataOuro,               imgPrata:strataPrata,                desc:"Movimento bruto refinado em luxo contemporâneo." },
  { n:"07B", name:"Kettlebell CrossFit", handle:"kettlebell-crossfit", sport:"Crossfit", img:kettlebellOuro, imgPrata:kettlebellPrata, desc:"A força e a resiliência do CrossFit moldadas em formato de kettlebell." },
  { n:"23", name:"Clássico Masc", handle:"imperium", sport:"Crossfit", img:bonecoCrossMascClassicoOuro, imgPrata:bonecoCrossMascClassicoPrata, desc:"Força bruta e determinação representadas em joia." },
  { n:"24", name:"Clássico Fem",  handle:"strata",   sport:"Crossfit", img:bonecoCrossFemClassicoOuro,  imgPrata:bonecoCrossFemClassicoPrata,  desc:"Potência feminina. Precisão e estilo em cada peça." },
  { n:"08", name:"Velox Royale", handle:"velox-royale", sport:"Ciclismo", img:veloxOuro,         imgPrata:veloxPrata,         desc:"Criada para quem transforma resistência em assinatura. A linha VELOX ROYALE representa o ciclismo em sua forma mais refinada: potência, precisão e elegância em movimento. Inspirada nos atletas que enxergam a estrada como extensão da própria identidade, cada peça carrega uma estética minimalista com presença absoluta. Disponível nas versões Ouro 18k e Prata 925. Luxo esportivo elevado ao máximo nível. VELOX ROYALE.Para quem pedala acima do comum." },
  { n:"08B", name:"Velox Royale Fem Speed", handle:"velox-royale-fem-speed", sport:"Ciclismo", img:veloxFemSpeedOuro, imgPrata:veloxFemSpeedPrata, desc:"Velocidade, elegância e a silhueta da ciclista feminina em velocidade." },
  { n:"08C", name:"Velox Royale Fem MTB", handle:"velox-royale-fem-mtb", sport:"Ciclismo", img:veloxFemMtbOuro, imgPrata:veloxFemMtbPrata, desc:"A força e a determinação da ciclista feminina de Mountain Bike." },
  { n:"25", name:"Speed Clássico",  handle:"velox-royale", sport:"Ciclismo", img:bikeSpeedClassicoOuro,   imgPrata:bikeSpeedClassicoPrata,  desc:"Velocidade e estilo para quem pedala com propósito.", imgFit:"contain" },
  { n:"09", name:"Aeron",           handle:"aeron",        sport:"Ciclismo", img:aeronOuro,              imgPrata:aeronPrata,              desc:"Cada giro, um pulso eterno. Cadência e elegância em movimento.", imgFit:"contain" },
  { n:"10", name:"Titan",        handle:"titan",     sport:"Corrida", img:titanJoiaOuro,   imgPrata:titanJoiaPrata,          desc:"Resistência mental, evolução e força silenciosa." },
  { n:"11", name:"Velocità",     handle:"velocita",  sport:"Corrida", img:velocitaJoiaOuro, imgPrata:velocitaJoiaPrata,      desc:"Movimento transformado em elegância." },
  { n:"11A", name:"Sprint",      handle:"sprint",    sport:"Corrida", img:sprintJoia,      imgPrata:sprintJoia,              desc:"A força e a velocidade da explosão inicial em ouro ou prata.", skipPrata: true },
  { n:"11B", name:"Ritmo",       handle:"ritmo",     sport:"Corrida", img:passadaJoia,       imgPrata:ritmoJoia,             desc:"A constância e a determinação do ritmo perfeito esculpidos em joia." },
  { n:"21", name:"Clássico Masc",    handle:"titan",     sport:"Corrida", img:bonecoCorrMascClassicoOuro, imgPrata:bonecoCorrMascClassicoPrata, desc:"Resistência e foco representados em joia exclusiva." },
  { n:"22", name:"Clássico Fem",     handle:"velocita",  sport:"Corrida", img:bonecoCorrFemClassicoOuro,  imgPrata:bonecoCorrFemClassicoPrata,  desc:"Leveza, ritmo e elegância em cada detalhe." },
  { n:"12", name:"Trion Elite",  handle:"trion-elite",  sport:"Triatlo",        img:trionOuro,    imgPrata:placaTriatloPrata,     desc:"TRION ÉLITE Criada para atletas que vivem além dos limites comuns, a linha TRION ÉLITE representa a união perfeita entre resistência, precisão e presença. Inspirada na intensidade do triathlon, cada peça carrega a essência da disciplina absoluta — mente forte, corpo preparado e espírito inabalável. Minimalista. Técnica. Atemporal. Desenvolvida artesanalmente em versões Ouro 18k e Prata 925, TRION ÉLITE foi criada para quem transforma esforço extremo em identidade. Não é apenas uma joia. É um símbolo de permanência entre os que suportam o impossível. TRION ÉLITE. Para atletas que nasceram para atravessar distâncias que poucos suportam.", skipPrata: true },
  { n:"13", name:"Velarion",     handle:"velarion",     sport:"Triatlo",        img:velarionOuro,  desc:"Luxo silencioso. Performance elevada.", skipPrata: true },
  { n:"13B", name:"Placa Triatlo", handle:"placa-triatlo", sport:"Triatlo", img:placaTriatloOuro, imgPrata:placaTriatloPrata, desc:"Placa exclusiva com as três modalidades do Triatlo esculpidas em ouro 18k ou prata 925." },
  { n:"26", name:"Clássico Masc", handle:"trion-elite", sport:"Triatlo",  img:bonecoTriMascClassicoOuro, imgPrata:bonecoTriMascClassicoPrata, desc:"Resistência, força e elegância em três modalidades." },
  { n:"27", name:"Cartier",        handle:"cartier",     sport:"Colares", img:colarCartierOuro,   imgPrata:colarCartierPrata,   desc:"Corrente elo cartier. Leveza e sofisticação para o dia a dia.", imgFit:"contain" },
  { n:"28", name:"Veneziana",      handle:"veneziana",   sport:"Colares", img:colarVenezianaOuro, imgPrata:colarVenezianaPrata, desc:"Corrente veneziana. Elegância clássica em cada detalhe.", imgFit:"contain" },
  { n:"29", name:"Anel Corrida Fem",  handle:"anel-corrida",    sport:"Anéis", img:anelCorridaOuro,      imgPrata:anelCorridaPrata,     desc:"Anel com silhueta de corredora feminina. Ouro 18k ou Prata 925." },
  { n:"31", name:"Anel Fisiculturismo", handle:"anel-fisi",  sport:"Anéis", img:anelFisiOuro,         imgPrata:anelFisiPrata,        desc:"Anel com ícones de fisiculturismo gravados. Força e disciplina." },
  { n:"32", name:"Anel Musculação",     handle:"anel-musc",  sport:"Anéis", img:anelMuscOuro,         imgPrata:anelMuscPrata,        desc:"Anel com halter gravado. Para quem treina com constância." },
  { n:"33", name:"Anel Crossfit",       handle:"anel-cross", sport:"Anéis", img:anelCrossfitOuro,     imgPrata:anelCrossfitPrata,    desc:"Anel com ícones de crossfit. Kettlebell, levantamento e box." },
  { n:"34", name:"Anel Ciclismo",       handle:"anel-cicl",  sport:"Anéis", img:anelCiclismoOuro,     imgPrata:anelCiclismoPrata,    desc:"Anel com ciclista gravado. Velocidade e determinação." },
  { n:"35", name:"Anel Corrida Masc",   handle:"anel-corrm", sport:"Anéis", img:anelCorridaMascOuro,  imgPrata:anelCorridaMascPrata, desc:"Anel com corredor masculino e linhas de velocidade." },
  { n:"36", name:"Anel Triatlo",        handle:"anel-tri",   sport:"Anéis", img:anelTriatloOuro,      imgPrata:anelTriatloPrata,     desc:"Anel com os 3 ícones do triatlo: natação, ciclismo e corrida." },
  { n:"30", name:"Brinco Corrida", handle:"brinco",      sport:"Brincos", img:brincoCorridaOuro,  imgPrata:brincoCorridaPrata,  desc:"Brinco com silhueta de corredora. Leve, elegante e esportivo.", imgFit:"contain" },
];

const SPORTS = ["Todas", "Musculação", "Fisiculturismo", "Crossfit", "Ciclismo", "Corrida", "Triatlo", "Colares", "Anéis", "Brincos"];
// Categorias ocultas no site (mantidas no código para uso futuro). Ex.: Anéis.
const HIDDEN_SPORTS = ["Anéis"];
const VISIBLE_SPORTS = SPORTS.filter((s) => !HIDDEN_SPORTS.includes(s));

type TipoJoia = "Pingentes" | "Colares" | "Anéis" | "Brincos";
type MaterialFiltro = "Prata 925" | "Ouro 18k";

type CatalogProduct = {
  id: string;
  nome: string;
  categoria: string;
  tipo: TipoJoia;
  material: MaterialFiltro;
  preco: number;
  parcelas: number;
  imagem: string;
  collectionHandle: string;
  imgPos?: string;
  imgFilter?: string;
  imgFit?: string;
};

const HERO_BY_SPORT: Record<string, string> = {
  Fisiculturismo: sportFisiculturismo,
  "Musculação": sportMusculacao,
  Corrida: sportCorrida,
  Ciclismo: sportCiclismo,
  Crossfit: sportCrossfit,
  Triatlo: sportTriathlon,
  Brincos: brincoCorridaOuro,
  "Anéis": anelCorridaOuro,
  Colares: colarCartierOuro,
};

const SPORT_COPY: Record<string, string> = {
  Fisiculturismo: "Joias que representam sua paixão, disciplina e superação.",
  "Musculação": "Peças para quem constrói evolução diária com constância.",
  Corrida: "Cada quilômetro pode virar símbolo de uma conquista real.",
  Ciclismo: "Velocidade, resistência e estilo traduzidos em joias únicas.",
  Crossfit: "Força, potência e identidade em cada detalhe da peça.",
  Triatlo: "Uma joia para atletas de múltiplas frentes e grandes metas.",
  Colares: "Correntes exclusivas em Ouro 18k e Prata 925 para complementar sua joia.",
  "Anéis": "Anéis esportivos exclusivos em Ouro 18k e Prata 925.",
  Brincos: "Brincos com design esportivo exclusivo em Ouro 18k e Prata 925.",
  Todas: "Selecione uma categoria para visualizar coleções específicas.",
};

// ── Card de produto Shopify ──────────────────────────────────────────────────
const ProductCard = ({ product, fallbackImg }: { product: ShopifyProduct; fallbackImg: string }) => {
  const [selOpts, setSelOpts] = useState<Record<string, string>>({});
  const [adding, setAdding]   = useState(false);
  const [buying, setBuying]   = useState(false);
  const [added, setAdded]     = useState(false);

  const addItem  = useCartStore(s => s.addItem);
  const openCart = useCartUIStore(s => s.openCart);

  useEffect(() => {
    const init: Record<string, string> = {};
    product.node.options.forEach(o => { if (o.values[0]) init[o.name] = o.values[0]; });
    setSelOpts(init);
  }, [product.node.options]);

  const variants = product.node.variants.edges;
  const selVariant = (
    variants.find(({ node }) => node.selectedOptions.every(o => selOpts[o.name] === o.value))
    ?? variants[0]
  )?.node;

  const price = selVariant?.price ?? product.node.priceRange.minVariantPrice;

  // imagem: variante > produto > fallback local
  const shopifyImg =
    product.node.images?.edges?.[0]?.node?.url ?? null;
  const img = shopifyImg ?? fallbackImg;

  const handleAdd = async () => {
    if (!selVariant) return;
    setAdding(true);
    await addItem({
      product,
      variantId: selVariant.id,
      variantTitle: selVariant.title,
      price: selVariant.price,
      quantity: 1,
      selectedOptions: selVariant.selectedOptions,
      thumbnailImage: product.node.featuredImage ?? null,
    });
    setAdding(false);
    setAdded(true);
    setTimeout(() => { setAdded(false); openCart(); }, 900);
  };

  const handleBuy = async () => {
    if (!selVariant) return;
    setBuying(true);
    try {
      const r = await createShopifyCart({ variantId: selVariant.id, quantity: 1 });
      if (r?.checkoutUrl) window.location.href = r.checkoutUrl;
    } catch {}
    setBuying(false);
  };

  return (
    <div style={{ background: "#0E0B08", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(212,175,55,0.12)", display: "flex", flexDirection: "column" }}>
      {/* Imagem */}
      <div style={{ aspectRatio: "3/4", overflow: "hidden", flexShrink: 0 }}>
        <img src={img} alt={product.node.title} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
      </div>

      {/* Conteúdo */}
      <div style={{ padding: "20px 18px 22px", display: "flex", flexDirection: "column", flex: 1, gap: 0 }}>
        <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 300, fontStyle: "italic", color: "#f0e6c8", marginBottom: 6, lineHeight: 1.2 }}>
          {product.node.title}
        </h4>

        {product.node.description && (
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 14 }}>
            {product.node.description.slice(0, 100)}{product.node.description.length > 100 ? "…" : ""}
          </p>
        )}

        {/* Opções */}
        {product.node.options.filter(o => o.values.length > 1 || o.name.toLowerCase().includes("material") || o.name.toLowerCase().includes("tipo")).map(opt => (
          <div key={opt.name} style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 7 }}>
              {opt.name}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {opt.values.map(val => {
                const sel = selOpts[opt.name] === val;
                return (
                  <button key={val} onClick={() => setSelOpts(p => ({ ...p, [opt.name]: val }))}
                    style={{ padding: "5px 12px", borderRadius: 6, fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 500, border: sel ? "1.5px solid #d4af37" : "1px solid rgba(255,255,255,0.10)", background: sel ? "rgba(212,175,55,0.12)" : "transparent", color: sel ? "#d4af37" : "rgba(255,255,255,0.40)", cursor: "pointer", transition: "all 0.15s" }}>
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Preço */}
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.55rem", fontWeight: 300, color: "#f0e6c8", margin: "10px 0 16px" }}>
          {price ? fmtBRL(price.amount) : "–"}
        </div>

        {/* Botões */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
          <button onClick={handleAdd} disabled={adding || added || !selVariant}
            style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: added ? "#2a7a47" : "linear-gradient(135deg,#C9A220,#E8C84A)", color: added ? "#fff" : "#1C1814", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", cursor: adding || added || !selVariant ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s", opacity: !selVariant ? 0.4 : 1 }}>
            {adding ? <Loader2 size={13} style={{ animation: "col-spin 1s linear infinite" }} />
              : added ? "✓ Adicionado!"
              : <><ShoppingBag size={13} strokeWidth={1.5} /> Adicionar ao carrinho</>}
          </button>

          <button onClick={handleBuy} disabled={buying || !selVariant}
            style={{ width: "100%", padding: "11px 0", borderRadius: 10, border: "1px solid rgba(212,175,55,0.28)", background: "transparent", color: buying ? "rgba(255,255,255,0.25)" : "#d4af37", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", cursor: buying || !selVariant ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s", opacity: !selVariant ? 0.4 : 1 }}>
            {buying ? <Loader2 size={13} style={{ animation: "col-spin 1s linear infinite" }} />
              : <><Zap size={13} strokeWidth={1.5} /> Comprar agora</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Vista de produtos de uma coleção ─────────────────────────────────────────
const ColecaoView = ({
  col,
  allProducts,
  loadingShopify,
  onBack,
}: {
  col: ColItem;
  allProducts: ShopifyProduct[];
  loadingShopify: boolean;
  onBack: () => void;
}) => {
  // Filtra produtos Shopify que pertencem a esta coleção
  const colName = col.name.toLowerCase();
  let products = allProducts.filter(p =>
    p.node.handle === col.handle ||
    p.node.handle.startsWith(col.handle + "-") ||
    p.node.title.toLowerCase().includes(colName)
  );


  // Mapeamento especial para coleções estáticas do ateliê
  if (products.length === 0 && allProducts.length > 0) {
    if (col.handle === "halter-elite") {
      const baseProduct = allProducts.find(p => p.node.handle === "halter");
      if (baseProduct) {
        const cloned = JSON.parse(JSON.stringify(baseProduct)) as ShopifyProduct;
        cloned.node.title = "Halter Elite";
        cloned.node.handle = "halter-elite";
        if (col.img) {
          cloned.node.featuredImage = { url: col.img, altText: "Halter Elite" };
          cloned.node.images.edges = [{ node: { url: col.img, altText: "Halter Elite" } }];
        }
        if (col.skipPrata) {
          cloned.node.variants.edges = cloned.node.variants.edges.filter(v => 
            v.node.title.toLowerCase().includes("ouro")
          );
        }
        products = [cloned];
      }
    } else if (col.handle === "imperium-crossfit" || col.handle === "imperium-ouro" || col.handle === "imperium-prata") {
      const baseProduct = allProducts.find(p => p.node.handle === "imperium");
      if (baseProduct) {
        const cloned = JSON.parse(JSON.stringify(baseProduct)) as ShopifyProduct;
        cloned.node.title = col.name;
        cloned.node.handle = col.handle;
        if (col.img) {
          cloned.node.featuredImage = { url: col.img, altText: col.name };
          cloned.node.images.edges = [{ node: { url: col.img, altText: col.name } }];
        } else if (col.imgPrata) {
          cloned.node.featuredImage = { url: col.imgPrata, altText: col.name };
          cloned.node.images.edges = [{ node: { url: col.imgPrata, altText: col.name } }];
        }
        if (col.skipPrata) {
          cloned.node.variants.edges = cloned.node.variants.edges.filter(v => 
            v.node.title.toLowerCase().includes("ouro")
          );
        }
        if (col.skipOuro) {
          cloned.node.variants.edges = cloned.node.variants.edges.filter(v => 
            v.node.title.toLowerCase().includes("prata")
          );
        }
        products = [cloned];
      }
    } else if (col.handle === "corrida-atleta") {
      const baseProduct = allProducts.find(p => p.node.handle === "velocita");
      if (baseProduct) {
        const cloned = JSON.parse(JSON.stringify(baseProduct)) as ShopifyProduct;
        cloned.node.title = "Corrida Atleta";
        cloned.node.handle = "corrida-atleta";
        if (col.img) {
          cloned.node.featuredImage = { url: col.img, altText: "Corrida Atleta" };
          cloned.node.images.edges = [{ node: { url: col.img, altText: "Corrida Atleta" } }];
        }
        products = [cloned];
      }
    } else if (col.handle === "corrida-elite") {
      const baseProduct = allProducts.find(p => p.node.handle === "titan");
      if (baseProduct) {
        const cloned = JSON.parse(JSON.stringify(baseProduct)) as ShopifyProduct;
        cloned.node.title = "Corrida Elite";
        cloned.node.handle = "corrida-elite";
        if (col.img) {
          cloned.node.featuredImage = { url: col.img, altText: "Corrida Elite" };
          cloned.node.images.edges = [{ node: { url: col.img, altText: "Corrida Elite" } }];
        }
        if (col.skipPrata) {
          cloned.node.variants.edges = cloned.node.variants.edges.filter(v => 
            v.node.title.toLowerCase().includes("ouro")
          );
        }
        products = [cloned];
      }
    } else if (col.handle === "sprint" || col.handle === "ritmo") {
      const baseProduct = allProducts.find(p => p.node.handle === "velocita");
      if (baseProduct) {
        const cloned = JSON.parse(JSON.stringify(baseProduct)) as ShopifyProduct;
        cloned.node.title = col.name;
        cloned.node.handle = col.handle;
        if (col.img) {
          cloned.node.featuredImage = { url: col.img, altText: col.name };
          cloned.node.images.edges = [{ node: { url: col.img, altText: col.name } }];
        }
        products = [cloned];
      }
    }
  }

  // Se for Gold-only ou Silver-only, filtramos as variantes e opções dos produtos (Shopify ou clones)
  if (products.length > 0 && (col.skipPrata || col.skipOuro)) {
    products = products.map(p => {
      const cloned = JSON.parse(JSON.stringify(p)) as ShopifyProduct;
      
      // Filtra as variantes
      cloned.node.variants.edges = cloned.node.variants.edges.filter(ve => {
        const v = ve.node;
        const mat = (v.selectedOptions.find(o => o.name.toLowerCase().includes("material") || o.name.toLowerCase().includes("tipo"))?.value ?? v.title).toLowerCase();
        if (col.skipPrata) return !mat.includes("prata");
        if (col.skipOuro) return !mat.includes("ouro");
        return true;
      });
      
      // Filtra os valores das opções
      cloned.node.options = cloned.node.options.map(opt => {
        if (opt.name.toLowerCase().includes("material") || opt.name.toLowerCase().includes("tipo")) {
          return {
            ...opt,
            values: opt.values.filter(val => {
              const valLower = val.toLowerCase();
              if (col.skipPrata) return !valLower.includes("prata");
              if (col.skipOuro) return !valLower.includes("ouro");
              return true;
            })
          };
        }
        return opt;
      });
      
      return cloned;
    });
  }

  // Se após os filtros ainda estiver vazio e não estiver carregando, geramos o mock baseado na coleção
  if (products.length === 0 && !loadingShopify) {
    const isGoldOnly = !col.skipOuro && col.skipPrata;
    const isSilverOnly = col.skipOuro && !col.skipPrata;
    
    // Preços oficiais das variantes do HALTER (placeholder do projeto)
    let precoOuro = 1497;
    let precoPrata = 347;

    if (col.handle === "halter") {
      precoOuro = 2;
      precoPrata = 2;
    } else if (col.handle === "halter-elite") {
      precoOuro = 3487;
      precoPrata = 297;
    } else if (col.handle.startsWith("velox-royale-fem")) {
      precoOuro = 2487;
      precoPrata = 297;
    } else if (col.handle === "velox-royale") {
      precoOuro = 3487;
      precoPrata = 297;
    } else if (col.handle === "kettlebell-crossfit") {
      precoOuro = 2490;
      precoPrata = 327;
    } else if (col.handle === "conjunto-crossfit-ouro") {
      precoOuro = 3487;
    } else if (col.handle === "conjunto-crossfit-elite") {
      precoOuro = 4397;
    } else if (col.handle === "placa-triatlo") {
      precoOuro = 2587;
      precoPrata = 327;
    }

    const variantsList = [];
    if (!isSilverOnly) {
      variantsList.push({
        node: {
          id: "gid://shopify/ProductVariant/48912055468259", // Placeholder Ouro HALTER
          title: "Ouro 18k",
          price: { amount: precoOuro.toFixed(2), currencyCode: "BRL" },
          availableForSale: true,
          selectedOptions: [{ name: "Material", value: "Ouro 18k" }],
          image: { url: col.img || col.imgPrata, altText: col.name }
        }
      });
    }
    if (!isGoldOnly) {
      variantsList.push({
        node: {
          id: "gid://shopify/ProductVariant/48912055501027", // Placeholder Prata HALTER
          title: "Prata 925",
          price: { amount: precoPrata.toFixed(2), currencyCode: "BRL" },
          availableForSale: true,
          selectedOptions: [{ name: "Material", value: "Prata 925" }],
          image: { url: col.imgPrata || col.img, altText: col.name }
        }
      });
    }

    const mockProduct: ShopifyProduct = {
      node: {
        id: `gid://shopify/Product/Mock-${col.handle}`,
        title: col.name,
        description: col.desc,
        handle: col.handle,
        featuredImage: { url: col.img || col.imgPrata, altText: col.name },
        priceRange: { minVariantPrice: { amount: (isGoldOnly ? precoOuro : precoPrata).toFixed(2), currencyCode: "BRL" } },
        images: { edges: [{ node: { url: col.img || col.imgPrata, altText: col.name } }] },
        options: [{ name: "Material", values: variantsList.map(v => v.node.title) }],
        variants: { edges: variantsList }
      }
    };
    
    products = [mockProduct];
  }

  return (
    <div>
      {/* Breadcrumb / header da coleção */}
      <div style={{ marginBottom: 40 }}>
        <button onClick={onBack}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 24, transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#d4af37")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          <ArrowLeft size={12} strokeWidth={1.5} /> Todas as coleções
        </button>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }} className="col-view-header">
          <style>{`@media(max-width:640px){.col-view-header{flex-direction:column!important;gap:20px!important;}}`}</style>

          {/* Imagem miniatura */}
          <div style={{ width: 120, height: 160, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(212,175,55,0.18)" }}>
            <img src={col.img} alt={col.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>

          <div style={{ paddingTop: 8 }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.45em", textTransform: "uppercase", color: "#d4af37", marginBottom: 10 }}>
              {col.sport} · Linha {col.n}
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, fontStyle: "italic", color: "#f0e6c8", lineHeight: 1.1, marginBottom: 10 }}>
              {col.name}
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.42)", lineHeight: 1.7, maxWidth: "52ch" }}>
              {col.desc}
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg,rgba(212,175,55,0.25),transparent)", marginTop: 28 }} />
      </div>

      {/* Produtos */}
      {loadingShopify ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, gap: 12 }}>
          <Loader2 size={22} style={{ animation: "col-spin 1s linear infinite", color: "#d4af37" }} />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.30)" }}>Carregando produtos…</span>
        </div>
      ) : products.length > 0 ? (
        <div className="prod-view-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px 20px" }}>
          <style>{`
            @media(max-width:1100px){.prod-view-grid{grid-template-columns:repeat(3,1fr)!important;}}
            @media(max-width:760px){.prod-view-grid{grid-template-columns:repeat(2,1fr)!important;}}
            @media(max-width:480px){.prod-view-grid{grid-template-columns:1fr!important;}}
          `}</style>
          {products.map(p => (
            <ProductCard key={p.node.id} product={p} fallbackImg={col.img} />
          ))}
        </div>
      ) : (
        /* Nenhum produto no Shopify → fallback WPP */
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.20)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <img src={col.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 300, fontStyle: "italic", color: "#f0e6c8", marginBottom: 8 }}>
            Linha {col.name}
          </h3>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: 24, maxWidth: 360, margin: "0 auto 24px" }}>
            Esta linha está disponível sob encomenda. Fale conosco para preços e personalização.
          </p>
          <a href={WPP} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 12, background: "linear-gradient(135deg,#C9A220,#E8C84A)", color: "#1C1814", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            Encomendar no WhatsApp →
          </a>
        </div>
      )}
    </div>
  );
};

// ── Card de coleção (grid principal) ─────────────────────────────────────────
const ColecaoCard = ({ col, onClick }: { col: ColItem; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Imagem */}
      <div style={{ position: "relative", aspectRatio: "2/3", borderRadius: 16, overflow: "hidden", border: `1px solid ${hovered ? "rgba(212,175,55,0.40)" : "rgba(212,175,55,0.12)"}`, boxShadow: hovered ? "0 20px 56px rgba(0,0,0,0.60), 0 0 0 1px rgba(212,175,55,0.08)" : "0 6px 24px rgba(0,0,0,0.40)", transition: "all 0.35s" }}>
        <img src={col.img} alt={col.name} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.55s ease", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.10) 55%)" }} />

        {/* N° */}
        <div style={{ position: "absolute", top: 12, left: 12, fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: "0.4em", color: "rgba(212,175,55,0.60)" }}>
          N° {col.n}
        </div>

        {/* Sport badge */}
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderRadius: 100, padding: "3px 10px", border: "1px solid rgba(212,175,55,0.18)" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,175,55,0.75)" }}>{col.sport}</span>
        </div>

        {/* Bottom info no hover */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 16px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "all 0.3s" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4af37" }}>Ver linha</span>
          <ChevronRight size={14} color="#d4af37" strokeWidth={1.5} />
        </div>
      </div>

      {/* Info abaixo do card */}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontWeight: 300, fontStyle: "italic", color: "#e9dcb1", marginBottom: 5, lineHeight: 1.2 }}>
          {col.name}
        </h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, padding: "0 4px" }}>
          {col.desc}
        </p>
      </div>
    </div>
  );
};

// ── Seção IA (Pingente Personalizado) ──────────────────────────────────────────
const PRECO_OURO  = 1497; // preço real no Shopify (variante HALTER Ouro 18k)
const PRECO_PRATA = 347;

// Variantes do produto "Joia Personalizada" na Shopify (handle: joia-personalizada)
const VARIANT_ID_OURO_PERS = "gid://shopify/ProductVariant/49253071290595"; // Ouro 18k
const VARIANT_ID_PRATA_PERS = "gid://shopify/ProductVariant/49253071323363"; // Prata 925

const getPersonalizadoProductMock = (material: "ouro" | "prata", imageUrl: string): ShopifyProduct => {
  const isOuro = material === "ouro";
  const variantId = isOuro ? VARIANT_ID_OURO_PERS : VARIANT_ID_PRATA_PERS;
  const priceAmount = isOuro ? "1497.00" : "347.00";
  
  return {
    node: {
      id: "gid://shopify/Product/Personalizado",
      title: "Joia Personalizada",
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

const MENSAGENS_PROGRESSO = [
  "Analisando a pose e proporções da foto...",
  "Esculpindo os detalhes do rosto em metal...",
  "Gravando detalhes do cabelo e roupas...",
  "Aplicando polimento e reflexos metálicos...",
  "Finalizando a peça com qualidade de joalheria...",
  "Quase pronto, ajustando os últimos detalhes...",
];

const PersonalizarIA = () => {
  const inputRef      = useRef<HTMLInputElement>(null);
  const addItem       = useCartStore(s => s.addItem);
  const patchItem     = useCartStore(s => s.patchItem);
  const openCart      = useCartUIStore(s => s.openCart);

  const [foto, setFoto]               = useState<string | null>(null);
  const [fotoUrl, setFotoUrl]         = useState<string | null>(null);
  const [material, setMaterial]       = useState<"ouro" | "prata">("ouro");
  const [erroMsg, setErroMsg]         = useState<string>("");
  const [estado, setEstado]           = useState<"idle" | "gerando" | "pronto" | "erro">("idle");
  const [resultado, setResultado]     = useState<string | null>(null);
  const [storageUrl, setStorageUrl]   = useState<string | null>(null);
  const [comprando, setComprando]     = useState(false);
  const [adicionando, setAdicionando] = useState(false);
  const [adicionado, setAdicionado]   = useState(false);
  const [segundos, setSegundos]       = useState(0);
  const [msgIdx, setMsgIdx]           = useState(0);
  const timerRef                      = useRef<ReturnType<typeof setInterval> | null>(null);

  const preco     = material === "ouro" ? PRECO_OURO : PRECO_PRATA;
  const fmtPreco  = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoUrl(URL.createObjectURL(file));
    setResultado(null); setStorageUrl(null); setEstado("idle"); setAdicionado(false);
    try {
      setFoto(await downscaleImage(file)); // reduz p/ caber no limite de body do Vercel
    } catch {
      const reader = new FileReader();
      reader.onload = ev => setFoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGerar = async () => {
    console.log("[gerar-joia] handleGerar chamado, foto:", foto ? `${(foto.length/1024).toFixed(0)}KB` : "null");
    if (!foto) { console.warn("[gerar-joia] foto é null, abortando"); return; }
    setEstado("gerando"); setResultado(null); setStorageUrl(null); setAdicionado(false); setErroMsg("");
    setSegundos(0); setMsgIdx(0);
    timerRef.current = setInterval(() => {
      setSegundos(s => {
        const next = s + 1;
        setMsgIdx(Math.min(Math.floor(next / 12), MENSAGENS_PROGRESSO.length - 1));
        return next;
      });
    }, 1000);
    try {
      console.log("[gerar-joia] enviando requisição para /api/gerar-joia...");
      const res = await fetch("/api/gerar-joia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: foto, material }),
      });
      console.log("[gerar-joia] resposta recebida, status:", res.status);
      const data = await res.json();
      console.log("[gerar-joia] JSON parseado, keys:", Object.keys(data), "imageUrl?", !!data.imageUrl);
      if (data.error) throw new Error(data.error);
      setResultado(data.imageUrl); setStorageUrl(data.storageUrl ?? null); setEstado("pronto");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      console.error("[gerar-joia] ERRO:", msg);
      setErroMsg(msg);
      setEstado("erro");
    } finally {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }
  };

  // `_imagem_url` (underscore) fica oculta para o cliente, mas visível no pedido do admin.
  const buildJoiaAttributes = (): Array<{ key: string; value: string }> => {
    const url = storageUrl ?? (resultado?.startsWith("http") ? resultado : null);
    const attrs = [{ key: "Joia", value: "Personalizada por IA" }];
    if (url) attrs.push({ key: "_imagem_url", value: url });
    return attrs;
  };

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
        attributes: buildJoiaAttributes(),
      });
      // força a imagem gerada no carrinho (Shopify sobrescreve com a do produto)
      patchItem(variantId, { thumbnailImage: thumb, product: mockProduct, price: { amount: priceAmt, currencyCode: "BRL" } });
      setAdicionado(true);
      setTimeout(() => { setAdicionado(false); openCart(); }, 900);
    } catch (err) {
      console.error("[Shopify] Erro ao adicionar:", err);
      setErroMsg("Erro ao adicionar ao carrinho. Tente novamente.");
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
      const r = await createShopifyCart({ variantId, quantity: 1, attributes: buildJoiaAttributes() });
      if (r?.checkoutUrl) {
        window.location.href = r.checkoutUrl;
      } else {
        setErroMsg("Erro ao iniciar o checkout. Tente adicionar ao carrinho.");
        setEstado("erro");
      }
    } catch (err) {
      console.error("[Shopify] Erro no checkout:", err);
      setErroMsg("Erro ao conectar com o Shopify. Verifique sua conexão.");
      setEstado("erro");
    } finally {
      setComprando(false);
    }
  };

  return (
    <section style={{ background: "radial-gradient(circle at top, #14110E 0%, #080605 100%)", padding: "100px 0", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        
        {/* Cabeçalho */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)", borderRadius: 100, padding: "6px 18px", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8C84A", display: "block", animation: "col-pulse 2s infinite" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "#d4af37" }}>
              Exclusividade & Tecnologia
            </span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 300, color: "#f4ead0", lineHeight: 1.1, marginBottom: 16 }}>
            Eternize seu momento em uma <em style={{ fontStyle: "italic", color: "#E8C84A" }}>joia única</em>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.40)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Envie sua foto favorita praticando seu esporte e nossa IA gerará a gravação perfeita de silhueta no pingente. Escolha seu material e veja o design instantaneamente.
          </p>
        </div>

        <div className="col-pers-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "start" }}>
          <style>{`
            @media(max-width:900px){
              .col-pers-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            }
          `}</style>

          {/* Lado Esquerdo - Instruções e Configurações */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 40 }}>
            
            {/* Passos do Processo */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 300, color: "#f4ead0", marginBottom: 10, borderBottom: "1px solid rgba(212,175,55,0.12)", paddingBottom: 12 }}>
                Como Funciona
              </h3>
              
              {[
                { n: "01", t: "Envie sua Foto de Referência", d: "Uma foto sua correndo, pedalando, no palco ou treinando. Nossa IA de visão analisará sua pose com precisão para transformá-la na silhueta da joia." },
                { n: "02", t: "Escolha a Nobreza do Metal", d: "Trabalhamos com Ouro 18k legítimo ou Prata 925 pura. O valor e o brilho do pingente se adaptam à sua escolha." },
                { n: "03", t: "Gere a Prévia e Compre", d: "Veja o pingente virtual criado sob medida. Se amar o resultado, compre instantaneamente." },
              ].map(({ n, t, d }) => (
                <div key={n} style={{ display: "flex", gap: 20 }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, border: "1px solid rgba(212,175,55,0.20)", background: "rgba(212,175,55,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 400, color: "#E8C84A" }}>{n}</span>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "#f4ead0", marginBottom: 6, fontWeight: 400 }}>{t}</h4>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: 0 }}>{d}</p>
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
                  * Envie sua foto no painel ao lado primeiro para liberar a criação por IA
                </p>
              )}
            </div>

          </div>

          {/* Lado Direito - Preview / Upload Box */}
          <div>
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
                        Arraste ou clique para carregar fotos em JPG, PNG ou WEBP.
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
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 300, margin: "0 auto", minHeight: 40, transition: "all 0.5s" }}>
                    {MENSAGENS_PROGRESSO[msgIdx]}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 18 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 28, fontWeight: 700, color: "#E8C84A", letterSpacing: "-1px", lineHeight: 1 }}>
                      {segundos}s
                    </span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                      pode levar até 60 segundos
                    </span>
                  </div>
                  <div style={{ width: 240, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginTop: 14, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "linear-gradient(90deg,#E8C84A,#f4ead0)", borderRadius: 3, width: `${Math.min((segundos / 60) * 100, 95)}%`, transition: "width 1s linear" }} />
                  </div>
                </div>
              )}

              {/* ESTADO 3: Pronto — placeholder para manter o card visível */}
              {estado === "pronto" && resultado && (
                <div style={{ textAlign: "center", padding: "20px 0", color: "rgba(255,255,255,0.4)", fontFamily: "'Inter',sans-serif", fontSize: 13 }}>
                  ✦ Joia gerada — veja abaixo
                </div>
              )}

              {/* ESTADO 4: Erro */}
              {estado === "erro" && (
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
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.40)", lineHeight: 1.6, marginBottom: erroMsg ? 8 : 20 }}>
                    Não conseguimos converter a foto em silhueta de joia neste momento. Pode ter ocorrido uma instabilidade temporária na IA.
                  </p>
                  {erroMsg && (
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(224,112,112,0.7)", lineHeight: 1.5, marginBottom: 20, maxWidth: 280, wordBreak: "break-word" }}>
                      Detalhe: {erroMsg}
                    </p>
                  )}
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

        {/* ── RESULTADO DA JOIA ── */}
        {estado === "pronto" && resultado && (
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 48, alignItems: "start" }}>
            <style>{`@media(max-width:860px){ .result-layout{ grid-template-columns:1fr!important; gap:32px!important; } }`}</style>

            {/* Imagem SOLTA — sem overflow, sem height, cresce livremente */}
            <img
              src={resultado}
              alt="Joia gerada por IA"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                borderRadius: 16,
                border: material === "ouro" ? "1.5px solid rgba(232,200,74,0.35)" : "1.5px solid rgba(255,255,255,0.18)",
                boxShadow: material === "ouro"
                  ? "0 24px 64px rgba(232,200,74,0.15), 0 8px 24px rgba(0,0,0,0.5)"
                  : "0 24px 64px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.5)",
              }}
            />

            {/* Coluna direita: info + botões */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8C84A", marginBottom: 8 }}>✦ Personalizado</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontStyle: "italic", color: "#f4ead0", margin: "0 0 20px" }}>"Você acabou de eternizar sua paixão."</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: material === "ouro" ? "rgba(232,200,74,0.08)" : "rgba(255,255,255,0.05)", border: material === "ouro" ? "1px solid rgba(232,200,74,0.25)" : "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px 28px" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Pingente {material === "ouro" ? "Ouro 18k" : "Prata 925"}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 600, color: material === "ouro" ? "#E8C84A" : "#f0e6c8" }}>{fmtPreco(preco)}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={handleComprarAgora} disabled={comprando} style={{ width: "100%", padding: "16px 0", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#C9A220,#E8C84A)", color: "#1C1814", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, cursor: comprando ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 8px 24px rgba(232,200,74,0.25)" }}>
                  {comprando ? <Loader2 size={14} style={{ animation: "col-spin 1s linear infinite" }} /> : <><Zap size={14} /> Comprar Agora</>}
                </button>
                <button onClick={handleAddCart} disabled={adicionando || adicionado} style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: `1px solid ${adicionado ? "#4ade80" : "rgba(212,175,55,0.30)"}`, background: adicionado ? "rgba(42,122,71,0.1)" : "transparent", color: adicionado ? "#4ade80" : "#E8C84A", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, cursor: adicionando || adicionado ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {adicionando ? <Loader2 size={14} style={{ animation: "col-spin 1s linear infinite" }} /> : adicionado ? "✓ Adicionado ao Carrinho!" : <><ShoppingBag size={14} /> Adicionar ao Carrinho</>}
                </button>
                <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 4 }}>
                  <button onClick={handleGerar} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontFamily: "'Inter',sans-serif", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Gerar novamente</button>
                  <button onClick={() => { setFoto(null); setFotoUrl(null); setResultado(null); setEstado("idle"); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Nova foto</button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

const getSportSlug = (sportName: string) => {
  const clean = sportName.trim().toLowerCase();
  if (clean.includes("muscul") || clean === "musculação" || clean === "musculacion" || clean === "bodybuilding") return "musculacao";
  if (clean.includes("cross")) return "crossfit";
  if (clean.includes("corr") || clean === "corrida" || clean === "carrera" || clean === "running") return "corrida";
  if (clean.includes("cicl") || clean === "ciclismo" || clean === "cycling") return "ciclismo";
  if (clean.includes("triat") || clean === "triatlo" || clean === "triathlon") return "triathlon";
  if (clean.includes("fisi") || clean === "fisiculturismo" || clean === "bodybuilding elite") return "fisiculturismo";
  if (clean.includes("colar") || clean === "colares") return "colares";
  if (clean.includes("anel") || clean === "anéis" || clean === "aneis") return "aneis";
  if (clean.includes("brinco") || clean === "brincos") return "brincos";
  return clean;
};

const useProductTranslation = () => {
  const { t } = useLanguage();

  const translateProduct = (handle: string, name: string, defaultDesc: string) => {
    const handleClean = handle.trim().toLowerCase();
    const nameClean = name.trim().toLowerCase();

    // Resolver Nome do Produto
    let translatedName = name;
    if (handleClean === "cartier") translatedName = t("product.name.cartier");
    else if (handleClean === "veneziana") translatedName = t("product.name.veneziana");
    else if (handleClean === "brinco") translatedName = t("product.name.brinco_corrida");
    else if (handleClean === "anel-corrida") translatedName = t("product.name.anel_corrida_fem");
    else if (handleClean === "anel-fisi") translatedName = t("product.name.anel_fisi");
    else if (handleClean === "anel-musc") translatedName = t("product.name.anel_musc");
    else if (handleClean === "anel-cross") translatedName = t("product.name.anel_cross");
    else if (handleClean === "anel-cicl") translatedName = t("product.name.anel_cicl");
    else if (handleClean === "anel-corrm") translatedName = t("product.name.anel_corrm");
    else if (handleClean === "anel-tri") translatedName = t("product.name.anel_tri");
    else if (handleClean === "sprint") translatedName = t("product.name.sprint");
    else if (handleClean === "ritmo") translatedName = t("product.name.ritmo");
    else if (handleClean === "kettlebell-crossfit") translatedName = t("product.name.kettlebell_crossfit");
    else if (handleClean.startsWith("velox-royale-fem-speed")) translatedName = t("product.name.velox_fem_speed");
    else if (handleClean.startsWith("velox-royale-fem-mtb")) translatedName = t("product.name.velox_fem_mtb");
    else if (nameClean.includes("speed clássico") || nameClean.includes("speed classico")) translatedName = t("product.name.speed_classico");
    else if (handleClean === "placa-triatlo") translatedName = t("product.name.placa_triatlo");
    else if (nameClean === "clássico masc" || nameClean === "classico masc") translatedName = t("product.name.classico_masc");
    else if (nameClean === "clássico fem" || nameClean === "classico fem") translatedName = t("product.name.classico_fem");
    else if (nameClean === "underground masc") translatedName = t("product.name.underground_masc");
    else if (nameClean === "underground fem") translatedName = t("product.name.underground_fem");
    else if (t("line." + handleClean + ".nome") !== ("line." + handleClean + ".nome")) {
      translatedName = t("line." + handleClean + ".nome");
    }

    // Resolver Descrição
    let translatedDesc = defaultDesc;
    if (t("line." + handleClean + ".frase") !== ("line." + handleClean + ".frase")) {
      translatedDesc = t("line." + handleClean + ".frase");
    } else if (nameClean === "clássico masc" || nameClean === "classico masc") {
      translatedDesc = t("product.desc.classico_masc");
    } else if (nameClean === "clássico fem" || nameClean === "classico fem") {
      translatedDesc = t("product.desc.classico_fem");
    } else if (nameClean === "underground masc") {
      translatedDesc = t("product.desc.underground_masc");
    } else if (nameClean === "underground fem") {
      translatedDesc = t("product.desc.underground_fem");
    } else if (handleClean === "cartier") {
      translatedDesc = t("product.desc.cartier");
    } else if (handleClean === "veneziana") {
      translatedDesc = t("product.desc.veneziana");
    } else if (handleClean === "brinco") {
      translatedDesc = t("product.desc.brinco_corrida");
    } else if (handleClean === "anel-corrida") {
      translatedDesc = t("product.desc.anel_corrida_fem");
    } else if (handleClean === "placa-triatlo") {
      translatedDesc = t("product.desc.placa_triatlo");
    }

    return { nome: translatedName, desc: translatedDesc };
  };

  return { translateProduct };
};

// ── Página principal ──────────────────────────────────────────────────────────
const Colecao = () => {
  const { t } = useLanguage();
  const { translateProduct } = useProductTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartUIStore((s) => s.openCart);
  const addItem = useCartStore((s) => s.addItem);
  const [tipos, setTipos] = useState<TipoJoia[]>([]);
  const [materiais, setMateriais] = useState<MaterialFiltro[]>([]);
  const [ordem, setOrdem] = useState("Mais Vendidos");
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.imagem);
    } else {
      setActiveImage("");
    }
  }, [selectedProduct]);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    storefrontApiRequest(STOREFRONT_QUERY, { first: 80 })
      .then((data) => {
        const products: ShopifyProduct[] =
          (data?.data?.products?.edges ?? []).map((e: any) => ({ node: e.node }));
        const exclusoes = ["joia-personalizada", "joia personalizada", "personalizada", "personalizado"];
        const filtrados = products.filter((p: ShopifyProduct) => {
          const title = p.node.title.toLowerCase();
          const handle = p.node.handle.toLowerCase();
          return !exclusoes.some(ex => title.includes(ex) || handle.includes(ex));
        });
        setAllProducts(filtrados);
      })
      .catch(() => {});
  }, []);
  const sportParam = searchParams.get("sport");
  const activeSport =
    sportParam && VISIBLE_SPORTS.includes(sportParam)
      ? sportParam
      : "Fisiculturismo";
  const heroImage = activeSport === "Todas" ? colecoesHero : (HERO_BY_SPORT[activeSport] ?? colecoesHero);
  const heroCopy = SPORT_COPY[activeSport] ?? SPORT_COPY.Todas;

  const catalogProducts = useMemo<CatalogProduct[]>(() => {
    const tipoPorColecao: Record<string, TipoJoia> = {
      halter: "Pingentes",
      vigor: "Pingentes",
      dominus: "Pingentes",
      monarch: "Pingentes",
      valenza: "Pingentes",
      imperium: "Pingentes",
      "imperium-ouro": "Pingentes",
      "imperium-prata": "Pingentes",
      strata: "Pingentes",
      "kettlebell-crossfit": "Pingentes",
      "placa-triatlo": "Pingentes",
      "conjunto-crossfit-ouro": "Colares",
      "conjunto-crossfit-elite": "Colares",
      "velox-royale": "Colares",
      "velox-royale-fem-speed": "Colares",
      "velox-royale-fem-mtb": "Colares",
      aeron: "Colares",
      titan: "Colares",
      velocita: "Anéis",
      "trion-elite": "Colares",
      velarion: "Colares",
      triade: "Pingentes",
      cartier: "Colares",
      veneziana: "Colares",
      "anel-corrida": "Anéis",
      "anel-fisi":  "Anéis",
      "anel-musc":  "Anéis",
      "anel-cross": "Anéis",
      "anel-cicl":  "Anéis",
      "anel-corrm": "Anéis",
      "anel-tri":   "Anéis",
      brinco: "Brincos",
    };

    const precoBase: Record<string, number> = {
      halter: 2.0,
      "halter-elite": 3487.0,
      vigor: 2487.0,
      dominus: 3997.0,
      monarch: 3997.0,
      valenza: 3997.0,
      imperium: 2987.0,
      "imperium-ouro": 2987.0,
      "imperium-prata": 297.0,
      "imperium-crossfit": 3200.0,
      wod: 4207.0,
      "elite-cross": 4207.0,
      strata: 549.9,
      "kettlebell-crossfit": 2490.0,
      "conjunto-crossfit-ouro": 3487.0,
      "conjunto-crossfit-elite": 4397.0,
      "velox-royale": 2587.0,
      "velox-royale-fem-speed": 2487.0,
      "velox-royale-fem-mtb": 2487.0,
      "placa-triatlo": 2587.0,
      aeron: 2587.0,
      "corrida-atleta": 3597.0,
      "corrida-elite": 3597.0,
      titan: 459.9,
      velocita: 399.9,
      sprint: 297.0,
      ritmo: 2187.0,
      "trion-elite": 4387.0,
      velarion: 2497.0,
      triade: 899.9,
      cartier: 1700.0,
      veneziana: 1500.0,
      "anel-corrida": 299.9,
      "anel-fisi":  349.9,
      "anel-musc":  299.9,
      "anel-cross": 349.9,
      "anel-cicl":  299.9,
      "anel-corrm": 299.9,
      "anel-tri":   349.9,
      brinco: 1300.0,
    };

    return COLECOES.flatMap((c) => {
      const isClassicoMascFisi = c.sport === "Fisiculturismo" && c.name === "Clássico Masc";
      const isClassicoFemFisi = c.sport === "Fisiculturismo" && c.name === "Clássico Fem";
      const isUndergroundFemFisi = c.sport === "Fisiculturismo" && c.name === "Underground Fem";
      const isUndergroundMascFisi = c.sport === "Fisiculturismo" && c.name === "Underground Masc";
      const isClassicoMascCorrida = c.sport === "Corrida" && c.name === "Clássico Masc";
      const isClassicoFemCorrida = c.sport === "Corrida" && c.name === "Clássico Fem";
      
      let precoOuro = precoBase[c.handle] ?? 399.9;
      if (isClassicoMascFisi) precoOuro = 2487.0;
      else if (isClassicoFemFisi) precoOuro = 2357.0;
      else if (isUndergroundFemFisi) precoOuro = 2787.0;
      else if (isUndergroundMascFisi) precoOuro = 2987.0;
      else if (c.name === "Speed Clássico") precoOuro = 2387.0;
      else if (c.name === "Titan") precoOuro = 2487.0;
      else if (c.name === "Velocità") precoOuro = 2487.0;
      else if (isClassicoMascCorrida) precoOuro = 2187.0;
      else if (isClassicoFemCorrida) precoOuro = 2187.0;

      const ouro = {
        id: `${c.n}-ouro`,
        nome: c.name,
        categoria: c.sport,
        tipo: tipoPorColecao[c.handle] ?? "Pingentes",
        material: "Ouro 18k" as const,
        preco: precoOuro,
        parcelas: 10,
        imagem: c.img ?? "",
        collectionHandle: c.handle,
        imgPos: c.pos ?? "center center",
        imgFilter: undefined,
        imgFit: c.imgFit,
      };
      if (c.skipPrata) return [ouro];
      const isPrecoPrataEspecial = ["dominus", "monarch", "valenza"].includes(c.handle);
      let precoPrata = isPrecoPrataEspecial ? 327.0 : Math.max((precoBase[c.handle] ?? 399.9) * 0.72, 149.9);
      if (c.handle === "imperium" || c.handle === "imperium-prata") precoPrata = 297.0;
      if (c.handle === "corrida-atleta") precoPrata = 297.0;
      if (c.handle === "strata") precoPrata = 297.0;
      if (c.handle === "halter") precoPrata = 2.0;
      if (c.handle === "vigor") precoPrata = 297.0;
      if (c.handle === "kettlebell-crossfit") precoPrata = 327.0;
      if (c.handle === "placa-triatlo") precoPrata = 327.0;
      if (c.handle.startsWith("velox-royale")) precoPrata = 297.0;
      if (c.handle === "aeron") precoPrata = 297.0;
      if (c.handle === "trion-elite") precoPrata = 327.0;
      if (c.name === "Titan") precoPrata = 327.0;
      if (c.name === "Velocità") precoPrata = 327.0;
      if (isClassicoMascCorrida || isClassicoFemCorrida) precoPrata = 297.0;
      if (c.handle === "velarion") precoPrata = 327.0;
      if (c.handle === "ritmo") precoPrata = 297.0;
      if (c.handle === "cartier") precoPrata = 259.0;
      if (c.handle === "veneziana") precoPrata = 287.0;
      if (c.handle === "brinco") precoPrata = 299.0;
      if (isClassicoMascFisi || isClassicoFemFisi) precoPrata = 297.0;

      const prata = {
        id: `${c.n}-prata`,
        nome: c.name,
        categoria: c.sport,
        tipo: tipoPorColecao[c.handle] ?? "Pingentes",
        material: "Prata 925" as const,
        preco: precoPrata,
        parcelas: 6,
        imagem: c.imgPrata ?? "",
        collectionHandle: c.handle,
        imgPos: c.posPrata ?? c.pos ?? "center center",
        imgFilter: c.imgFilterPrata,
        imgFit: c.imgFit,
      };
      if (c.skipOuro) return [prata];
      return [prata, ouro];
    });
  }, []);

  const produtosFiltrados = useMemo(() => {
    let result = activeSport === "Todas"
      ? catalogProducts.filter((p) => !HIDDEN_SPORTS.includes(p.categoria))
      : catalogProducts.filter((p) => p.categoria === activeSport && !HIDDEN_SPORTS.includes(p.categoria));
    if (tipos.length) result = result.filter((p) => tipos.includes(p.tipo));
    if (materiais.length) result = result.filter((p) => materiais.includes(p.material));

    if (ordem === "Menor Preço") result = [...result].sort((a, b) => a.preco - b.preco);
    if (ordem === "Maior Preço") result = [...result].sort((a, b) => b.preco - a.preco);
    if (ordem === "Mais Novos") result = [...result].reverse();
    return result;
  }, [activeSport, catalogProducts, materiais, ordem, tipos]);

  // Reset filtros ao trocar de esporte
  useEffect(() => { setTipos([]); setMateriais([]); }, [activeSport]);

  // Tipos disponíveis no esporte atual (excluindo categorias ocultas, ex.: Anéis)
  const tiposDisponiveis = useMemo(() => {
    const visibles = catalogProducts.filter(p => !HIDDEN_SPORTS.includes(p.categoria));
    const base = activeSport === "Todas" ? visibles : visibles.filter(p => p.categoria === activeSport);
    return (["Pingentes", "Colares", "Anéis", "Brincos"] as TipoJoia[])
      .filter(t => t !== "Anéis")
      .filter(t => base.some(p => p.tipo === t));
  }, [activeSport, catalogProducts]);

  const toggleTipo = (tipo: TipoJoia) => {
    setTipos((prev) => (prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]));
  };
  const toggleMaterial = (material: MaterialFiltro) => {
    setMateriais((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]));
  };

  const getShopifyMatch = (p: CatalogProduct) => {
    const handleNeedle = p.collectionHandle.toLowerCase();
    const materialNeedle = p.material.toLowerCase();
    const product = allProducts.find((sp) => {
      const h = sp.node.handle.toLowerCase();
      return h === handleNeedle || h.startsWith(`${handleNeedle}-`) || h.includes(handleNeedle);
    });
    if (!product) return { product: null, variant: null };

    const variants = product.node.variants.edges.map((v) => v.node);
    const variant =
      variants.find((v) =>
        v.selectedOptions.some((o) => o.value.toLowerCase().includes(materialNeedle)) ||
        v.title.toLowerCase().includes(materialNeedle)
      ) ?? variants[0] ?? null;

    return { product, variant };
  };

  const handleAddToCart = async () => {
    if (!selectedProduct) return;
    const { product, variant } = getShopifyMatch(selectedProduct);
    if (!product || !variant) return;
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
      setSelectedProduct(null);
      openCart();
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedProduct) return;
    const { product, variant } = getShopifyMatch(selectedProduct);
    if (!product || !variant) return;
    setBuying(true);
    try {
      const cart = await createShopifyCart({ variantId: variant.id, quantity: 1 });
      if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
    } finally {
      setBuying(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", color: "#1c1c1c" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 160, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={logo3r} alt="3R Fitness" style={{ height: 140, width: "auto", objectFit: "contain" }} />
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Início */}
            <Link
              to="/"
              aria-label="Início"
              style={{ width: 42, height: 42, borderRadius: 10, border: "1.5px solid rgba(28,24,20,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1C1814", background: "none", cursor: "pointer", transition: "border-color 0.25s, color 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A220"; (e.currentTarget as HTMLElement).style.color = "#C9A220"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(28,24,20,0.15)"; (e.currentTarget as HTMLElement).style.color = "#1C1814"; }}
            >
              <Home size={18} strokeWidth={1.75} />
            </Link>

            {/* Conta */}
            <Link
              to="/auth"
              aria-label="Conta"
              style={{ width: 42, height: 42, borderRadius: 10, border: "1.5px solid rgba(28,24,20,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1C1814", background: "none", cursor: "pointer", transition: "border-color 0.25s, color 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A220"; (e.currentTarget as HTMLElement).style.color = "#C9A220"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(28,24,20,0.15)"; (e.currentTarget as HTMLElement).style.color = "#1C1814"; }}
            >
              <User size={18} strokeWidth={1.75} />
            </Link>

            {/* Carrinho */}
            <button
              onClick={openCart}
              aria-label="Carrinho"
              style={{ position: "relative", width: 42, height: 42, borderRadius: 10, border: "1.5px solid rgba(28,24,20,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1C1814", background: "none", cursor: "pointer", transition: "border-color 0.25s, color 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A220"; (e.currentTarget as HTMLElement).style.color = "#C9A220"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(28,24,20,0.15)"; (e.currentTarget as HTMLElement).style.color = "#1C1814"; }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span style={{ position: "absolute", top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 100, background: "#C9A220", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 24px 64px" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#787878", marginBottom: 12 }}>
          {t("nav.home").toUpperCase()} &nbsp;&gt;&nbsp; {t("nav.collections").toUpperCase()} &nbsp;&gt;&nbsp; <strong style={{ color: "#404040" }}>{activeSport === "Todas" ? t("collection.filter.all").toUpperCase() : t("sport." + getSportSlug(activeSport)).toUpperCase()}</strong>
        </div>

        <div className="category-hero" style={{ borderRadius: 8, overflow: "hidden", background: "#121212", marginBottom: 20, border: "1px solid #dedede", position: "relative", minHeight: 220 }}>
          <img src={heroImage} alt={activeSport} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "left center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.9) 100%)" }} />
          <div className="category-hero-content" style={{ position: "relative", zIndex: 2, marginLeft: "48%", padding: "34px 32px", color: "#fff" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, lineHeight: 1, marginBottom: 10 }}>
              {activeSport === "Todas" ? t("collection.filter.all").toUpperCase() : t("sport." + getSportSlug(activeSport)).toUpperCase()}
            </h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.84)", maxWidth: 460, lineHeight: 1.6 }}>{heroCopy}</p>
            <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,200,74,0.9)" }}>{t("announcement.customized")}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,200,74,0.9)" }}>{t("announcement.materials")}</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {VISIBLE_SPORTS.map((s) => {
            const ativo = s === activeSport;
            return (
              <button key={s} onClick={() => setSearchParams({ sport: s })} style={{ padding: "8px 14px", borderRadius: 100, border: ativo ? "1px solid #1f1f1f" : "1px solid #d5d5d5", background: ativo ? "#1f1f1f" : "#fff", color: ativo ? "#fff" : "#666", fontSize: 11, fontFamily: "'Inter',sans-serif", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}>
                {s === "Todas" ? t("collection.filter.all") : t("sport." + getSportSlug(s))}
              </button>
            );
          })}
        </div>

        <div className="category-layout" style={{ display: "grid", gridTemplateColumns: "260px minmax(0,1fr)", gap: 20 }}>
          <style>{`
            @media(max-width:980px){.category-layout{grid-template-columns:1fr!important;}}
            @media(max-width:980px){.products-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}}
            @media(max-width:560px){.products-grid{grid-template-columns:1fr!important;}}
            @media(max-width:980px){.category-hero-content{margin-left:0!important;padding:24px 20px!important;}}
          `}</style>

          <aside style={{ background: "#fff", border: "1px solid #e6e6e6", borderRadius: 8, padding: "16px 14px", height: "fit-content" }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, color: "#222", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>{t("cart.item.remove") === "Remover" ? "Filtrar por" : (t("cart.item.remove") === "Eliminar" ? "Filtrar por" : "Filter by")}</div>
            <div style={{ borderTop: "1px solid #ececec", paddingTop: 12 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", marginBottom: 10 }}>{t("cart.item.gender") === "Modelo" ? "Tipo de joia" : (t("cart.item.gender") === "Model" ? "Jewelry Type" : "Tipo de joya")}</div>
              {tiposDisponiveis.length === 0
                ? <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"#aaa" }}>Nenhum tipo disponível</p>
                : tiposDisponiveis.map((tipo) => {
                  const cleanTipo = tipo.toLowerCase();
                  let tipoTraduzido = tipo;
                  if (cleanTipo.includes("pingente")) tipoTraduzido = t("product.badge") === "Peça do Ateliê" ? "Pingentes" : (t("product.badge") === "Atelier Piece" ? "Pendants" : "Colgantes");
                  else if (cleanTipo.includes("colar")) tipoTraduzido = t("sport.colares");
                  else if (cleanTipo.includes("anel")) tipoTraduzido = t("sport.aneis");
                  else if (cleanTipo.includes("brinco")) tipoTraduzido = t("sport.brincos");
                  return (
                    <label key={tipo} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#4a4a4a", cursor: "pointer" }}>
                      <input type="checkbox" checked={tipos.includes(tipo)} onChange={() => toggleTipo(tipo)} />
                      {tipoTraduzido}
                    </label>
                  );
                })}
            </div>
            <div style={{ borderTop: "1px solid #ececec", paddingTop: 12, marginTop: 12 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", marginBottom: 10 }}>{t("cart.item.material")}</div>
              {(["Prata 925", "Ouro 18k"] as MaterialFiltro[]).map((material) => (
                <label key={material} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#4a4a4a", cursor: "pointer" }}>
                  <input type="checkbox" checked={materiais.includes(material)} onChange={() => toggleMaterial(material)} />
                  {material === "Ouro 18k" ? t("atelie.linha.material.ouro") : t("atelie.linha.material.prata")}
                </label>
              ))}
            </div>
          </aside>

          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#666" }}>
                {produtosFiltrados.length} {produtosFiltrados.length === 1 ? t("collection.results_count_single") : t("collection.results_count")} <strong style={{ color: "#222" }}>{activeSport === "Todas" ? t("collection.filter.all") : t("sport." + getSportSlug(activeSport))}</strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#666" }}>{t("collection.sort.by")}</span>
                <select value={ordem} onChange={(e) => setOrdem(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #dadada", borderRadius: 6, fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#333", background: "#fff" }}>
                  <option value="Mais Vendidos">{t("collection.sort.default") === "Padrão" ? "Mais Vendidos" : (t("collection.sort.default") === "Default" ? "Best Sellers" : (t("collection.sort.default") === "Predefinito" ? "Più venduti" : "Más vendidos"))}</option>
                  <option value="Menor Preço">{t("collection.sort.price_asc")}</option>
                  <option value="Maior Preço">{t("collection.sort.price_desc")}</option>
                  <option value="Mais Novos">{t("collection.sort.name") === "Nome" ? "Mais Novos" : (t("collection.sort.name") === "Name" ? "Newest" : (t("collection.sort.name") === "Nombre" ? "Más nuevos" : "Nuovi arrivi"))}</option>
                </select>
              </div>
            </div>

            <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16 }}>
              {produtosFiltrados.map((p) => {
                const { nome: nameTranslated } = translateProduct(p.collectionHandle, p.nome, "");
                const categoryClean = p.categoria.toLowerCase();
                let categoryTranslated = p.categoria;
                if (categoryClean.includes("pingente")) categoryTranslated = t("product.badge") === "Peça do Ateliê" ? "Pingentes" : (t("product.badge") === "Atelier Piece" ? "Pendants" : "Colgantes");
                else if (categoryClean.includes("colar")) categoryTranslated = t("sport.colares");
                else if (categoryClean.includes("anel")) categoryTranslated = t("sport.aneis");
                else if (categoryClean.includes("brinco")) categoryTranslated = t("sport.brincos");
                else categoryTranslated = t("sport." + getSportSlug(p.categoria));

                const materialTranslated = p.material === "Ouro 18k" ? t("atelie.linha.material.ouro") : t("atelie.linha.material.prata");

                return (
                  <article key={p.id} style={{ background: "#fff", borderRadius: 10, border: "1px solid #e8e8e8", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                      <img src={p.imagem} alt={nameTranslated} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: p.imgPos ?? "center center", filter: p.imgFilter }} />
                    </div>
                    <div style={{ padding: "12px 12px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontWeight: 400, color: "#1a1a1a", lineHeight: 1.2, marginBottom: 3 }}>
                        {nameTranslated}
                      </div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#aaa", marginBottom: 10 }}>
                        {materialTranslated} · {categoryTranslated}
                      </div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 700, color: "#171717", marginBottom: 2 }}>
                        {fmtBRL(String(p.preco))}
                      </div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#888", marginBottom: 12 }}>
                        {t("cart.item.quantity") === "Qtd" ? `em até ${p.parcelas}x de ` : (t("cart.item.quantity") === "Qty" ? `up to ${p.parcelas}x of ` : (t("cart.item.quantity") === "Cant" ? `hasta ${p.parcelas}x de ` : `fino a ${p.parcelas}x di `))} {fmtBRL(String(p.preco / p.parcelas))}
                      </div>
                      <button
                        onClick={() => setSelectedProduct(p)}
                        style={{ width: "100%", border: "1px solid #121212", background: "#121212", color: "#fff", borderRadius: 7, padding: "11px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", marginTop: "auto" }}
                      >
                        {t("collection.btn.view_jewelry")}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {produtosFiltrados.length === 0 && (
              <div style={{ marginTop: 24, background: "#fff", border: "1px solid #ececec", borderRadius: 8, padding: 24, textAlign: "center", fontFamily: "'Inter',sans-serif", color: "#666" }}>
                Nenhum produto encontrado com os filtros selecionados.
              </div>
            )}
          </section>
        </div>
      </main>
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: "min(920px,100%)", background: "#fff", borderRadius: 10, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", maxHeight: "88vh" }}
            className="product-modal"
          >
            <style>{`
              @media(max-width:820px){
                .product-modal {
                  display: flex !important;
                  flex-direction: column !important;
                  max-height: 90vh !important;
                }
                .product-modal-left {
                  width: 100% !important;
                  height: 300px !important;
                  min-height: auto !important;
                  flex-shrink: 0 !important;
                }
                .product-modal-image-container {
                  min-height: auto !important;
                  height: 100% !important;
                  flex: 1 !important;
                }
                .product-modal-right {
                  padding: 20px 24px 24px !important;
                  overflow-y: auto !important;
                  max-height: calc(90vh - 300px) !important;
                  flex: 1 !important;
                }
              }
            `}</style>
            
            {/* Botão de fechar absoluto premium */}
            <button
              onClick={() => setSelectedProduct(null)}
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

            <div className="product-modal-left" style={{ background: "#000000", minHeight: 360, display: "flex", flexDirection: "column" }}>
              <div className="product-modal-image-container" style={{ flex: 1, position: "relative", minHeight: 320 }}>
                <img src={activeImage} alt={selectedProduct.nome} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              {((selectedProduct.collectionHandle === "valenza" || selectedProduct.nome.toLowerCase().includes("valenza") || selectedProduct.collectionHandle === "monarch" || selectedProduct.nome.toLowerCase().includes("monarch") || selectedProduct.collectionHandle === "dominus" || selectedProduct.nome.toLowerCase().includes("dominus") || ((selectedProduct.collectionHandle === "titan" || selectedProduct.nome.toLowerCase().includes("titan") || selectedProduct.collectionHandle === "velocita" || selectedProduct.nome.toLowerCase().includes("velocita") || selectedProduct.nome.toLowerCase().includes("velocità")) && !selectedProduct.nome.toLowerCase().includes("clássico") && !selectedProduct.nome.toLowerCase().includes("classico")))) && (() => {
                const handleLower = (selectedProduct.collectionHandle || selectedProduct.nome).toLowerCase();
                const isValenza = handleLower.includes("valenza");
                const isMonarch = handleLower.includes("monarch");
                const isDominus = handleLower.includes("dominus");
                const isTitan = handleLower.includes("titan");
                const isPrata = selectedProduct.material === "Prata 925";

                let joiaImg = "";
                if (isValenza) {
                  joiaImg = isPrata ? valenzaJoiaPrata : valenzaJoia;
                } else if (isMonarch) {
                  joiaImg = isPrata ? monarchJoiaPrata : monarchJoiaOuro;
                } else if (isDominus) {
                  joiaImg = isPrata ? dominusJoiaPrata : dominusJoiaOuro;
                } else if (isTitan) {
                  joiaImg = isPrata ? titanJoiaPrata : titanJoiaOuro;
                } else {
                  joiaImg = isPrata ? velocitaJoiaPrata : velocitaJoiaOuro;
                }
                return (
                  <div style={{ display: "flex", gap: 8, padding: 12, background: "#fff", borderTop: "1px solid #eee", justifyContent: "center" }}>
                    <button
                      onClick={() => setActiveImage(selectedProduct.imagem)}
                      style={{ width: 50, height: 50, padding: 0, border: activeImage === selectedProduct.imagem ? "2px solid #C9A220" : "1px solid #ddd", borderRadius: 4, overflow: "hidden", cursor: "pointer", background: "none" }}
                    >
                      <img src={selectedProduct.imagem} alt="Campanha" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                    <button
                      onClick={() => setActiveImage(joiaImg)}
                      style={{ width: 50, height: 50, padding: 0, border: activeImage === joiaImg ? "2px solid #C9A220" : "1px solid #ddd", borderRadius: 4, overflow: "hidden", cursor: "pointer", background: "none" }}
                    >
                      <img src={joiaImg} alt="Joia" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  </div>
                );
              })()}
            </div>
            <div className="product-modal-right" style={{ padding: 24, display: "flex", flexDirection: "column", overflowY: "auto" }}>
              {(() => {
                const { nome: nameTrans, desc: descTrans } = translateProduct(selectedProduct.collectionHandle, selectedProduct.nome, "");
                
                const cleanCat = selectedProduct.categoria.toLowerCase();
                let catTrans = selectedProduct.categoria;
                if (cleanCat.includes("pingente")) catTrans = t("product.badge") === "Peça do Ateliê" ? "Pingentes" : (t("product.badge") === "Atelier Piece" ? "Pendants" : "Colgantes");
                else if (cleanCat.includes("colar")) catTrans = t("sport.colares");
                else if (cleanCat.includes("anel")) catTrans = t("sport.aneis");
                else if (cleanCat.includes("brinco")) catTrans = t("sport.brincos");
                else catTrans = t("sport." + getSportSlug(selectedProduct.categoria));

                const matTrans = selectedProduct.material === "Ouro 18k" ? t("atelie.linha.material.ouro") : t("atelie.linha.material.prata");
                const typeClean = selectedProduct.tipo.toLowerCase();
                let typeTrans = selectedProduct.tipo;
                if (typeClean.includes("pingente")) typeTrans = t("product.badge") === "Peça do Ateliê" ? "Pingente" : (t("product.badge") === "Atelier Piece" ? "Pendant" : "Colgante");
                else if (typeClean.includes("colar")) typeTrans = t("sport.colares").slice(0, -1); // simplificado
                else if (typeClean.includes("anel")) typeTrans = t("cart.item.gender") === "Modelo" ? "Anel" : (t("cart.item.gender") === "Model" ? "Ring" : "Anillo");
                else if (typeClean.includes("brinco")) typeTrans = t("cart.item.gender") === "Modelo" ? "Brinco" : (t("cart.item.gender") === "Model" ? "Earring" : "Pendiente");

                let displayDesc = descTrans;
                if (!displayDesc) {
                  // Fallback se não traduzido
                  displayDesc = t("cart.item.remove") === "Remover"
                    ? `Joia exclusiva da linha ${nameTrans.split(" ")[0]}, criada para representar sua trajetória no ${selectedProduct.categoria.toLowerCase()} com acabamento premium e design autoral.`
                    : (t("cart.item.remove") === "Eliminar"
                      ? `Joya exclusiva de la línea ${nameTrans.split(" ")[0]}, creada para representar tu trayectoria en el ${selectedProduct.categoria.toLowerCase()} con acabado premium y diseño de autor.`
                      : `Exclusive jewelry from the ${nameTrans.split(" ")[0]} line, created to represent your journey in ${selectedProduct.categoria.toLowerCase()} with premium finish and signature design.`);
                }

                return (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, paddingRight: 36 }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, lineHeight: 1, color: "#1f1f1f" }}>{nameTrans}</h3>
                    </div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#666", marginBottom: 14 }}>
                      {typeTrans} • {matTrans} • {catTrans}
                    </div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.7, color: "#4e4e4e", marginBottom: 14 }}>
                      {displayDesc}
                    </p>
                  </>
                );
              })()}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", marginBottom: 18 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f6f1e3", border: "1px solid #e6d9b0", borderRadius: 8, padding: "8px 14px" }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#9a7c16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 3 3 21" /><path d="M3 8V3h5" /><path d="M21 16v5h-5" />
                  </svg>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em", color: "#7a6310" }}>
                    {t("product.size_details")}
                  </span>
                </div>
                {selectedProduct.tipo === "Pingentes" && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eef4ec", border: "1px solid #cfe0c8", borderRadius: 8, padding: "8px 14px" }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#3f7a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                    </svg>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em", color: "#356b40" }}>
                      {t("product.delivery")}
                    </span>
                  </div>
                )}
              </div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 34, fontWeight: 700, color: "#111", marginBottom: 2 }}>
                {fmtBRL(String(selectedProduct.preco))}
              </div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#666", marginBottom: 24 }}>
                {t("cart.item.quantity") === "Qtd" ? `em até ${selectedProduct.parcelas}x de ` : (t("cart.item.quantity") === "Qty" ? `up to ${selectedProduct.parcelas}x of ` : (t("cart.item.quantity") === "Cant" ? `hasta ${selectedProduct.parcelas}x de ` : `fino a ${selectedProduct.parcelas}x di `))} {fmtBRL(String(selectedProduct.preco / selectedProduct.parcelas))}
              </div>
              <div style={{ display: "grid", gap: 10, marginTop: "auto" }}>
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  style={{ width: "100%", border: "1px solid #111", background: "#111", color: "#fff", borderRadius: 8, padding: "13px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: adding ? "not-allowed" : "pointer", opacity: adding ? 0.65 : 1 }}
                >
                  {adding ? t("product.adding") : t("product.add_to_collection")}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={buying}
                  style={{ width: "100%", border: "1px solid #c9a220", background: "#fff", color: "#9a7c16", borderRadius: 8, padding: "13px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: buying ? "not-allowed" : "pointer", opacity: buying ? 0.65 : 1 }}
                >
                  {buying ? (t("cart.item.remove") === "Remover" ? "Redirecionando..." : (t("cart.item.remove") === "Eliminar" ? "Redireccionando..." : "Redirecting...")) : (t("cart.item.remove") === "Remover" ? "Comprar agora" : (t("cart.item.remove") === "Eliminar" ? "Comprar ahora" : "Buy now"))}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />

    </div>
  );
};

export default Colecao;
