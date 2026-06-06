import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const HomeFloatingButton = () => {
  const location = useLocation();
  if (location.pathname === "/") return null;

  return (
    <Link
      to="/"
      aria-label="Voltar para a página inicial"
      className="fixed top-5 right-20 sm:top-6 sm:right-24 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        background: "linear-gradient(135deg, hsl(0 0% 18%) 0%, hsl(0 0% 8%) 100%)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.45), 0 0 18px rgba(212,175,55,0.18)",
        border: "1px solid rgba(212,175,55,0.45)",
      }}
    >
      <Home className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
    </Link>
  );
};
