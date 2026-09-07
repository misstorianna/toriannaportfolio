import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Server, Shield, Cpu, Sun, Moon, Menu, X, Activity, ArrowDown, ArrowRight, BookOpen, CheckCircle2, CircleDot, ChevronLeft, ChevronRight, Eye, ListChecks, Network } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import heroStreet from "@/assets/hero-street.jpg";

const skills = [
  "Rapid7 InsightIDR", "KnowBe4", "Microsoft Entra ID", "Active Directory",
  "SAML / SSO", "LEQL", "MITRE ATT&CK", "Nmap", "Wireshark", "Shodan",
  "OSINT", "Google Dorking", "Wayback Machine", "WHOIS / DNS",
  "HTML / CSS", "Linux", "TCP/IP", "Networking", "Security Reporting",
];

const navItems = [
  { id: "about",         label: "About"    },
  { id: "homelab",       label: "Homelab"  },
  { id: "cyber",         label: "Experience" },
  { id: "pcbuild",       label: "Build"    },
  { id: "certifications",label: "Certs"   },
];

const homelabTabs = [
  { id: "overview", label: "Overview" },
  { id: "website", label: "This Website" },
  { id: "detection", label: "Detection System" },
] as const;

type HomelabTabId = typeof homelabTabs[number]["id"];

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
  const [activeHomelabTab, setActiveHomelabTab] = useState<HomelabTabId>("overview");
  const [selectedBuildStep, setSelectedBuildStep] = useState(0);
  const buildStepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const homelabTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
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

  const selectBuildStep = (index: number, moveFocus = false) => {
    const nextIndex = Math.max(0, Math.min(index, buildLog.length - 1));
    setSelectedBuildStep(nextIndex);
    if (moveFocus) {
      buildStepRefs.current[nextIndex]?.focus();
    }
  };

  const selectHomelabTab = (tabId: HomelabTabId, moveFocus = false) => {
    setActiveHomelabTab(tabId);
    if (moveFocus) {
      const nextIndex = homelabTabs.findIndex(tab => tab.id === tabId);
      homelabTabRefs.current[nextIndex]?.focus();
    }
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

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-8">
            Cybersecurity Graduate · Chicago, IL
          </p>
          <h1 className="font-script text-7xl font-bold leading-none tracking-tight text-foreground md:text-9xl">Torianna</h1>
          <img
            src={heroStreet}
            alt="Warmly lit city street at night"
            className="mx-auto my-6 h-auto w-full max-w-[1200px] object-contain"
          />
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
                <p>Outside of work I like to experiment using my home lab, which you can learn more about on this page! My security detection system uses CrowdSec and Suricata, with Loki and Grafana providing the dashboard. Separately, this website is self-hosted on the same dedicated Ubuntu machine and kept in sync by a fully automated deploy pipeline. I believe the best way to learn security is to build things, break them, and understand why.</p>
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
      {/* ── Homelab ────────────────────────────────────────────── */}
      <section id="homelab" className="scroll-mt-20 py-24 md:py-28">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Personal Project · Homelab</SectionLabel>
          <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">Homelab</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">Explore the infrastructure behind this website separately from the security detection system running on the same Ubuntu host.</p>
            </div>
            <Badge className="w-fit border border-primary/25 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary">
              In progress
            </Badge>
          </div>

          <div
            role="tablist"
            aria-label="Homelab projects"
            className="mb-8 grid gap-1 rounded-xl border border-border bg-card/60 p-1 sm:grid-cols-3"
          >
            {homelabTabs.map((tab, index) => {
              const isSelected = activeHomelabTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={element => { homelabTabRefs.current[index] = element; }}
                  type="button"
                  role="tab"
                  id={`homelab-tab-${tab.id}`}
                  aria-selected={isSelected}
                  aria-controls={`homelab-panel-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() => selectHomelabTab(tab.id)}
                  onKeyDown={event => {
                    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                      event.preventDefault();
                      selectHomelabTab(homelabTabs[(index + 1) % homelabTabs.length].id, true);
                    }
                    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                      event.preventDefault();
                      selectHomelabTab(homelabTabs[(index - 1 + homelabTabs.length) % homelabTabs.length].id, true);
                    }
                    if (event.key === "Home") {
                      event.preventDefault();
                      selectHomelabTab(homelabTabs[0].id, true);
                    }
                    if (event.key === "End") {
                      event.preventDefault();
                      selectHomelabTab(homelabTabs[homelabTabs.length - 1].id, true);
                    }
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeHomelabTab === "overview" && (
            <div
              id="homelab-panel-overview"
              role="tabpanel"
              aria-labelledby="homelab-tab-overview"
              className="space-y-5"
            >
              <div>
                <SectionLabel>Start here</SectionLabel>
                <h3 className="text-2xl font-bold text-foreground">Choose a project</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  The website and the detection system share a host, but they solve different problems. Pick a track to see its details.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => selectHomelabTab("website")}
                  className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-primary/80">Website infrastructure</p>
                  <h4 className="mt-3 text-xl font-bold text-foreground">This Website</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    A self-hosted portfolio with Nginx, DNS, Cloudflare Tunnel, and a GitHub-based auto-deploy pipeline.
                  </p>
                  <span className="mt-5 block text-sm font-medium text-primary transition-transform group-hover:translate-x-1">View website details →</span>
                </button>
                <button
                  type="button"
                  onClick={() => selectHomelabTab("detection")}
                  className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-primary/80">Security project</p>
                  <h4 className="mt-3 text-xl font-bold text-foreground">Detection System</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    CrowdSec and Suricata feed a Loki and Grafana observability stack for network detection and response.
                  </p>
                  <span className="mt-5 block text-sm font-medium text-primary transition-transform group-hover:translate-x-1">View detection details →</span>
                </button>
              </div>
            </div>
          )}

          {activeHomelabTab === "website" && (
            <div
              id="homelab-panel-website"
              role="tabpanel"
              aria-labelledby="homelab-tab-website"
              className="space-y-6"
            >
              <div>
                <SectionLabel>Website infrastructure</SectionLabel>
                <h3 className="text-2xl font-bold text-foreground">This Website</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  The portfolio is its own project: a public site hosted through Nginx on the Ubuntu machine, with Cloudflare Tunnel and DNS keeping the public surface narrow.
                </p>
              </div>

              <Card id="homelab-deploy" className="border-border shadow-sm transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md">
                <CardHeader className="gap-3 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Badge className="border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                      Complete
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="text-xl">Auto-Deploy Pipeline</CardTitle>
                    <CardDescription className="mt-2 max-w-3xl text-sm leading-relaxed">
                      Push a change from Replit, and it goes live on torianna.tech within 5 minutes with zero manual steps.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border bg-muted/35 p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-primary/80">How it works</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      A cron job on the Ubuntu host checks GitHub every 5 minutes. When it finds a new commit, it pulls the change, rebuilds the site, clears out old build files, and redeploys without manual server work.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {["GitHub", "Cron", "Bash", "CI/CD"].map(tag => (
                      <Badge key={tag} variant="outline" className="border-primary/25 font-mono text-xs text-primary/80">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardHeader className="gap-2 pb-3">
                  <SectionLabel>Deployment lessons</SectionLabel>
                  <CardTitle className="text-xl">What keeps the site reliable</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm leading-relaxed text-muted-foreground md:grid-cols-2">
                  <p className="rounded-lg border border-border bg-muted/25 p-4">
                    <span className="font-semibold text-foreground">The trailing slash problem.</span> A <code className="rounded bg-muted px-1 py-0.5 text-xs">cp</code> command was nesting fresh files instead of replacing the live site, leaving stale content online until the deployed files were compared with the build output.
                  </p>
                  <p className="rounded-lg border border-border bg-muted/25 p-4">
                    <span className="font-semibold text-foreground">The sudoers constraint.</span> Passwordless sudo rules had to match the deploy script's exact commands, so the copy step was rewritten without relying on a wildcard path.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeHomelabTab === "detection" && (
            <div
              id="homelab-panel-detection"
              role="tabpanel"
              aria-labelledby="homelab-tab-detection"
              className="space-y-6"
            >
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
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <div className="-mx-1 overflow-x-auto px-1 pb-3" aria-label="Homelab build milestones">
                <div
                  className="relative flex min-w-[40rem] items-start justify-between gap-2 px-2 sm:min-w-0 sm:gap-3"
                  role="tablist"
                  aria-label="Homelab build milestones"
                  aria-orientation="horizontal"
                >
                  <div className="pointer-events-none absolute left-7 right-7 top-4 h-0.5 bg-border sm:left-[6.25%] sm:right-[6.25%]" aria-hidden="true" />
                  {buildLog.map((step, index) => {
                    const isSelected = selectedBuildStep === index;
                    const isCompleted = index < selectedBuildStep;
                    const isInProgress = step.status === "In progress";
                    return (
                      <button
                        key={step.number}
                        ref={element => { buildStepRefs.current[index] = element; }}
                        type="button"
                        id={`homelab-build-step-${step.number}`}
                        role="tab"
                        aria-selected={isSelected}
                        aria-controls="homelab-build-step-panel"
                        tabIndex={isSelected ? 0 : -1}
                        aria-label={`Step ${step.number}: ${step.title}. Status: ${step.status}.`}
                        className="group relative z-10 flex min-w-[4.5rem] flex-1 flex-col items-center gap-2 rounded-lg px-1 py-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        onClick={() => selectBuildStep(index)}
                        onKeyDown={event => {
                          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                            event.preventDefault();
                            selectBuildStep((index + 1) % buildLog.length, true);
                          }
                          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                            event.preventDefault();
                            selectBuildStep((index - 1 + buildLog.length) % buildLog.length, true);
                          }
                          if (event.key === "Home") {
                            event.preventDefault();
                            selectBuildStep(0, true);
                          }
                          if (event.key === "End") {
                            event.preventDefault();
                            selectBuildStep(buildLog.length - 1, true);
                          }
                        }}
                      >
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card font-mono text-[11px] font-semibold transition-[background-color,border-color,color,box-shadow] ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_4px_hsl(var(--primary)/0.18)]"
                              : isCompleted
                                ? "border-primary/70 bg-primary/15 text-primary"
                                : isInProgress
                                  ? "border-secondary bg-secondary/15 text-secondary-foreground"
                                  : "border-border text-muted-foreground group-hover:border-primary/60 group-hover:text-primary"
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : step.number}
                        </span>
                        <span className={`max-w-[7.5rem] text-[11px] font-medium leading-tight transition-colors ${
                          isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        }`}>
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground" aria-live="polite">
                  Showing step <span className="font-mono font-semibold text-foreground">{String(selectedBuildStep + 1).padStart(2, "0")}</span> of <span className="font-mono font-semibold text-foreground">{String(buildLog.length).padStart(2, "0")}</span>
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => selectBuildStep(selectedBuildStep - 1)}
                    disabled={selectedBuildStep === 0}
                    aria-label="Show previous homelab milestone"
                    className="border-border text-muted-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => selectBuildStep(selectedBuildStep + 1)}
                    disabled={selectedBuildStep === buildLog.length - 1}
                    aria-label="Show next homelab milestone"
                    className="border-border text-muted-foreground"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>

              <div
                id="homelab-build-step-panel"
                role="tabpanel"
                tabIndex={0}
                aria-labelledby={`homelab-build-step-${buildLog[selectedBuildStep].number}`}
                className="mt-5 rounded-lg border border-primary/25 bg-primary/[0.04] p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-primary/80">
                      Milestone {buildLog[selectedBuildStep].number}
                    </p>
                    <h4 className="mt-2 text-xl font-bold leading-tight text-foreground">
                      {buildLog[selectedBuildStep].title}
                    </h4>
                  </div>
                  <Badge
                    variant="outline"
                    className={`w-fit shrink-0 font-mono text-[10px] ${
                      buildLog[selectedBuildStep].status === "In progress"
                        ? "border-secondary/60 text-secondary-foreground"
                        : "border-primary/25 text-primary/80"
                    }`}
                  >
                    {buildLog[selectedBuildStep].status}
                  </Badge>
                </div>
                <p className="mt-4 text-sm font-medium leading-relaxed text-foreground/85">
                  {buildLog[selectedBuildStep].summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {buildLog[selectedBuildStep].detail}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5" aria-label={`Technologies for ${buildLog[selectedBuildStep].title}`}>
                  {buildLog[selectedBuildStep].tags.map(tag => (
                    <Badge key={tag} variant="outline" className="border-border font-mono text-[11px] text-muted-foreground">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
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

          <Card id="homelab-lessons" className="mt-12 scroll-mt-24 border-border shadow-sm">
            <CardHeader className="gap-2 pb-3">
              <SectionLabel>05 · Lessons learned</SectionLabel>
              <CardTitle className="text-xl">What Actually Went Wrong (and How I Fixed It)</CardTitle>
              <CardDescription className="max-w-3xl leading-relaxed">
                Every step of this project had at least one thing that didn't work the first time. Documenting the real problems, not just the finished result, felt more honest and more useful.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-4 text-sm leading-relaxed text-muted-foreground md:grid-cols-2">
                <li className="rounded-lg border border-border bg-muted/25 p-4">
                  <span className="font-semibold text-foreground">Suricata wouldn't start.</span> The default config pointed at network interface <code className="rounded bg-muted px-1 py-0.5 text-xs">eth0</code>, which didn't exist on this machine. Found the real interface name with <code className="rounded bg-muted px-1 py-0.5 text-xs">ip a</code>, updated the config, confirmed with <code className="rounded bg-muted px-1 py-0.5 text-xs">systemctl status</code>.
                </li>
                <li className="rounded-lg border border-border bg-muted/25 p-4">
                  <span className="font-semibold text-foreground">CrowdSec logs weren't reaching Grafana.</span> Promtail was silently failing with a permissions error: the log file was owned by root with no group access. Fixed by adjusting file permissions and group ownership, then verified in Promtail's own logs.
                </li>
                <li className="rounded-lg border border-border bg-muted/25 p-4">
                </li>
                <li className="rounded-lg border border-border bg-muted/25 p-4 md:col-span-2">
                  <span className="font-semibold text-foreground">Deduplication saved my sanity.</span> Suricata's stats events log constantly and look identical. Grafana's “Signature” deduplication mode collapsed repeated entries into a count instead of showing every duplicate, making the dashboard actually readable.
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="mt-12">
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

            </div>
          )}
        </div>
      </section>
      <Divider />
      {/* ── Internship ──────────────────────────────────────────── */}
      <section id="cyber" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Internship · Great Wolf Lodge</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-12">Experience</h2>

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
