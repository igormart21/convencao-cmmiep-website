import { getModalidadeAtual, type ModalidadeSlug } from "@/stores/modalidadeStore";

export const buildContinuarPath = (slug?: string | null): string => {
  const m = slug ?? getModalidadeAtual();
  return m ? `/continuar/${m}` : "/continuar/geral";
};

export const buildPersonalizarPath = (slug: ModalidadeSlug | "geral"): string => {
  if (slug === "geral") return "/atelie/modalidades";
  return `/personalizar/${slug}`;
};

export const buildAtelieModalidadePath = (slug: ModalidadeSlug | "geral"): string => {
  if (slug === "geral") return "/atelie/modalidades";
  return `/atelie/modalidade/${slug}`;
};
