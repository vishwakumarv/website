export const profile = {
  name: "Vishwa Kumar",
  fullName: "Vishwa Kumar Venkateswaran",
  title: "SOC Analyst · DFIR Enthusiast · Security Operations",
  location: "Bengaluru, India",
  email: "vishwakumarv05@gmail.com",
  phone: "+91 9342236718",
  summary:
    "Final-year engineering student focused on blue team security — security monitoring, incident investigation, threat analysis, and security automation. I build small tools, write detailed writeups, and study how attackers operate so I can defend faster.",
  shortBio:
    "Aspiring SOC / DFIR analyst building detection, triage, and investigation skills through hands-on labs, CTFs, and open-source security tooling.",
  links: {
    github: "https://github.com/vishwakumarv",
    linkedin: "https://www.linkedin.com/in/vishwakumarv",
    bugcrowd: "https://bugcrowd.com/h/vishwakumarv",
    hackerone: "https://hackerone.com/vishwakumarv_",
    tryhackme: "https://tryhackme.com/p/vishwakumarv",
    hackthebox: "https://app.hackthebox.com/profile/vishwakumarv",
    writeups: "https://vishwakumarv.github.io",
    email: "mailto:vishwakumarv05@gmail.com",
    resume: "/Vishwa-Kumar-Resume.pdf",
  },
};

export const recruiterSnapshot = [
  { label: "Security Operations Focus", value: "Alert triage, monitoring, response workflows" },
  { label: "Linux Experience", value: "Daily-driver Linux, shell, system internals" },
  { label: "Security Research", value: "Web, OSINT, forensics, reverse engineering" },
  { label: "Documentation Skills", value: "Case-study writeups, IR-style reports" },
  { label: "Open Source Contributions", value: "Public tooling, writeups, lab artifacts" },
  { label: "Security Automation", value: "Python & Bash utilities for repeatable tasks" },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  relevance: string;
  tags: string[];
  period: string;
  summary: string;
  goal: string;
  problemSolved: string;
  tools: string[];
  methodology: string[];
  personalWork: string[];
  findings: string[];
  recommendations: string[];
  skills: string[];
  learnings: string[];
};

export const projects: Project[] = [
  {
    slug: "deadpixel",
    name: "DEADPIXEL",
    tagline: "Phishing Simulation & Awareness Research Toolkit",
    period: "Feb 2026 – May 2026",
    problem:
      "Security awareness programs lack realistic, controlled phishing scenarios to train users and validate defensive controls.",
    solution:
      "A lab-only phishing simulation toolkit with templated landing pages, tunnel-based hosting, and instrumented capture for analyst review.",
    relevance:
      "Demonstrates an attacker mindset SOC analysts need to recognize phishing TTPs, write detections, and document IR cases.",
    tags: ["Threat Analysis", "Security Automation", "Detection Engineering", "Incident Documentation"],
    summary:
      "DEADPIXEL is a controlled phishing simulation framework built for security awareness exercises and detection-engineering practice. It lets a blue team replay realistic social-engineering scenarios in an isolated lab and study what the resulting telemetry looks like.",
    goal:
      "Reproduce common phishing kill-chains end-to-end inside an isolated lab so the captured artifacts (URLs, headers, browser behavior, exfil patterns) can be used to write detections and train SOC playbooks.",
    problemSolved:
      "Most awareness tooling is either expensive SaaS or unrealistic static slides. DEADPIXEL closes the gap with a free, scriptable lab harness that produces analyst-grade telemetry suitable for detection tuning and tabletop exercises.",
    tools: ["Bash", "PHP", "HTML/JS", "Cloudflare Tunnel", "Linux", "Burp Suite", "Wireshark"],
    methodology: [
      "Mapped phishing campaigns to MITRE ATT&CK Initial Access techniques (T1566 family).",
      "Built modular HTML templates mirroring common SaaS login flows for awareness exercises.",
      "Wrapped delivery in tunnel-based hosting so engagements stay scoped and revocable.",
      "Captured browser-permission prompts, referer chains, and request headers for blue-team review.",
      "Documented each scenario with detection ideas and recommended log sources.",
    ],
    personalWork: [
      "Designed the toolkit architecture and authored every template, server-side handler, and capture script.",
      "Wrote the Bash deployment workflow and tunnel lifecycle automation.",
      "Performed all lab testing inside an isolated VM network with logging instrumented end-to-end.",
      "Produced the README, threat model, and ethical-use guardrails.",
    ],
    findings: [
      "Browser permission prompts (notifications, geolocation, clipboard) are a high-signal but under-monitored telemetry source.",
      "Tunnel-hosted phishing infrastructure leaves consistent header fingerprints that are trivially alertable.",
      "Most landing pages can be detected via JavaScript DOM heuristics before credential submission.",
    ],
    recommendations: [
      "Add proxy/EDR detections for known tunnel CDN headers and ephemeral subdomains.",
      "Alert on first-seen domains receiving credential-shaped POSTs from corporate browsers.",
      "Train users on the exact prompts simulated here, not abstract 'phishing awareness' slides.",
    ],
    skills: ["Threat Analysis", "Detection Engineering", "Security Automation", "Linux", "Documentation"],
    learnings: [
      "How seemingly small client-side signals (permission prompts, focus events) become useful detection primitives.",
      "Writing engagements as case studies sharpens both offensive and defensive thinking.",
      "Scoping and ethics frameworks matter as much as the technical kit.",
    ],
  },
  {
    slug: "redroid-ai",
    name: "ReDroid-AI",
    tagline: "Static Analysis Assistant for Android APKs",
    period: "Dec 2025 – Feb 2026",
    problem:
      "Triaging suspicious Android APKs by hand is slow — analysts repeat the same unpack-decompile-grep loop on every sample.",
    solution:
      "A Linux-based static analysis pipeline that extracts APKs, surfaces risky manifest entries, and highlights candidate code paths for review.",
    relevance:
      "Mirrors the daily work of a mobile-focused DFIR analyst: take a sample, produce structured evidence, hand off findings.",
    tags: ["Malware Analysis", "Reverse Engineering", "Security Automation", "Log Investigation"],
    summary:
      "ReDroid-AI is a Linux toolkit that automates the boring half of Android static analysis so an analyst can spend time on the interesting half. It produces a consistent evidence bundle per sample for case files.",
    goal:
      "Cut APK triage time from ~30 minutes of manual unpacking and grepping to a single command that returns a structured report.",
    problemSolved:
      "Analysts repeatedly run apktool, jadx, aapt, and grep in the same order on every sample. ReDroid-AI codifies that workflow and surfaces high-signal indicators (dangerous permissions, exported components, suspicious strings, hardcoded endpoints).",
    tools: ["Python", "Bash", "apktool", "jadx", "aapt2", "Ghidra", "Linux"],
    methodology: [
      "Wrapped apktool / jadx / aapt2 into a deterministic extraction pipeline.",
      "Parsed AndroidManifest.xml for dangerous permissions, exported activities, and intent filters.",
      "Scanned decompiled sources for high-signal strings: URLs, secrets, crypto constants, reflection patterns.",
      "Produced a per-sample report (Markdown + JSON) suitable for case files and ticketing.",
      "Validated the pipeline against a set of benign and known-suspicious lab samples.",
    ],
    personalWork: [
      "Designed and implemented the full pipeline solo.",
      "Authored the manifest and string heuristics based on common malware tradecraft references.",
      "Wrote the evidence-bundle format and the analyst-facing summary template.",
    ],
    findings: [
      "Most low-effort malicious APKs are catchable from manifest + string heuristics alone.",
      "Exported components and over-broad permissions remain the highest-yield triage signals.",
      "Hardcoded C2-style URLs frequently survive in obfuscated samples.",
    ],
    recommendations: [
      "Use static-first triage to filter samples before committing dynamic analysis time.",
      "Treat manifest review as a required first step in any mobile DFIR engagement.",
      "Keep evidence bundles in a consistent format so cases are comparable over time.",
    ],
    skills: ["Reverse Engineering", "Malware Analysis", "Python", "Bash", "Linux", "Documentation"],
    learnings: [
      "Repeatable evidence collection matters more than clever one-off analysis.",
      "Static analysis remains underrated as a triage layer.",
      "Designing for the analyst (not for yourself) changes tool ergonomics significantly.",
    ],
  },
  {
    slug: "pubot",
    name: "PuBOT",
    tagline: "Embedded Linux Control & Sensor Telemetry",
    period: "Aug 2025 – Oct 2025",
    problem:
      "Embedded and IoT devices are common blind spots in enterprise environments — analysts rarely get hands-on time with the firmware and sensor stacks they're asked to defend.",
    solution:
      "A Raspberry Pi platform with motor control, ultrasonic sensing, and instrumented Linux telemetry to learn the full embedded stack from kernel to sensor.",
    relevance:
      "Builds the Linux + hardware intuition that DFIR and OT-adjacent SOC roles draw on when triaging embedded incidents.",
    tags: ["Linux", "Security Automation", "Log Investigation", "Documentation"],
    summary:
      "PuBOT is a Raspberry Pi platform built to learn embedded Linux end-to-end: GPIO, sensors, motors, and the telemetry the OS produces while running them. It became a portable lab for studying how to monitor embedded devices.",
    goal:
      "Build first-hand intuition for the Linux + hardware boundary that DFIR analysts touch when investigating embedded or OT incidents.",
    problemSolved:
      "Most analysts only ever see embedded devices through abstract log feeds. PuBOT removes that abstraction by being a real device whose internals can be poked, broken, and re-instrumented.",
    tools: ["Raspberry Pi", "Python", "Linux", "systemd", "journalctl", "GPIO/UART", "Ultrasonic + DC motors"],
    methodology: [
      "Designed hardware integration for motors and ultrasonic sensors with safe GPIO handling.",
      "Built Python control loops with structured logging into the system journal.",
      "Used systemd units so the control stack behaves like a real production service.",
      "Investigated failure modes by reading journalctl, dmesg, and process state — DFIR style.",
    ],
    personalWork: [
      "Owned the full build: hardware wiring, control software, and Linux service packaging.",
      "Wrote the logging conventions and failure-mode playbook used during testing.",
      "Documented every iteration as a small case study.",
    ],
    findings: [
      "Most 'mysterious' embedded failures are visible in journalctl within seconds if you know what to look for.",
      "Sensor timing issues produce distinct log signatures that an analyst can baseline.",
      "Treating a hobby device like a production service surfaces real reliability lessons.",
    ],
    recommendations: [
      "Ship embedded devices with structured, centralized logging from day one.",
      "Train SOC analysts on at least one embedded Linux device they can physically touch.",
      "Use systemd unit hygiene as a baseline check for embedded fleet health.",
    ],
    skills: ["Linux", "Python", "Documentation", "Log Investigation", "Security Automation"],
    learnings: [
      "Hardware teaches debugging humility quickly.",
      "Good logging is a product feature, not an afterthought.",
      "DFIR muscles transfer cleanly to embedded reliability work.",
    ],
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readingMinutes: number;
  featured?: boolean;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "triaging-suspicious-apks-fast",
    title: "Triaging Suspicious APKs Fast: A Static-First Workflow",
    excerpt:
      "A repeatable static analysis playbook for Android samples — manifests, strings, and exported components in under five minutes.",
    category: "Malware Analysis",
    tags: ["Android", "Static Analysis", "Triage"],
    date: "2026-04-12",
    readingMinutes: 7,
    featured: true,
    body: [
      "Most APK triage time is spent re-running the same four commands. This post documents the static-first workflow I use, what each step is meant to surface, and where it stops being useful.",
      "Step 1 — Unpack with apktool. Step 2 — Read the manifest like an attacker. Step 3 — Grep for high-signal strings. Step 4 — Decide whether the sample warrants dynamic analysis.",
      "The point isn't to be exhaustive. It's to be fast and consistent so cases are comparable over time.",
    ],
  },
  {
    slug: "writing-an-ir-report-people-actually-read",
    title: "Writing an IR Report People Actually Read",
    excerpt:
      "Structure, voice, and the one section every incident report should lead with. Lessons from drafting case-study writeups.",
    category: "DFIR",
    tags: ["Incident Response", "Documentation", "Writeups"],
    date: "2026-03-21",
    readingMinutes: 6,
    featured: true,
    body: [
      "An IR report is read by people who weren't in the room and have ten minutes. Optimize for that.",
      "Lead with the timeline. Put findings before evidence. Recommendations belong at the top, not buried at the bottom.",
      "Anything else is for the appendix.",
    ],
  },
  {
    slug: "detection-ideas-from-phishing-labs",
    title: "Detection Ideas From a Weekend in a Phishing Lab",
    excerpt:
      "Three detections worth writing after spending a weekend simulating phishing kill-chains in an isolated network.",
    category: "Detection Engineering",
    tags: ["Detection", "Phishing", "Blue Team"],
    date: "2026-02-28",
    readingMinutes: 8,
    body: [
      "Running through phishing scenarios end-to-end always produces more detection ideas than reading about them.",
      "Three concrete ones came out of this weekend: tunnel CDN header fingerprints, first-seen domains receiving credential-shaped POSTs, and browser permission-prompt anomalies.",
      "Each one is small enough to implement in a sprint and useful enough to keep.",
    ],
  },
  {
    slug: "living-on-linux-as-a-blue-teamer",
    title: "Living on Linux as a Blue Teamer",
    excerpt:
      "Why a daily-driver Linux setup pays back compound interest for SOC and DFIR work — and the small habits that matter.",
    category: "Linux Research",
    tags: ["Linux", "Workflow", "Tooling"],
    date: "2026-02-10",
    readingMinutes: 5,
    body: [
      "There's a difference between knowing Linux and living on it. The compound interest only shows up when it's your default environment.",
      "journalctl muscle memory, tmux discipline, and a clean dotfiles repo do more for analyst speed than any single tool.",
    ],
  },
  {
    slug: "ghidra-notes-first-90-days",
    title: "Ghidra Notes: First 90 Days",
    excerpt:
      "What actually stuck after three months of Ghidra — and what I wish I had skipped in week one.",
    category: "Reverse Engineering",
    tags: ["Ghidra", "RE", "Notes"],
    date: "2026-01-18",
    readingMinutes: 6,
    body: [
      "Ghidra is wide. Most tutorials show you the parts you'll never use first.",
      "This is the short list of what actually mattered in my first 90 days: function signatures, structure recovery, and bookmark hygiene.",
    ],
  },
  {
    slug: "small-python-tools-soc-analysts-should-build",
    title: "Small Python Tools Every SOC Analyst Should Build",
    excerpt:
      "Five tiny scripts that compound: log parsers, IOC enrichers, evidence packagers. Build them once, save hours weekly.",
    category: "Security Tooling",
    tags: ["Python", "Automation", "SOC"],
    date: "2025-12-04",
    readingMinutes: 5,
    body: [
      "You don't need to ship a SOAR platform to feel the benefits of automation. Five small Python scripts cover most of the daily friction.",
      "Log parser, IOC enricher, evidence packager, ticket templater, and a Slack-friendly status pinger. Build once, use forever.",
    ],
  },
];

export const categories = [
  "All",
  "Malware Analysis",
  "DFIR",
  "Detection Engineering",
  "Linux Research",
  "Reverse Engineering",
  "Security Tooling",
];

export const skills = {
  "Security Operations": [
    "Alert Triage",
    "Log Investigation",
    "Incident Documentation",
    "Threat Analysis",
    "Detection Engineering",
    "Security Automation",
  ],
  "Tools & Platforms": [
    "Wireshark",
    "Burp Suite",
    "Ghidra",
    "Nmap",
    "Metasploit",
    "CyberChef",
    "Linux",
    "Git",
    "VirtualBox / QEMU",
  ],
  Languages: ["Python", "Bash", "C", "Java"],
  "Forensics & RE": [
    "Static Analysis",
    "Android APK Analysis",
    "Malware Triage",
    "Memory & Disk Basics",
  ],
};

export const certifications = [
  "Android Bug Bounty Hunting — EC-Council",
  "Cybersecurity Assessment",
  "BASH Training",
  "Kotlin Assessment",
  "Arduino Development",
];

export const education = [
  {
    school: "PSG College of Technology, Coimbatore",
    degree: "B.E. Electronics and Communication Engineering",
    period: "Aug 2023 – Jun 2027",
  },
];

export const experience = [
  {
    role: "Summer Intern",
    company: "Wimera Systems",
    location: "Bangalore, India (Onsite)",
    period: "May 2026 – Present",
    bullets: [
      "ESP32 IoT device testing and dashboard validation workflows.",
      "Exposure to Matter protocol, device debugging, and documentation practices.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "SaiKet Systems",
    location: "Remote",
    period: "Jan 2026 – Feb 2026",
    bullets: [
      "Applied ML for classification and anomaly detection on security-adjacent datasets.",
      "Data preprocessing, model tuning, and reproducible experiment documentation.",
    ],
  },
  {
    role: "Offensive Cyber Security Intern",
    company: "InLighnX Global Pvt. Ltd.",
    location: "Remote",
    period: "Oct 2025 – Dec 2025",
    bullets: [
      "Structured training across offensive and defensive security methodologies.",
      "Built Python security utilities including PDF protection and auth-testing harnesses.",
      "Hands-on with hashing (MD5/SHA), password cracking, and secure coding practices.",
    ],
  },
];
