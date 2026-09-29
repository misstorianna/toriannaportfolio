import { Activity, Shield, Network, Server, Terminal } from "lucide-react";

export const stack = [
  { name: "Ubuntu", role: "Dedicated host", icon: Server, detail: "A repurposed Surface laptop running Ubuntu hosts the portfolio and monitoring stack." },
  { name: "Suricata", role: "Network detection", icon: Network, detail: "An intrusion detection layer that watches network traffic and produces security events." },
  { name: "CrowdSec", role: "Threat intelligence", icon: Shield, detail: "Adds community-powered threat intelligence and a path toward automated blocking." },
  { name: "Loki / Grafana", role: "Logs and views", icon: Activity, detail: "Centralizes logs and turns detection activity into views that are easier to inspect." },
];

export const buildLog = [
  { number: "01", title: "Build the Linux foundation", status: "Foundation", summary: "Started with Raspberry Pi OS, terminal work, file management, and SSH access from the local network.", detail: "Those early experiments made the command line and remote administration familiar before moving the monitoring stack onto a more capable dedicated Ubuntu host.", tags: ["Raspberry Pi OS", "Linux", "SSH"] },
  { number: "02", title: "Understand the home network", status: "Foundation", summary: "Worked through router and switch concepts, LAN connectivity, IP addressing, and local troubleshooting.", detail: "This networking context is the foundation for understanding what a network sensor can see, where events originate, and how the host fits into the larger environment.", tags: ["DNS / DHCP", "TCP/IP", "Networking"] },
  { number: "03", title: "Move the stack to Ubuntu", status: "Configured", summary: "Set up a dedicated Ubuntu machine as the home for the portfolio and security monitoring work.", detail: "Keeping the services on one dedicated host makes the system easier to reason about while the lab is still being built and documented.", tags: ["Ubuntu", "Nginx", "Dedicated host"] },
  { number: "04", title: "Add network detection with Suricata", status: "Working", summary: "Added Suricata as the intrusion detection layer for observing network activity and generating events.", detail: "Suricata answers the visibility question: what is happening on the network? Its detections become useful input for the rest of the observability stack.", tags: ["Suricata", "Intrusion detection", "Events"] },
  { number: "05", title: "Add threat intelligence with CrowdSec", status: "Working", summary: "Added CrowdSec to provide threat intelligence and identify behavior that should eventually drive a response.", detail: "Detection is working, but the response loop is not complete yet. The next milestone is a CrowdSec bouncer so flagged IPs are actually blocked instead of only logged.", tags: ["CrowdSec", "Threat intelligence", "Bouncer next"] },
  { number: "06", title: "Centralize logs and build views", status: "In progress", summary: "Connected the monitoring story to Loki, Promtail, and Grafana for centralized logs and visualization.", detail: "The current dashboard makes the activity inspectable. The next pass is to turn that foundation into more meaningful views and alerting for real security events.", tags: ["Loki", "Promtail", "Grafana"] },
];

export const projects = [
  {
    id: "sigma-rules",
    title: "Custom Sigma Detection Rules",
    category: "Research",
    status: "Ongoing",
    summary: "Writing and publishing custom Sigma rules for the homelab detection lab.",
    detail: "The work also includes investigation and phishing analysis writeups, keeping detection logic connected to the reasoning behind a finding rather than treating a rule as a black box.",
    stack: ["Sigma", "GitHub"],
  },
  {
    id: "pc-builds",
    title: "Custom PC Builds",
    category: "Hardware",
    status: "Complete",
    summary: "Built and troubleshot systems for gaming, virtual machines, cybersecurity labs, and research.",
    detail: "Built a high-end desktop with a Ryzen 7 9800X3D and RX 9070 XT, a second build on a Gigabyte B850 AORUS Elite board where a PSU and motherboard failure was diagnosed and resolved, and rebuilt an older Alienware machine with a clean Windows 11 install.",
    stack: ["Hardware diagnostics", "PC assembly", "Troubleshooting", "Ryzen 7 9800X3D", "RX 9070 XT"],
  },
];

export const pcBuildSpec = [
  { label: "CPU", value: "AMD Ryzen 7 9800X3D", ready: true },
  { label: "GPU", value: "RX 9070 XT", ready: true },
  { label: "Motherboard", value: "Gigabyte B850 AORUS ELITE WIFI7", ready: true },
  { label: "RAM", value: "32GB DDR5", ready: true },
  { label: "Storage", value: "TBD", ready: false },
];

export type WorkHighlight = { area: string; title: string; points: string[]; tags: string[] };
export type WorkRole = { company: string; role: string; dates: string; location: string; responsibilities: string[]; highlights?: WorkHighlight[] };

// Newest first.
export const workExperience: WorkRole[] = [
  {
    company: "Geek Squad, Best Buy",
    role: "Advanced Repair Agent",
    dates: "Sep 2026 – Present",
    location: "Burbank, IL",
    responsibilities: [
      "Diagnose and resolve hardware and software issues on customer devices using MRI diagnostic tools, including malware removal, disk repair, and OS restoration.",
      "Provide remote troubleshooting and support via AJU, resolving connectivity, performance, and software issues without requiring an in-store visit.",
      "Perform root-cause analysis on recurring hardware failures, reducing repeat service visits.",
      "Advise customers on repair options, data backup, and security best practices, translating technical findings into clear, actionable guidance.",
      "Maintain accurate service documentation and ticket records to support quality tracking and warranty compliance.",
      "Collaborate with senior technicians and precinct leadership to escalate complex repairs and ensure timely turnaround.",
    ],
  },
  {
    company: "Geek Squad, Best Buy",
    role: "Senior Repair Technician",
    dates: "Aug 2026 – Sep 2026",
    location: "North Riverside, IL",
    responsibilities: [
      "Diagnosed and troubleshot hardware and software issues across PCs, laptops, and consumer technology, determining root cause and the appropriate repair path.",
      "Performed repairs and diagnostics across components, power, storage, displays, networking, and peripherals.",
      "Used Repair Workbench to check devices in and out, document diagnostics and repairs, and track each repair through completion.",
      "Coached and supported a team of 7 Agents on repair procedures and technical troubleshooting as a senior resource for issues beyond entry-level scope.",
      "Communicated technical findings and repair timelines in clear, non-technical terms while resolving complex service situations.",
    ],
  },
  {
    company: "Bradley Cybersecurity Clinic",
    role: "Cybersecurity Analyst",
    dates: "Aug 2025 – Present",
    location: "Bradley University",
    responsibilities: [
      "Contribute to the creation of the Bradley Cybersecurity Clinic, focused on developing and applying cybersecurity audit processes for small-business assessments.",
    ],
  },
  {
    company: "Great Wolf Lodge — Corporate Team",
    role: "IT Corporate Support / Cybersecurity Intern",
    dates: "Jun 2025 – Aug 2025",
    location: "Remote",
    responsibilities: [],
    highlights: [
      {
        area: "Identity & Access",
        title: "SSO & Identity Work",
        points: [
          "Configured and deployed IdP-initiated SSO for core business applications via Microsoft Entra ID, using SAML and application role mapping.",
          "Troubleshot access issues with application owners, validated SSO functionality, and documented rollout procedures.",
        ],
        tags: ["Entra ID", "SAML", "SSO"],
      },
      {
        area: "SIEM Engineering",
        title: "Detection & Alerting Logic",
        points: [
          "Built custom LEQL detection rules in Rapid7 InsightIDR to flag unauthorized password storage, excessive MFA failures, and repeated VPN login attempts.",
        ],
        tags: ["Rapid7 InsightIDR", "LEQL", "MFA Monitoring"],
      },
      {
        area: "Security Awareness",
        title: "Phishing Awareness Campaigns",
        points: [
          "Built KnowBe4 phishing simulations with realistic HTML/CSS email templates for 3,000+ employees across U.S. lodge and corporate environments.",
          "Analyzed click rates and campaign results to identify high-risk users, report trends, and guide targeted retraining plans.",
          "Delivered phishing-awareness guidance to flagged users, reinforcing safe email handling and reporting practices.",
        ],
        tags: ["KnowBe4", "HTML/CSS", "Reporting"],
      },
    ],
  },
];

export const recentActivity = [
  { label: "Deployed CrowdSec on Ubuntu host", detail: "Homelab Detection Lab", status: "documented", icon: Shield },
  { label: "Published custom Sigma rule to GitHub", detail: "Detection research", status: "ongoing", icon: Terminal },
  { label: "Connected Loki / Promtail / Grafana", detail: "Visibility layer", status: "working", icon: Activity },
];

export const lastUpdated = {
  iso: "2026-09-29",
  label: "September 29, 2026",
  note: "Added a few UI fixes. I've also been studying how to create custom detection rules and expect to release a few today.",
};
