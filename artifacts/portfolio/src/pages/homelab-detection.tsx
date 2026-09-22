import { useState, useRef, useEffect, type MutableRefObject } from "react";
import { Link } from "wouter";
import { ArrowLeft, Radar, Zap, CheckCircle2, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { SectionLabel } from "./home";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { stack, buildLog } from "@/data/portfolio";

function BuildLog({ selectedBuildStep, selectBuildStep, buildStepRefs }: { selectedBuildStep: number; selectBuildStep: (index: number, moveFocus?: boolean) => void; buildStepRefs: MutableRefObject<Array<HTMLButtonElement | null>> }) {
  const step = buildLog[selectedBuildStep];
  return (
    <div id="homelab-build-log" className="scroll-mt-24">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <SectionLabel>02 / Build log</SectionLabel>
          <h3 className="text-2xl font-medium">From foundations to a working stack</h3>
        </div>
        <BookOpen className="hidden h-5 w-5 text-primary/70 sm:block" />
      </div>
      <p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">Open a step to see what it contributed and where it stands.</p>
      <div className="border border-border bg-card p-4 sm:p-6">
        <div className="overflow-x-auto pb-3">
          <div role="tablist" aria-label="Homelab build milestones" className="relative flex min-w-[44rem] items-start justify-between gap-2 px-2">
            <div className="pointer-events-none absolute left-8 right-8 top-4 h-px bg-border" />
            {buildLog.map((item, index) => { 
              const selected = index === selectedBuildStep; 
              const complete = index < selectedBuildStep; 
              return (
                <button 
                  key={item.number} 
                  ref={element => { buildStepRefs.current[index] = element; }} 
                  type="button" 
                  role="tab" 
                  id={`homelab-build-step-${item.number}`} 
                  aria-selected={selected} 
                  aria-controls="homelab-build-step-panel" 
                  tabIndex={selected ? 0 : -1} 
                  aria-label={`Step ${item.number}: ${item.title}. Status: ${item.status}.`} 
                  onClick={() => selectBuildStep(index)} 
                  onKeyDown={event => { 
                    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); selectBuildStep((index + 1) % buildLog.length, true); } 
                    if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); selectBuildStep((index - 1 + buildLog.length) % buildLog.length, true); } 
                    if (event.key === "Home") { event.preventDefault(); selectBuildStep(0, true); } 
                    if (event.key === "End") { event.preventDefault(); selectBuildStep(buildLog.length - 1, true); } 
                  }} 
                  className="group relative z-10 flex min-w-16 flex-1 flex-col items-center gap-2 rounded px-1 py-1 text-center"
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card font-mono text-[10px] transition-colors ${selected ? "border-primary bg-primary text-primary-foreground" : complete ? "border-primary/60 text-primary" : "border-border text-muted-foreground group-hover:border-primary/60"}`}>
                    {complete ? <CheckCircle2 className="h-4 w-4" /> : item.number}
                  </span>
                  <span className={`max-w-24 text-[10px] leading-tight ${selected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {item.title}
                  </span>
                </button>
              ); 
            })}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="font-mono text-[10px] text-muted-foreground">Showing <span className="text-foreground">{String(selectedBuildStep + 1).padStart(2, "0")}</span> / {String(buildLog.length).padStart(2, "0")}</p>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => selectBuildStep(selectedBuildStep - 1)} disabled={selectedBuildStep === 0} aria-label="Show previous homelab milestone"><ChevronLeft className="h-3 w-3" /><span className="hidden sm:inline">Previous</span></Button>
            <Button type="button" variant="outline" size="sm" onClick={() => selectBuildStep(selectedBuildStep + 1)} disabled={selectedBuildStep === buildLog.length - 1} aria-label="Show next homelab milestone"><span className="hidden sm:inline">Next</span><ChevronRight className="h-3 w-3" /></Button>
          </div>
        </div>
        <div id="homelab-build-step-panel" role="tabpanel" tabIndex={0} aria-labelledby={`homelab-build-step-${step.number}`} className="mt-5 border border-primary/25 bg-primary/[.04] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">Milestone {step.number}</p>
              <h4 className="mt-2 text-xl font-medium">{step.title}</h4>
            </div>
            <Badge variant="outline" className="w-fit font-mono text-[10px] text-primary/80">{step.status}</Badge>
          </div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-foreground/85">{step.summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {step.tags.map(tag => <Badge key={tag} variant="outline" className="font-mono text-[10px] font-normal text-muted-foreground">{tag}</Badge>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomelabDetection() {
  const [selectedBuildStep, setSelectedBuildStep] = useState(0);
  const buildStepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  
  const selectBuildStep = (index: number, moveFocus = false) => { 
    const next = Math.max(0, Math.min(index, buildLog.length - 1)); 
    setSelectedBuildStep(next); 
    if (moveFocus) buildStepRefs.current[next]?.focus(); 
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Detection Lab | Torianna's Homelab";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "Network detection and response stack with CrowdSec, Suricata, Loki, and Grafana.");
  }, []);

  return (
    <div className="qcr min-h-[100dvh] circuit-zone">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-12">
          <Link href="/#homelab" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Homelab
          </Link>
          <div className="flex items-center gap-3 text-primary mb-4">
            <Radar className="h-6 w-6" />
            <SectionLabel>Detection System</SectionLabel>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-4">Detection Lab</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            CrowdSec and Suricata feed a Loki and Grafana observability stack for network detection and response.
          </p>
        </div>

        <div className="space-y-12">
          <div className="border border-primary/30 bg-primary/[.05] p-6 sm:p-8">
            <div className="flex gap-4">
              <Zap className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <SectionLabel>Detection system / current state</SectionLabel>
                <p className="max-w-3xl text-xl font-medium leading-relaxed">
                  Detection is working on a dedicated Ubuntu host. The next step is closing the loop with automated blocking, better dashboard views, and alerting for real security events.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["CrowdSec", "Suricata", "Loki / Grafana", "Ubuntu"].map(tag => (
                <Badge key={tag} variant="outline" className="font-mono text-[10px] text-primary/85">{tag}</Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <SectionLabel>01 / The system</SectionLabel>
                <h3 className="text-2xl font-medium">Stack at a glance</h3>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:block">detection / response / visibility</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {stack.map(item => { 
                const Icon = item.icon; 
                return (
                  <div key={item.name} className="flex gap-4 border border-border bg-card p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-primary/50">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/25 bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-primary/80">{item.role}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ); 
              })}
            </div>
          </div>

          <BuildLog 
            selectedBuildStep={selectedBuildStep} 
            selectBuildStep={selectBuildStep} 
            buildStepRefs={buildStepRefs} 
          />

          <div className="border border-primary/30 bg-primary/[.04] p-6">
            <SectionLabel>Next step</SectionLabel>
            <h3 className="text-xl font-medium">Close the loop from detection to response</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              I&apos;m working on adding a CrowdSec bouncer so flagged IPs actually get blocked instead of just logged, along with building out more meaningful dashboard views and alerting for real security events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
