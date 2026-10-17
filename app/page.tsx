import type { Metadata } from "next";
import { homeMeta } from "@/lib/content/home";
import Hero from "@/components/home/Hero";
import ClientMarquee from "@/components/home/ClientMarquee";
import Problem from "@/components/home/Problem";
import ServicesIndex from "@/components/home/ServicesIndex";
import Method from "@/components/home/Method";
import Proof from "@/components/home/Proof";
import AdvantaBand from "@/components/home/AdvantaBand";
import Talk from "@/components/site/Talk";
import Closing from "@/components/site/Closing";

export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <Problem />
      <ServicesIndex />
      <Method />
      <Proof />
      <AdvantaBand />
      <Talk n="07" />
      <Closing />
    </>
  );
}
