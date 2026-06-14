import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import RevealRoot from "@/components/ui/RevealRoot";
import Trust from "@/components/sections/Trust";
import Why from "@/components/sections/Why";
import Services from "@/components/sections/Services";
import Adkar from "@/components/sections/Adkar";
import Method from "@/components/sections/Method";
import Proof from "@/components/sections/Proof";
import Clients from "@/components/sections/Clients";
import Credentials from "@/components/sections/Credentials";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

/**
 * One-page scroll narrative: problem → approach → sequence → proof → trust → ask.
 * The hero owns its load-triggered intro; RevealRoot drives scroll reveals for
 * the remaining sections, which stay server components.
 */
export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <RevealRoot>
          <Trust />
          <Why />
          <Services />
          <Adkar />
          <Method />
          <Proof />
          <Clients />
          <Credentials />
          <About />
          <Contact />
        </RevealRoot>
      </main>
      <Footer />
    </>
  );
}
