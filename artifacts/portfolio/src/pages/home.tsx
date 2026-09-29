import { useEffect, useState } from "react";
import { ArrowRight, BriefcaseBusiness, CircleDot, FolderGit2, Github, GraduationCap, Linkedin, Menu, Server, User, UserRound, X, type LucideIcon } from "lucide-react";
import { lastUpdated } from "@/data/portfolio";
import { LINKEDIN_URL, SectionLabel, StatusDot } from "@/components/portfolio/shared";
import { AboutSection, ContactSection, CredentialsSection, ExperienceSection, HeroSection, ProjectsSection } from "@/components/portfolio/sections";
import "./home-qcr.css";

export { SectionLabel, StatusDot };

type SectionId = "hero" | "about" | "homelab" | "projects" | "experience" | "credentials" | "contact";
type NavigationSectionId = Exclude<SectionId, "hero" | "homelab">;

const sidebarItems: Array<{ id: NavigationSectionId; label: string; icon: LucideIcon }> = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "credentials", label: "Credentials", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: UserRound },
];

export function Sidebar({ activeSection, collapsed, mobileOpen, onNavigate, onToggle }: { activeSection: SectionId; collapsed: boolean; mobileOpen: boolean; onNavigate: (id: SectionId) => void; onToggle: () => void }) {
  return (
    <>
      {mobileOpen && <button type="button" aria-label="Close navigation drawer" onClick={onToggle} className="qcr-scrim" />}
      <aside aria-label="Portfolio navigation" className={`qcr-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="qcr-brand">
          <button type="button" onClick={() => onNavigate("hero")} className={`flex items-center gap-3 text-left ${collapsed ? "lg:mx-auto" : ""}`}>
            <img src={`${import.meta.env.BASE_URL}terminal-mark.png`} width="36" height="36" alt="" className="qcr-brand-mark" />
            <span className={`${collapsed ? "lg:hidden" : ""}`}><span className="block font-mono text-sm font-medium tracking-tight">TORIANNA</span><span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Security portfolio</span></span>
          </button>
          <button type="button" onClick={onToggle} aria-label="Close navigation drawer" className="qcr-close"><X className="h-4 w-4" /></button>
        </div>
        <div className="qcr-side-label">Workspace</div>
          <nav>
            {sidebarItems.map(item => { const selected = activeSection === item.id; return <button key={item.id} type="button" onClick={() => onNavigate(item.id)} aria-current={selected ? "page" : undefined} className={selected ? "active" : ""}><span className="qcr-nav-index">{String(sidebarItems.indexOf(item) + 1).padStart(2, "0")}</span>{item.label}{selected && <CircleDot size={7} fill="currentColor" />}</button>; })}
           </nav>
        <div className="qcr-sidebar-note"><StatusDot /><div><b>Portfolio mode</b><p>Stylized infrastructure record. No live attack telemetry.</p></div></div>
      </aside>
    </>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const ids: NavigationSectionId[] = sidebarItems.map(item => item.id);
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        setActiveSection(ids[ids.length - 1]);
        return;
      }
      const current = ids.find(id => { const element = document.getElementById(id); if (!element) return false; const rect = element.getBoundingClientRect(); return rect.top <= 150 && rect.bottom >= 150; });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  useEffect(() => {
    document.title = "Torianna | Security Portfolio";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "Cybersecurity portfolio and homelab documentation.");

    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const navigate = (id: SectionId) => {
    setMobileOpen(false);
    setActiveSection(id === "homelab" ? "projects" : id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return <div className="qcr">
    <Sidebar activeSection={activeSection} collapsed={false} mobileOpen={mobileOpen} onNavigate={navigate} onToggle={() => setMobileOpen(false)} />
    <div className="qcr-main">
      <header className="qcr-topbar"><button type="button" className="qcr-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation drawer"><Menu size={19} /></button><span className="qcr-breadcrumb"><i>workspace</i> / {sidebarItems.find(item => item.id === activeSection)?.label.toLowerCase() ?? "home"}</span><a className="qcr-linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><Linkedin size={14} /> LinkedIn <ArrowRight size={17} /></a></header>
      <main>
        <HeroSection onViewHomelab={() => navigate("homelab")} />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <CredentialsSection />
        <ContactSection />
      </main>
      <footer className="border-t border-border">
        <div className="px-5 pt-7 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground" data-testid="text-last-updated">Last updated <time dateTime={lastUpdated.iso}>{lastUpdated.label}</time></p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{lastUpdated.note}</p>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-7 sm:px-8"><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">© {new Date().getFullYear()} Torianna / Chicago, IL</p><div className="flex items-center gap-3"><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="qcr-icon-link"><Linkedin className="h-4 w-4" /></a><a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="qcr-icon-link"><Github className="h-4 w-4" /></a></div></div>
      </footer>
    </div>
  </div>;
}
