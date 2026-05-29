import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import Why from "@/components/site/Why";
import Services from "@/components/site/Services";
import AdkarStepper from "@/components/site/AdkarStepper";
import Method from "@/components/site/Method";
import Proof from "@/components/site/Proof";
import ClientGrid from "@/components/site/ClientGrid";
import Credentials from "@/components/site/Credentials";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import StickyCTA from "@/components/site/StickyCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Problem -> solution -> how -> proof -> trust -> ask */}
        <Hero />
        <TrustStrip />
        <Why />
        <Services />
        <AdkarStepper />
        <Method />
        <Proof />
        <ClientGrid />
        <Credentials />
        <About />
        <Contact />
      </main>
      <StickyCTA />
      <Footer />
    </>
  );
}
