import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import {
  Activity, ArrowRight, BarChart3, BookOpen, BriefcaseBusiness, Check, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, CircleDot, Cloud, Cpu, ExternalLink, Github, Globe2,
  Layers3, Linkedin, Menu, Moon, Network, Radio, Radar, Server, Shield, ShieldCheck,
  Sun, Terminal, UserRound, X, Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

type SectionId = "hero" | "projects" | "experience" | "homelab" | "skills" | "contact";
type HomelabTabId = "overview" | "website" | "detection";

const sidebarItems: Array<{ id: SectionId; label: string; icon: LucideIcon }> = [
  { id: "hero", label: "Dashboard", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: Layers3 },
  { id: "experience", label: "Work Experience", icon: BriefcaseBusiness },
  { id: "homelab", label: "Homelab", icon: Server },
  { id: "skills", label: "Skills", icon: Activity },
  { id: "contact", label: "Contact", icon: UserRound },
];

const skills = [
  "Rapid7 InsightIDR", "KnowBe4", "Microsoft Entra ID", "Active Directory",
  "SAML / SSO", "LEQL", "MITRE ATT&CK", "Nmap", "Wireshark", "Shodan",
  "OSINT", "Google Dorking", "Wayback Machine", "WHOIS / DNS", "HTML / CSS",
  "Linux", "TCP/IP", "Networking", "Security Reporting",
];

const skillGroups = [
  { name: "Detection & response", evidence: "Applied work + active lab practice", width: "78%", tools: "Rapid7 InsightIDR · Suricata · CrowdSec · LEQL" },
  { name: "Identity & awareness", evidence: "Internship experience", width: "68%", tools: "Microsoft Entra ID · SAML / SSO · KnowBe4 · Active Directory" },
  { name: "Network & OSINT", evidence: "Working knowledge + lab foundations", width: "58%", tools: "TCP/IP · Nmap · Wireshark · Shodan · DNS" },
  { name: "Web & reporting", evidence: "Applied project practice", width: "64%", tools: "HTML / CSS · Security reporting · Linux" },
];

const homelabTabs: Array<{ id: HomelabTabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "website", label: "This Website" },
  { id: "detection", label: "Detection System" },
];

const stack = [
  { name: "Ubuntu", role: "Dedicated host", icon: Server, detail: "A repurposed Surface laptop running Ubuntu hosts the portfolio and monitoring stack." },
  { name: "Suricata", role: "Network detection", icon: Network, detail: "An intrusion detection layer that watches network traffic and produces security events." },
  { name: "CrowdSec", role: "Threat intelligence", icon: Shield, detail: "Adds community-powered threat intelligence and a path toward automated blocking." },
  { name: "Loki / Grafana", role: "Logs and views", icon: Activity, detail: "Centralizes logs and turns detection activity into views that are easier to inspect." },
];

const buildLog = [
  { number: "01", title: "Build the Linux foundation", status: "Foundation", summary: "Started with Raspberry Pi OS, terminal work, file management, and SSH access from the local network.", detail: "Those early experiments made the command line and remote administration familiar before moving the monitoring stack onto a more capable dedicated Ubuntu host.", tags: ["Raspberry Pi OS", "Linux", "SSH"] },
  { number: "02", title: "Understand the home network", status: "Foundation", summary: "Worked through router and switch concepts, LAN connectivity, IP addressing, and local troubleshooting.", detail: "This networking context is the foundation for understanding what a network sensor can see, where events originate, and how the host fits into the larger environment.", tags: ["DNS / DHCP", "TCP/IP", "Networking"] },
  { number: "03", title: "Move the stack to Ubuntu", status: "Configured", summary: "Set up a dedicated Ubuntu machine as the home for the portfolio and security monitoring work.", detail: "Keeping the services on one dedicated host makes the system easier to reason about while the lab is still being built and documented.", tags: ["Ubuntu", "Nginx", "Dedicated host"] },
  { number: "04", title: "Add network detection with Suricata", status: "Working", summary: "Added Suricata as the intrusion detection layer for observing network activity and generating events.", detail: "Suricata answers the visibility question: what is happening on the network? Its detections become useful input for the rest of the observability stack.", tags: ["Suricata", "Intrusion detection", "Events"] },
  { number: "05", title: "Add threat intelligence with CrowdSec", status: "Working", summary: "Added CrowdSec to provide threat intelligence and identify behavior that should eventually drive a response.", detail: "Detection is working, but the response loop is not complete yet. The next milestone is a CrowdSec bouncer so flagged IPs are actually blocked instead of only logged.", tags: ["CrowdSec", "Threat intelligence", "Bouncer next"] },
  { number: "06", title: "Centralize logs and build views", status: "In progress", summary: "Connected the monitoring story to Loki, Promtail, and Grafana for centralized logs and visualization.", detail: "The current dashboard makes the activity inspectable. The next pass is to turn that foundation into more meaningful views and alerting for real security events.", tags: ["Loki", "Promtail", "Grafana"] },
];

const projects = [
  {
    id: "homelab-detection",
    title: "Homelab Detection Lab",
    category: "Homelab",
    status: "Active",
    summary: "Self-hosted detection stack on a repurposed Surface laptop running Ubuntu 26.04 LTS.",
    detail: "CrowdSec handles log-based attack detection, Suricata provides network IDS coverage, and Loki + Grafana provide log storage and dashboards. The public surface is hosted via nginx + Cloudflare Tunnel.",
    stack: ["Ubuntu", "CrowdSec", "Suricata", "Loki", "Promtail", "Grafana", "nginx", "Cloudflare Tunnel"],
  },
  {
    id: "sigma-rules",
    title: "Custom Sigma Detection Rules",
    category: "Research",
    status: "Ongoing",
    summary: "Writing and publishing custom Sigma rules for the homelab detection lab.",
    detail: "The work also includes investigation and phishing analysis writeups, keeping detection logic connected to the reasoning behind a finding rather than treating a rule as a black box.",
    stack: ["Sigma", "GitHub"],
  },
  {
    id: "pc-builds",
    title: "Custom PC Builds",
    category: "Hardware",
    status: "Complete",
    summary: "Built and troubleshot systems for gaming, virtual machines, cybersecurity labs, and research.",
    detail: "Built a high-end desktop with a Ryzen 7 9800X3D and RX 9070 XT, a second build on a Gigabyte B850 AORUS Elite board where a PSU and motherboard failure was diagnosed and resolved, and rebuilt an older Alienware machine with a clean Windows 11 install.",
    stack: ["Hardware diagnostics", "PC assembly", "Troubleshooting", "Ryzen 7 9800X3D", "RX 9070 XT"],
  },
  {
    id: "java-maven",
    title: "Java/Maven Plugin Development",
    category: "Dev",
    status: "Complete",
    summary: "Developed plugins using Java and Maven, building on internship experience with Active Directory and SSO systems.",
    detail: "The work connects software development with the systems background behind identity and access workflows.",
    stack: ["Java", "Maven", "Active Directory", "SSO"],
  },
  {
    id: "education",
    title: "Education & Certifications",
    category: "Research",
    status: "Complete",
    summary: "Cybersecurity degree from Bradley University and CompTIA Security+ certification.",
    detail: "Credentials: B.S. Cybersecurity, CompTIA Security+ (SY0-701), earned 2025.",
    stack: ["Bradley University", "B.S. Cybersecurity", "CompTIA Security+"],
  },
];

const experience = [
  { title: "Phishing Awareness Campaigns", sub: "Security Awareness", body: "Orchestrated phishing simulations via KnowBe4 for 3,000+ employees. Designed realistic email templates, analyzed click rates, and delivered targeted retraining to flagged employees.", tags: ["KnowBe4", "HTML/CSS", "Reporting"] },
  { title: "Detection & Alerting Logic", sub: "SIEM Engineering", body: "Built custom LEQL detection rules in Rapid7 InsightIDR to flag unauthorized password storage, excessive MFA failures, and repeated VPN login attempts.", tags: ["Rapid7 InsightIDR", "LEQL", "MFA Monitoring"] },
  { title: "SSO & Identity Work", sub: "Identity & Access", body: "Configured and deployed SSO for core business apps via Microsoft Entra ID using SAML and IdP-initiated flows. Documented rollout steps and resolved access issues.", tags: ["Entra ID", "SAML", "SSO"] },
];

const workExperience = [
  {
    company: "Geek Squad, Best Buy",
    role: "Senior Repair Technician (Agent)",
    dates: "Aug 2026 – Present",
    location: "North Riverside, IL",
    responsibilities: [
      "Diagnose and troubleshoot hardware and software issues across PCs, laptops, and consumer technology, determining root cause and the appropriate repair path.",
      "Perform repairs and diagnostics across components, power, storage, displays, networking, and peripherals.",
      "Use Repair Workbench to check devices in and out, document diagnostics and repairs, and track each repair through completion.",
      "Coach and support a team of 7 Agents on repair procedures and technical troubleshooting as a senior resource for issues beyond entry-level scope.",
      "Communicate technical findings and repair timelines in clear, non-technical terms while resolving complex service situations.",
    ],
  },
  {
    company: "Geek Squad, Best Buy",
    role: "Advanced Repair Agent",
    dates: "September – Present",
    responsibilities: [
      "Diagnosed and resolved hardware and software issues on customer devices using MRI diagnostic tools, including malware removal, disk repair, and OS restoration.",
      "Provided remote troubleshooting and support via AJU, resolving connectivity, performance, and software issues without requiring an in-store visit.",
      "Performed root-cause analysis on recurring hardware failures, reducing repeat service visits.",
      "Advised customers on repair options, data backup, and security best practices, translating technical findings into clear, actionable guidance.",
      "Maintained accurate service documentation and ticket records to support quality tracking and warranty compliance.",
      "Collaborated with senior technicians and precinct leadership to escalate complex repairs and ensure timely turnaround.",
    ],
  },
  {
    company: "Great Wolf Lodge — Corporate Team",
    role: "IT Corporate Support / Cybersecurity Intern",
    dates: "Jun 2025 – Aug 2025",
    location: "Remote",
    responsibilities: [
      "Configured and deployed IdP-initiated SSO for business applications using Microsoft Entra ID, SAML, and application role mapping.",
      "Troubleshot access issues with application owners, validated SSO functionality, and documented rollout procedures.",
      "Developed Rapid7 InsightIDR alerts for unauthorized password storage, excessive MFA failures, and repeated VPN login attempts.",
      "Analyzed phishing campaign results to identify high-risk users, report trends, and guide targeted retraining plans.",
      "Built KnowBe4 phishing simulations with realistic HTML/CSS email templates for 3,000+ employees across U.S. lodge and corporate environments.",
      "Delivered phishing-awareness guidance to users flagged by campaign results, reinforcing safe email handling and reporting practices.",
    ],
  },
  {
    company: "Bradley Cybersecurity Clinic",
    role: "Cybersecurity Analyst",
    dates: "Aug 2025 – Present",
    location: "Bradley University",
    responsibilities: [
      "Contribute to the creation of the Bradley Cybersecurity Clinic, focused on developing and applying cybersecurity audit processes for small-business assessments.",
    ],
  },
];

const recentActivity = [
  { label: "Deployed CrowdSec on Ubuntu host", detail: "Homelab Detection Lab", status: "documented", icon: Shield },
  { label: "Published custom Sigma rule to GitHub", detail: "Detection research", status: "ongoing", icon: Terminal },
  { label: "Completed CompTIA Security+", detail: "SY0-701 · earned 2025", status: "complete", icon: CheckCircle2 },
  { label: "Connected Loki / Promtail / Grafana", detail: "Visibility layer", status: "working", icon: Activity },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary">{children}</p>;
}

function StatusDot() {
  return <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />;
}

function Sidebar({ activeSection, collapsed, mobileOpen, onNavigate, onToggle }: { activeSection: SectionId; collapsed: boolean; mobileOpen: boolean; onNavigate: (id: SectionId) => void; onToggle: () => void }) {
  return (
    <>
      {mobileOpen && <button type="button" aria-label="Close navigation drawer" onClick={onToggle} className="fixed inset-0 z-40 bg-background/75 backdrop-blur-sm lg:hidden" />}
      <aside aria-label="Portfolio navigation" className={`fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col border-r border-border bg-background transition-[transform,width] duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "lg:w-[4.75rem]" : "lg:w-64"}`}>
        <div className="flex h-[4.5rem] items-center justify-between border-b border-border px-4">
          <button type="button" onClick={() => onNavigate("hero")} className={`flex items-center gap-3 text-left ${collapsed ? "lg:mx-auto" : ""}`}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-primary/70 bg-primary/10 font-mono text-sm font-medium text-primary">T</span>
            <span className={`${collapsed ? "lg:hidden" : ""}`}><span className="block font-mono text-sm font-medium tracking-tight">TORIANNA</span><span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Security portfolio</span></span>
          </button>
          <button type="button" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className={`rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground ${collapsed ? "lg:hidden" : ""}`}><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={onToggle} aria-label="Close navigation drawer" className="rounded p-2 text-muted-foreground hover:bg-muted lg:hidden"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-3 py-5">
          <p className={`mb-3 px-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground ${collapsed ? "lg:hidden" : ""}`}>Workspace</p>
          <nav className="space-y-1">
            {sidebarItems.filter(item => item.id !== "skills").map(item => { const Icon = item.icon; const selected = activeSection === item.id; return <button key={item.id} type="button" onClick={() => onNavigate(item.id)} aria-current={selected ? "page" : undefined} className={`group flex w-full items-center gap-3 rounded px-3 py-3 text-left font-mono text-[11px] uppercase tracking-wider transition-colors ${selected ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"} ${collapsed ? "lg:justify-center" : ""}`}><Icon className="h-4 w-4 shrink-0" /><span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>{selected && <span className={`ml-auto h-1.5 w-1.5 rounded-full bg-secondary ${collapsed ? "lg:hidden" : ""}`} />}</button>; })}
          </nav>
        </div>
        <div className={`mt-auto border-t border-border p-4 ${collapsed ? "lg:px-3" : ""}`}>
          <div className={`border border-border bg-card p-3 ${collapsed ? "lg:flex lg:justify-center" : ""}`}><StatusDot /><span className={`ml-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground ${collapsed ? "lg:hidden" : ""}`}>Portfolio mode</span><p className={`mt-2 text-xs leading-relaxed text-muted-foreground ${collapsed ? "lg:hidden" : ""}`}>Stylized infrastructure record. No live attack telemetry.</p></div>
        </div>
      </aside>
    </>
  );
}

function StatTile({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="border border-border bg-card p-4 sm:p-5"><div className="flex items-center justify-between gap-2"><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p><StatusDot /></div><p className="mt-5 text-xl font-medium tracking-tight text-foreground sm:text-2xl">{value}</p><p className="mt-1 font-mono text-[10px] leading-relaxed text-primary/80">{detail}</p></div>;
}

function NetworkDiagram() {
  const Node = ({ icon: Icon, label, sub, wide = false }: { icon: LucideIcon; label: string; sub: string; wide?: boolean }) => <div className={`relative z-10 border border-primary/35 bg-card px-3 py-3 ${wide ? "min-w-36" : "min-w-28"}`}><Icon className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[11px] text-foreground">{label}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{sub}</p></div>;
  return <div className="border border-border bg-card/60 p-4 sm:p-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><SectionLabel>Infrastructure map</SectionLabel><h3 className="text-xl font-medium">Portfolio hosting path</h3></div><span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"><StatusDot /> documented topology</span></div><p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">A truthful view of how this site and the home detection stack fit together. Lines describe infrastructure relationships, not live traffic.</p><div className="overflow-x-auto pb-2"><div className="min-w-[42rem]"><div className="flex items-center gap-2"><Node icon={Globe2} label="Internet" sub="public edge" /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Cloud} label="Cloudflare Tunnel" sub="narrow public surface" wide /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Radio} label="nginx" sub="reverse proxy" /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Server} label="Ubuntu host" sub="dedicated machine" wide /><ArrowRight className="h-4 w-4 shrink-0 text-primary" /><Node icon={Globe2} label="torianna.tech" sub="portfolio endpoint" wide /></div><div className="ml-[28rem] mt-3 h-5 w-px bg-primary/50" /><div className="ml-[17rem] flex items-start justify-center gap-3 border-t border-primary/35 pt-4"><div className="w-28 border border-dashed border-primary/35 bg-background p-3"><Shield className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[10px]">CrowdSec</p><p className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">threat intel</p></div><div className="w-28 border border-dashed border-primary/35 bg-background p-3"><Radar className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[10px]">Suricata</p><p className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">network IDS</p></div><div className="w-36 border border-dashed border-primary/35 bg-background p-3"><BarChart3 className="mb-2 h-4 w-4 text-primary" /><p className="font-mono text-[10px]">Loki + Grafana</p><p className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">logs + views</p></div></div></div></div></div>;
}

function ActivityFeed() {
  return <div className="border border-border bg-card/60 p-5"><div className="mb-5 flex items-center justify-between"><div><SectionLabel>Portfolio log</SectionLabel><h3 className="text-xl font-medium">Recent activity</h3></div><Activity className="h-4 w-4 text-primary" /></div><div className="space-y-1">{recentActivity.map(item => { const Icon = item.icon; return <div key={item.label} className="flex gap-3 border-t border-border py-4 first:border-t-0 first:pt-0"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-primary/10 text-primary"><Icon className="h-3.5 w-3.5" /></span><div className="min-w-0"><p className="text-sm leading-snug text-foreground">{item.label}</p><p className="mt-1 font-mono text-[10px] text-muted-foreground">{item.detail}</p></div><span className="ml-auto shrink-0 font-mono text-[9px] uppercase tracking-wider text-primary/80">{item.status}</span></div>; })}</div><p className="mt-4 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Portfolio updates, not live SOC events</p></div>;
}

function ProjectsPanel({ expandedProject, onToggle }: { expandedProject: string | null; onToggle: (id: string) => void }) {
  return <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><SectionLabel>01 / Findings index</SectionLabel><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h2><p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">A dashboard-style index of work shipped, still active, and documented as the system grows.</p></div><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">05 records / 03 complete</span></div><div className="grid gap-4 lg:grid-cols-2">{projects.map(project => { const expanded = expandedProject === project.id; return <article key={project.id} className={`border bg-card transition-[border-color,background-color] ${expanded ? "border-primary/60 bg-primary/[.03]" : "border-border hover:border-primary/35"}`}><button type="button" aria-expanded={expanded} onClick={() => onToggle(project.id)} className="w-full p-5 text-left sm:p-6"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-2"><span className="font-mono text-[10px] uppercase tracking-wider text-primary">{project.category}</span><span className="text-border">/</span><span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><StatusDot /> {project.status}</span></div><ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180 text-primary" : ""}`} /></div><h3 className="mt-6 text-xl font-medium">{project.title}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{project.summary}</p></button>{expanded && <div className="border-t border-primary/25 px-5 pb-6 pt-5 sm:px-6"><p className="text-sm leading-relaxed text-foreground/85">{project.detail}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.map(tag => <Badge key={tag} variant="outline" className="font-mono text-[10px] font-normal text-primary/85">{tag}</Badge>)}</div><div className="mt-5 flex items-center gap-2 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"><ExternalLink className="h-3 w-3 text-primary" /> External write-up / repository link not published here</div></div>}</article>; })}</div></section>;
}

function SkillsPanel() {
  return <section id="skills" className="border-y border-border bg-card/35"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><SectionLabel>02 / Capability index</SectionLabel><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Skills</h2><p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">These indicators describe where the work comes from, not a compliance score. They separate applied experience from current lab practice and foundational study.</p></div><div className="space-y-6">{skillGroups.map(group => <div key={group.name}><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-medium">{group.name}</h3><span className="font-mono text-[10px] uppercase tracking-wider text-primary/80">{group.evidence}</span></div><div className="mt-3 h-1.5 overflow-hidden bg-muted"><div className="h-full bg-primary" style={{ width: group.width }} /></div><p className="mt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">{group.tools}</p></div>)}<div className="border-t border-border pt-6"><p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Tools and topics in the record</p><div className="flex flex-wrap gap-2">{skills.map(skill => <Badge key={skill} variant="outline" className="font-mono text-[10px] font-normal text-muted-foreground">{skill}</Badge>)}</div></div></div></div></div></section>;
}

function HomelabPanel({ activeTab, onTabChange, selectedBuildStep, selectBuildStep, buildStepRefs, tabRefs }: { activeTab: HomelabTabId; onTabChange: (id: HomelabTabId, moveFocus?: boolean) => void; selectedBuildStep: number; selectBuildStep: (index: number, moveFocus?: boolean) => void; buildStepRefs: MutableRefObject<Array<HTMLButtonElement | null>>; tabRefs: MutableRefObject<Array<HTMLButtonElement | null>> }) {
  return <section id="homelab" className="circuit-zone mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel>03 / Infrastructure</SectionLabel><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Homelab control room</h2><p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">Explore the website infrastructure separately from the security detection system running on the same Ubuntu host.</p></div><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary"><StatusDot /> documented / in progress</div></div><div role="tablist" aria-label="Homelab projects" className="mb-8 grid gap-1 border border-border bg-card/70 p-1 sm:grid-cols-3">{homelabTabs.map((tab, index) => { const selected = activeTab === tab.id; return <button key={tab.id} ref={element => { tabRefs.current[index] = element; }} type="button" role="tab" id={`homelab-tab-${tab.id}`} aria-selected={selected} aria-controls={`homelab-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => onTabChange(tab.id)} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); onTabChange(homelabTabs[(index + 1) % homelabTabs.length].id, true); } if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); onTabChange(homelabTabs[(index - 1 + homelabTabs.length) % homelabTabs.length].id, true); } if (event.key === "Home") { event.preventDefault(); onTabChange("overview", true); } if (event.key === "End") { event.preventDefault(); onTabChange("detection", true); } }} className={`px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider transition-colors sm:text-center ${selected ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{tab.label}</button>; })}</div>{activeTab === "overview" && <div id="homelab-panel-overview" role="tabpanel" aria-labelledby="homelab-tab-overview" className="grid gap-5 md:grid-cols-2"><button type="button" onClick={() => onTabChange("website")} className="group border border-border bg-card p-6 text-left transition-[border-color,transform] hover:-translate-y-1 hover:border-primary/60"><Server className="h-5 w-5 text-primary" /><h3 className="mt-8 text-2xl font-medium">This Website</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">A self-hosted portfolio with nginx, DNS, Cloudflare Tunnel, and a GitHub-based auto-deploy pipeline.</p><span className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary">Inspect infrastructure <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span></button><button type="button" onClick={() => onTabChange("detection")} className="group border border-border bg-card p-6 text-left transition-[border-color,transform] hover:-translate-y-1 hover:border-primary/60"><Radar className="h-5 w-5 text-primary" /><h3 className="mt-8 text-2xl font-medium">Detection System</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">CrowdSec and Suricata feed a Loki and Grafana observability stack for network detection and response.</p><span className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary">Inspect detection <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span></button></div>}{activeTab === "website" && <div id="homelab-panel-website" role="tabpanel" aria-labelledby="homelab-tab-website" className="space-y-5"><div className="border border-border bg-card p-6 sm:p-8"><SectionLabel>Website infrastructure</SectionLabel><h3 className="text-2xl font-medium">This Website</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">The portfolio is a public site hosted through nginx on the Ubuntu machine, with Cloudflare Tunnel and DNS keeping the public surface narrow.</p><div className="mt-8 grid gap-4 sm:grid-cols-3">{[["01", "GitHub commit"], ["02", "Cron checks / 5 min"], ["03", "nginx redeploy"]].map(([number, label]) => <div key={number} className="border border-border bg-muted/40 p-4"><span className="font-mono text-xs text-primary">{number}</span><p className="mt-3 text-sm">{label}</p></div>)}</div><p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">A cron job on the Ubuntu host checks GitHub every 5 minutes. When it finds a new commit, it pulls the change, rebuilds the site, clears out old build files, and redeploys without manual server work.</p></div><div className="grid gap-4 md:grid-cols-2"><div className="border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">The trailing slash problem.</strong> A <code className="bg-muted px-1 text-xs">cp</code> command was nesting fresh files instead of replacing the live site, leaving stale content online until the deployed files were compared with the build output.</div><div className="border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">The sudoers constraint.</strong> Passwordless sudo rules had to match the deploy script&apos;s exact commands, so the copy step was rewritten without relying on a wildcard path.</div></div></div>}{activeTab === "detection" && <div id="homelab-panel-detection" role="tabpanel" aria-labelledby="homelab-tab-detection" className="space-y-12"><div className="border border-primary/30 bg-primary/[.05] p-6 sm:p-8"><div className="flex gap-4"><Zap className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><SectionLabel>Detection system / current state</SectionLabel><p className="max-w-3xl text-xl font-medium leading-relaxed">Detection is working on a dedicated Ubuntu host. The next step is closing the loop with automated blocking, better dashboard views, and alerting for real security events.</p></div></div><div className="mt-6 flex flex-wrap gap-2">{["CrowdSec", "Suricata", "Loki / Grafana", "Ubuntu"].map(tag => <Badge key={tag} variant="outline" className="font-mono text-[10px] text-primary/85">{tag}</Badge>)}</div></div><div><div className="mb-5 flex items-end justify-between"><div><SectionLabel>01 / The system</SectionLabel><h3 className="text-2xl font-medium">Stack at a glance</h3></div><span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:block">detection / response / visibility</span></div><div className="grid gap-4 sm:grid-cols-2">{stack.map(item => { const Icon = item.icon; return <div key={item.name} className="flex gap-4 border border-border bg-card p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-primary/50"><span className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/25 bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span><div><p className="font-medium">{item.name}</p><p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-primary/80">{item.role}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p></div></div>; })}</div></div><BuildLog selectedBuildStep={selectedBuildStep} selectBuildStep={selectBuildStep} buildStepRefs={buildStepRefs} /><div className="border border-primary/30 bg-primary/[.04] p-6"><SectionLabel>Next step</SectionLabel><h3 className="text-xl font-medium">Close the loop from detection to response</h3><p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">I&apos;m working on adding a CrowdSec bouncer so flagged IPs actually get blocked instead of just logged, along with building out more meaningful dashboard views and alerting for real security events.</p></div></div>}</section>;
}

function WorkExperiencePanel() {
  return <section id="experience" className="border-y border-border bg-card/35"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><SectionLabel>03 / Work history</SectionLabel><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Work Experience</h2><p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">Technical support, identity, detection, security awareness, and audit experience across corporate and client-facing environments.</p></div><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{String(workExperience.length).padStart(2, "0")} roles / experience index</span></div><div className="space-y-4">{workExperience.map((job, index) => <article key={`${job.company}-${job.role}`} className="group grid gap-6 border border-border bg-card p-6 transition-colors hover:border-primary/50 sm:p-8 lg:grid-cols-[.48fr_1fr] lg:gap-10"><div><div className="mb-8 flex items-start justify-between"><span className="font-mono text-xs text-primary">0{index + 1}</span><BriefcaseBusiness className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" /></div><p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">{job.company}</p><h3 className="mt-2 text-2xl font-medium leading-tight">{job.role}</h3>{(job.dates || job.location) && <div className="mt-5 space-y-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{job.dates && <p>{job.dates}</p>}{job.location && <p>{job.location}</p>}</div>}</div><ul className="space-y-3 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">{job.responsibilities.map(responsibility => <li key={responsibility} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><span aria-hidden="true" className="mt-[.55rem] h-1.5 w-1.5 shrink-0 bg-primary" /><span>{responsibility}</span></li>)}</ul></article>)}</div></div></section>;
}

function BuildLog({ selectedBuildStep, selectBuildStep, buildStepRefs }: { selectedBuildStep: number; selectBuildStep: (index: number, moveFocus?: boolean) => void; buildStepRefs: MutableRefObject<Array<HTMLButtonElement | null>> }) {
  const step = buildLog[selectedBuildStep];
  return <div id="homelab-build-log" className="scroll-mt-24"><div className="mb-5 flex items-end justify-between gap-4"><div><SectionLabel>02 / Build log</SectionLabel><h3 className="text-2xl font-medium">From foundations to a working stack</h3></div><BookOpen className="hidden h-5 w-5 text-primary/70 sm:block" /></div><p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">Open a step to see what it contributed and where it stands.</p><div className="border border-border bg-card p-4 sm:p-6"><div className="overflow-x-auto pb-3"><div role="tablist" aria-label="Homelab build milestones" className="relative flex min-w-[44rem] items-start justify-between gap-2 px-2"><div className="pointer-events-none absolute left-8 right-8 top-4 h-px bg-border" />{buildLog.map((item, index) => { const selected = index === selectedBuildStep; const complete = index < selectedBuildStep; return <button key={item.number} ref={element => { buildStepRefs.current[index] = element; }} type="button" role="tab" id={`homelab-build-step-${item.number}`} aria-selected={selected} aria-controls="homelab-build-step-panel" tabIndex={selected ? 0 : -1} aria-label={`Step ${item.number}: ${item.title}. Status: ${item.status}.`} onClick={() => selectBuildStep(index)} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); selectBuildStep((index + 1) % buildLog.length, true); } if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); selectBuildStep((index - 1 + buildLog.length) % buildLog.length, true); } if (event.key === "Home") { event.preventDefault(); selectBuildStep(0, true); } if (event.key === "End") { event.preventDefault(); selectBuildStep(buildLog.length - 1, true); } }} className="group relative z-10 flex min-w-16 flex-1 flex-col items-center gap-2 rounded px-1 py-1 text-center"><span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card font-mono text-[10px] transition-colors ${selected ? "border-primary bg-primary text-primary-foreground" : complete ? "border-primary/60 text-primary" : "border-border text-muted-foreground group-hover:border-primary/60"}`}>{complete ? <CheckCircle2 className="h-4 w-4" /> : item.number}</span><span className={`max-w-24 text-[10px] leading-tight ${selected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>{item.title}</span></button>; })}</div></div><div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-4"><p className="font-mono text-[10px] text-muted-foreground">Showing <span className="text-foreground">{String(selectedBuildStep + 1).padStart(2, "0")}</span> / {String(buildLog.length).padStart(2, "0")}</p><div className="flex gap-2"><Button type="button" variant="outline" size="sm" onClick={() => selectBuildStep(selectedBuildStep - 1)} disabled={selectedBuildStep === 0} aria-label="Show previous homelab milestone"><ChevronLeft className="h-3 w-3" /><span className="hidden sm:inline">Previous</span></Button><Button type="button" variant="outline" size="sm" onClick={() => selectBuildStep(selectedBuildStep + 1)} disabled={selectedBuildStep === buildLog.length - 1} aria-label="Show next homelab milestone"><span className="hidden sm:inline">Next</span><ChevronRight className="h-3 w-3" /></Button></div></div><div id="homelab-build-step-panel" role="tabpanel" tabIndex={0} aria-labelledby={`homelab-build-step-${step.number}`} className="mt-5 border border-primary/25 bg-primary/[.04] p-5 sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">Milestone {step.number}</p><h4 className="mt-2 text-xl font-medium">{step.title}</h4></div><Badge variant="outline" className="w-fit font-mono text-[10px] text-primary/80">{step.status}</Badge></div><p className="mt-4 text-sm font-medium leading-relaxed text-foreground/85">{step.summary}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.detail}</p><div className="mt-4 flex flex-wrap gap-2">{step.tags.map(tag => <Badge key={tag} variant="outline" className="font-mono text-[10px] font-normal text-muted-foreground">{tag}</Badge>)}</div></div></div></div>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>("homelab-detection");
  const [activeHomelabTab, setActiveHomelabTab] = useState<HomelabTabId>("overview");
  const [selectedBuildStep, setSelectedBuildStep] = useState(0);
  const buildStepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const ids: SectionId[] = ["hero", "projects", "experience", "homelab", "skills", "contact"];
    const onScroll = () => {
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

  const navigate = (id: SectionId) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const selectBuildStep = (index: number, moveFocus = false) => { const next = Math.max(0, Math.min(index, buildLog.length - 1)); setSelectedBuildStep(next); if (moveFocus) buildStepRefs.current[next]?.focus(); };
  const selectHomelabTab = (id: HomelabTabId, moveFocus = false) => { setActiveHomelabTab(id); if (moveFocus) tabRefs.current[homelabTabs.findIndex(tab => tab.id === id)]?.focus(); };

  return <div className="min-h-[100dvh] bg-background text-foreground">
    <Sidebar activeSection={activeSection} collapsed={sidebarCollapsed} mobileOpen={mobileOpen} onNavigate={navigate} onToggle={() => { if (window.innerWidth < 1024) setMobileOpen(open => !open); else setSidebarCollapsed(collapsed => !collapsed); }} />
    <div className={`min-h-[100dvh] transition-[padding] duration-300 ${sidebarCollapsed ? "lg:pl-[4.75rem]" : "lg:pl-64"}`}>
      <header className="sticky top-0 z-30 flex h-[4.5rem] items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur-xl sm:px-8">
        <div className="flex items-center gap-3"><button type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation drawer" className="rounded p-2 text-muted-foreground hover:bg-muted lg:hidden"><Menu className="h-4 w-4" /></button><div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex"><span className="text-primary">workspace</span><span>/</span><span>{sidebarItems.find(item => item.id === activeSection)?.label.toLowerCase()}</span></div><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary sm:hidden"><StatusDot /> online</div></div>
        <div className="flex items-center gap-2"><span className="hidden items-center gap-2 border-r border-border pr-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:flex"><StatusDot /> portfolio mode</span><button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button><a href="https://www.linkedin.com/in/torianna" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><Linkedin className="h-4 w-4" /></a><a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><Github className="h-4 w-4" /></a></div>
      </header>
      <main>
        <section id="hero" className="circuit-zone scanline border-b border-border"><div className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12"><div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 font-mono text-[10px] uppercase tracking-[0.17em] text-muted-foreground"><span className="flex items-center gap-2 text-primary"><StatusDot /> Dashboard / system online</span><span>Chicago, IL <span className="mx-2 text-border">/</span> personal infrastructure record</span></div><div className="grid gap-10 xl:grid-cols-[1.25fr_.75fr]"><div><SectionLabel>Security operations / portfolio dashboard</SectionLabel><h1 className="max-w-4xl text-[clamp(3rem,8vw,7rem)] font-semibold leading-[.9] tracking-[-0.07em]">Systems worth<br /><span className="text-primary">understanding.</span></h1><p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">I&apos;m Torianna, a cybersecurity graduate who learns by building systems, breaking them, and understanding why. This is the working record.</p><div className="mt-8 flex flex-wrap gap-3"><Button type="button" onClick={() => navigate("projects")} className="h-11 rounded bg-primary px-5 font-mono text-xs uppercase tracking-wider text-primary-foreground hover:bg-primary/90">Inspect projects <ArrowRight className="h-4 w-4" /></Button><Button type="button" variant="outline" onClick={() => navigate("homelab")} className="h-11 rounded border-border px-5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">Open homelab</Button></div></div><div className="border border-border bg-card/80 p-5"><div className="mb-6 flex items-center justify-between border-b border-border pb-3"><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">/ operator profile</span><Terminal className="h-4 w-4 text-primary" /></div><div className="space-y-4 font-mono text-xs"><div className="flex justify-between gap-4"><span className="text-muted-foreground">focus</span><span>defensive security</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">detection</span><span className="flex items-center gap-2 text-primary"><StatusDot /> lab active</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">response loop</span><span className="text-primary">in progress</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">host</span><span>Ubuntu / dedicated</span></div></div><div className="mt-7 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><span className="text-primary">note</span> no live attack telemetry</div></div></div><div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4"><StatTile label="Projects shipped" value="3 complete" detail="5 records tracked" /><StatTile label="Certifications" value="1 earned" detail="Security+ / 2025" /><StatTile label="Homelab uptime" value="Self-hosted" detail="Ubuntu / documented status" /><StatTile label="Detection rules written" value="LEQL + Sigma" detail="Applied work / ongoing" /></div><div className="mt-4 grid gap-5 xl:grid-cols-[1.35fr_.65fr]"><NetworkDiagram /><ActivityFeed /></div></div></section>
        <section id="about" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"><div className="grid gap-8 border border-border bg-card/50 p-6 sm:p-8 lg:grid-cols-[.65fr_1.35fr]"><div><SectionLabel>Operator profile</SectionLabel><h2 className="text-3xl font-semibold tracking-tight">The person behind the signal.</h2><p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Bradley University / Cybersecurity</p></div><div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground"><p>I&apos;m a recent cybersecurity graduate from Bradley University, based in Chicago. I&apos;m drawn to the places where systems meet: how systems connect, how alerts tell a story, how people interact with security controls, and how the right technical decisions quietly protect an environment.</p><p>Outside of work I like to experiment using my home lab. My security detection system uses CrowdSec and Suricata, with Loki and Grafana providing the dashboard. Separately, this website is self-hosted on the same dedicated Ubuntu machine and kept in sync by a fully automated deploy pipeline.</p><p className="border-l-2 border-primary bg-primary/[.05] p-4 text-foreground/85">Next operation: add a CrowdSec bouncer so flagged IPs actually get blocked instead of just logged, along with more meaningful dashboard views and alerting for real security events.</p></div></div></section>
        <ProjectsPanel expandedProject={expandedProject} onToggle={id => setExpandedProject(current => current === id ? null : id)} />
        <WorkExperiencePanel />
        <section id="cyber" className="border-y border-border bg-card/35"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><SectionLabel>Experience / Great Wolf Lodge</SectionLabel><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Applied work</h2><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Security work across people, identity, and detection logic.</p></div><div className="grid gap-4 md:grid-cols-3">{experience.map((project, index) => <article key={project.title} className="group flex h-full flex-col border border-border bg-card p-6 transition-[border-color,transform] hover:-translate-y-1 hover:border-primary/50"><div className="mb-12 flex items-start justify-between"><span className="font-mono text-xs text-primary">0{index + 1}</span><Shield className="h-4 w-4 text-muted-foreground group-hover:text-primary" /></div><p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">{project.sub}</p><h3 className="mt-2 text-xl font-medium leading-tight">{project.title}</h3><p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{project.body}</p><div className="mt-6 flex flex-wrap gap-2">{project.tags.map(tag => <Badge key={tag} variant="outline" className="font-mono text-[10px] font-normal text-muted-foreground">{tag}</Badge>)}</div></article>)}</div></div></section>
        <HomelabPanel activeTab={activeHomelabTab} onTabChange={selectHomelabTab} selectedBuildStep={selectedBuildStep} selectBuildStep={selectBuildStep} buildStepRefs={buildStepRefs} tabRefs={tabRefs} />
        <SkillsPanel />
        <section id="pcbuild" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><SectionLabel>Hardware record</SectionLabel><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">PC Build <Cpu className="ml-2 inline h-7 w-7 text-primary" /></h2><p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">The current build is in progress and designed for gaming, virtual machines, cybersecurity labs, and research.</p></div><div className="overflow-hidden border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">system specification</span><Layers3 className="h-4 w-4 text-primary" /></div><table className="w-full text-left font-mono text-xs"><tbody className="divide-y divide-border">{[{ label: "CPU", value: "AMD Ryzen 7 9800X3D", ready: true }, { label: "GPU", value: "RX 9070 XT", ready: true }, { label: "Motherboard", value: "Gigabyte B850 AORUS ELITE WIFI7", ready: true }, { label: "RAM", value: "32GB DDR5", ready: true }, { label: "Storage", value: "TBD", ready: false }].map(row => <tr key={row.label}><td className="w-36 px-5 py-4 text-muted-foreground">{row.label}</td><td className={`px-5 py-4 text-right ${row.ready ? "text-foreground" : "text-muted-foreground/60 italic"}`}>{row.value}</td><td className="w-8 px-3">{row.ready ? <Check className="h-3 w-3 text-primary" /> : <span className="text-muted-foreground">—</span>}</td></tr>)}</tbody></table></div></div></section>
        <section id="certifications" className="border-y border-border bg-card/35"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><SectionLabel>Credentials</SectionLabel><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Certifications</h2><div className="mt-10 grid max-w-3xl gap-4 md:grid-cols-2"><div className="border-l-2 border-primary border-y border-r border-border bg-card p-6"><div className="flex items-center justify-between gap-3"><Badge className="rounded bg-primary px-3 py-1 font-mono text-sm text-primary-foreground">Sec+</Badge><span className="font-mono text-[10px] text-muted-foreground">Earned 2025</span></div><h3 className="mt-10 text-lg font-medium">CompTIA Security+ (SY0-701)</h3><p className="mt-2 text-sm text-primary">CompTIA</p></div><div className="border border-dashed border-border bg-card/60 p-6"><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Exploring next</p><div className="mt-10 space-y-4">{[["CySA+", "CompTIA Cybersecurity Analyst+"], ["CEH", "Certified Ethical Hacker"]].map(([abbr, name]) => <div key={abbr} className="flex items-center gap-3"><Badge variant="outline" className="font-mono text-[10px]">{abbr}</Badge><span className="text-sm text-muted-foreground">{name}</span></div>)}</div></div></div></div></section>
        <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><div className="border border-primary/30 bg-primary/[.04] p-6 sm:p-8"><SectionLabel>Contact / handoff</SectionLabel><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Want to inspect the work?</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">The best conversations are about the decisions behind the system. Reach out for the full project context, write-ups, or a walkthrough of the lab.</p></div><a href="https://www.linkedin.com/in/torianna" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded bg-primary px-5 font-mono text-xs uppercase tracking-wider text-primary-foreground hover:bg-primary/90">Connect on LinkedIn <ArrowRight className="h-4 w-4" /></a></div></div></section>
      </main>
      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-7 sm:px-8"><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">© {new Date().getFullYear()} Torianna / Chicago, IL</p><div className="flex items-center gap-3"><a href="https://www.linkedin.com/in/torianna" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-4 w-4" /></a><a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground"><Github className="h-4 w-4" /></a></div></div></footer>
    </div>
  </div>;
}