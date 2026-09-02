import Hero from "@/sections/home/Hero";
import Manifesto from "@/sections/home/Manifesto";
import ProblemTicker from "@/sections/home/ProblemTicker";
import CapabilitiesBlade from "@/sections/home/CapabilitiesBlade";
import SelectedWork from "@/sections/home/SelectedWork";
import CtaBand from "@/components/CtaBand";
import { usePageMeta } from "@/lib/seo";

export default function Home() {
  usePageMeta({
    title: "Nafureanu — Software Engineering Studio",
    description:
      "Custom software, AI systems and business automation. Nafureanu designs and builds the systems that remove repetitive work.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <Manifesto />
      <ProblemTicker />
      <CapabilitiesBlade />
      <SelectedWork />
      <CtaBand />
    </>
  );
}