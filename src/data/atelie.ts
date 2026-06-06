import sportMusculacao from "@/assets/sport-musculacao.jpg";
import sportCrossfit from "@/assets/sport-crossfit.jpg";
import sportCorrida from "@/assets/sport-corrida.jpg";
import sportCiclismo from "@/assets/sport-ciclismo.jpg";
import sportTriathlon from "@/assets/sport-triathlon.jpg";
import sportFisiculturismo from "@/assets/sport-fisiculturismo.jpg";

import vigorOuroClean from "@/assets/linha-vigor-ouro-clean.jpg";
import vigorPrataClean from "@/assets/linha-vigor-prata-clean.jpg";
import vigorCampaign from "@/assets/linha-vigor-ouro-only.jpg";
import halterCampaign from "@/assets/linha-halter-ouro-only.jpg";
import halterOuro from "@/assets/linha-halter-ouro.jpg";
import halterPrata from "@/assets/linha-halter-prata.jpg";
import imperiumOuroClean from "@/assets/linha-imperium-ouro-clean.jpg";
import imperiumPrataClean from "@/assets/linha-imperium-prata-clean.jpg";
import imperiumCampaign from "@/assets/linha-imperium-ouro.jpg";
import triadeOuroClean from "@/assets/linha-triade-ouro-clean.jpg";
import triadePrataClean from "@/assets/linha-triade-prata-clean.jpg";
import triadeCampaign from "@/assets/linha-triade-ouro.jpg";
import strataCard from "@/assets/linha-strata-card.png";
import aeronOuro from "@/assets/linha-aeron-ouro.png";
import veloxOuro from "@/assets/linha-velox-ouro.png";
import veloxEditorialFemOuro from "@/assets/velox-royale-feminina-ouro.png";
import veloxEditorialFemPrata from "@/assets/velox-royale-feminina-prata.png";
import veloxEditorialMascOuro from "@/assets/velox-royale-masculino-ouro.png";
import veloxEditorialMascPrata from "@/assets/velox-royale-masculino-prata.png";
import velarionOuro from "@/assets/linha-velarion-ouro.png";
import trionEliteOuro from "@/assets/linha-trion-elite-ouro.png";
import titanAtletaMascOuro from "@/assets/titan-atleta-masc-ouro.png";
import titanAtletaMascPrata from "@/assets/titan-atleta-masc-prata.png";
import titanAtletaFemOuro from "@/assets/titan-atleta-fem-ouro.png";
import titanAtletaFemPrata from "@/assets/titan-atleta-fem-prata.png";
import velocitaAtletaFemOuro from "@/assets/velocita-atleta-fem-ouro.png";
import velocitaAtletaFemPrata from "@/assets/velocita-atleta-fem-prata.png";
import aeronAtletaMascOuro from "@/assets/aeron-atleta-masc-ouro.jpg";
import aeronAtletaMascPrata from "@/assets/aeron-atleta-masc-prata.jpg";
import aeronAtletaFemOuro from "@/assets/aeron-atleta-fem-ouro.jpg";
import aeronAtletaFemPrata from "@/assets/aeron-atleta-fem-prata.jpg";
import imperiumAtletaMascOuro from "@/assets/imperium-atleta-masc-ouro.png";
import imperiumAtletaMascPrata from "@/assets/imperium-atleta-masc-prata.png";
import imperiumAtletaFemOuro from "@/assets/imperium-atleta-fem-ouro.png";
import imperiumAtletaFemPrata from "@/assets/imperium-atleta-fem-prata.png";
import strataAtletaMascOuro from "@/assets/strata-atleta-masc-ouro.png";
import strataAtletaMascPrata from "@/assets/strata-atleta-masc-prata.png";
import strataAtletaFemOuro from "@/assets/strata-atleta-fem-ouro.png";
import strataAtletaFemPrata from "@/assets/strata-atleta-fem-prata.png";
import trionEliteAtletaOuro from "@/assets/trion-elite-atleta-ouro.jpg";
import trionEliteAtletaPrata from "@/assets/trion-elite-atleta-prata.jpg";
import trionEliteAtletaFemOuro from "@/assets/trion-elite-atleta-fem-ouro.jpg";
import trionEliteAtletaFemPrata from "@/assets/trion-elite-atleta-fem-prata.jpg";
import valenzaOuro from "@/assets/linha-valenza-ouro.png";
import dominusOuro from "@/assets/linha-dominus-ouro.png";
import monarchOuro from "@/assets/linha-monarch-ouro.png";
import valenzaBannerOuro from "@/assets/valenza-ouro-banner.png";
import valenzaBannerPrata from "@/assets/valenza-prata-banner.png";
import monarchBannerOuro from "@/assets/monarch-ouro-banner.png";
import monarchBannerPrata from "@/assets/monarch-prata-banner.png";
import dominusBannerOuro from "@/assets/dominus-ouro-banner.png";
import dominusBannerPrata from "@/assets/dominus-prata-banner.png";
import titanCardCover from "@/assets/titan-card-cover.png";
import velocitaCardCover from "@/assets/velocita-card-cover.png";
import aeronCardCover from "@/assets/aeron-card-cover.png";
import veloxCardCover from "@/assets/velox-card-cover.jpg";

export type Material = "ouro" | "prata";
export type Forma = "masculino" | "feminino";

export type EditorialBackground = {
  // Split editorial: imagens de modelo (com pingente) por gênero × material.
  // Quando presente em uma linha, ativa o template "Velox Royale":
  // fundo split full-width + crossfade ouro↔prata + conteúdo à direita, sem card de produto.
  feminino: { ouro: string; prata: string };
  masculino: { ouro: string; prata: string };
};

export type Linha = {
  slug: string;
  nome: string;
  assinatura: string;
  frase: string;
  imagens: Record<Material, string>;
  campaign: string;
  editorial?: EditorialBackground;
  cardFit?: "cover" | "contain";
  cinematic?: {
    ouro: string;
    prata: string;
    feminino?: { ouro: string; prata: string };
    masculino?: { ouro: string; prata: string };
  };
};

export type Modalidade = {
  slug: string;
  nome: string;
  img: string;
  subtitulo: string;
  linhas: string[];
};

export const LINHAS: Record<string, Linha> = {
  vigor: {
    slug: "vigor",
    nome: "VIGOR",
    assinatura: "Assinatura da Força",
    frase: "Força que se constrói diariamente.",
    imagens: { ouro: vigorOuroClean, prata: vigorPrataClean },
    campaign: vigorCampaign,
  },
  halter: {
    slug: "halter",
    nome: "HALTER",
    assinatura: "Assinatura do Peso",
    frase: "O peso que esculpe o caráter.",
    imagens: { ouro: halterOuro, prata: halterPrata },
    campaign: halterCampaign,
  },
  imperium: {
    slug: "imperium",
    nome: "IMPERIUM",
    assinatura: "Assinatura do Domínio",
    frase: "O domínio sobre os próprios limites.",
    imagens: { ouro: imperiumOuroClean, prata: imperiumPrataClean },
    campaign: imperiumCampaign,
    cinematic: {
      ouro: imperiumAtletaMascOuro,
      prata: imperiumAtletaMascPrata,
      masculino: { ouro: imperiumAtletaMascOuro, prata: imperiumAtletaMascPrata },
      feminino: { ouro: imperiumAtletaFemOuro, prata: imperiumAtletaFemPrata },
    },
  },
  strata: {
    slug: "strata",
    nome: "STRATA",
    assinatura: "Assinatura da Intensidade",
    frase: "A intensidade transformada em arte.",
    imagens: { ouro: strataCard, prata: strataCard },
    campaign: strataCard,
    cardFit: "cover",
    cinematic: {
      ouro: strataAtletaMascOuro,
      prata: strataAtletaMascPrata,
      masculino: { ouro: strataAtletaMascOuro, prata: strataAtletaMascPrata },
      feminino: { ouro: strataAtletaFemOuro, prata: strataAtletaFemPrata },
    },
  },
  triade: {
    slug: "triade",
    nome: "TITAN",
    assinatura: "Assinatura da Travessia",
    frase: "A travessia que define o espírito.",
    imagens: { ouro: titanCardCover, prata: titanCardCover },
    campaign: titanCardCover,
    cardFit: "cover",
    cinematic: {
      ouro: titanAtletaMascOuro,
      prata: titanAtletaMascPrata,
      masculino: { ouro: titanAtletaMascOuro, prata: titanAtletaMascPrata },
      feminino: { ouro: titanAtletaFemOuro, prata: titanAtletaFemPrata },
    },
  },
  ritmo: {
    slug: "ritmo",
    nome: "VELOCITA",
    assinatura: "Assinatura do Movimento",
    frase: "O ritmo de uma vida em marcha.",
    imagens: { ouro: velocitaCardCover, prata: velocitaCardCover },
    campaign: velocitaCardCover,
    cardFit: "cover",
    cinematic: {
      ouro: velocitaAtletaFemOuro,
      prata: velocitaAtletaFemPrata,
      feminino: { ouro: velocitaAtletaFemOuro, prata: velocitaAtletaFemPrata },
    },
  },
  velox: {
    slug: "velox",
    nome: "VELOX ROYALE",
    assinatura: "Assinatura da Distância",
    frase: "Horizontes conquistados em silêncio.",
    imagens: { ouro: veloxCardCover, prata: veloxCardCover },
    campaign: veloxCardCover,
    cardFit: "cover",
    editorial: {
      feminino: { ouro: veloxEditorialFemOuro, prata: veloxEditorialFemPrata },
      masculino: { ouro: veloxEditorialMascOuro, prata: veloxEditorialMascPrata },
    },
  },
  cadencia: {
    slug: "cadencia",
    nome: "AERON",
    assinatura: "Assinatura do Compasso",
    frase: "Cada giro, um pulso eterno.",
    imagens: { ouro: aeronCardCover, prata: aeronCardCover },
    campaign: aeronCardCover,
    cardFit: "cover",
    cinematic: {
      ouro: aeronAtletaMascOuro,
      prata: aeronAtletaMascPrata,
      masculino: { ouro: aeronAtletaMascOuro, prata: aeronAtletaMascPrata },
      feminino: { ouro: aeronAtletaFemOuro, prata: aeronAtletaFemPrata },
    },
  },
  velarion: {
    slug: "velarion",
    nome: "VELARION",
    assinatura: "Assinatura da Resistência",
    frase: "Atravessar é mais que vencer.",
    imagens: { ouro: velarionOuro, prata: velarionOuro },
    campaign: velarionOuro,
    cardFit: "contain",
  },
  elite: {
    slug: "elite",
    nome: "TRION ELITE",
    assinatura: "Assinatura da Excelência",
    frase: "O refinamento dos que vão além.",
    imagens: { ouro: trionEliteOuro, prata: trionEliteOuro },
    campaign: trionEliteOuro,
    cardFit: "contain",
    cinematic: {
      ouro: trionEliteAtletaOuro,
      prata: trionEliteAtletaPrata,
      masculino: { ouro: trionEliteAtletaOuro, prata: trionEliteAtletaPrata },
      feminino: { ouro: trionEliteAtletaFemOuro, prata: trionEliteAtletaFemPrata },
    },
  },
  valenza: {
    slug: "valenza",
    nome: "VALENZA",
    assinatura: "Assinatura da Potência",
    frase: "A potência como obra escultural.",
    imagens: { ouro: valenzaOuro, prata: valenzaOuro },
    campaign: valenzaOuro,
    cardFit: "cover",
    cinematic: {
      ouro: valenzaBannerOuro,
      prata: valenzaBannerPrata,
    },
  },
  dominus: {
    slug: "dominus",
    nome: "DOMINUS",
    assinatura: "Assinatura do Domínio",
    frase: "O domínio absoluto sobre a forma.",
    imagens: { ouro: dominusOuro, prata: dominusOuro },
    campaign: dominusOuro,
    cardFit: "cover",
    cinematic: {
      ouro: dominusBannerOuro,
      prata: dominusBannerPrata,
    },
  },
  monarch: {
    slug: "monarch",
    nome: "MONARCH",
    assinatura: "Assinatura da Soberania",
    frase: "Soberania esculpida em silêncio.",
    imagens: { ouro: monarchOuro, prata: monarchOuro },
    campaign: monarchOuro,
    cardFit: "cover",
    cinematic: {
      ouro: monarchBannerOuro,
      prata: monarchBannerPrata,
    },
  },
};

export const MODALIDADES: Modalidade[] = [
  {
    slug: "musculacao",
    nome: "Musculação",
    subtitulo: "Forjado em disciplina",
    img: sportMusculacao,
    linhas: ["vigor", "halter"],
  },
  {
    slug: "crossfit",
    nome: "Crossfit",
    subtitulo: "A intensidade como arte",
    img: sportCrossfit,
    linhas: ["imperium", "strata"],
  },
  {
    slug: "corrida",
    nome: "Corrida",
    subtitulo: "O ritmo de uma vida",
    img: sportCorrida,
    linhas: ["triade", "ritmo"],
  },
  {
    slug: "ciclismo",
    nome: "Ciclismo",
    subtitulo: "Horizontes conquistados",
    img: sportCiclismo,
    linhas: ["velox", "cadencia"],
  },
  {
    slug: "triathlon",
    nome: "Triatlo",
    subtitulo: "A travessia dos limites",
    img: sportTriathlon,
    linhas: ["velarion", "elite"],
  },
  {
    slug: "fisiculturismo",
    nome: "Fisiculturismo",
    subtitulo: "A escultura do físico",
    img: sportFisiculturismo,
    linhas: ["valenza", "dominus", "monarch"],
  },
];