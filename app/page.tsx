import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import Why from "@/components/site/Why";
import Services from "@/components/site/Services";
import Adkar from "@/components/site/Adkar";
import Method from "@/components/site/Method";
import Proof from "@/components/site/Proof";
import Clients from "@/components/site/Clients";
import Credentials from "@/components/site/Credentials";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import StickyCTA from "@/components/site/StickyCTA";
import ScrollFX from "@/components/site/ScrollFX";

/**
 * One-page scroll narrative: problem → solution → proof → trust → ask.
 */
export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Why />
        <Services />
        <Adkar />
        <Method />
        <Proof />
        <Clients />
        <Credentials />
        <About />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
      <ScrollFX />
    </>
  );
}
