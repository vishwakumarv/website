import { Routes, Route } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Experience from "@/pages/Experience";
import Resume from "@/pages/Resume";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import WriteupsLanding from "@/pages/WriteupsLanding";
import Writeups from "@/pages/Writeups";
import WriteupDetail from "@/pages/WriteupDetail";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col mobile-tap-highlight">
      <SiteHeader />
      <main className="flex-1 mobile-safe-bottom md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/writeups" element={<WriteupsLanding />} />
          <Route path="/writeups/:category" element={<Writeups />} />
          <Route path="/writeups/:category/:slug" element={<WriteupDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}