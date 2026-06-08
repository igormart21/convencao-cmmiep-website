import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";

import Colecao from "./pages/Colecao.tsx";
import TesteBotoes from "./pages/TesteBotoes.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Modalidade from "./pages/Modalidade.tsx";
import Atelie from "./pages/Atelie.tsx";
import AtelieModalidades from "./pages/AtelieModalidades.tsx";
import AtelieModalidade from "./pages/AtelieModalidade.tsx";
import AtelieLinha from "./pages/AtelieLinha.tsx";
import Continuar from "./pages/Continuar.tsx";
import Essenciais from "./pages/Essenciais.tsx";
import { useCartSync } from "@/hooks/useCartSync";
import { InstagramFloatingButton } from "@/components/InstagramFloatingButton";
import { WhatsappFloatingButton } from "@/components/WhatsappFloatingButton";
import { HomeFloatingButton } from "@/components/HomeFloatingButton";
import { AuthFloatingButton } from "@/components/AuthFloatingButton";
import { CartDrawer } from "@/components/CartDrawer";
import { LanguageProvider } from "@/context/LanguageContext";

const queryClient = new QueryClient();


const AppRoutes = () => {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      
      <Route path="/colecao" element={<Colecao />} />
      <Route path="/teste-botoes" element={<TesteBotoes />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/atelie" element={<Atelie />} />
      <Route path="/atelie/modalidades" element={<AtelieModalidades />} />
      <Route path="/atelie/modalidade/:slug" element={<AtelieModalidade />} />
      <Route path="/atelie/linha/:slug" element={<AtelieLinha />} />
      <Route path="/continuar" element={<Continuar />} />
      <Route path="/continuar/:modalidade" element={<Continuar />} />
      <Route path="/essenciais" element={<Essenciais />} />
      <Route path="/modalidade/:id" element={<Modalidade />} />
      <Route path="/personalizar/:slug" element={<Modalidade />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const FloatingButtons = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <>
      <HomeFloatingButton />
      {!isHome && <AuthFloatingButton />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <AppRoutes />
          <FloatingButtons />
          <CartDrawer showTrigger={false} />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
