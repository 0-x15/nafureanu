import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridOverlay from "@/components/layout/GridOverlay";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Cursor from "@/components/layout/Cursor";

export default function SiteLayout({ lang = "es" }) {
  return (
    <MotionConfig reducedMotion="user">
      <GridOverlay />
      <ScrollProgress />
      <Cursor lang={lang} />
      <Navbar lang={lang} />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer lang={lang} />
    </MotionConfig>
  );
}