import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function SiteLayout({ lang = "es" }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar lang={lang} />
      <main className="relative">
        <Outlet />
      </main>
      <Footer lang={lang} />
    </MotionConfig>
  );
}