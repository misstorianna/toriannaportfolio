import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Github, Linkedin, Server, Shield, Cpu, Sun, Moon, Menu, X, Activity, ArrowDown, ArrowRight, BookOpen, CheckCircle2, CircleDot, Eye, ListChecks, Network } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const skills = [
  "Rapid7 InsightIDR", "KnowBe4", "Microsoft Entra ID", "Active Directory",
  "SAML / SSO", "LEQL", "MITRE ATT&CK", "Nmap", "Wireshark", "Shodan",
  "OSINT", "Google Dorking", "Wayback Machine", "WHOIS / DNS",
  "HTML / CSS", "Linux", "TCP/IP", "Networking", "Security Reporting",
];

const navItems = [
  { id: "about",         label: "About"    },
  { id: "cyber",         label: "Projects" },
  { id: "homelab",       label: "Homelab"  },
  { id: "pcbuild",       label: "Build"    },
  { id: "certifications",label: "Certs"   },
];

const detectionStack = [
  {
    name: "Ubuntu",
    role: "Dedicated host",
    detail: "A dedicated Ubuntu machine runs the monitoring stack and hosts this portfolio.",
    icon: Server,
  },
  {
    name: "Suricata",
    role: "Network detection",
    detail: "An intrusion detection layer that watches network traffic and produces security events.",
    icon: Network,
  },
  {
    name: "CrowdSec",
    role: "Threat intelligence",
    detail: "Adds community-powered threat intelligence and a path toward automated blocking.",
    icon: Shield,
  },
  {
    name: "Loki / Grafana",
    role: "Logs and views",
    detail: "Centralizes logs and turns detection activity into views that are easier to inspect.",
    icon: Activity,
  },
];

const buildLog = [
  {
    number: "01",
    title: "Build the Linux foundation",
    status: "Foundation",
    summary: "Started with Raspberry Pi OS, terminal work, file management, and SSH access from the local network.",
    detail: "Those early experiments made the command line and remote administration familiar before moving the monitoring stack onto a more capable dedicated Ubuntu host.",
    tags: ["Raspberry Pi OS", "Linux", "SSH"],
  },
  {
    number: "02",
    title: "Understand the home network",
    status: "Foundation",
    summary: "Worked through router and switch concepts, LAN connectivity, IP addressing, and local troubleshooting.",
    detail: "This networking context is the foundation for understanding what a network sensor can see, where events originate, and how the host fits into the larger environment.",
    tags: ["DNS / DHCP", "TCP/IP", "Networking"],
  },
  {
    number: "03",
    title: "Move the stack to Ubuntu",
    status: "Configured",
    summary: "Set up a dedicated Ubuntu machine as the home for the portfolio and security monitoring work.",
    detail: "Keeping the services on one dedicated host makes the system easier to reason about while the lab is still being built and documented.",
    tags: ["Ubuntu", "Nginx", "Dedicated host"],
  },
  {
    number: "04",
    title: "Add network detection with Suricata",
    status: "Working",
    summary: "Added Suricata as the intrusion detection layer for observing network activity and generating events.",
    detail: "Suricata answers the visibility question: what is happening on the network? Its detections become useful input for the rest of the observability stack.",
    tags: ["Suricata", "Intrusion detection", "Events"],
  },
  {
    number: "05",
    title: "Add threat intelligence with CrowdSec",
    status: "Working",
    summary: "Added CrowdSec to provide threat intelligence and identify behavior that should eventually drive a response.",
    detail: "Detection is working, but the response loop is not complete yet. The next milestone is a CrowdSec bouncer so flagged IPs are actually blocked instead of only logged.",
    tags: ["CrowdSec", "Threat intelligence", "Bouncer next"],
  },
  {
    number: "06",
    title: "Centralize logs and build views",
    status: "In progress",
    summary: "Connected the monitoring story to Loki, Promtail, and Grafana for centralized logs and visualization.",
    detail: "The current dashboard makes the activity inspectable. The next pass is to turn that foundation into more meaningful views and alerting for real security events.",
    tags: ["Loki", "Promtail", "Grafana"],
  },
  {
    number: "07",
    title: "Keep the public surface narrow",
    status: "Configured",
    summary: "Host the portfolio through Nginx with DNS and Cloudflare Tunnel rather than exposing unnecessary services.",
    detail: "The self-hosted portfolio is part of the same learning arc: practice safe access patterns while keeping the detection work on the dedicated Ubuntu machine.",
    tags: ["Nginx", "DNS", "Cloudflare Tunnel"],
  },
];

const foundations = [
  {
    title: "Raspberry Pi Setup",
    body: "This project builds hands-on Linux fundamentals through Raspberry Pi OS, terminal commands, file management, and SSH access from the local network.",
    tags: ["Raspberry Pi OS", "SSH", "CLI"],
  },
  {
    title: "Home Networking",
    body: "This project builds foundational networking knowledge through router and switch concepts, LAN connectivity, IP addressing, and troubleshooting local network issues.",
    tags: ["DNS / DHCP", "TCP/IP", "VLAN Concepts"],
  },
  {
    title: "Self-Hosted Portfolio",
    body: "This portfolio is hosted through Nginx on a dedicated Ubuntu server, with DNS and Cloudflare Tunnel providing safer public access and no unnecessary services exposed.",
    tags: ["Nginx", "Ubuntu", "Cloudflare Tunnel", "DNS"],
  },
];

function FairyLights() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Light = {
      x: number; y: number;
      baseSize: number;
      baseOpacity: number;
      speed: number;
      phase: number;
      driftX: number;
      driftY: number;
      originX: number;
      originY: number;
      hue: number;
    };

    const COUNT = 75;
    const lights: Light[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      originX: 0,
      originY: 0,
      baseSize:    0.8 + Math.random() * 1.8,
      baseOpacity: 0.25 + Math.random() * 0.65,
      speed:       0.4  + Math.random() * 1.2,
      phase:       Math.random() * Math.PI * 2,
      driftX:      (Math.random() - 0.5) * 0.18,
      driftY:      -0.06 - Math.random() * 0.12,
      hue:         36 + (Math.random() - 0.5) * 16,
    }));
    lights.forEach(l => { l.originX = l.x; l.originY = l.y; });

    let raf: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      for (const l of lights) {
        // Slow drift, wrap at edges
        l.x += l.driftX;
        l.y += l.driftY;
        if (l.y < -10) { l.y = canvas.height + 10; l.x = Math.random() * canvas.width; }
        if (l.x < -10) l.x = canvas.width + 10;
        if (l.x > canvas.width + 10) l.x = -10;

        const pulse = 0.55 + 0.45 * Math.sin(t * l.speed + l.phase);
        const opacity = l.baseOpacity * pulse;
        const size    = l.baseSize * (0.85 + 0.3 * pulse);
        const glow    = 6 + 10 * pulse;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.shadowBlur   = glow;
        ctx.shadowColor  = `hsl(${l.hue} 85% 65%)`;
        ctx.fillStyle    = `hsl(${l.hue} 90% 72%)`;
        ctx.beginPath();
        ctx.arc(l.x, l.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Second tiny core highlight
        ctx.globalAlpha = opacity * 0.7;
        ctx.shadowBlur  = 2;
        ctx.fillStyle   = "hsl(48 100% 92%)";
        ctx.beginPath();
        ctx.arc(l.x, l.y, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{children}</p>
  );
}

function Divider() {
  return (
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="h-px bg-border" />
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const ids = ["hero", ...navItems.map(n => n.id)];
    const handleScroll = () => {
      const current = ids.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-5xl">
          <button
            type="button"
            className="rounded-md font-semibold text-base text-foreground tracking-tight transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => scrollTo("hero")}
          >
            Torianna
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-md px-3.5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  activeSection === item.id
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-5 bg-border mx-3" />
            <a
              href="https://www.linkedin.com/in/torianna"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-md p-2 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Toggle menu"
              className="rounded-md p-2 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 border-b border-border ${mobileMenuOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="container mx-auto px-6 py-3 flex flex-col gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-md px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  activeSection === item.id
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden text-right">
        <FairyLights />
        {/* Chicago skyline, very subtle */}
        <div className="absolute bottom-0 w-full h-[50vh] pointer-events-none select-none opacity-[0.05]">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full fill-foreground">
            <path d="M0,300 L0,200 L50,200 L50,150 L80,150 L80,220 L120,220 L120,100 L150,100 L150,180 L200,180 L200,50 L250,50 L250,250 L300,250 L300,120 L350,120 L350,200 L400,200 L400,80 L450,80 L450,230 L500,230 L500,20 L550,20 L550,210 L600,210 L600,140 L650,140 L650,260 L700,260 L700,90 L750,90 L750,190 L800,190 L800,60 L850,60 L850,240 L900,240 L900,110 L950,110 L950,200 L1000,200 L1000,300 Z" />
            <rect x="220" y="20" width="9" height="30" />
            <rect x="520" y="0"  width="9" height="20" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-8">
            Cybersecurity Graduate · Chicago, IL
          </p>
          <h1 className="text-7xl md:text-9xl font-bold text-foreground tracking-tight mb-6 leading-none">Tori</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
            Curious about how systems connect, alerts tell a story, and the right technical decisions quietly keep environments safe.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button
              onClick={() => scrollTo("cyber")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-medium"
            >
              View Work
            </Button>
          </div>
        </div>
      </section>
      {/* ── About ──────────────────────────────────────────────── */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Background</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-12">About Me</h2>

          <div className="space-y-8">
            {/* Bio */}
            <div className="space-y-8">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a recent cybersecurity graduate from Bradley University, based in Chicago. I'm drawn to the places where systems meet: how systems connect, how alerts tell a story, how people interact with security controls, and how the right technical decisions quietly protect an environment.
                </p>
                <p>Outside of work I like to experiment using my home lab, which you can learn more about on this page! I'm currently running a detection stack: Crowd Sec and Suricata feeding into a Loki/Grafana dashboard on a dedicated Ubuntu machine that also hosts this site. I believe the best way to learn security is to build things, break them, and understand why.</p>
              </div>

              <aside className="rounded-xl border border-primary/30 bg-primary/[0.06] p-5 md:p-6" aria-labelledby="about-next-steps">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p id="about-next-steps" className="text-xs font-semibold uppercase tracking-widest text-primary">Next Steps</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                      I'm working on closing the loop from detection to response, adding a CrowdSec bouncer so flagged IPs actually get blocked instead of just logged, along with building out more meaningful dashboard views and alerting for real security events.
                    </p>
                  </div>
                </div>
              </aside>

              <div>
                <SectionLabel>Skills & Tools</SectionLabel>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="font-mono text-xs py-1 px-2.5 border-primary/25 text-primary/80 hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      {/* ── Projects ───────────────────────────────────────────── */}
      <section id="cyber" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Internship · Great Wolf Lodge</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-12">Security Projects</h2>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Phishing Awareness Campaigns",
                sub: "Security Awareness",
                body: "Orchestrated phishing simulations via KnowBe4 for 3,000+ employees. Designed realistic email templates, analyzed click rates, and delivered targeted retraining to flagged employees.",
                tags: ["KnowBe4", "HTML/CSS", "Reporting"],
              },
              {
                title: "Detection & Alerting Logic",
                sub: "SIEM Engineering",
                body: "Built custom LEQL detection rules in Rapid7 InsightIDR to flag unauthorized password storage, excessive MFA failures, and repeated VPN login attempts.",
                tags: ["Rapid7 InsightIDR", "LEQL", "MFA Monitoring"],
              },
              {
                title: "SSO & Identity Work",
                sub: "Identity & Access",
                body: "Configured and deployed SSO for core business apps via Microsoft Entra ID using SAML and IdP-initiated flows. Documented rollout steps and resolved access issues.",
                tags: ["Entra ID", "SAML", "SSO"],
              },
            ].map((proj) => (
              <Card key={proj.title} className="group flex h-full flex-col border-border shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <CardHeader className="gap-2 pb-4">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold leading-snug">{proj.title}</CardTitle>
                  <CardDescription className="font-mono text-[11px] uppercase tracking-wide">{proj.sub}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">{proj.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map(t => (
                      <Badge key={t} variant="outline" className="border-border font-mono text-[11px] text-muted-foreground">{t}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Divider />
      {/* ── Homelab ────────────────────────────────────────────── */}
      <section id="homelab" className="scroll-mt-20 py-24 md:py-28">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Personal Project · Detection Engineering</SectionLabel>
          <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">Detection Lab: Building a Security Monitoring Stack on Ubuntu</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">A hands on case study in moving from Linux and networking foundations to a working home detection and observability stack.</p>
            </div>
            <Badge className="w-fit border border-primary/25 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary">
              In progress
            </Badge>
          </div>

          <Card className="mb-7 border-primary/35 bg-primary/[0.04] shadow-sm transition-[border-color,box-shadow] hover:border-primary/50 hover:shadow-md" id="homelab-tldr">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <ListChecks className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">TL;DR</p>
                  <p className="mt-2 max-w-3xl text-lg font-medium leading-relaxed text-foreground">
                    Detection is working on a dedicated Ubuntu host. The next step is closing the loop with automated blocking, better dashboard views, and alerting for real security events.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-background/35 p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Current state:</span> Suricata and CrowdSec are producing useful detection activity; automated blocking with a CrowdSec bouncer is the next milestone.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {["CrowdSec", "Suricata", "Loki / Grafana", "Ubuntu"].map(t => (
                  <Badge key={t} variant="outline" className="border-primary/25 font-mono text-xs text-primary/80">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <nav aria-label="Homelab case study sections" className="mb-10 overflow-x-auto rounded-xl border border-border bg-card/60 p-2">
            <div className="flex min-w-max gap-1">
              {[
                ["homelab-stack", "Stack"],
                ["homelab-architecture", "Data flow"],
                ["homelab-build-log", "Build log"],
                ["homelab-results", "Results"],
                ["homelab-lessons", "Lessons"],
                ["homelab-next-steps", "Next steps"],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <div id="homelab-stack" className="scroll-mt-24">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <SectionLabel>01 · The system</SectionLabel>
                <h3 className="text-2xl font-bold text-foreground">Stack at a glance</h3>
              </div>
              <span className="hidden text-xs font-mono text-muted-foreground sm:block">DETECTION → RESPONSE → VISIBILITY</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {detectionStack.map(item => {
                const Icon = item.icon;
                return (
                  <Card key={item.name} className="group h-full border-border shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                    <CardContent className="flex h-full gap-4 p-5 md:p-6">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-primary/80">{item.role}</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Card className="border-border shadow-sm" id="homelab-complementary">
              <CardHeader className="gap-2 pb-3">
                <SectionLabel>Why these tools</SectionLabel>
                <CardTitle className="text-xl">CrowdSec and Suricata are complementary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p><span className="font-semibold text-foreground">Suricata sees the activity.</span> It provides the network intrusion detection layer and turns traffic into security events.</p>
                <p><span className="font-semibold text-foreground">CrowdSec adds context and response.</span> It brings threat intelligence and a decision layer that can eventually hand flagged IPs to a bouncer.</p>
                <div className="rounded-lg border border-border bg-muted/35 p-4">
                  <p className="font-mono text-xs leading-relaxed text-foreground/80">Visibility from Suricata + decisions from CrowdSec = a path from detection to response.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm" id="homelab-architecture">
              <CardHeader className="gap-2 pb-3">
                <SectionLabel>02 · Architecture</SectionLabel>
                <CardTitle className="text-xl">How the data moves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground" aria-label="Network traffic flows to Suricata and then into Loki and Grafana">
                  {["Network traffic", "Suricata", "Loki", "Grafana"].map((item, index, items) => (
                    <span key={item} className="flex items-center gap-2">
                      <span className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2">{item}</span>
                      {index < items.length - 1 && <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />}
                    </span>
                  ))}
                </div>
                <div className="my-5 flex justify-center text-primary sm:hidden" aria-hidden="true"><ArrowDown className="h-4 w-4" /></div>
                <div className="mt-5 rounded-lg border border-border bg-muted/35 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-primary/80">Response layer</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    CrowdSec evaluates threat intelligence alongside the detection story. The bouncer is the missing connection that will turn a flagged IP into an actual block.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div id="homelab-build-log" className="mt-12 scroll-mt-24">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <SectionLabel>03 · Build log</SectionLabel>
                <h3 className="text-2xl font-bold text-foreground">From foundations to a working stack</h3>
              </div>
              <BookOpen className="hidden h-5 w-5 text-primary/70 sm:block" aria-hidden="true" />
            </div>
            <p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Each phase keeps the technical detail available without making the full story a wall of text. Open a step to see what it contributed and where it stands.
            </p>
            <Accordion type="multiple" defaultValue={["build-step-01"]} className="rounded-xl border border-border bg-card px-5 md:px-7">
              {buildLog.map(step => (
                <AccordionItem key={step.number} value={`build-step-${step.number}`} className="border-border last:border-0">
                  <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline">
                    <div className="flex min-w-0 flex-1 items-start gap-3 md:gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-[11px] font-semibold text-primary">{step.number}</span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-foreground">{step.title}</span>
                        <span className="mt-1 block text-sm font-normal leading-relaxed text-muted-foreground">{step.summary}</span>
                      </span>
                    </div>
                    <Badge variant="outline" className="hidden shrink-0 border-primary/25 font-mono text-[10px] text-primary/80 sm:inline-flex">{step.status}</Badge>
                  </AccordionTrigger>
                  <AccordionContent className="pl-10 pr-0 md:pl-11">
                    <div className="pb-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {step.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="border-border font-mono text-[11px] text-muted-foreground">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div id="homelab-results" className="mt-12 scroll-mt-24">
            <SectionLabel>04 · Current results</SectionLabel>
            <div className="grid gap-5 lg:grid-cols-3">
              <Card className="border-border shadow-sm">
                <CardHeader className="gap-2 pb-3">
                  <Eye className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle className="text-lg">Dashboard and visibility</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  Loki and Grafana provide a centralized place to inspect the activity coming from the monitoring stack. The foundation is in place; the next pass is making the views more meaningful.
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardHeader className="gap-2 pb-3">
                  <CircleDot className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle className="text-lg">What works now</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  Detection is working: Suricata provides network visibility and CrowdSec contributes threat-intelligence decisions that can be reviewed in the logging and visualization layer.
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardHeader className="gap-2 pb-3">
                  <Activity className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle className="text-lg">Current limitation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  The response loop is not finished yet. Flagged IPs are currently logged rather than blocked; a CrowdSec bouncer is the next step.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Card id="homelab-lessons" className="scroll-mt-24 border-border shadow-sm">
              <CardHeader className="gap-2 pb-3">
                <SectionLabel>05 · Lessons learned</SectionLabel>
                <CardTitle className="text-xl">Build the story in layers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>Linux fundamentals and home networking made the later monitoring work easier to understand and troubleshoot.</p>
                <p>Separating detection, threat intelligence, and visualization clarifies what each tool contributes instead of treating the stack as one black box.</p>
                <p>Self-hosting also makes access decisions part of the project: Nginx, DNS, and Cloudflare Tunnel keep the public surface deliberate.</p>
              </CardContent>
            </Card>
            <Card id="homelab-next-steps" className="scroll-mt-24 border-primary/30 bg-primary/[0.04] shadow-sm">
              <CardHeader className="gap-2 pb-3">
                <SectionLabel>06 · Next steps</SectionLabel>
                <CardTitle className="text-xl">Close the loop from detection to response</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                I'm working on closing the loop from detection to response, adding a CrowdSec bouncer so flagged IPs actually get blocked instead of just logged, along with building out more meaningful dashboard views and alerting for real security events.
              </CardContent>
            </Card>
          </div>

          <div className="mt-14" id="homelab-foundations">
            <SectionLabel>Foundations</SectionLabel>
            <h3 className="mb-5 text-2xl font-bold text-foreground">The progression behind the lab</h3>
            <div className="grid gap-4 lg:grid-cols-3">
              {foundations.map((lab, index) => (
                <Card key={lab.title} className="group h-full border-border shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-5 md:p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Server className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                    </div>
                    <CardTitle className="text-base">{lab.title}</CardTitle>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{lab.body}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {lab.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="border-border font-mono text-[11px] text-muted-foreground">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Divider />
      {/* ── PC Build ───────────────────────────────────────────── */}
      <section id="pcbuild" className="scroll-mt-20 py-24 md:py-28">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Current Build</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-3">
            PC Build
            <Cpu className="w-5 h-5 text-primary opacity-70" />
          </h2>

          <div className="mt-10 max-w-2xl space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                This build is in progress and is designed for gaming, virtual machines, cybersecurity labs, and research.
              </p>
            </div>

            <Card className="overflow-hidden border-border shadow-sm transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md">
              <CardContent className="overflow-x-auto p-0">
                <table className="w-full min-w-[30rem] text-sm font-mono">
                  <tbody className="divide-y divide-border">
                    {[
                      { label: "CPU",         value: "AMD Ryzen 7 9800X3D",              ready: true  },
                      { label: "Motherboard", value: "Gigabyte B850 AORUS ELITE WIFI7",  ready: true  },
                      { label: "RAM",         value: "32GB DDR5",                         ready: true  },
                      { label: "GPU",         value: "TBD",                               ready: false },
                      { label: "Storage",     value: "TBD",                               ready: false },
                    ].map(row => (
                      <tr key={row.label}>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground w-32">{row.label}</td>
                        <td className={`px-5 py-3.5 text-right ${row.ready ? "text-foreground" : "text-muted-foreground italic"}`}>
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <div>
              <SectionLabel>Use Cases</SectionLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Gaming", "Virtual Machines", "Cyber Labs", "Research"].map(t => (
                  <Badge key={t} variant="outline" className="font-mono text-xs border-primary/25 text-primary/80">{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      {/* ── Certifications ─────────────────────────────────────── */}
      <section id="certifications" className="scroll-mt-20 py-24 md:py-28">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Credentials</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-12">Certifications</h2>

          <div className="grid max-w-2xl gap-5 md:grid-cols-2">
            {/* Earned */}
            <Card className="border-l-2 border-border border-l-primary shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="p-6 md:p-7">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <Badge className="border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-sm font-semibold text-primary">
                    Sec+
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">Earned 2025</span>
                </div>
                <p className="font-semibold text-foreground text-lg leading-snug mb-1">
                  CompTIA Security+ (SY0-701)
                </p>
                <p className="text-sm text-primary">CompTIA</p>
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card className="border-dashed border-border shadow-sm transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md">
              <CardContent className="p-6 md:p-7">
                <p className="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Exploring Next
                </p>
                <div className="space-y-3">
                  {[
                    { abbr: "CySA+", name: "CompTIA Cybersecurity Analyst+" },
                    { abbr: "CEH",   name: "Certified Ethical Hacker"       },
                  ].map(item => (
                    <div key={item.abbr} className="flex items-center gap-3 opacity-65">
                      <Badge variant="outline" className="font-mono text-xs border-border shrink-0">
                        {item.abbr}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="border-t border-border py-8">
        <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Torianna · Chicago, IL</p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/torianna"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
