import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Download, Server, Shield, Cpu, Terminal, Sun, Moon, Menu, X, Send, CheckCircle } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const certs = [
  {
    abbr: "Sec+",
    name: "CompTIA Security+ (SY0-701)",
    issuer: "CompTIA",
    year: "2025",
    borderClass: "border-l-primary",
    textClass: "text-primary",
    bgClass: "bg-primary/10",
    earned: true,
  },
];

const skillColors = [
  "bg-primary/10 text-primary border-primary/30",
  "bg-ember/10 text-ember border-ember/30",
  "bg-grove/10 text-grove border-grove/30",
  "bg-bark/10 text-bark border-bark/30",
  "bg-secondary/20 text-secondary border-secondary/30",
];

function SpinningGear({
  size = 64,
  speed = 10,
  reverse = false,
  teeth = 12,
  opacity = 0.3,
  color = "currentColor",
}: {
  size?: number;
  speed?: number;
  reverse?: boolean;
  teeth?: number;
  opacity?: number;
  color?: string;
}) {
  const cx = 50, cy = 50;
  const outerR = 45, innerR = 33, hubR = 12, boreR = 5;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const step = (2 * Math.PI) / teeth;
    const base = step * i;
    const w = step * 0.2;
    pts.push(`${(cx + outerR * Math.cos(base - w)).toFixed(2)},${(cy + outerR * Math.sin(base - w)).toFixed(2)}`);
    pts.push(`${(cx + outerR * Math.cos(base + w)).toFixed(2)},${(cy + outerR * Math.sin(base + w)).toFixed(2)}`);
    const v = base + step * 0.5;
    pts.push(`${(cx + innerR * Math.cos(v - w)).toFixed(2)},${(cy + innerR * Math.sin(v - w)).toFixed(2)}`);
    pts.push(`${(cx + innerR * Math.cos(v + w)).toFixed(2)},${(cy + innerR * Math.sin(v + w)).toFixed(2)}`);
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="animate-spin"
      style={{
        opacity,
        animationDuration: `${speed}s`,
        animationDirection: reverse ? "reverse" : "normal",
        animationTimingFunction: "linear",
        color,
      }}
      aria-hidden
    >
      <polygon points={pts.join(" ")} fill="currentColor" />
      <circle cx={cx} cy={cy} r={hubR} fill="currentColor" />
      <circle cx={cx} cy={cy} r={boreR} fill="hsl(var(--background))" />
    </svg>
  );
}

function GearDivider() {
  return (
    <div className="relative py-3 flex items-center justify-center overflow-hidden" aria-hidden>
      <div className="absolute inset-0 flex items-center px-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      </div>
      <div className="relative flex items-center gap-1 bg-background px-5">
        <SpinningGear size={22} speed={14} teeth={10} opacity={0.45} />
        <SpinningGear size={15} speed={8}  reverse teeth={8}  opacity={0.35} />
        <SpinningGear size={30} speed={20} teeth={14} opacity={0.55} />
        <SpinningGear size={15} speed={8}  reverse teeth={8}  opacity={0.35} />
        <SpinningGear size={22} speed={14} teeth={10} opacity={0.45} />
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const navItems = ["about", "cyber", "homelab", "pcbuild", "resume", "contact"];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (values: ContactFormValues) => {
    console.log("Contact form submission:", values);
    setSubmitted(true);
    toast({
      title: "Message transmitted.",
      description: "Thanks for reaching out — I'll respond within 24 hours.",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "cyber", "homelab", "pcbuild", "resume", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden selection:bg-primary selection:text-background">
      {/* Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="font-serif text-xl font-bold text-primary tracking-wider text-glow cursor-pointer"
            onClick={() => scrollTo('hero')}
            data-testid="nav-logo"
          >
            T.
          </span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-sm font-mono tracking-widest uppercase transition-colors hover:text-primary ${
                  activeSection === item ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid={`nav-link-${item}`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-all"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={toggleTheme}
              data-testid="button-theme-toggle-mobile"
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-all"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              data-testid="button-mobile-menu"
              aria-label="Toggle navigation menu"
              className="w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-all"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          data-testid="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border/50 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                data-testid={`nav-mobile-link-${item}`}
                className={`text-left py-3 px-4 font-mono text-sm tracking-widest uppercase transition-colors rounded-md hover:bg-primary/10 hover:text-primary ${
                  activeSection === item
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Chicago Skyline SVG Background */}
        <div className="absolute bottom-0 w-full h-[60vh] opacity-20 pointer-events-none">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full fill-primary">
            <path d="M0,300 L0,200 L50,200 L50,150 L80,150 L80,220 L120,220 L120,100 L150,100 L150,180 L200,180 L200,50 L250,50 L250,250 L300,250 L300,120 L350,120 L350,200 L400,200 L400,80 L450,80 L450,230 L500,230 L500,20 L550,20 L550,210 L600,210 L600,140 L650,140 L650,260 L700,260 L700,90 L750,90 L750,190 L800,190 L800,60 L850,60 L850,240 L900,240 L900,110 L950,110 L950,200 L1000,200 L1000,300 Z" />
            {/* Hancock/Willis stylized shapes */}
            <rect x="220" y="20" width="10" height="30" />
            <rect x="520" y="0" width="10" height="20" />
          </svg>
        </div>
        
        {/* Mythical Constellation/Runes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
           <svg viewBox="0 0 500 500" className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] stroke-primary fill-none animate-pulse duration-10000">
             <circle cx="250" cy="250" r="200" strokeWidth="1" strokeDasharray="5,5" />
             <path d="M250,50 L250,450 M50,250 L450,250" strokeWidth="0.5" />
             <path d="M100,100 L400,400 M100,400 L400,100" strokeWidth="0.5" />
             {/* Abstract rune/dragon scales */}
             <path d="M200,200 Q250,150 300,200 Q250,250 200,200" strokeWidth="2" />
             <path d="M200,300 Q250,250 300,300 Q250,350 200,300" strokeWidth="2" />
           </svg>
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-glow">
            <span className="text-secondary">Torianna</span>
          </h1>
          <p className="font-mono text-xl md:text-2xl text-primary tracking-widest uppercase mb-8">
            Cybersecurity Graduate
          </p>
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="max-w-xl text-muted-foreground font-sans text-lg">
              Curious about how systems connect, alerts get investigated,
              and technical decisions keep environments safe. Based in Chicago.
            </p>
            <Button onClick={() => scrollTo('about')} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono mt-8">
              Initiate Handshake <Terminal className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Profile photo slot */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-full max-w-[260px] mx-auto md:mx-0 aspect-[3/4] rounded-xl overflow-hidden border-2 border-primary/40 bg-card/60 box-glow group">
                <img
                  src="/profile.jpg"
                  alt="Torianna"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Placeholder shown when no photo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center mb-3">
                    <svg className="w-7 h-7 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <p className="font-mono text-xs text-primary/40 leading-relaxed">Add <code className="text-primary/60">profile.jpg</code> to <code className="text-primary/60">public/</code></p>
                </div>
              </div>
            </div>

            {/* Bio + skills */}
            <div className="md:col-span-2 space-y-8">
              <div className="border-mythic p-8 bg-card/50 backdrop-blur-sm">
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">About Me</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  I'm a recent cybersecurity graduate from Bradley University, based in Chicago. I'm drawn to the parts of security that sit at intersections — how systems connect, how alerts tell a story, how people actually interact with security controls, and how the right technical decisions quietly protect an environment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Outside of work I experiment with a Raspberry Pi homelab, tinker with networking setups, and am building out a new PC. I believe the best way to learn security is to build things, break them, and understand why.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-xl text-secondary mb-4 uppercase tracking-widest border-b border-border pb-2">Skills & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {["Rapid7 InsightIDR", "KnowBe4", "Microsoft Entra ID", "Active Directory", "SAML / SSO", "LEQL", "MITRE ATT&CK", "Nmap", "OSINT", "DNS / DHCP", "TCP/IP", "Linux", "SSH", "Nginx", "Python", "Phishing Analysis"].map((skill, i) => (
                    <Badge key={skill} variant="outline" className={`${skillColors[i % skillColors.length]} border font-mono py-1 hover:opacity-80 transition-opacity`}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GearDivider />

      {/* Cybersecurity Projects */}
      <section id="cyber" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center mb-12">
            <Shield className="w-8 h-8 text-primary mr-4" />
            <h2 className="font-serif text-4xl text-foreground">The Workshop</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-background border-border/50 hover:border-ember/50 transition-colors group">
              <CardHeader>
                <CardTitle className="font-serif text-xl group-hover:text-ember transition-colors">Phishing Awareness Campaigns</CardTitle>
                <CardDescription className="font-mono text-xs">Security Awareness · Great Wolf Lodge</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Orchestrated phishing simulations via KnowBe4 for 3,000+ employees. Designed realistic HTML/CSS email templates, analyzed results to identify risky users, and delivered targeted retraining to six flagged employees.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="font-mono text-xs text-ember border-ember/40">KnowBe4</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-ember border-ember/40">HTML/CSS</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-ember border-ember/40">Reporting</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/50 hover:border-grove/50 transition-colors group">
              <CardHeader>
                <CardTitle className="font-serif text-xl group-hover:text-grove transition-colors">Detection & Alerting Logic</CardTitle>
                <CardDescription className="font-mono text-xs">SIEM Engineering · Great Wolf Lodge</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Built custom LEQL detection rules in Rapid7 InsightIDR to flag unauthorized password storage, excessive MFA failures, and repeated VPN login attempts. Created dashboards to surface suspicious authentication patterns.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="font-mono text-xs text-grove border-grove/40">Rapid7 InsightIDR</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-grove border-grove/40">LEQL</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-grove border-grove/40">MFA Monitoring</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/50 hover:border-primary/50 transition-colors group md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">SSO & Identity Work</CardTitle>
                <CardDescription className="font-mono text-xs">Identity & Access · Great Wolf Lodge</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Configured and deployed SSO for core business apps via Microsoft Entra ID using SAML and IdP-initiated flows. Collaborated with app owners to resolve access issues, test cloud application authentication, and document rollout steps.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="font-mono text-xs text-primary border-primary/40">Entra ID</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-primary border-primary/40">SAML</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-primary border-primary/40">SSO</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <GearDivider />

      {/* Homelab Projects */}
      <section id="homelab" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center mb-12">
            <Server className="w-8 h-8 text-primary mr-4" />
            <h2 className="font-serif text-4xl text-foreground">The Engine Room</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
              <div className="border-mythic p-6 bg-card/40">
                <h3 className="font-serif text-xl text-primary mb-2">Raspberry Pi Setup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Getting hands-on with Linux fundamentals — setting up Raspberry Pi OS, practicing terminal commands, managing files and directories, and establishing SSH access from the local network.
                </p>
                <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                  <li><span className="text-grove">&gt;</span> Raspberry Pi OS configuration</li>
                  <li><span className="text-grove">&gt;</span> SSH remote access</li>
                  <li><span className="text-grove">&gt;</span> File &amp; folder management via CLI</li>
                </ul>
              </div>
              <div className="border-mythic p-6 bg-card/40">
                <h3 className="font-serif text-xl text-primary mb-2">Home Networking</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Building foundational networking knowledge — understanding router and switch concepts, configuring LAN connectivity, assigning IP addresses, and troubleshooting local network issues.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="border-bark text-bark">DNS / DHCP</Badge>
                  <Badge variant="outline" className="border-bark text-bark">TCP/IP</Badge>
                  <Badge variant="outline" className="border-bark text-bark">VLAN Concepts</Badge>
                </div>
              </div>
              <div className="border-mythic p-6 bg-card/40">
                <h3 className="font-serif text-xl text-primary mb-2">Self-Hosted Portfolio</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hosting this portfolio site through Nginx, with DNS and Cloudflare Tunnel for safer public access — no unnecessary services exposed.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="border-ember text-ember">Nginx</Badge>
                  <Badge variant="outline" className="border-ember text-ember">Cloudflare Tunnel</Badge>
                  <Badge variant="outline" className="border-ember text-ember">DNS</Badge>
                </div>
              </div>
          </div>
        </div>
      </section>

      <GearDivider />

      {/* PC Build */}
      <section id="pcbuild" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6 max-w-5xl">
           <div className="flex items-center justify-end mb-12">
            <h2 className="font-serif text-4xl text-foreground mr-4">Forge & Fire</h2>
            <Cpu className="w-8 h-8 text-primary" />
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
              <div>
                <h3 className="font-serif text-3xl text-primary mb-2">"The Grove Station"</h3>
                <p className="text-muted-foreground">Current build in progress. Designed for gaming, running virtual machines, cybersecurity labs, and research — a machine that grows with the work.</p>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-grove">CPU</span>
                  <span className="text-foreground text-right">AMD Ryzen 7 9800X3D</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-grove">Motherboard</span>
                  <span className="text-foreground text-right">Gigabyte B850 AORUS ELITE WIFI7</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-grove">RAM</span>
                  <span className="text-foreground text-right">32GB DDR5</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">GPU</span>
                  <span className="text-muted-foreground text-right italic">TBD</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="text-muted-foreground text-right italic">TBD</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Use Cases</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="font-mono text-xs text-ember border-ember/40">Gaming</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-grove border-grove/40">Virtual Machines</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-primary border-primary/40">Cyber Labs</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-bark border-bark/40">Research</Badge>
                </div>
              </div>
          </div>
        </div>
      </section>

      <GearDivider />

      {/* Resume Section */}
      <section id="resume" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-4xl text-foreground">The Logbook</h2>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono">
              <Download className="mr-2 w-4 h-4" /> Download PDF
            </Button>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
            
            {/* Internship */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(201,168,76,0.3)] z-10">
                <Shield className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border-mythic p-6 bg-card/50">
                <div className="flex flex-col mb-3">
                  <span className="font-serif text-xl text-primary">IT Corporate Support / Cybersecurity Intern</span>
                  <span className="font-mono text-sm text-ember">Great Wolf Lodge — Remote / Corporate Team</span>
                  <span className="font-mono text-xs text-muted-foreground mt-1">June 2025 – August 2025</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-none">
                  <li><span className="text-primary mr-1">&rsaquo;</span>Phishing simulations via KnowBe4 for 3,000+ employees; designed HTML/CSS templates and produced retraining reports</li>
                  <li><span className="text-primary mr-1">&rsaquo;</span>Built LEQL detection rules in Rapid7 InsightIDR for MFA failures, VPN abuse, and unauthorized password storage</li>
                  <li><span className="text-primary mr-1">&rsaquo;</span>Configured SSO for core business apps via Microsoft Entra ID (SAML, IdP-initiated); documented rollout steps</li>
                  <li><span className="text-primary mr-1">&rsaquo;</span>Shadowed Active Directory and multi-lodge network architecture sessions</li>
                </ul>
              </div>
            </div>

            {/* Bradley Red Team */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-grove bg-background text-grove shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border border-grove/30 p-6 bg-card/50">
                <div className="flex flex-col mb-3">
                  <span className="font-serif text-xl text-grove">Bradley Red Team</span>
                  <span className="font-mono text-sm text-secondary">MIS 483: Advanced Ethical Hacking · Bradley University</span>
                  <span className="font-mono text-xs text-muted-foreground mt-1">Fall 2025</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-none">
                  <li><span className="text-grove mr-1">&rsaquo;</span>Conducted OSINT and reconnaissance for authorized physical and cybersecurity assessments</li>
                  <li><span className="text-grove mr-1">&rsaquo;</span>Used WHOIS, DNS lookup, Google dorking, Wayback Machine, Shodan concepts, and Nmap</li>
                  <li><span className="text-grove mr-1">&rsaquo;</span>Applied MITRE ATT&amp;CK to connect findings to real-world adversary tactics</li>
                  <li><span className="text-grove mr-1">&rsaquo;</span>Participated in social engineering and physical security testing; documented improvement recommendations</li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-bark bg-background text-bark shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-serif font-bold text-sm">B</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border border-bark/30 p-6 bg-card/20">
                <div className="flex flex-col mb-2">
                  <span className="font-serif text-xl text-bark">B.S. in Cybersecurity</span>
                  <span className="font-mono text-sm text-muted-foreground">Bradley University · Peoria, IL</span>
                  <span className="font-mono text-xs text-muted-foreground mt-1">Graduated May 2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <GearDivider />

      {/* Certifications Section */}
      <section id="certifications" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-2">Commendations</h3>
          <h2 className="font-serif text-4xl text-foreground mb-12">Decorations & Honours</h2>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Featured earned cert */}
            {certs.filter(c => c.earned).map((cert) => (
              <div
                key={cert.abbr}
                data-testid={`card-cert-${cert.abbr}`}
                className={`border border-border/50 border-l-4 ${cert.borderClass} bg-card/60 p-8 rounded-sm`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-sm font-mono font-bold text-base ${cert.bgClass} ${cert.textClass} border border-current/20`}>
                    {cert.abbr}
                  </span>
                  <span className={`font-mono text-xs px-2 py-1 rounded-full ${cert.bgClass} ${cert.textClass} border border-current/20`}>
                    Earned {cert.year}
                  </span>
                </div>
                <p className="font-serif text-2xl text-foreground leading-snug mb-2">{cert.name}</p>
                <p className={`font-mono text-sm ${cert.textClass} opacity-80`}>{cert.issuer}</p>
              </div>
            ))}
            {/* Looking ahead */}
            <div className="border border-border/30 border-dashed p-8 rounded-sm bg-card/20">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Currently Exploring</p>
              <div className="space-y-3">
                {[
                  { abbr: "CySA+", name: "CompTIA Cybersecurity Analyst+", color: "text-grove" },
                  { abbr: "CEH", name: "Certified Ethical Hacker", color: "text-ember" },
                ].map(item => (
                  <div key={item.abbr} className="flex items-center space-x-3 opacity-60">
                    <span className={`font-mono text-xs font-bold ${item.color} border border-current/20 px-2 py-0.5 rounded-sm`}>{item.abbr}</span>
                    <span className="font-serif text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GearDivider />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: heading + social links */}
            <div>
              <h2 className="font-serif text-4xl text-foreground mb-4">Send a Dispatch</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Whether you have a project in mind, a threat to investigate, or just want to talk
                shop about homelabs and hardware — my inbox is open.
              </p>

              <div className="space-y-4 mb-10">
                <a
                  href="mailto:alex@example.com"
                  data-testid="link-email"
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    torianna@example.com
                  </span>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-github"
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Github className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    github.com/torianna
                  </span>
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-linkedin"
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    linkedin.com/in/torianna
                  </span>
                </a>
              </div>

              <div className="border-mythic p-4 bg-card/40 inline-block">
                <p className="font-mono text-xs text-secondary uppercase tracking-widest">
                  Based in Chicago, IL
                </p>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="border-mythic p-8 bg-card/50 backdrop-blur-sm">
              {submitted ? (
                <div
                  data-testid="contact-success"
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <CheckCircle className="w-16 h-16 text-primary" />
                  <h3 className="font-serif text-2xl text-primary">Message Transmitted</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Your signal reached me. I'll respond within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono mt-4"
                    onClick={() => { setSubmitted(false); form.reset(); }}
                    data-testid="button-send-another"
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                    data-testid="form-contact"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-xs uppercase tracking-widest text-secondary">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                data-testid="input-name"
                                className="bg-background/60 border-border focus:border-primary font-mono text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-xs uppercase tracking-widest text-secondary">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                data-testid="input-email"
                                className="bg-background/60 border-border focus:border-primary font-mono text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-secondary">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              data-testid="input-subject"
                              className="bg-background/60 border-border focus:border-primary font-mono text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-secondary">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me what's on your mind..."
                              data-testid="textarea-message"
                              className="bg-background/60 border-border focus:border-primary font-mono text-sm min-h-[120px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      data-testid="button-submit-contact"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-mono tracking-widest"
                      disabled={form.formState.isSubmitting}
                    >
                      <Send className="mr-2 w-4 h-4" />
                      Transmit Message
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-8 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center z-10 relative">
          <div className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
            <p className="mb-1 text-primary">Based in Chicago, IL</p>
            <p>&copy; {new Date().getFullYear()} Torianna. All rights reserved.</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-5 pointer-events-none pb-4">
          <svg viewBox="0 0 100 20" className="w-full fill-primary">
            <path d="M0,20 L10,10 L20,15 L30,5 L40,15 L50,0 L60,15 L70,5 L80,15 L90,10 L100,20 Z" />
          </svg>
        </div>
      </footer>
    </div>
  );
}
