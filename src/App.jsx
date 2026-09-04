import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import PageNotFound from "./lib/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
// Add page imports here
import Home from "./pages/Home";
import Services from "./pages/Services";
import Work from "./pages/Work";
import CaseStudy from "./pages/CaseStudy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SiteLayout from "./components/layout/SiteLayout";
import CrmDemoApp from "./features/crm-demo/CrmDemoApp";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Spanish — primary language, default */}
          <Route element={<SiteLayout lang="es" />}>
            <Route path="/" element={<Home lang="es" />} />
            <Route path="/services" element={<Services lang="es" />} />
            <Route path="/work" element={<Work lang="es" />} />
            <Route path="/work/:slug" element={<CaseStudy lang="es" />} />
            <Route path="/about" element={<About lang="es" />} />
            <Route path="/contact" element={<Contact lang="es" />} />
          </Route>
          {/* English — secondary language, /en prefix */}
          <Route element={<SiteLayout lang="en" />}>
            <Route path="/en" element={<Home lang="en" />} />
            <Route path="/en/services" element={<Services lang="en" />} />
            <Route path="/en/work" element={<Work lang="en" />} />
            <Route path="/en/work/:slug" element={<CaseStudy lang="en" />} />
            <Route path="/en/about" element={<About lang="en" />} />
            <Route path="/en/contact" element={<Contact lang="en" />} />
          </Route>
          {/* Interactive CRM demo — its own application shell, outside SiteLayout */}
          <Route path="/work/crm-inmobiliario/demo" element={<CrmDemoApp lang="es" />} />
          <Route path="/en/work/real-estate-crm/demo" element={<CrmDemoApp lang="en" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App