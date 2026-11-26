import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import NotFound from "@/pages/not-found";
import { CaseStudyPage, ContactPage, CredentialsPage, ExperiencePage, HomePage, ProjectsPage } from "@/pages/portfolio-pages";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/experience" component={ExperiencePage} />
      <Route path="/credentials" component={CredentialsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/projects/homelab-website">{() => <CaseStudyPage slug="homelab-website" />}</Route>
      <Route path="/projects/detection-system">{() => <CaseStudyPage slug="detection-system" />}</Route>
      <Route path="/projects/incident-env-scan">{() => <CaseStudyPage slug="incident-env-scan" />}</Route>
      <Route path="/projects/verified-enforcement">{() => <CaseStudyPage slug="verified-enforcement" />}</Route>
      <Route path="/projects/proxmox-lab">{() => <CaseStudyPage slug="proxmox-lab" />}</Route>
      <Route path="/homelab/website">{() => <CaseStudyPage slug="website" />}</Route>
      <Route path="/homelab/detection">{() => <CaseStudyPage slug="detection" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
