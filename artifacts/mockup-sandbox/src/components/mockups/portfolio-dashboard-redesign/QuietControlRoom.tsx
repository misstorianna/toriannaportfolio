import { useEffect, useState } from "react";
import {
  Activity, ArrowUpRight, ChevronDown, ChevronRight, Circle, Cloud, ExternalLink,
  Github, Globe2, Menu, Network, Radio, Server, Shield, Terminal, UserRound, X,
} from "lucide-react";
import "./QuietControlRoom.css";

type Section = "dashboard" | "projects" | "experience" | "homelab" | "skills" | "contact";
type Tab = "overview" | "website" | "detection";

const projects = [
  ["homelab-detection", "Homelab Detection Lab", "Homelab", "Active", "Self-hosted detection stack on a repurposed Surface laptop running Ubuntu 26.04 LTS.", "CrowdSec handles log-based attack detection, Suricata provides network IDS coverage, and Loki + Grafana provide log storage and dashboards. The public surface is hosted via nginx + Cloudflare Tunnel.", ["Ubuntu", "CrowdSec", "Suricata", "Loki", "Promtail", "Grafana", "nginx", "Cloudflare Tunnel"]],
  ["sigma-rules", "Custom Sigma Detection Rules", "Research", "Ongoing", "Writing and publishing custom Sigma rules for the homelab detection lab.", "The work also includes investigation and phishing analysis writeups, keeping detection logic connected to the reasoning behind a finding rather than treating a rule as a black box.", ["Sigma", "GitHub"]],
  ["pc-builds", "Custom PC Builds", "Hardware", "Complete", "Built and troubleshot systems for gaming, virtual machines, cybersecurity labs, and research.", "Built a high-end desktop with a Ryzen 7 9800X3D and RX 9070 XT, a second build on a Gigabyte B850 AORUS Elite board where a PSU and motherboard failure was diagnosed and resolved, and rebuilt an older Alienware machine with a clean Windows 11 install.", ["Hardware diagnostics", "PC assembly", "Troubleshooting", "Ryzen 7 9800X3D", "RX 9070 XT"]],
  ["education", "Education & Certifications", "Research", "Complete", "Cybersecurity degree from Bradley University and CompTIA Security+ certification.", "Credentials: B.S. Cybersecurity, CompTIA Security+ (SY0-701), earned 2025.", ["Bradley University", "B.S. Cybersecurity", "CompTIA Security+"]],
] as const;

const experience = [
  ["Phishing Awareness Campaigns", "Security Awareness", "Orchestrated phishing simulations via KnowBe4 for 3,000+ employees. Designed realistic email templates, analyzed click rates, and delivered targeted retraining to flagged employees.", "KnowBe4 · HTML/CSS · Reporting"],
  ["Detection & Alerting Logic", "SIEM Engineering", "Built custom LEQL detection rules in Rapid7 InsightIDR to flag unauthorized password storage, excessive MFA failures, and repeated VPN login attempts.", "Rapid7 InsightIDR · LEQL · MFA Monitoring"],
  ["SSO & Identity Work", "Identity & Access", "Configured and deployed SSO for core business apps via Microsoft Entra ID using SAML and IdP-initiated flows. Documented rollout steps and resolved access issues.", "Entra ID · SAML · SSO"],
] as const;

const work = [
  ["Geek Squad, Best Buy", "Senior Repair Technician", "Aug 2026 – Present", "North Riverside, IL", "Diagnose and troubleshoot hardware and software issues across PCs, laptops, and consumer technology, determining root cause and the appropriate repair path."],
  ["Geek Squad, Best Buy", "Advanced Repair Agent", "September – Present", "Burbank, IL", "Diagnosed and resolved hardware and software issues on customer devices using MRI diagnostic tools, including malware removal, disk repair, and OS restoration."],
  ["Great Wolf Lodge — Corporate Team", "IT Corporate Support / Cybersecurity Intern", "Jun 2025 – Aug 2025", "Remote", "Configured and deployed IdP-initiated SSO for business applications using Microsoft Entra ID, SAML, and application role mapping."],
  ["Bradley Cybersecurity Clinic", "Cybersecurity Analyst", "Aug 2025 – Present", "Bradley University", "Contribute to the creation of the Bradley Cybersecurity Clinic, focused on developing and applying cybersecurity audit processes for small-business assessments."],
] as const;

const builds = [
  ["01", "Build the Linux foundation", "Foundation", "Started with Raspberry Pi OS, terminal work, file management, and SSH access from the local network."],
  ["02", "Understand the home network", "Foundation", "Worked through router and switch concepts, LAN connectivity, IP addressing, and local troubleshooting."],
  ["03", "Move the stack to Ubuntu", "Configured", "Set up a dedicated Ubuntu machine as the home for the portfolio and security monitoring work."],
  ["04", "Add network detection with Suricata", "Working", "Added Suricata as the intrusion detection layer for observing network activity and generating events."],
  ["05", "Add threat intelligence with CrowdSec", "Working", "Added CrowdSec to provide threat intelligence and identify behavior that should eventually drive a response."],
  ["06", "Centralize logs and build views", "In progress", "Connected the monitoring story to Loki, Promtail, and Grafana for centralized logs and visualization."],
] as const;

const nav: Array<[Section, string]> = [["dashboard", "Dashboard"], ["projects", "Projects"], ["experience", "Work experience"], ["homelab", "Homelab"], ["skills", "Skills"], ["contact", "Contact"]];
const routeNodes: Array<{ label: string; sub: string; icon: typeof Globe2 }> = [
  { label: "Internet", sub: "public edge", icon: Globe2 },
  { label: "Cloudflare Tunnel", sub: "narrow public surface", icon: Cloud },
  { label: "nginx", sub: "reverse proxy", icon: Radio },
  { label: "Ubuntu host", sub: "dedicated machine", icon: Server },
  { label: "torianna.tech", sub: "portfolio endpoint", icon: Globe2 },
];

function QuietControlRoom() {
  const [active, setActive] = useState<Section>("dashboard");
  const [drawer, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("homelab-detection");
  const [tab, setTab] = useState<Tab>("overview");
  const [build, setBuild] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = nav.find(([id]) => {
        const node = document.getElementById(id);
        return node && node.getBoundingClientRect().top <= 145 && node.getBoundingClientRect().bottom >= 145;
      });
      if (current) setActive(current[0]);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: Section) => {
    setDrawer(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="qcr">
      <aside className={`qcr-sidebar ${drawer ? "is-open" : ""}`}>
        <div className="qcr-brand"><button onClick={() => go("dashboard")} aria-label="Go to dashboard" data-testid="button-brand"><span className="qcr-mark">T</span><span><b>TORIANNA</b><small>security portfolio</small></span></button><button className="qcr-close" onClick={() => setDrawer(false)} aria-label="Close navigation" data-testid="button-close-navigation"><X size={17} /></button></div>
        <div className="qcr-side-label">Workspace</div>
        <nav aria-label="Portfolio navigation">{nav.map(([id, label]) => <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)} aria-current={active === id ? "page" : undefined} data-testid={`nav-${id}`}><span className="qcr-nav-index">{String(nav.findIndex(x => x[0] === id) + 1).padStart(2, "0")}</span>{label}{active === id && <Circle size={7} fill="currentColor" />}</button>)}</nav>
        <div className="qcr-sidebar-note"><span className="qcr-lamp" /> <div><b>Portfolio mode</b><p>Stylized infrastructure record. No live attack telemetry.</p></div></div>
      </aside>
      {drawer && <button className="qcr-scrim" onClick={() => setDrawer(false)} aria-label="Close navigation overlay" data-testid="button-navigation-overlay" />}
      <main className="qcr-main">
        <header className="qcr-topbar"><button className="qcr-menu" onClick={() => setDrawer(true)} aria-label="Open navigation" data-testid="button-open-navigation"><Menu size={19} /></button><span className="qcr-breadcrumb"><i>workspace</i> / {nav.find(x => x[0] === active)?.[1].toLowerCase()}</span><span className="qcr-mode"><span className="qcr-lamp" /> portfolio mode</span><a href="https://www.linkedin.com/in/torianna" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="link-linkedin"><ArrowUpRight size={17} /></a></header>
        <section id="dashboard" className="qcr-hero"><div className="qcr-eyebrow"><span><span className="qcr-lamp" /> system / maintained record</span><span>Chicago, IL · last reviewed by Torianna</span></div><div className="qcr-hero-grid"><div><p className="qcr-kicker">Security operations / portfolio dashboard</p><h1>Homelab<br /><em>Dashboard</em></h1><p className="qcr-intro">I'm Torianna, a cybersecurity graduate who learns best through hands-on work. This site brings together my work experience, past and current projects, and everything I'm currently building in my homelab. Thanks for visiting!</p><div className="qcr-actions"><button className="qcr-primary" onClick={() => go("projects")} data-testid="button-inspect-projects">Inspect projects <ChevronRight size={16} /></button><button className="qcr-quiet" onClick={() => go("homelab")} data-testid="button-open-homelab">Open homelab</button></div></div><div className="qcr-profile"><div className="qcr-profile-head"><span>/ operator profile</span><Terminal size={16} /></div><dl><dt>focus</dt><dd>defensive security</dd><dt>detection</dt><dd className="green"><span className="qcr-lamp" /> lab active</dd><dt>response loop</dt><dd>in progress</dd><dt>host</dt><dd>Ubuntu / dedicated</dd></dl><p className="qcr-note"><b>note</b> no live attack telemetry</p></div></div><div className="qcr-metrics"><div><b>03</b><span>projects complete</span></div><div><b>01</b><span>certification earned</span></div><div><b>04</b><span>work records</span></div><div><b>06</b><span>lab milestones</span></div></div></section>
        <section className="qcr-overview"><div className="qcr-section-head"><div><p className="qcr-kicker">At a glance</p><h2>What is being maintained</h2></div><span className="qcr-stamp">record  /  2025—present</span></div><div className="qcr-overview-grid"><div className="qcr-map"><div className="qcr-card-title"><span>Infrastructure map</span><span className="qcr-status">documented topology</span></div><p>A truthful view of how this site and the home detection stack fit together. Lines describe infrastructure relationships, not live traffic.</p><div className="qcr-route">{routeNodes.map((node, i) => { const Icon = node.icon; return <div className="qcr-node-wrap" key={node.label}><div className="qcr-node"><Icon size={16} /><b>{node.label}</b><small>{node.sub}</small></div>{i < 4 && <ChevronRight className="qcr-arrow" size={17} />}</div>; })}</div><div className="qcr-subsystems"><span><Shield size={15} /> CrowdSec <small>threat intel</small></span><span><Network size={15} /> Suricata <small>network IDS</small></span><span><Activity size={15} /> Loki + Grafana <small>logs + views</small></span></div></div><div className="qcr-activity"><div className="qcr-card-title"><span>Recent activity</span><Activity size={16} /></div>{["Deployed CrowdSec on Ubuntu host", "Published custom Sigma rule to GitHub", "Completed CompTIA Security+", "Connected Loki / Promtail / Grafana"].map((item, i) => <div className="qcr-activity-row" key={item}><span className="qcr-activity-num">0{i + 1}</span><div><b>{item}</b><small>{["Homelab Detection Lab", "Detection research", "SY0-701 · earned 2025", "Visibility layer"][i]}</small></div><span className="qcr-status">{["documented", "ongoing", "complete", "working"][i]}</span></div>)}<small className="qcr-disclaimer">Portfolio updates, not live SOC events</small></div></div></section>
        <section id="projects" className="qcr-section"><div className="qcr-section-head"><div><p className="qcr-kicker">01 / Findings index</p><h2>Projects</h2><p>A dashboard-style index of work shipped, still active, and documented as the system grows.</p></div><span className="qcr-stamp">04 records / 03 complete</span></div><div className="qcr-projects">{projects.map((p, i) => <article className={`qcr-project ${expanded === p[0] ? "open" : ""}`} key={p[0]}><button onClick={() => setExpanded(expanded === p[0] ? null : p[0])} aria-expanded={expanded === p[0]} data-testid={`button-project-${p[0]}`}><span className="qcr-project-no">0{i + 1}</span><span><small>{p[2]} · <i>{p[3]}</i></small><b>{p[1]}</b><em>{p[4]}</em></span><ChevronDown size={17} /></button>{expanded === p[0] && <div className="qcr-project-detail"><p>{p[5]}</p><div>{p[6].map(tag => <span key={tag}>{tag}</span>)}</div><small><ExternalLink size={12} /> External write-up / repository link not published here</small></div>}</article>)}</div></section>
        <section id="experience" className="qcr-section qcr-tint"><div className="qcr-section-head"><div><p className="qcr-kicker">02 / Applied security work</p><h2>Experience in practice</h2><p>Work that connects technical decisions to people, systems, and useful reporting.</p></div></div><div className="qcr-work-grid"><div className="qcr-applied">{experience.map(x => <article key={x[0]}><span className="qcr-marker" /><small>{x[1]}</small><h3>{x[0]}</h3><p>{x[2]}</p><label>{x[3]}</label></article>)}</div><div className="qcr-career"><div className="qcr-card-title"><span>Work experience</span><UserRound size={16} /></div>{work.map(x => <article key={x[0] + x[1]}><small>{x[2]} · {x[3]}</small><b>{x[1]}</b><span>{x[0]}</span><p>{x[4]}</p></article>)}</div></div></section>
        <section id="homelab" className="qcr-section"><div className="qcr-section-head"><div><p className="qcr-kicker">03 / Infrastructure</p><h2>Homelab control room</h2><p>Explore the website infrastructure separately from the security detection system running on the same Ubuntu host.</p></div><span className="qcr-status"><span className="qcr-lamp" /> documented / in progress</span></div><div className="qcr-tabs" role="tablist" aria-label="Homelab projects">{(["overview", "website", "detection"] as Tab[]).map(x => <button key={x} onClick={() => setTab(x)} className={tab === x ? "active" : ""} role="tab" aria-selected={tab === x} data-testid={`tab-${x}`}>{x === "website" ? "This website" : x === "detection" ? "Detection system" : "Overview"}</button>)}</div><div className="qcr-lab-grid"><div className="qcr-build"><div className="qcr-card-title"><span>Build timeline</span><span>{builds[build][0]} / 06</span></div>{builds.map((x, i) => <button key={x[0]} onClick={() => setBuild(i)} className={build === i ? "selected" : ""} data-testid={`button-build-${i}`}><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small></button>)}<div className="qcr-build-detail"><small>selected milestone</small><h3>{builds[build][1]}</h3><p>{builds[build][3]}</p></div></div><div className="qcr-stack"><div className="qcr-card-title"><span>{tab === "website" ? "This website" : tab === "detection" ? "Detection system" : "Stack inventory"}</span><Server size={16} /></div>{[["Ubuntu", "Dedicated host", "A repurposed Surface laptop running Ubuntu hosts the portfolio and monitoring stack."], ["Suricata", "Network detection", "An intrusion detection layer that watches network traffic and produces security events."], ["CrowdSec", "Threat intelligence", "Adds community-powered threat intelligence and a path toward automated blocking."], ["Loki / Grafana", "Logs and views", "Centralizes logs and turns detection activity into views that are easier to inspect."]].map(x => <div className="qcr-stack-row" key={x[0]}><span className="qcr-stack-icon"><Server size={15} /></span><div><b>{x[0]}</b><small>{x[1]}</small><p>{x[2]}</p></div></div>)}</div></div></section>
        <section id="skills" className="qcr-section qcr-tint"><div className="qcr-section-head"><div><p className="qcr-kicker">04 / Capability index</p><h2>Skills</h2><p>These indicators describe where the work comes from, not a compliance score.</p></div></div><div className="qcr-skills">{[["Detection & response", "Applied work + active lab practice", "78%", "Rapid7 InsightIDR · Suricata · CrowdSec · LEQL"], ["Identity & awareness", "Internship experience", "68%", "Microsoft Entra ID · SAML / SSO · KnowBe4 · Active Directory"], ["Network & OSINT", "Working knowledge + lab foundations", "58%", "TCP/IP · Nmap · Wireshark · Shodan · DNS"], ["Web & reporting", "Applied project practice", "64%", "HTML / CSS · Security reporting · Linux"]].map(x => <div key={x[0]}><div><b>{x[0]}</b><small>{x[1]}</small></div><span className="qcr-bar"><i style={{ width: x[2] }} /></span><label>{x[3]}</label></div>)}</div></section>
        <section id="contact" className="qcr-contact"><p className="qcr-kicker">Contact / handoff</p><h2>Want to inspect the work?</h2><p>The best conversations are about the decisions behind the system. Reach out for the full project context, write-ups, or a walkthrough of the lab.</p><a href="https://www.linkedin.com/in/torianna" target="_blank" rel="noreferrer" data-testid="link-connect">Connect on LinkedIn <ArrowUpRight size={16} /></a></section>
        <footer><span>© {new Date().getFullYear()} Torianna / Chicago, IL</span><span><a href="https://github.com/" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={15} /></a><a href="https://www.linkedin.com/in/torianna" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin"><ArrowUpRight size={15} /></a></span></footer>
      </main>
    </div>
  );
}

export default QuietControlRoom;