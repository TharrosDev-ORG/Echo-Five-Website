import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Why from "@/components/site/Why";
import Services from "@/components/site/Services";
import Clients from "@/components/site/Clients";
import Proof from "@/components/site/Proof";
import Method from "@/components/site/Method";
import Credentials from "@/components/site/Credentials";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Why />
        <Services />
        <Clients />
        <Proof />
        <Method />
        <Credentials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
