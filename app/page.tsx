import Topbar from "@/components/layout/Topbar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Benefits from "@/components/sections/Benefits";
import VisualIdentity from "@/components/sections/VisualIdentity"; // Replaces Landing24h
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
    return (
        <>
            <Topbar />
            <Header />
            <main>
                <Hero />
                <Services />
                <Benefits />
                <VisualIdentity />
                <Portfolio />
                <Process />
                <Testimonials />
                <FAQ />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
