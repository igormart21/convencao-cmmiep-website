import { Instagram } from "lucide-react";

export const InstagramFloatingButton = () => {
  return (
    <a
      href="https://instagram.com/3rfitnessjr"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir Instagram @3rfitnessjr em nova aba"
      className="fixed top-5 left-5 sm:top-6 sm:left-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        background:
          "linear-gradient(135deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)",
        boxShadow: "0 10px 25px rgba(214, 41, 118, 0.45)",
      }}
    >
      <Instagram className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
    </a>
  );
};
