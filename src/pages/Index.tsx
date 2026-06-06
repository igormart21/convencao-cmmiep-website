import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { PersonalizacaoTeaser } from "@/components/home/PersonalizacaoTeaser";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Modalidades } from "@/components/home/Modalidades";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const Index = () => (
  <div style={{ background: "#F8F5F0", minHeight: "100svh" }}>
    <AnnouncementBar />
    <Header />
    <main>
      <Hero />
      <BrandStory />
      <PersonalizacaoTeaser />
      <ProductShowcase />
      <Modalidades />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </main>
    <Footer />
    <CartDrawer showTrigger={false} />
  </div>
);

export default Index;
