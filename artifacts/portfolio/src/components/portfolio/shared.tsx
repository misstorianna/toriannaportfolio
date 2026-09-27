import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary">{children}</p>;
}

export function StatusDot() {
  return <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />;
}

export const LINKEDIN_URL = "https://www.linkedin.com/in/torianna";
