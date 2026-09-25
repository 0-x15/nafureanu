import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SiteBackground from "@/components/layout/SiteBackground";
import RouteHead from "@/components/layout/RouteHead";

export default function SiteLayout({ lang = "es" }) {
  return (
    <MotionConfig reducedMotion="user">
      <RouteHead lang={lang} />
      {/* one stacking root: the canvas at the bottom, every page above it */}
      <div className="relative isolate">
        <SiteBackground />
        <div className="relative z-10">
          <ScrollProgress />
          <Navbar lang={lang} />
          <main className="relative">
            <Outlet />
          </main>
          <Footer lang={lang} />
        </div>
      </div>
    </MotionConfig>
  );
}