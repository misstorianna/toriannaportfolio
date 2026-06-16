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
    abbr: "OSCP",
    name: "Offensive Security Certified Professional",
    issuer: "Offensive Security",
    year: "2022",
    borderClass: "border-l-ember",
    textClass: "text-ember",
    bgClass: "bg-ember/10",
  },
  {
    abbr: "CISSP",
    name: "Certified Information Systems Security Professional",
    issuer: "(ISC)²",
    year: "2023",
    borderClass: "border-l-grove",
    textClass: "text-grove",
    bgClass: "bg-grove/10",
  },
  {
    abbr: "CEH",
    name: "Certified Ethical Hacker",
    issuer: "EC-Council",
    year: "2021",
    borderClass: "border-l-primary",
    textClass: "text-primary",
    bgClass: "bg-primary/10",
  },
  {
    abbr: "Sec+",
    name: "CompTIA Security+",
    issuer: "CompTIA",
    year: "2020",
    borderClass: "border-l-bark",
    textClass: "text-bark",
    bgClass: "bg-bark/10",
  },
  {
    abbr: "CySA+",
    name: "CompTIA Cybersecurity Analyst+",
    issuer: "CompTIA",
    year: "2021",
    borderClass: "border-l-secondary",
    textClass: "text-secondary",
    bgClass: "bg-secondary/10",
  },
  {
    abbr: "AWS-S",
    name: "AWS Certified Security – Specialty",
    issuer: "Amazon Web Services",
    year: "2023",
    borderClass: "border-l-ember",
    textClass: "text-ember",
    bgClass: "bg-ember/10",
  },
];

const skillColors = [
  "bg-primary/10 text-primary border-primary/30",
  "bg-ember/10 text-ember border-ember/30",
  "bg-grove/10 text-grove border-grove/30",
  "bg-bark/10 text-bark border-bark/30",
  "bg-secondary/20 text-secondary border-secondary/30",
];

// Placeholder for images while generating
import cyberImg from "@/assets/images/cyber.png";
import homelabImg from "@/assets/images/homelab.png";
import pcbuildImg from "@/assets/images/pcbuild.png";

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
            A.E.
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
            Alex <span className="text-secondary">Eldridge</span>
          </h1>
          <p className="font-mono text-xl md:text-2xl text-primary tracking-widest uppercase mb-8">
            Cybersecurity Professional
          </p>
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="max-w-xl text-muted-foreground font-sans text-lg">
              Hunting digital threats the way a ranger tracks monsters.
              Deep technical expertise rooted in Chicago.
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="border-mythic p-8 bg-card/50 backdrop-blur-sm">
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">The Architect</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                I operate at the crossroads of raw hardware capability and intricate software defense. Based in Chicago, I build resilient systems and tear down malicious ones. My work is not just a profession; it's a craft steeped in the pursuit of arcane technical knowledge.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether configuring an enterprise firewall or tuning a personal homelab, I approach infrastructure like a living ecosystem.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xl text-secondary mb-4 uppercase tracking-widest border-b border-border pb-2">Arsenal</h3>
              <div className="flex flex-wrap gap-2">
                {["Kali Linux", "Wireshark", "Metasploit", "Splunk", "Suricata", "Proxmox", "Docker", "pfSense", "Python", "Rust", "C++", "AWS Security", "Zero Trust"].map((skill, i) => (
                  <Badge key={skill} variant="outline" className={`${skillColors[i % skillColors.length]} border font-mono py-1 hover:opacity-80 transition-opacity`}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cybersecurity Projects */}
      <section id="cyber" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center mb-12">
            <Shield className="w-8 h-8 text-primary mr-4" />
            <h2 className="font-serif text-4xl text-foreground">Threat Intelligence</h2>
          </div>
          
          <div className="mb-12 rounded-xl overflow-hidden border border-border box-glow aspect-video relative">
             <img src={cyberImg} alt="Cybersecurity Lab" className="w-full h-full object-cover opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-background border-border/50 hover:border-primary/50 transition-colors group">
              <CardHeader>
                <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">Operation: Silent Grove</CardTitle>
                <CardDescription className="font-mono">Threat Hunting & Mitigation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Led a complete teardown and analysis of a novel polymorphic ransomware variant. Developed YARA signatures and deployed custom IDS rules across the enterprise network.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="font-mono text-xs text-secondary">YARA</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-secondary">Suricata</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-secondary">Reverse Engineering</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/50 hover:border-primary/50 transition-colors group">
              <CardHeader>
                <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">Project: Aegis Wall</CardTitle>
                <CardDescription className="font-mono">Zero Trust Architecture</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Designed and implemented a zero-trust network model for a mid-sized financial firm. Eliminated implicit trust and reduced the attack surface by 85%.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="font-mono text-xs text-secondary">ZTA</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-secondary">Okta</Badge>
                  <Badge variant="outline" className="font-mono text-xs text-secondary">Micro-segmentation</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Homelab Projects */}
      <section id="homelab" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center mb-12">
            <Server className="w-8 h-8 text-primary mr-4" />
            <h2 className="font-serif text-4xl text-foreground">Infrastructure & Homelab</h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              <div className="border-mythic p-6 bg-card/40">
                <h3 className="font-serif text-xl text-primary mb-2">The Nexus Cluster</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  A high-availability Proxmox VE cluster handling personal services, isolated malware detonation labs, and automated backup routines. 
                </p>
                <ul className="space-y-2 font-mono text-xs text-secondary-foreground">
                  <li><span className="text-primary">&gt;</span> 3x Mini PCs (i5-1240P, 64GB RAM)</li>
                  <li><span className="text-primary">&gt;</span> TrueNAS Core Storage Backend</li>
                  <li><span className="text-primary">&gt;</span> 10GbE SFP+ Backbone</li>
                </ul>
              </div>
              <div className="border-mythic p-6 bg-card/40">
                <h3 className="font-serif text-xl text-primary mb-2">Perimeter Defense</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Custom pfSense routing with strict VLAN isolation for IoT, Guest, and Lab environments. WireGuard VPN for secure remote access.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="border-secondary text-secondary">VLANs</Badge>
                  <Badge variant="outline" className="border-secondary text-secondary">WireGuard</Badge>
                  <Badge variant="outline" className="border-secondary text-secondary">pfBlockerNG</Badge>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 rounded-xl overflow-hidden border border-border box-glow aspect-square lg:aspect-auto lg:h-[500px] relative">
              <img src={homelabImg} alt="Homelab Circuit Board" className="w-full h-full object-cover opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* PC Build */}
      <section id="pcbuild" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6 max-w-5xl">
           <div className="flex items-center justify-end mb-12">
            <h2 className="font-serif text-4xl text-foreground mr-4">Forge & Fire</h2>
            <Cpu className="w-8 h-8 text-primary" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden border border-primary/30 box-glow aspect-[4/5] relative order-2 md:order-1">
              <img src={pcbuildImg} alt="Custom PC Build" className="w-full h-full object-cover opacity-90" />
            </div>
            
            <div className="order-1 md:order-2 space-y-8">
              <div>
                <h3 className="font-serif text-3xl text-primary mb-2">"Emerald Monolith"</h3>
                <p className="text-muted-foreground">The primary workstation. Built for compiling kernels, running local LLMs, and rendering 3D scenes without breaking a sweat.</p>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">CPU</span>
                  <span className="text-foreground text-right">AMD Ryzen 9 7950X</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">GPU</span>
                  <span className="text-foreground text-right">NVIDIA RTX 4090 Founders Edition</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">RAM</span>
                  <span className="text-foreground text-right">64GB DDR5-6000 CL30</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Storage</span>
                  <span className="text-foreground text-right">4TB NVMe Gen5 RAID 0</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Cooling</span>
                  <span className="text-foreground text-right">Custom EKWB Loop (Green Coolant)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-4xl text-foreground">Chronicles</h2>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono">
              <Download className="mr-2 w-4 h-4" /> Download PDF
            </Button>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
            
            {/* Experience Item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(201,168,76,0.5)] z-10">
                <Shield className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border-mythic p-6 bg-card/50">
                <div className="flex flex-col mb-2">
                  <span className="font-serif text-xl text-primary">Senior Security Engineer</span>
                  <span className="font-mono text-sm text-secondary">Vanguard Tech | Chicago, IL</span>
                  <span className="font-mono text-xs text-muted-foreground mt-1">2021 - Present</span>
                </div>
                <p className="text-sm text-muted-foreground">Leading the incident response team. Architected SIEM solutions and mentored junior analysts in threat hunting methodologies.</p>
              </div>
            </div>

            {/* Experience Item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border-mythic p-6 bg-card/50">
                <div className="flex flex-col mb-2">
                  <span className="font-serif text-xl text-primary">Systems Administrator</span>
                  <span className="font-mono text-sm text-secondary">AeroDynamics | Chicago, IL</span>
                  <span className="font-mono text-xs text-muted-foreground mt-1">2018 - 2021</span>
                </div>
                <p className="text-sm text-muted-foreground">Managed Active Directory, automated server deployments using Ansible, and hardened internal networks against lateral movement.</p>
              </div>
            </div>

            {/* Education Item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border bg-background text-muted-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-serif font-bold">U</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border border-border p-6 bg-card/20">
                <div className="flex flex-col mb-2">
                  <span className="font-serif text-xl text-foreground">B.S. Computer Science</span>
                  <span className="font-mono text-sm text-muted-foreground">University of Illinois Chicago</span>
                  <span className="font-mono text-xs text-muted-foreground mt-1">2014 - 2018</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-2">Earned in the Field</h3>
          <h2 className="font-serif text-4xl text-foreground mb-12">Certifications</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map((cert) => (
              <div
                key={cert.abbr}
                data-testid={`card-cert-${cert.abbr}`}
                className={`border border-border/50 border-l-4 ${cert.borderClass} bg-card/50 hover:bg-card/80 transition-all group p-5 rounded-sm`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-flex items-center justify-center px-3 py-1 rounded-sm font-mono font-bold text-sm ${cert.bgClass} ${cert.textClass} border border-current/20`}>
                    {cert.abbr}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{cert.year}</span>
                </div>
                <p className="font-serif text-base text-foreground leading-snug mb-1 group-hover:text-primary transition-colors">
                  {cert.name}
                </p>
                <p className={`font-mono text-xs ${cert.textClass} opacity-80`}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: heading + social links */}
            <div>
              <h2 className="font-serif text-4xl text-foreground mb-4">Establish Connection</h2>
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
                    alex@example.com
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
                    github.com/alexeldridge
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
                    linkedin.com/in/alexeldridge
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
            <p>&copy; {new Date().getFullYear()} Alex Eldridge. All rights reserved.</p>
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
