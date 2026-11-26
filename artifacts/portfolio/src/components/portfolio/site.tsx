import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { LINKEDIN_URL } from "./shared";

export const portfolioLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  return <div className="portfolio">
    <header className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="Torianna, home">
          <span>Torianna<small>Security portfolio</small></span>
        </Link>
        <nav id="mobile-navigation" className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {portfolioLinks.map(item => {
            const active = item.href === "/" ? location === "/" : location === item.href || location.startsWith(`${item.href}/`);
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
          })}
        </nav>
        <div className="nav-actions">
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}<span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button type="button" className="mobile-trigger" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="site-footer"><div className="site-footer-inner"><span>November 2026 · Torianna · Chicago, IL</span><span>Cybersecurity · Systems · Detection</span></div></footer>
  </div>;
}

export function Eyebrow({ children }: { children: ReactNode }) { return <p className="eyebrow">{children}</p>; }

export function PageTitle({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <section className="page-hero"><div className="container"><Eyebrow>{label}</Eyebrow><h1 className="display">{title}</h1>{children && <p>{children}</p>}</div></section>;
}

export function SocialAction({ label, href }: { label: string; href: string }) {
  return <a className="contact-action" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{label}<ArrowUpRight size={18} /></a>;
}

export function ProjectLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="button-secondary">{children}<ArrowRight size={17} /></Link>;
}

export { LINKEDIN_URL };
