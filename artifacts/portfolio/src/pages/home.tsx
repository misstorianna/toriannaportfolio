import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  Activity, ArrowRight, BarChart3, BookOpen, BriefcaseBusiness, CalendarClock, Check, CheckCircle2,
  ChevronLeft, ChevronRight, CircleDot, Cloud, Cpu, ExternalLink, Github, Globe2,
  Layers3, Linkedin, Menu, Network, Radar, Radio, Server, Shield, Terminal, User, UserRound, X, Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { stack, projects, experience, workExperience, recentActivity } from "@/data/portfolio";
import "./home-qcr.css";

type SectionId = "hero" | "background" | "experience" | "homelab" | "projects" | "updated" | "contact";
type NavigationSectionId = Exclude<SectionId, "hero" | "homelab">;

const sidebarItems: Array<{ id: NavigationSectionId; label: string; icon: LucideIcon }> = [
  { id: "background", label: "Background", icon: User },
  { id: "experience", label: "Work Experience", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", icon: Layers3 },
  { id: "updated", label: "Last Updated", icon: CalendarClock },
  { id: "contact", label: "Contact", icon: UserRound },
];

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary">{children}</p>;
}

export function StatusDot() {
  return <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />;
}

export function Sidebar({ activeSection, collapsed, mobileOpen, onNavigate, onToggle }: { activeSection: SectionId; collapsed: boolean; mobileOpen: boolean; onNavigate: (id: SectionId) => void; onToggle: () => void }) {
  return (
    <>
      {mobileOpen && <button type="button" aria-label="Close navigation drawer" onClick={onToggle} className="qcr-scrim" />}
      <aside aria-label="Portfolio navigation" className={`qcr-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="qcr-brand">
          <button type="button" onClick={() => onNavigate("hero")} className={`flex items-center gap-3 text-left ${collapsed ? "lg:mx-auto" : ""}`}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-primary/70 bg-primary/10 font-mono text-sm font-medium text-primary">T</span>
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

function NetworkDiagram() {
  const Node = ({ icon: Icon, label, sub, wide = false }: { icon: LucideIcon; label: string; sub: string; wide?: boolean }) => <div className={`relative z-10 border border-primary/35 bg-card px-3 py-3 ${wide ? "min-w-36" : "min-w-28"}`}><Icon className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[11px] text-foreground">{label}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{sub}</p></div>;
  return <div className="border border-border bg-card/60 p-4 sm:p-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><SectionLabel>Infrastructure map</SectionLabel><h3 className="text-xl font-medium">Portfolio hosting path</h3></div><span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"><StatusDot /> documented topology</span></div><p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">A view of how this site and the home detection stack fit together. Lines describe relationships, not live trafiic.</p><div className="overflow-x-auto pb-2"><div className="min-w-[42rem]"><div className="flex items-center gap-2"><Node icon={Globe2} label="Internet" sub="public edge" /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Cloud} label="Cloudflare Tunnel" sub="narrow public surface" wide /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Radio} label="nginx" sub="reverse proxy" /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Server} label="Ubuntu host" sub="dedicated machine" wide /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Globe2} label="torianna.tech" sub="portfolio endpoint" wide /></div><div className="ml-[28rem] mt-3 h-5 w-px bg-primary/50" /><div className="ml-[17rem] flex items-start justify-center gap-3 border-t border-primary/35 pt-4"><div className="w-28 border border-dashed border-primary/35 bg-background p-3"><Shield className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[10px]">CrowdSec</p><p className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">threat intel</p></div><div className="w-28 border border-dashed border-primary/35 bg-background p-3"><Radar className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[10px]">Suricata</p><p className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">network IDS</p></div><div className="w-36 border border-dashed border-primary/35 bg-background p-3"><BarChart3 className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[10px]">Loki + Grafana</p><p className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">logs + views</p></div></div></div></div></div>;
}

function ActivityFeed() {
  return <div className="border border-border bg-card/60 p-5"><div className="mb-5 flex items-center justify-between"><div><SectionLabel>Portfolio log</SectionLabel><h3 className="text-xl font-medium">Recent activity</h3></div><Activity className="h-4 w-4 text-primary" /></div><div className="space-y-1">{recentActivity.map(item => { const Icon = item.icon; return <div key={item.label} className="flex gap-3 border-t border-border py-4 first:border-t-0 first:pt-0"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-primary/10 text-primary"><Icon className="h-3.5 w-3.5" /></span><div className="min-w-0"><p className="text-sm leading-snug text-foreground">{item.label}</p><p className="mt-1 font-mono text-[10px] text-muted-foreground">{item.detail}</p></div><span className="ml-auto shrink-0 font-mono text-[9px] uppercase tracking-wider text-primary/80">{item.status}</span></div>; })}</div><p className="mt-4 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Portfolio updates, not live SOC events</p></div>;
}

function BackgroundPanel() {
  return <section id="background" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
    <SectionLabel>01 / Personal Background</SectionLabel>
    <div className="mb-10">
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Hi, I'm Torianna.</h2>
    </div>
    <div className="max-w-3xl space-y-6 text-base leading-relaxed text-foreground/90">
      <p>I am a cybersecurity graduate from Bradley University and a CompTIA Security+ holder based in Chicago. I started my homelab because I wanted more than just textbook knowledge. While my coursework and certifications laid a strong foundation, I wanted hands-on experience defending systems and understanding how attacks actually work.</p>
      <p>Having my own environment lets me set up defenses, test them, and see exactly what gets caught and what slips through. Learning from those gaps and seeing things from an attacker's perspective is the best way to learn how to stop them.</p>
      <p>This website is part of that lab. It runs on a self-managed Ubuntu server behind a Cloudflare Tunnel and is actively monitored by a stack that includes CrowdSec, Suricata, Loki, and Grafana, meaning real traffic is logged, flagged, and visualized. Deployments are automated too — a cron job on the host polls GitHub every 5 minutes, so every push automatically triggers a rebuild and redeploy without manual server work.</p>
      <p>My projects and lab write-ups here document that journey, including the lessons learned, the things that broke, and how I fixed them. Thanks for stopping by.</p>
    </div>
  </section>;
}

function WorkExperiencePanel() {
  return <section id="experience" className="border-y border-border bg-card/35"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><SectionLabel>02 / Work history</SectionLabel><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Work Experience</h2><p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">Technical support, identity, detection, security awareness, and audit experience across corporate and client-facing environments.</p></div><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{String(workExperience.length).padStart(2, "0")} roles / experience index</span></div><div className="space-y-8">{workExperience.map((job, index) => <article key={`${job.company}-${job.role}`} className="group grid gap-6 border border-border bg-card p-6 transition-colors hover:border-primary/50 sm:p-8 lg:grid-cols-[.48fr_1fr] lg:gap-10"><div><div className="mb-8 flex items-start justify-between"><span className="font-mono text-xs text-primary">0{index + 1}</span><BriefcaseBusiness className="h-4 w-4 text-muted-foreground" /></div><p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">{job.company}</p><h3 className="mt-2 text-2xl font-medium leading-tight">{job.role}</h3>{(job.dates || job.location) && <div className="mt-5 space-y-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{job.dates && <p>{job.dates}</p>}{job.location && <p>{job.location}</p>}</div>}</div><ul className="space-y-3 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">{job.responsibilities.map(responsibility => <li key={responsibility} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><span aria-hidden="true" className="mt-[.55rem] h-1.5 w-1.5 shrink-0 bg-primary" /><span>{responsibility}</span></li>)}</ul></article>)}</div></div></section>;
}

function HomelabHomepagePanel() {
  return <article id="homelab" className="mt-8 border border-border bg-card p-5 sm:p-6">
    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <SectionLabel>Project / Infrastructure</SectionLabel>
        <h3 className="text-2xl font-semibold tracking-tight">Homelab</h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">Explore the website infrastructure separately from the security detection system running on the same Ubuntu host.</p>
      </div>
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary"><StatusDot /> documented / in progress</div>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      <Link href="/homelab/website" className="qcr-link-card group flex flex-col border bg-card p-6 text-left">
        <Server className="h-5 w-5 text-primary" />
        <h4 className="mt-8 text-xl font-medium">This Website</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">A self-hosted portfolio with nginx, DNS, Cloudflare Tunnel, and a GitHub-based auto-deploy pipeline.</p>
        <span className="qcr-card-cta">View website configuration <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
      </Link>
      <Link href="/homelab/detection" className="qcr-link-card group flex flex-col border bg-card p-6 text-left">
        <Radar className="h-5 w-5 text-primary" />
        <h4 className="mt-8 text-xl font-medium">Detection System</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">CrowdSec and Suricata feed a Loki and Grafana observability stack for network detection and response.</p>
        <span className="qcr-card-cta">View detection system <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
      </Link>
    </div>
  </article>;
}

function ProjectsPanel() {
  const filteredProjects = projects.filter(p => !p.link);
  
  return <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><SectionLabel>03 / Findings index</SectionLabel><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h2><p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">A dashboard-style index of work shipped, still active, and documented as the system grows.</p></div><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{String(filteredProjects.length + 1).padStart(2, "0")} projects / including Homelab</span></div><div className="grid gap-4 lg:grid-cols-2">{filteredProjects.map(project => { return <article key={project.id} className="border border-border bg-card"><div className="w-full p-5 text-left sm:p-6"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-2"><span className="font-mono text-[10px] uppercase tracking-wider text-primary">{project.category}</span><span className="text-border">/</span><span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><StatusDot /> {project.status}</span></div></div><h3 className="mt-6 text-xl font-medium">{project.title}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{project.summary}</p></div><div className="border-t border-primary/25 px-5 pb-6 pt-5 sm:px-6"><p className="text-sm leading-relaxed text-foreground/85">{project.detail}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.map(tag => <Badge key={tag} variant="outline" className="font-mono text-[10px] font-normal text-primary/85">{tag}</Badge>)}</div><div className="mt-5 flex items-center gap-2 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"><ExternalLink className="h-3 w-3 text-primary" /> External write-up / repository link not published here</div></div></article>; })}</div><HomelabHomepagePanel /></section>;
}

function LastUpdatedPanel() {
  return <section id="updated" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><div className="grid gap-8 border border-primary/30 bg-primary/[.04] p-6 sm:p-8 lg:grid-cols-[.48fr_1fr] lg:gap-12"><div><SectionLabel>Site record / latest revision</SectionLabel><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Last Updated</h2><div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-primary"><CalendarClock className="h-4 w-4" /><time dateTime="2026-09-18">September 18, 2026</time></div></div><div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">What changed</p><p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/90">Refined the Homelab Dashboard introduction, expanded the work experience record, and updated the projects shown across the portfolio.</p><p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">This is a display-only update record.</p></div></div></section>;
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
      <header className="qcr-topbar"><button type="button" className="qcr-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation drawer"><Menu size={19} /></button><span className="qcr-breadcrumb"><i>workspace</i> / {sidebarItems.find(item => item.id === activeSection)?.label.toLowerCase() ?? "home"}</span><span className="qcr-mode"><StatusDot /> portfolio mode</span><a href="https://www.linkedin.com/in/torianna" target="_blank" rel="noreferrer" aria-label="LinkedIn"><ArrowRight size={17} /></a></header>
      <main>
        <section id="hero" className="qcr-hero"><div className="qcr-eyebrow"><span><StatusDot /> system / maintained record</span><span>Chicago, IL · last reviewed by Torianna</span></div><div className="qcr-hero-grid"><div><p className="qcr-kicker">Security operations / portfolio dashboard</p><h1>Homelab<br /><em>Dashboard</em></h1><p className="qcr-intro">Welcome to my security portfolio. This site brings together my work experience, past and current projects, and everything I'm currently building in my homelab. From threat intelligence to active logging, this is where I put theory into practice.</p><div className="qcr-actions"><button type="button" className="qcr-primary" onClick={() => navigate("projects")}>Inspect projects <ChevronRight size={16} /></button><button type="button" className="qcr-quiet" onClick={() => navigate("homelab")}>Open homelab</button></div></div><div className="qcr-profile"><div className="qcr-profile-head"><span>/ operator profile</span><Terminal size={16} /></div><dl><dt>focus</dt><dd>defensive security</dd><dt>detection</dt><dd className="green"><StatusDot /> lab active</dd><dt>response loop</dt><dd>in progress</dd><dt>host</dt><dd>Ubuntu / dedicated</dd></dl><p className="qcr-note"><b>note</b> no live attack telemetry</p></div></div><div className="qcr-metrics"><div><b>03</b><span>projects complete</span></div><div><b>01</b><span>certification earned</span></div><div><b>04</b><span>work records</span></div><div><b>06</b><span>lab milestones</span></div></div></section>
        <BackgroundPanel />
        <WorkExperiencePanel />
        <ProjectsPanel />
        <section className="qcr-overview"><div className="qcr-section-head"><div><p className="qcr-kicker">At a glance</p><h2>Infrastructure Overview</h2></div><span className="qcr-stamp">record / 2025—present</span></div><div className="qcr-overview-grid"><NetworkDiagram /><ActivityFeed /></div></section>
        <section id="cyber" className="border-y border-border bg-card/35"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><SectionLabel>Experience / Great Wolf Lodge</SectionLabel><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Applied work</h2><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Security work across people, identity, and detection logic.</p></div><div className="grid gap-4 md:grid-cols-3">{experience.map((project, index) => <article key={project.title} className="flex h-full flex-col border border-border bg-card p-6"><div className="mb-12 flex items-start justify-between"><span className="font-mono text-xs text-primary">0{index + 1}</span><Shield className="h-4 w-4 text-muted-foreground" /></div><p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">{project.sub}</p><h3 className="mt-2 text-xl font-medium leading-tight">{project.title}</h3><p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{project.body}</p><div className="mt-6 flex flex-wrap gap-2">{project.tags.map(tag => <Badge key={tag} variant="outline" className="font-mono text-[10px] font-normal text-muted-foreground">{tag}</Badge>)}</div></article>)}</div></div></section>
        <section id="pcbuild" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><SectionLabel>Hardware record</SectionLabel><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">PC Build <Cpu className="ml-2 inline h-7 w-7 text-primary" /></h2><p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">The current build is in progress and designed for gaming, virtual machines, cybersecurity labs, and research.</p></div><div className="overflow-hidden border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">system specification</span><Layers3 className="h-4 w-4 text-primary" /></div><table className="w-full text-left font-mono text-xs"><tbody className="divide-y divide-border">{[{ label: "CPU", value: "AMD Ryzen 7 9800X3D", ready: true }, { label: "GPU", value: "RX 9070 XT", ready: true }, { label: "Motherboard", value: "Gigabyte B850 AORUS ELITE WIFI7", ready: true }, { label: "RAM", value: "32GB DDR5", ready: true }, { label: "Storage", value: "TBD", ready: false }].map(row => <tr key={row.label}><td className="w-36 px-5 py-4 text-muted-foreground">{row.label}</td><td className={`px-5 py-4 text-right ${row.ready ? "text-foreground" : "text-muted-foreground/60 italic"}`}>{row.value}</td><td className="w-8 px-3">{row.ready ? <Check className="h-3 w-3 text-primary" /> : <span className="text-muted-foreground">—</span>}</td></tr>)}</tbody></table></div></div></section>
        <section id="certifications" className="border-y border-border bg-card/35"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><SectionLabel>Credentials</SectionLabel><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Certifications</h2><div className="mt-10 grid max-w-3xl gap-4 md:grid-cols-2"><div className="border-l-2 border-primary border-y border-r border-border bg-card p-6"><div className="flex items-center justify-between gap-3"><Badge className="rounded bg-primary px-3 py-1 font-mono text-sm text-primary-foreground">Sec+</Badge><span className="font-mono text-[10px] text-muted-foreground">Earned 2025</span></div><h3 className="mt-10 text-lg font-medium">CompTIA Security+ (SY0-701)</h3><p className="mt-2 text-sm text-primary">CompTIA</p></div><div className="border border-dashed border-border bg-card/60 p-6"><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Exploring next</p><div className="mt-10 space-y-4">{[["CySA+", "CompTIA Cybersecurity Analyst+"], ["CEH", "Certified Ethical Hacker"]].map(([abbr, name]) => <div key={abbr} className="flex items-center gap-3"><Badge variant="outline" className="font-mono text-[10px]">{abbr}</Badge><span className="text-sm text-muted-foreground">{name}</span></div>)}</div></div></div></div></section>
        <LastUpdatedPanel />
        <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><div className="border border-primary/30 bg-primary/[.04] p-6 sm:p-8"><SectionLabel>Contact / handoff</SectionLabel><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Want to inspect the work?</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">The best conversations are about the decisions behind the system. Reach out for the full project context, write-ups, or a walkthrough of the lab.</p></div><a href="https://www.linkedin.com/in/torianna" target="_blank" rel="noopener noreferrer" className="qcr-contact-cta">Connect on LinkedIn <ArrowRight className="h-4 w-4" /></a></div></div></section>
      </main>
      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-7 sm:px-8"><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">© {new Date().getFullYear()} Torianna / Chicago, IL</p><div className="flex items-center gap-3"><a href="https://www.linkedin.com/in/torianna" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="qcr-icon-link"><Linkedin className="h-4 w-4" /></a><a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="qcr-icon-link"><Github className="h-4 w-4" /></a></div></div></footer>
    </div>
  </div>;
}
