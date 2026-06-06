import { create } from "zustand";

const STORAGE_KEY = "modalidadeAtual";

export type ModalidadeSlug =
  | "musculacao"
  | "crossfit"
  | "corrida"
  | "ciclismo"
  | "triathlon"
  | "fisiculturismo";

const VALID: ModalidadeSlug[] = [
  "musculacao",
  "crossfit",
  "corrida",
  "ciclismo",
  "triathlon",
  "fisiculturismo",
];

// Aceita variações (ex: "triatlo" → "triathlon")
export const normalizeModalidade = (raw?: string | null): ModalidadeSlug | null => {
  if (!raw) return null;
  const s = raw.toLowerCase().trim();
  if (s === "triatlo") return "triathlon";
  return (VALID as string[]).includes(s) ? (s as ModalidadeSlug) : null;
};

const readInitial = (): ModalidadeSlug | null => {
  if (typeof window === "undefined") return null;
  try {
    return normalizeModalidade(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

interface ModalidadeState {
  modalidadeAtual: ModalidadeSlug | null;
  setModalidade: (slug: string | null) => void;
}

export const useModalidadeStore = create<ModalidadeState>((set) => ({
  modalidadeAtual: readInitial(),
  setModalidade: (slug) => {
    const norm = normalizeModalidade(slug);
    if (!norm) return;
    try {
      localStorage.setItem(STORAGE_KEY, norm);
    } catch {
      // ignore
    }
    set({ modalidadeAtual: norm });
  },
}));

// Helper para uso fora de componentes
export const getModalidadeAtual = (): ModalidadeSlug | null => {
  const fromStore = useModalidadeStore.getState().modalidadeAtual;
  if (fromStore) return fromStore;
  return readInitial();
};
