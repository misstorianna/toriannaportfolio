import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Server } from "lucide-react";
import { SectionLabel } from "./home";

export default function HomelabWebsite() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "This Website | Torianna's Homelab";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "Infrastructure and deployment pipeline for the portfolio site.");
  }, []);

  return (
    <div className="qcr min-h-[100dvh] circuit-zone">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-12">
          <Link href="/#homelab" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Homelab
          </Link>
          <div className="flex items-center gap-3 text-primary mb-4">
            <Server className="h-6 w-6" />
            <SectionLabel>Website infrastructure</SectionLabel>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-4">This Website</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A self-hosted portfolio with nginx, DNS, Cloudflare Tunnel, and a GitHub-based auto-deploy pipeline.
          </p>
        </div>

        <div className="space-y-12">
          <div className="border border-border bg-card p-6 sm:p-8">
            <h3 className="text-2xl font-medium">Deployment Pipeline</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The portfolio is a public site hosted through nginx on the Ubuntu machine, with Cloudflare Tunnel and DNS keeping the public surface narrow.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[["01", "GitHub commit"], ["02", "Cron checks / 5 min"], ["03", "nginx redeploy"]].map(([number, label]) => (
                <div key={number} className="border border-border bg-muted/40 p-4">
                  <span className="font-mono text-xs text-primary">{number}</span>
                  <p className="mt-3 text-sm">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              A cron job on the Ubuntu host checks GitHub every 5 minutes. When it finds a new commit, it pulls the change, rebuilds the site, clears out old build files, and redeploys without manual server work.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">Lessons & Breakages</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground block mb-2">The trailing slash problem.</strong> 
                A <code className="bg-muted px-1 text-xs text-foreground">cp</code> command was nesting fresh files instead of replacing the live site, leaving stale content online until the deployed files were compared with the build output.
              </div>
              <div className="border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground block mb-2">The sudoers constraint.</strong> 
                Passwordless sudo rules had to match the deploy script&apos;s exact commands, so the copy step was rewritten without relying on a wildcard path.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
