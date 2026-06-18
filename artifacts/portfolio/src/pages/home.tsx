import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Download, Server, Shield, Cpu, Sun, Moon, Menu, X } from "lucide-react";
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
  { id: "resume",        label: "Resume"   },
  { id: "certifications",label: "Certs"   },
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
          <span
            className="font-semibold text-base text-foreground tracking-tight cursor-pointer select-none"
            onClick={() => scrollTo("hero")}
          >
            Torianna
          </span>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-2 text-sm rounded-md transition-colors ${
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
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 ml-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 text-muted-foreground rounded-md hover:bg-muted"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Toggle menu"
              className="p-2 text-muted-foreground rounded-md hover:bg-muted"
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
                className={`text-left px-4 py-2.5 text-sm rounded-md transition-colors ${
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
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <FairyLights />
        {/* Chicago skyline — very subtle */}
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
          <h1 className="text-7xl md:text-9xl font-bold text-foreground tracking-tight mb-6 leading-none">
            Torianna
          </h1>
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
            <Button
              onClick={() => scrollTo("resume")}
              variant="outline"
              className="border-border text-foreground hover:bg-muted px-6 font-medium"
            >
              <Download className="mr-2 w-4 h-4" />
              Resume
            </Button>
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────── */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Background</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-12">About Me</h2>

          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Photo */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-full max-w-[240px] mx-auto md:mx-0 aspect-[3/4] rounded-xl overflow-hidden border border-border bg-muted">
                <img
                  src="/profile.jpg"
                  alt="Torianna"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-border flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    Add <code>profile.jpg</code><br />to <code>public/</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a recent cybersecurity graduate from Bradley University, based in Chicago. I'm drawn to the parts of security that sit at intersections — how systems connect, how alerts tell a story, how people actually interact with security controls, and how the right technical decisions quietly protect an environment.
                </p>
                <p>
                  Outside of work I experiment with a Raspberry Pi homelab, tinker with networking setups, and am building out a new PC. I believe the best way to learn security is to build things, break them, and understand why.
                </p>
              </div>

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

          <div className="grid md:grid-cols-3 gap-5">
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
              <Card key={proj.title} className="border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold leading-snug">{proj.title}</CardTitle>
                  <CardDescription className="font-mono text-xs">{proj.sub}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{proj.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map(t => (
                      <Badge key={t} variant="outline" className="font-mono text-xs border-border text-muted-foreground">{t}</Badge>
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
      <section id="homelab" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Personal Projects</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-12">Homelab</h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Raspberry Pi Setup",
                body: "Getting hands-on with Linux fundamentals — Raspberry Pi OS, terminal commands, file management, and SSH access from the local network.",
                tags: ["Raspberry Pi OS", "SSH", "CLI"],
              },
              {
                title: "Home Networking",
                body: "Building foundational networking knowledge — router and switch concepts, LAN connectivity, IP addressing, and troubleshooting local network issues.",
                tags: ["DNS / DHCP", "TCP/IP", "VLAN Concepts"],
              },
              {
                title: "Self-Hosted Portfolio",
                body: "Hosting this portfolio through Nginx, with DNS and Cloudflare Tunnel for safer public access — no unnecessary services exposed.",
                tags: ["Nginx", "Cloudflare Tunnel", "DNS"],
              },
            ].map((lab) => (
              <Card key={lab.title} className="border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Server className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold">{lab.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{lab.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.tags.map(t => (
                      <Badge key={t} variant="outline" className="font-mono text-xs border-border text-muted-foreground">{t}</Badge>
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
      <section id="pcbuild" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Current Build</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-3">
            PC Build
            <Cpu className="w-5 h-5 text-primary opacity-70" />
          </h2>

          <div className="max-w-2xl mt-10 space-y-6">
            <div>
              <p className="font-semibold text-foreground text-lg">"The Grove Station"</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Current build in progress — designed for gaming, virtual machines, cybersecurity labs, and research.
              </p>
            </div>

            <Card className="border-border shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <table className="w-full text-sm font-mono">
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

      {/* ── Resume ─────────────────────────────────────────────── */}
      <section id="resume" className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
            <div>
              <SectionLabel>Experience & Education</SectionLabel>
              <h2 className="text-3xl font-bold text-foreground">Resume</h2>
            </div>
            <a href="/resume.pdf" download="Torianna_Dixon_Resume.pdf">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted font-medium shrink-0">
                <Download className="mr-2 w-4 h-4" /> Download PDF
              </Button>
            </a>
          </div>

          <div className="space-y-5">
            {/* Internship */}
            <Card className="border-border shadow-sm border-l-2 border-l-primary">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                  <div>
                    <p className="font-semibold text-foreground">IT Corporate Support / Cybersecurity Intern</p>
                    <p className="text-sm text-primary mt-0.5">Great Wolf Lodge — Remote / Corporate Team</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono shrink-0 mt-1">June 2025 – Aug 2025</p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Supported phishing simulation campaigns in KnowBe4 by designing realistic HTML/CSS email templates for 3,000+ employees across U.S. lodge and corporate environments</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Analyzed campaign results to identify high-risk users, report trends, and support targeted retraining plans</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Developed custom Rapid7 InsightIDR detection alerts for unauthorized password storage, excessive MFA failures, and repeated VPN login attempts</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Configured and deployed IdP-initiated SSO for business applications using Microsoft Entra ID, SAML, and application role mapping</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Collaborated with application owners to troubleshoot access issues, validate SSO functionality, and document rollout steps</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Delivered phishing-awareness guidance to six users identified through campaign results, reinforcing safe email handling and reporting practices</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Participated in technical shadowing and Lunch &amp; Learn sessions focused on Active Directory, corporate IT support, and multi-lodge network architecture</li>
                </ul>
              </CardContent>
            </Card>

            {/* Red Team */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                  <div>
                    <p className="font-semibold text-foreground">Bradley Red Team</p>
                    <p className="text-sm text-muted-foreground mt-0.5">MIS 483: Advanced Ethical Hacking · Bradley University</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono shrink-0 mt-1">Fall 2025</p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Conducted OSINT and reconnaissance to support authorized cybersecurity and physical security assessments</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Researched public domain records, archived web pages, exposed digital footprints, and other publicly available information to identify potential security gaps</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Practiced ethical reconnaissance methods within a defined scope and organized findings for review</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Participated in controlled social engineering and physical security testing to evaluate awareness, access control, and security procedures</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Used the MITRE ATT&amp;CK framework to connect findings to real-world adversary tactics, techniques, and procedures</li>
                  <li className="flex gap-2"><span className="text-primary shrink-0 mt-0.5">›</span>Documented observations and translated findings into security improvement recommendations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <p className="font-semibold text-foreground">B.S. in Cybersecurity</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Bradley University · Peoria, IL</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono shrink-0 mt-1">Graduated May 2026</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Certifications ─────────────────────────────────────── */}
      <section id="certifications" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionLabel>Credentials</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-12">Certifications</h2>

          <div className="grid md:grid-cols-2 gap-5 max-w-2xl">
            {/* Earned */}
            <Card className="border-border shadow-sm border-l-2 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-5">
                  <Badge className="bg-primary/10 text-primary border border-primary/25 font-mono font-semibold px-3 py-1 text-sm">
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
            <Card className="border-dashed border-border shadow-sm">
              <CardContent className="p-8">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-5">
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
