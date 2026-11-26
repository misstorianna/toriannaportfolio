import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { buildLog, stack, workExperience } from "@/data/portfolio";
import heroImage from "@/assets/hero-street.jpg";
import homelabImage from "@/assets/images/homelab.png";
import cyberImage from "@/assets/images/cyber.png";
import { Eyebrow, LINKEDIN_URL, PageTitle, ProjectLink, SiteShell, SocialAction } from "@/components/portfolio/site";

const projectData = [
  { href: "/projects/homelab-website", title: "Self-Hosted Portfolio", category: "Infrastructure", status: "Complete", image: homelabImage, text: "nginx on Ubuntu, Cloudflare Tunnel with no open ports, and a GitHub cron auto-deploy every five minutes.", tools: ["nginx", "Ubuntu", "Cloudflare Tunnel", "GitHub", "cron"] },
  { href: "/projects/detection-system", title: "Detection Stack & Dashboard", category: "Detection engineering", status: "Complete", image: cyberImage, text: "Suricata, CrowdSec, Promtail, Loki, and Grafana with a custom dashboard for network and host signals.", tools: ["Suricata", "CrowdSec", "Promtail", "Loki", "Grafana"] },
  { href: "/projects/incident-env-scan", title: "Incident: .env Scan", category: "Incident response", status: "Complete", image: cyberImage, text: "A forced-browsing scan returned 404s; nginx protections and trusted Cloudflare client-IP restoration followed.", tools: ["nginx", "Cloudflare", "CrowdSec", "MITRE ATT&CK"] },
  { href: "/projects/verified-enforcement", title: "Verified Enforcement", category: "Detection & response", status: "Complete", image: cyberImage, text: "CrowdSec ban decisions enforced at the Cloudflare edge through a Worker bouncer, then verified.", tools: ["CrowdSec", "Cloudflare Workers", "Edge enforcement"] },
  { href: "/projects/proxmox-lab", title: "Proxmox Virtualization Lab", category: "Virtualization", status: "In Progress", image: homelabImage, text: "A dedicated i7-10700K / 16GB server, ready for the next Active Directory and Splunk lab work.", tools: ["Proxmox", "i7-10700K", "VT-x / VT-d", "16GB RAM"] },
];

export function HomePage() {
  useEffect(() => { document.title = "Torianna | Cybersecurity Portfolio"; }, []);
  return <SiteShell>
    <section className="home-hero">
      <div>
        <Eyebrow>Cybersecurity · Chicago, IL</Eyebrow>
        <h1 className="display">Torianna</h1>
        <p className="summary">Cybersecurity graduate and Security+ holder building and defending a self-hosted homelab</p>
        <div className="hero-actions">
          <ProjectLink href="/projects">View Projects</ProjectLink>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="button-secondary">LinkedIn <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <div className="hero-art"><img src={heroImage} alt="A quiet city street at dusk" /><span className="hero-caption">Curiosity, made practical</span></div>
    </section>
    <section className="section"><div className="container">
      <div className="section-heading"><div><Eyebrow>Selected work</Eyebrow><h2 className="display">Built to understand.</h2></div><p>Technical work told through the decisions, systems, and lessons behind it—not just a list of tools.</p></div>
      <div className="feature-grid">{[projectData[0], projectData[1], projectData[2]].map((project, index) => <Link key={project.href} href={project.href} className="feature-card">
        <img src={project.image} alt={`${project.title} project`} /><div className="feature-card-body"><Eyebrow>{project.category} · {project.status} · 0{index + 1}</Eyebrow><h3>{project.title}</h3><p>{project.text}</p><span className="card-link">Explore case study <ArrowRight size={16} /></span></div>
      </Link>)}</div>
      <div className="mt-8"><ProjectLink href="/projects">View all projects</ProjectLink></div>
    </div></section>
    <section className="section"><div className="container split-note"><div><Eyebrow>How I work</Eyebrow><h2 className="display">Follow the evidence. Explain the choice.</h2></div>
      <div><p>I am a cybersecurity graduate from Bradley University and a CompTIA Security+ holder based in Chicago. I started my homelab because I wanted more than just textbook knowledge. While my coursework and certifications laid a strong foundation, I wanted hands-on experience defending systems and understanding how attacks actually work.</p>
        <p>Having my own environment lets me set up defenses, test them, and see exactly what gets caught and what slips through. Learning from those gaps and seeing things from an attacker's perspective is the best way to learn how to stop them.</p>
        <ProjectLink href="/experience">See experience</ProjectLink>
      </div></div></section>
    <div className="container pb-10 text-sm text-muted-foreground"><span className="font-mono text-xs uppercase tracking-wider">Last updated · November 2026</span></div>
  </SiteShell>;
}

export function ProjectsPage() {
  useEffect(() => { document.title = "Projects | Torianna"; }, []);
  return <SiteShell><PageTitle label="Selected work / 01" title="Projects">Case studies grounded in documented work. Where the source does not provide a detail, it stays open rather than guessed.</PageTitle>
    <section className="section"><div className="container project-list"><div className="project-grid">{projectData.map(project => <Link className="project-card" key={project.href} href={project.href}>
      <img src={project.image} alt={`${project.title} project`} />
      <div className="project-copy">
        <div className="project-meta"><Eyebrow>{project.category}</Eyebrow><span className="status-badge" data-status={project.status}>{project.status}</span></div>
        <h2>{project.title}</h2><p>{project.text}</p>
        <div className="tag-list">{project.tools.map(tool => <span className="tag" key={tool}>{tool}</span>)}</div>
        <span className="project-card-link">Read case study <ArrowRight size={16} /></span>
      </div>
    </Link>)}</div></div></section>
  </SiteShell>;
}

function ExperienceAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return <div className="accordion-list">{workExperience.map((job, index) => {
    const open = openIndex === index;
    return <article className="job" key={`${job.company}-${job.role}`}>
      <h2 className="sr-only">{job.role}</h2>
      <button className="job-trigger" type="button" id={`job-button-${index}`} aria-expanded={open} aria-controls={`job-panel-${index}`} onClick={() => setOpenIndex(open ? null : index)}>
        <span><Eyebrow>{job.company}</Eyebrow><strong>{job.role}</strong><p>{job.dates} · {job.location}</p></span><ChevronDown size={20} aria-hidden="true" />
      </button>
      <div hidden={!open} className="job-content" id={`job-panel-${index}`} role="region" aria-labelledby={`job-button-${index}`}>
        {job.responsibilities.length > 0 && <ul>{job.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>}
        {job.highlights?.map(highlight => <section key={highlight.title} className="border-t border-border py-5">
          <Eyebrow>{highlight.area}</Eyebrow><h3 className="text-xl font-semibold">{highlight.title}</h3>
          <ul>{highlight.points.map(point => <li key={point}>{point}</li>)}</ul>
          <div className="tag-list">{highlight.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        </section>)}
      </div>
    </article>;
  })}</div>;
}

export function ExperiencePage() {
  useEffect(() => { document.title = "Experience | Torianna"; }, []);
  return <SiteShell><PageTitle label="Work history / 02" title="Experience">Technical support, identity, detection, security awareness, and audit work. Newest first.</PageTitle>
    <section className="section"><div className="container"><ExperienceAccordion /></div></section>
  </SiteShell>;
}

export function CredentialsPage() {
  useEffect(() => { document.title = "Credentials | Torianna"; }, []);
  return <SiteShell><PageTitle label="Education & certification / 03" title="Credentials">A foundation in cybersecurity, backed by hands-on practice and continued study.</PageTitle>
    <section className="section"><div className="container credential-grid">
      <article className="credential"><Eyebrow>Degree</Eyebrow><h2>B.S. Cybersecurity</h2><p>Bradley University</p></article>
      <article className="credential"><Eyebrow>Earned 2025</Eyebrow><h2>CompTIA Security+ (SY0-701)</h2><p>CompTIA</p></article>
      <article className="credential"><Eyebrow>Exploring next</Eyebrow><h2>Continued learning</h2><p>CySA+ — CompTIA Cybersecurity Analyst+</p><p>CEH — Certified Ethical Hacker</p></article>
    </div></section>
  </SiteShell>;
}

export function ContactPage() {
  useEffect(() => { document.title = "Contact | Torianna"; }, []);
  return <SiteShell><PageTitle label="Start a conversation / 04" title="Contact">The best conversations are about the decisions behind the system. Reach out for project context, write-ups, or a walkthrough of the lab.</PageTitle>
    <section className="section"><div className="container">
      <div className="contact-grid"><SocialAction label="LinkedIn" href={LINKEDIN_URL} /></div>
    </div></section>
  </SiteShell>;
}

type CaseStudy = {
  title: string;
  category: string;
  status: "Complete" | "In Progress";
  image: string;
  summary: string;
  overview: string;
  problem: string;
  built: string;
  broke: string;
  result: string;
  tools: string[];
  screenshot: string;
};

const caseStudyContent: Record<string, CaseStudy> = {
  "homelab-website": {
    title: "Self-Hosted Portfolio", category: "Infrastructure", status: "Complete", image: homelabImage, screenshot: "Portfolio deployment",
    summary: "nginx on Ubuntu, published through a Cloudflare Tunnel with no open ports and automated GitHub deployments.",
    overview: "A public portfolio hosted on a self-managed Ubuntu server and served through nginx.",
    problem: "The existing project notes describe the hosting and deployment setup but do not record a separate initial problem statement.",
    built: "Published through a Cloudflare Tunnel with no open ports. A cron job checks GitHub every five minutes, then pulls changes, rebuilds the site, clears old build files, and redeploys through nginx.",
    broke: "A cp command placed new files inside a nested directory rather than replacing the live files. Comparing deployed files with the build output exposed the trailing-slash mismatch. Passwordless sudo rules also had to match the deploy script’s exact commands, so the copy step was rewritten without relying on a wildcard path.",
    result: "The portfolio deploys automatically from GitHub on the next five-minute check and is served through nginx without opening inbound ports.",
    tools: ["nginx", "Ubuntu", "Cloudflare Tunnel", "GitHub", "cron", "DNS"],
  },
  "detection-system": {
    title: "Detection Stack & Dashboard", category: "Detection engineering", status: "Complete", image: cyberImage, screenshot: "Detection dashboard",
    summary: "A Suricata, CrowdSec, Promtail, Loki, and Grafana stack with a custom security dashboard.",
    overview: "A self-hosted network detection and observability stack, now documented as complete.",
    problem: "The existing project notes do not specify a separate initial problem statement for the detection stack.",
    built: `${stack.map(item => `${item.name}: ${item.detail}`).join(" ")} The custom Grafana dashboard shows web traffic by status, sensitive-file probes, top IPs, paths and user agents, Suricata alerts by severity, CrowdSec bans, SSH logins, and log health.`,
    broke: "No separate break/fix is recorded for the dashboard itself. The CrowdSec Worker bouncer issue and its resolution are documented in the Verified Enforcement case study.",
    result: "The completed dashboard brings web, network-detection, ban, SSH, and log-health signals into one view.",
    tools: ["Suricata", "CrowdSec", "Promtail", "Loki", "Grafana", "Ubuntu"],
  },
  "incident-env-scan": {
    title: "Incident: .env Scan", category: "Incident response", status: "Complete", image: cyberImage, screenshot: "Nginx and request handling",
    summary: "A bot probed dozens of paths for exposed .env files; every request returned 404.",
    overview: "A forced-browsing scan targeted hidden .env files across dozens of paths (MITRE ATT&CK T1595.003).",
    problem: "The scan required validating that hidden files stayed inaccessible and that CrowdSec could attribute requests to their real visitor IPs behind Cloudflare.",
    built: "Hardened nginx to block hidden files. Restored visitor IPs from Cloudflare’s CF-Connecting-IP header, trusted only from localhost, so CrowdSec could attribute the attacker.",
    broke: "The proxy-observed address did not identify the real visitor behind Cloudflare. The real visitor IP was restored using CF-Connecting-IP only when forwarded by localhost.",
    result: "All scan requests returned 404, and CrowdSec could attribute the attacker using the restored client IP.",
    tools: ["nginx", "Cloudflare Tunnel", "CF-Connecting-IP", "CrowdSec", "MITRE ATT&CK T1595.003"],
  },
  "verified-enforcement": {
    title: "Verified Enforcement", category: "Detection & response", status: "Complete", image: cyberImage, screenshot: "Cloudflare edge enforcement",
    summary: "A Cloudflare Worker bouncer enforces CrowdSec ban decisions at the network edge.",
    overview: "Connected CrowdSec ban decisions to enforcement at Cloudflare’s edge through a Worker bouncer.",
    problem: "The Worker bouncer received ban decisions but did not write them to Cloudflare.",
    built: "Fixed the Worker bouncer so CrowdSec decisions are written to Cloudflare for edge enforcement.",
    broke: "The bouncer accepted ban decisions but did not send them to Cloudflare. The integration was fixed so decisions are now written to the edge.",
    result: "Verified end to end by banning my own phone’s IP and confirming it received “Access Denied.”",
    tools: ["CrowdSec", "Cloudflare Workers", "Edge enforcement"],
  },
  "proxmox-lab": {
    title: "Proxmox Virtualization Lab", category: "Virtualization", status: "In Progress", image: homelabImage, screenshot: "Proxmox host",
    summary: "A dedicated i7-10700K / 16GB server prepared for virtualization and future security lab work.",
    overview: "A Proxmox virtualization host being set up for the next phase of the homelab.",
    problem: "The current project notes describe the server baseline and planned lab, but do not specify a separate problem statement.",
    built: "Prepared a dedicated i7-10700K server with 16GB of memory, enabled VT-x and VT-d, set a static IP, and configured web-console management.",
    broke: "No specific break/fix has been recorded for this in-progress setup.",
    result: "The Proxmox host is ready for the next phase: an Active Directory domain, Splunk SIEM, and attacker and target virtual machines.",
    tools: ["Proxmox", "Intel i7-10700K", "16GB RAM", "VT-x / VT-d", "Static IP"],
  },
};

function HomelabMilestones() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const step = buildLog[selected];
  const selectStep = (index: number, moveFocus = false) => {
    const next = Math.max(0, Math.min(index, buildLog.length - 1));
    setSelected(next);
    if (moveFocus) tabRefs.current[next]?.focus();
  };
  return <section className="section"><div className="container">
    <div className="section-heading"><div><Eyebrow>Build log</Eyebrow><h2 className="display">The work, step by step.</h2></div><p>Original homelab milestones, from Linux foundations to a working detection and visibility stack.</p></div>
    <div className="milestone-stepper">
      <div role="tablist" aria-label="Homelab build milestones" className="milestone-tabs">
        {buildLog.map((item, index) => <button key={item.number} ref={element => { tabRefs.current[index] = element; }} type="button" role="tab" id={`milestone-tab-${item.number}`} aria-controls="milestone-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => selectStep(index)}
          onKeyDown={event => {
            if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); selectStep((index + 1) % buildLog.length, true); }
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); selectStep((index - 1 + buildLog.length) % buildLog.length, true); }
            if (event.key === "Home") { event.preventDefault(); selectStep(0, true); }
            if (event.key === "End") { event.preventDefault(); selectStep(buildLog.length - 1, true); }
          }}>
          <span>{item.number}</span><strong>{item.title}</strong>
        </button>)}
      </div>
      <div className="milestone-controls"><span>Milestone {String(selected + 1).padStart(2, "0")} / {String(buildLog.length).padStart(2, "0")}</span><div>
        <button type="button" onClick={() => selectStep(selected - 1)} disabled={selected === 0} aria-label="Previous milestone"><ChevronLeft size={17} /> Previous</button>
        <button type="button" onClick={() => selectStep(selected + 1)} disabled={selected === buildLog.length - 1} aria-label="Next milestone">Next <ChevronRight size={17} /></button>
      </div></div>
      <article id="milestone-panel" role="tabpanel" aria-labelledby={`milestone-tab-${step.number}`} className="milestone-panel">
        <Eyebrow>Milestone {step.number} · {step.status}</Eyebrow><h3>{step.title}</h3><p>{step.summary}</p><p>{step.detail}</p><div className="tag-list">{step.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
      </article>
    </div>
  </div></section>;
}

export function CaseStudyPage({ slug }: { slug?: string }) {
  const key = slug === "website" ? "homelab-website" : slug === "detection" ? "detection-system" : slug;
  const study = key ? caseStudyContent[key] : undefined;
  useEffect(() => { document.title = `${study?.title ?? "Project"} | Torianna`; window.scrollTo(0, 0); }, [study?.title]);
  if (!study) return <SiteShell><PageTitle label="Project" title="Case study unavailable">This project page could not be found.</PageTitle><div className="container py-12"><ProjectLink href="/projects">Back to Projects</ProjectLink></div></SiteShell>;
  return <SiteShell>
    <div className="container detail-header"><div className="detail-meta"><Eyebrow>{study.category}</Eyebrow><span className="status-badge" data-status={study.status}>{study.status}</span></div><h1 className="display">{study.title}</h1><p>{study.summary}</p><Link className="button-secondary" href="/projects"><ArrowLeft size={16} /> All projects</Link>
    </div>
    <div className="container case-study-sections">
      <CaseSection title="Overview" text={study.overview} />
      <CaseSection title="The Problem" text={study.problem} />
      <CaseSection title="What I Built" text={study.built} />
      {key === "detection-system" && <HomelabMilestones />}
      <CaseSection title="What Broke & How I Fixed It" text={study.broke} />
      <CaseSection title="Result" text={study.result} />
      <section className="case-part"><Eyebrow>Project details</Eyebrow><h2>Tools Used</h2><div className="tag-list">{study.tools.map(tool => <span key={tool} className="tag">{tool}</span>)}</div></section>
      <section className="screenshot-section"><Eyebrow>Project media</Eyebrow><h2>Screenshots</h2><div className="screenshot-placeholder" role="img" aria-label={`Screenshot placeholder for ${study.title}`}><span>Screenshot placeholder</span><strong>{study.screenshot}</strong><small>Image can be added when ready</small></div></section>
      {key === "detection-system" && <p className="case-note">Dashboard scope: activity observed in this self-hosted homelab.</p>}
    </div>
  </SiteShell>;
}

function CaseSection({ title, text }: { title: string; text: string }) {
  return <section className="case-part"><Eyebrow>Case study</Eyebrow><h2>{title}</h2><p>{text}</p></section>;
}
