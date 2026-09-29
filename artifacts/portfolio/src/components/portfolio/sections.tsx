import { Link } from "wouter";
import {
  Activity, ArrowRight, BarChart3, BriefcaseBusiness, Check, ChevronRight, Cloud, Cpu, ExternalLink,
  Globe2, Layers3, Linkedin, Radar, Radio, Server, Shield, Terminal, type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects, pcBuildSpec, workExperience, recentActivity } from "@/data/portfolio";
import { LINKEDIN_URL, SectionLabel, StatusDot } from "./shared";
import { ParallaxBackdrop } from "./parallax-backdrop";

export function HeroSection({ onViewHomelab }: { onViewHomelab: () => void }) {
  return <section id="hero" className="qcr-hero">
    <ParallaxBackdrop hero />
    <div className="qcr-eyebrow"><span><StatusDot /> system / maintained record</span><span>Chicago, IL</span></div>
    <div className="qcr-hero-grid">
      <div>
        <p className="qcr-kicker">Cybersecurity portfolio</p>
        <h1>Torianna</h1>
        <p className="qcr-intro">Cybersecurity graduate and Security+ holder building, breaking, and defending her own homelab to learn how attacks really work.</p>
        <div className="qcr-actions">
          <button type="button" className="qcr-primary" onClick={onViewHomelab} data-testid="button-view-homelab">View Homelab <ChevronRight size={16} /></button>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="qcr-quiet" data-testid="link-hero-linkedin"><Linkedin size={14} /> LinkedIn</a>
        </div>
      </div>
      <div className="qcr-profile">
        <div className="qcr-profile-head"><span>/ operator profile</span><Terminal size={16} /></div>
        <dl><dt>focus</dt><dd>defensive security</dd><dt>detection</dt><dd className="green"><StatusDot /> lab active</dd><dt>response loop</dt><dd>in progress</dd><dt>host</dt><dd>Ubuntu / dedicated</dd></dl>
        <p className="qcr-note"><b>note</b> lab is live; dashboards are not public</p>
      </div>
    </div>
  </section>;
}

export function AboutSection() {
  return <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
    <ParallaxBackdrop />
    <SectionLabel>01 / About</SectionLabel>
    <h2 className="mb-10 text-4xl font-semibold tracking-tight sm:text-5xl">Hi, I'm Torianna.</h2>
    <div className="max-w-3xl space-y-6 text-base leading-relaxed text-foreground/90">
      <p>I am a cybersecurity graduate from Bradley University and a CompTIA Security+ holder based in Chicago. I started my homelab because I wanted more than just textbook knowledge. While my coursework and certifications laid a strong foundation, I wanted hands-on experience defending systems and understanding how attacks actually work.</p>
      <p>Having my own environment lets me set up defenses, test them, and see exactly what gets caught and what slips through. Learning from those gaps and seeing things from an attacker's perspective is the best way to learn how to stop them.</p>
    </div>
  </section>;
}

function NetworkDiagram() {
  const Node = ({ icon: Icon, label, sub, wide = false }: { icon: LucideIcon; label: string; sub: string; wide?: boolean }) => <div className={`relative z-10 border border-primary/35 bg-card px-3 py-3 ${wide ? "min-w-36" : "min-w-28"}`}><Icon className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[11px] text-foreground">{label}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{sub}</p></div>;
  const Leaf = ({ icon: Icon, label, sub, w = "w-28" }: { icon: LucideIcon; label: string; sub: string; w?: string }) => <div className={`${w} border border-dashed border-primary/35 bg-background p-3`}><Icon className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[10px]">{label}</p><p className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">{sub}</p></div>;
  return <div className="border border-border bg-card/60 p-4 sm:p-6">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><SectionLabel>Infrastructure map</SectionLabel><h3 className="text-xl font-medium">Portfolio hosting path</h3></div><span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"><StatusDot /> documented topology</span></div>
    <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">A view of how this site and the home detection stack fit together. Lines describe relationships, not live traffic.</p>
    <div className="overflow-x-auto pb-2"><div className="min-w-[42rem]">
      <div className="flex items-center gap-2"><Node icon={Globe2} label="Internet" sub="public edge" /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Cloud} label="Cloudflare Tunnel" sub="narrow public surface" wide /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Radio} label="nginx" sub="reverse proxy" /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Server} label="Ubuntu host" sub="dedicated machine" wide /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Globe2} label="torianna.tech" sub="portfolio endpoint" wide /></div>
      <div className="ml-[28rem] mt-3 h-5 w-px bg-primary/50" />
      <div className="ml-[17rem] flex items-start justify-center gap-3 border-t border-primary/35 pt-4"><Leaf icon={Shield} label="CrowdSec" sub="threat intel" /><Leaf icon={Radar} label="Suricata" sub="network IDS" /><Leaf icon={BarChart3} label="Loki + Grafana" sub="logs + views" w="w-36" /></div>
    </div></div>
  </div>;
}

function ActivityFeed() {
  return <div className="border border-border bg-card/60 p-5">
    <div className="mb-5 flex items-center justify-between"><div><SectionLabel>Lab log</SectionLabel><h3 className="text-xl font-medium">Recent activity</h3></div><Activity className="h-4 w-4 text-primary" /></div>
    <ul className="space-y-1">{recentActivity.map(item => { const Icon = item.icon; return <li key={item.label} className="flex gap-3 border-t border-border py-4 first:border-t-0 first:pt-0"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-primary/10 text-primary"><Icon className="h-3.5 w-3.5" /></span><div className="min-w-0"><p className="text-sm leading-snug text-foreground">{item.label}</p><p className="mt-1 font-mono text-[10px] text-muted-foreground">{item.detail}</p></div><span className="ml-auto shrink-0 font-mono text-[9px] uppercase tracking-wider text-primary/80">{item.status}</span></li>; })}</ul>
    <p className="mt-4 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Lab milestones, not live SOC events</p>
  </div>;
}

export function HomelabSection() {
  return <article id="homelab" className="mb-8 border border-border bg-card/35 p-4 sm:p-6">
    <SectionLabel>Project / Homelab</SectionLabel>
    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <h3 className="text-3xl font-semibold tracking-tight">Homelab</h3>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/90">This website is part of that lab. It runs on a self-managed Ubuntu server behind a Cloudflare Tunnel and is actively monitored by a stack that includes CrowdSec, Suricata, Loki, and Grafana, meaning real traffic is logged, flagged, and visualized. Deployments are automated too: a cron job on the host polls GitHub every 5 minutes, so a push is picked up on the next check and rebuilt and redeployed without manual server work.</p>
      </div>
      <div className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary"><StatusDot /> documented / in progress</div>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      <Link href="/homelab/website" className="qcr-link-card group flex flex-col border bg-card p-6 text-left" data-testid="link-homelab-website">
        <Server className="h-5 w-5 text-primary" />
        <h4 className="mt-8 text-xl font-medium">This Website</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">A self-hosted portfolio with nginx, DNS, Cloudflare Tunnel, and a GitHub-based auto-deploy pipeline.</p>
        <span className="qcr-card-cta">View website configuration <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
      </Link>
      <Link href="/homelab/detection" className="qcr-link-card group flex flex-col border bg-card p-6 text-left" data-testid="link-homelab-detection">
        <Radar className="h-5 w-5 text-primary" />
        <h4 className="mt-8 text-xl font-medium">Detection System</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">CrowdSec and Suricata feed a Loki and Grafana observability stack for network detection and response.</p>
        <span className="qcr-card-cta">View detection system <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
      </Link>
    </div>
    <div className="qcr-overview-grid mt-5"><NetworkDiagram /><ActivityFeed /></div>
  </article>;
}

function PcSpecTable() {
  return <div className="mt-5 overflow-hidden border border-border bg-background/40">
    <div className="flex items-center justify-between border-b border-border px-4 py-3"><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><Cpu className="h-3.5 w-3.5 text-primary" /> current build / in progress</span><Layers3 className="h-4 w-4 text-primary" /></div>
    <table className="w-full text-left font-mono text-xs"><caption className="sr-only">Current PC build specification</caption><tbody className="divide-y divide-border">{pcBuildSpec.map(row => <tr key={row.label}><th scope="row" className="w-28 px-4 py-3 font-normal text-muted-foreground">{row.label}</th><td className={`px-4 py-3 text-right ${row.ready ? "text-foreground" : "italic text-muted-foreground/60"}`}>{row.value}</td><td className="w-8 px-3">{row.ready ? <Check className="h-3 w-3 text-primary" /> : <span className="text-muted-foreground">—</span>}</td></tr>)}</tbody></table>
  </div>;
}

export function ProjectsSection() {
  return <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
    <ParallaxBackdrop />
    <SectionLabel>02 / Projects</SectionLabel>
    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h2><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{String(projects.length + 1).padStart(2, "0")} projects</span></div>
    <HomelabSection />
    <div className="grid items-stretch gap-4 lg:grid-cols-2">{projects.map(project => <article key={project.id} className="border border-border bg-card" data-testid={`card-project-${project.id}`}>
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2"><span className="font-mono text-[10px] uppercase tracking-wider text-primary">{project.category}</span><span className="text-border">/</span><span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><StatusDot /> {project.status}</span></div>
        <h3 className="mt-6 text-xl font-medium">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
      </div>
      <div className="border-t border-primary/25 px-5 pb-6 pt-5 sm:px-6">
        <p className="text-sm leading-relaxed text-foreground/85">{project.detail}</p>
        {project.id === "pc-builds" && <PcSpecTable />}
        <div className="mt-5 flex flex-wrap gap-2">{project.stack.map(tag => <Badge key={tag} variant="outline" className="font-mono text-[10px] font-normal text-primary/85">{tag}</Badge>)}</div>
        {project.id === "sigma-rules" && <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"><ExternalLink className="h-3 w-3 text-primary" /> Repository link not published here</div>}
      </div>
    </article>)}</div>
  </section>;
}

const Bullet = ({ children }: { children: string }) => <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><span aria-hidden="true" className="mt-[.55rem] h-1.5 w-1.5 shrink-0 bg-primary" /><span>{children}</span></li>;

export function ExperienceSection() {
  return <section id="experience" className="border-y border-border bg-card/35">
    <ParallaxBackdrop />
    <SectionLabel>03 / Experience</SectionLabel>
    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Experience</h2><p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">Technical support, identity, detection, security awareness, and audit work. Newest first.</p></div><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{String(workExperience.length).padStart(2, "0")} roles</span></div>
    <ol className="space-y-6">{workExperience.map((job, index) => <li key={`${job.company}-${job.role}`}><article className="grid gap-6 border border-border bg-card p-6 sm:p-8 lg:grid-cols-[.48fr_1fr] lg:gap-10" data-testid={`card-role-${index}`}>
      <div>
        <div className="mb-8 flex items-start justify-between"><span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span><BriefcaseBusiness className="h-4 w-4 text-muted-foreground" /></div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">{job.company}</p>
        <h3 className="mt-2 text-2xl font-medium leading-tight">{job.role}</h3>
        <div className="mt-5 space-y-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><p>{job.dates}</p><p>{job.location}</p></div>
      </div>
      <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        {job.responsibilities.length > 0 && <ul className="space-y-3">{job.responsibilities.map(r => <Bullet key={r}>{r}</Bullet>)}</ul>}
        {job.highlights && <div className="space-y-6">{job.highlights.map(h => <div key={h.title} className="border-t border-border pt-5 first:border-t-0 first:pt-0">
          <p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">{h.area}</p>
          <h4 className="mt-1 text-base font-medium">{h.title}</h4>
          <ul className="mt-3 space-y-3">{h.points.map(p => <Bullet key={p}>{p}</Bullet>)}</ul>
          <div className="mt-4 flex flex-wrap gap-2">{h.tags.map(t => <Badge key={t} variant="outline" className="font-mono text-[10px] font-normal text-muted-foreground">{t}</Badge>)}</div>
        </div>)}</div>}
      </div>
    </article></li>)}</ol>
  </section>;
}

export function CredentialsSection() {
  return <section id="credentials" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
    <ParallaxBackdrop />
    <SectionLabel>04 / Credentials</SectionLabel>
    <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Credentials</h2>
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      <div className="border-y border-l-2 border-r border-border border-l-primary bg-card p-6"><div className="flex items-center justify-between gap-3"><Badge className="rounded bg-primary px-3 py-1 font-mono text-sm text-primary-foreground">B.S.</Badge><span className="font-mono text-[10px] text-muted-foreground">Degree</span></div><h3 className="mt-10 text-lg font-medium">B.S. Cybersecurity</h3><p className="mt-2 text-sm text-primary">Bradley University</p></div>
      <div className="border-y border-l-2 border-r border-border border-l-primary bg-card p-6"><div className="flex items-center justify-between gap-3"><Badge className="rounded bg-primary px-3 py-1 font-mono text-sm text-primary-foreground">Sec+</Badge><span className="font-mono text-[10px] text-muted-foreground">Earned 2025</span></div><h3 className="mt-10 text-lg font-medium">CompTIA Security+ (SY0-701)</h3><p className="mt-2 text-sm text-primary">CompTIA</p></div>
      <div className="border border-dashed border-border bg-card/60 p-6"><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Exploring next</p><div className="mt-10 space-y-4">{[["CySA+", "CompTIA Cybersecurity Analyst+"], ["CEH", "Certified Ethical Hacker"]].map(([abbr, name]) => <div key={abbr} className="flex items-center gap-3"><Badge variant="outline" className="font-mono text-[10px]">{abbr}</Badge><span className="text-sm text-muted-foreground">{name}</span></div>)}</div></div>
    </div>
  </section>;
}

export function ContactSection() {
  return <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
    <ParallaxBackdrop />
    <div className="border border-primary/30 bg-primary/[.04] p-6 sm:p-8">
      <SectionLabel>05 / Contact</SectionLabel>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Want to inspect the work?</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">The best conversations are about the decisions behind the system. Reach out for the full project context, write-ups, or a walkthrough of the lab.</p></div>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="qcr-contact-cta" data-testid="link-contact-linkedin">Connect on LinkedIn <ArrowRight className="h-4 w-4" /></a>
      </div>
    </div>
  </section>;
}
