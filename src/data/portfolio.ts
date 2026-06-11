export const profile = {
  name: "V. Vishwa Kumar",
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
  body: string;
};

export const posts: Post[] = [
  {
    slug: "htb-cap-writeup",
    title: "HackTheBox — Cap Writeup",
    excerpt:
      "Pwning Cap on HackTheBox: exploiting an IDOR vulnerability in a Flask web app to grab FTP/SSH credentials from a PCAP, then escalating to root via Python's cap_setuid Linux capability.",
    category: "HackTheBox",
    tags: [
      "hackthebox",
      "htb",
      "linux",
      "easy",
      "idor",
      "pcap",
      "wireshark",
      "privilege-escalation",
      "linux-capabilities",
    ],
    date: "2026-06-04",
    readingMinutes: 6,
    featured: true,
    body: `## Box Info

| Field | Detail |
|-------|--------|
| Name | [Cap](https://www.hackthebox.com/machines/cap) |
| OS | Linux |
| Difficulty | Easy |
| IP | 10.10.10.245 |
| Points | 20 |
| Machine Creator | [InfoSecJack](https://app.hackthebox.eu/users/52045) |

---

## Introduction

Cap is a fun box where we find a \`flask\` web app which lets us download network logs, where we find \`FTP\` and \`SSH\` credentials for user \`nathan\`.

The box has \`python\` which has a capability to set \`UIDs\`, which lets us access \`root\`'s shell when \`UID\` is set to \`0\`.

---

## Reconnaissance

### MassScan Results

Masscan found 3 open ports.

\`\`\`bash
sudo masscan "10.10.10.245" -p1-65535,U:1-65535 --rate=500 -e tun0
\`\`\`

\`\`\`
Starting masscan 1.0.5 (http://bit.ly/14GZzcT) at 2021-06-19 14:47:10 GMT
 -- forced options: -sS -Pn -n --randomize-hosts -v --send-eth
Initiating SYN Stealth Scan
Scanning 1 hosts [131070 ports/host]
Discovered open port 21/tcp on 10.10.10.245
Discovered open port 80/tcp on 10.10.10.245
Discovered open port 22/tcp on 10.10.10.245
\`\`\`

### NMAP Scan Results

We then pass the ports from masscan into nmap for service/version detection.

\`\`\`bash
sudo nmap -sC -sV -oN cap.nmap 10.10.10.245 -p 21,22,80
\`\`\`

\`\`\`
# Nmap 7.80 scan initiated Sat Jun 19 14:46:38 2021 as: nmap -sC -sV -oA nmap 10.10.10.245
Nmap scan report for 10.10.10.245
Host is up (0.20s latency).

PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    gunicorn

Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

# Nmap done at Sat Jun 19 14:49:15 2021 -- 1 IP address (1 host up) scanned in 156.80 seconds
\`\`\`

So we have:

- An \`FTP\` server running on port \`21\`.
- A \`SSH\` server running on port \`22\`, running on Ubuntu Linux.
- A \`gunicorn\` web server on port \`80\` — meaning a Python application, likely \`flask\` or \`django\`.

---

## Foothold

Since FTP is open, we first try anonymous login:

- username: \`anonymous\` | password: \`anonymous\`

That does **not** work.

Next we head to the web server at \`http://cap.htb:80/\`.

We get a dashboard with user **Nathan** and four routes:

\`\`\`
/a          => Security Events overview (failed logins, port scans in last 24 hrs)
/capture    => downloads a .pcap file, redirects to /data/XX
/ip         => ifconfig output
/netstat    => netstat output
\`\`\`

### IDOR in /data/XX

The \`/capture\` endpoint redirects to \`/data/2\` (or a similar incrementing number). The \`XX\` is user-controlled and **not validated** — classic **IDOR**.

We request \`http://cap.htb/data/0\` and download \`0.pcap\`, which belongs to an earlier capture session.

### Extracting Credentials from the PCAP

Opening \`0.pcap\` in Wireshark and filtering on \`ftp\` reveals a successful plaintext FTP login:

- ✅ **FTP user:** \`nathan\`
- ✅ **FTP pass:** \`Buck3tH4TF0RM3!\`

We can grab \`user.txt\` over FTP, and the same credentials also work for SSH:

\`\`\`bash
ssh nathan@cap.htb
\`\`\`

\`user.txt\` captured ✅

---

## Privilege Escalation

Running \`sudo -l\` returns nothing useful.

We upload and run [LinEnum.sh](https://github.com/rebootuser/LinEnum/blob/master/LinEnum.sh) for further enumeration. It surfaces something interesting on the Python binary:

\`\`\`bash
/usr/bin/python3 = cap_setuid+eip
\`\`\`

**\`cap_setuid\`** allows a process to make arbitrary changes to its UID.

Since Python is already on the box (it's running the Flask app), we can call \`os.setuid(0)\` to become root without ever knowing the root password.

\`\`\`python
python3 -c "import os; os.setuid(0); os.system('/bin/bash')"
\`\`\`

We are **\`root\`** ✅

\`root.txt\` captured ✅

---

## Pwned

![Cap Pwned](/images/writeups/cap.jpeg)

---

## Key Takeaways

- **IDOR** on sequential numeric IDs is easy to miss but trivial to exploit — always fuzz \`/data/0\`, \`/data/1\`, etc.
- **Plaintext protocols** like FTP captured in PCAP files are a goldmine during post-exploitation.
- **Linux capabilities** (\`cap_setuid\`, \`cap_dac_read_search\`, etc.) are a common privesc vector — always enumerate with \`getcap -r / 2>/dev/null\`.
- **Credential reuse** between FTP and SSH is surprisingly common even in real environments.

---

## References

1. [Wireshark](https://www.wireshark.org/)
2. [Linux capabilities(7)](https://man7.org/linux/man-pages/man7/capabilities.7.html)
3. [What is setuid?](https://superuser.com/a/626845)
`,
  },

  {
    slug: "thundercipher-ctf-writeup",
    title: "ThunderCipher CTF Writeup",
    excerpt:
      "Writeups covering cryptography, OSINT, web exploitation, forensics, hardware analysis, and binary signal decoding challenges from ThunderCipher CTF.",
    category: "CTF",
    tags: [
      "thundercipher",
      "cryptography",
      "osint",
      "forensics",
      "web",
      "reverse",
    ],
    date: "2026-03-10",
    readingMinutes: 12,
    featured: true,
    body: `## Introduction

This post contains my writeups for several challenges from the **ThunderCipher CTF**.  
The challenges covered multiple domains including **Cryptography, OSINT, Web Exploitation, Forensics, Hardware Analysis, and Binary Signal Analysis**.

---

# 1. Easy Cipher

## Challenge Overview

The challenge provided only a ciphertext string without any additional files.

From its structure, it appeared to be an encoded string rather than encrypted data.

## Analysis

The string contained:

- Uppercase and lowercase letters
- Numbers
- A structure typical of encoded text

This pattern suggested **Base64 encoding**, which is commonly used in beginner cryptography challenges.

## Solution

I used **CyberChef** to decode the string using the Base64 decode function.

Steps:

1. Open CyberChef
2. Paste the ciphertext
3. Apply **From Base64**

The decoding immediately revealed the flag.

## Flag
ThunderCipher{34sy_b4s3}


---

# 2. Hidden in Plain Sight

## Challenge Overview

This OSINT challenge suggested that the flag was hidden on the **official ThunderCipher YouTube channel**.

## Investigation

Initial steps included:

- Checking the channel **bio**
- Reviewing **video descriptions**
- Looking through **comments**

At first, nothing appeared useful.

However, when revisiting the **bio section**, I noticed a blank-looking area after a message saying the flag was not there.

Scrolling further revealed hidden encoded text.

## Decoding

The text appeared to be **Base58 encoded**.

Using a Python script to decode it revealed the flag.

## Flag
ThunderCipher{thund3rc1ph3r_y0utub3!!}


---

# 3. Our Holy Father

## Challenge Overview

This OSINT challenge required identifying the **church shown in the provided image**.

## Investigation

Steps taken:

1. Uploaded the image to **Google Lens**
2. Identified architectural and location clues
3. Performed searches using the results

Google provided a **Maps result containing the complete church name**.

## Flag
ThunderCipher{Eglise_Notre_Dame_du_Vent}


---

# 4. Good Advice

## Challenge Overview

This challenge provided a **corrupted audio file**.

The file could not be played normally.

## Analysis

Using a hex dump, I noticed that the **WAV header was missing**, which explained why the audio player could not read it.

## Fixing the File

I restored the WAV header manually using Python and saved the repaired file.

After generating decoded_audio.wav, I listened to the file.

The audio contained spoken characters:
"A one" → A1
"W four" → W4nn
"Y S T H three" → YSTH3
"R three four U" → R34U


Combining them produced: A1W4YSTH3R34U


## Flag
ThunderCipher{A1W4YSTH3R34U}


---

# 5. Discord

## Challenge Overview

This miscellaneous challenge required checking the **official ThunderCipher Discord server**.

## Investigation

Inside the **general channel**, clicking the message:
Hi @everyone


revealed the flag.

## Flag
ThunderCipher{pinged_in_discord}


---

# 6. Web – Directory Discovery

## Investigation

Opening the provided link revealed nothing useful.

Inspecting the **page source** revealed a hint directing me to check: robots.txt


This file contained hidden directories.

Exploring them revealed the directory: /txt-of-thunder/


Inside the page source of this directory, the flag was present.

## Flag
ThunderCipher{txt_of_thunder_7681912}


---

# 7. Web – Source of Thunder

## Investigation

The webpage initially appeared normal.

Inspecting the **source code** revealed that the flag was split into three parts:

- First part in **HTML source**
- Second part in **style.css**
- Third part in **app.js**

Combining all parts reconstructed the complete flag.

---

# 8. Forensics – DMY1

## Analysis

After extracting the provided ZIP archive, I found a file: File.DMP


To analyze it, I used: foremost

to carve files from the dump.

The extraction produced several images.

One of the recovered images contained the flag.

## Flag
ThunderCipher{H0l4-4m!g0^}


---

# 9. I Hate That Scammer

## Investigation

The challenge contained a suspicious text file.

The content appeared encoded using a **scam-mimic style encoding**.

After several attempts, the correct password was identified as: SCAM


Using this password to decode the content revealed the flag.

## Flag
ThunderCipher{h3_us3d_t0_sp4m_w1th0ut_4_p4ssw0rd}


---

# 10. Convo 1

## Exploration

Extracting the archive: unzip Session.zip

produced: Session- Cap.sal
                   digital-0.bin
                   meta.json

The metadata indicated a **24 MHz sample rate**.

## Signal Analysis

The binary data revealed two pulse durations:
Short pulse ≈ 2.88M samples
Long pulse ≈ 8.64M samples

This timing pattern corresponds to **Morse Code (1T vs 3T)**.

## Decoding

A script converted the pulses to Morse symbols and then to ASCII.

Output: The Flag is D0ts4nDd4$h3s


## Flag
ThunderCipher{D0ts4nDd4$h3s}


---

# 11. Convo 2

## Dataset

This challenge contained a **3GB logic capture dataset**.

The metadata indicated: Sample Rate: 1 GHz
                        Probe: D0

## Analysis

Initial investigation suggested the signal represented **UART serial communication**.

Using brute force, the correct parameters were identified: Baud Rate: 230400
                                                           Polarity: Standard                        

## Decoding

The decoded stream revealed three encoded components:

| Encoding | Result |
|--------|--------|
| Hex | ThunderCipher{H3lL0_w |
| Base64 | 0RlD_1n_u |
| Base32 | 4Rt_#$!} |

Combining them produced the final flag.

## Flag
ThunderCipher{H3lL0_w0RlD_1n_u4Rt_#$!}


---

# 12. Panel – PCB Analysis

## Challenge Overview

The challenge included **Gerber files**, which are used in PCB manufacturing.

## Investigation

Using **pygerber**, I rendered the layers into images: python3 -m pygerber render raster -o InnerLayer4.png -d 40 Gerber_InnerLayer4.G4

The internal PCB layer contained a hidden string: KRUHK3TEMVZEG2LQNBSXE6ZBI4ZXEYS7KYYTG526FF5X2

The character set suggested **Base32 encoding**.

## Flag
ThunderCipher{!G3rb_V13w^}


---

# 13. Tree

## Analysis

The extracted JPEG file contained obfuscated text with printable ASCII characters and symbols.

The pattern matched **ROT47 encoding**.

ROT47 rotates characters within the ASCII range 33–126.

After decoding, the flag appeared.

## Flag
ThunderCipher{tr33s_4r3_h1dd3n}


---

# 14. Dotsies Font

## Investigation

The displayed message used the **Dotsies font**, which represents characters using dot patterns.

Decoding the dot patterns revealed the hidden message.

## Flag
ThunderCipher{JUST_TAKING_A_DOT_OUT_ON_A_DATE}


---

# 15. Unauthenticated Strike

## Step 1 – ZIP Password Crack

The ZIP archive was password-protected.

Using:
zip2john joel.zip > hash.txt
john --wordlist=wordlist.txt hash.txt


Recovered password: youfoundme1


## Step 2 – File Inspection

Extracted files are:
.hacker.jpeg
file.cap


Running \`strings\` on the image revealed encoded text.

Decoding the text using **ROT47** produced a Google Drive link containing the flag.

## Flag
ThunderCipher{y0u_f0und_m3_n1ce!}


---

# 16. CyberHunt

## Reconnaissance

Using Nmap: nmap -sT -p- --min-rate=1000 <TARGET_IP>

Open ports: 22 – SSH and 80 – HTTP


## Web Enumeration
gobuster dir -u http://target/cgi-bin/ -w common.txt -x sh,cgi


Discovered: /cgi-bin/test.sh

## Exploitation – Shellshock

Testing with: curl -H "User-Agent: () { :; }; echo; /bin/id" http://target/cgi-bin/test.sh


confirmed **Shellshock RCE**.

## Privilege Escalation

Kernel version: 3.2.0


This version is vulnerable to **Dirty COW (CVE-2016-5195)**.

Using the exploit allowed modification of \`/etc/passwd\`, creating a root user.

## Final Flag
ThunderCipher{dirty_cow_owned_the_kernel_08918}


---

# Conclusion

This CTF included challenges across multiple domains:

- Cryptography
- OSINT
- Web exploitation
- Digital forensics
- Hardware analysis
- Binary signal decoding
- Full system exploitation

Each challenge required a combination of **technical tools, analytical reasoning, and reverse engineering techniques**.`,
  },

  {
    slug: "sillyctf-2026-writeups",
    title: "SillyCTF 2026 Writeups",
    excerpt:
      "Archive of challenge writeups covering cryptography, forensics, OSINT, steganography, and web exploitation.",
    category: "CTF",
    tags: [
      "ctf",
      "cryptography",
      "forensics",
      "osint",
      "steganography",
      "web",
    ],
    date: "2026-05-14",
    readingMinutes: 10,
    body: `# SillyCTF 2026 — Complete Writeups Archive

Repository: https://github.com/vishwakumarv/SillyCTF2026-Writeups


# Crypto

## Cryptos

\`\`\`markdown
# Cryptos

## Challenge Description
Cryptography challenge from SillyCTF 2026.

## Category
Crypto

## Focus Areas
- Cipher Analysis
- Decoding
- Cryptographic Enumeration

## Methodology
The challenge involved identifying the cryptographic pattern and analyzing the encoded content step by step.

## Skills Used
- Cryptanalysis
- Pattern Recognition
- Encoding Analysis

## Tools
- CyberChef
- Python
- Online Decoders

## Learning Outcome
Understanding how layered encodings and cryptographic transformations can be reversed systematically.
\`\`\`

---

## ECC

\`\`\`markdown
# ECC

## Challenge Description
Elliptic Curve Cryptography based challenge.

## Category
Crypto

## Focus Areas
- ECC Analysis
- Mathematical Reconstruction
- Cryptographic Weakness Analysis

## Skills Used
- Python Scripting
- ECC Understanding
- Parameter Analysis

## Tools
- SageMath
- Python

## Learning Outcome
Improved understanding of elliptic curve cryptographic concepts and attack methodology.
\`\`\`

---

## Kyber

\`\`\`markdown
# Kyber

## Challenge Description
Post-Quantum Cryptography challenge based on Kyber.

## Category
Crypto

## Focus Areas
- Lattice Cryptography
- Kyber Analysis
- Post-Quantum Concepts

## Skills Used
- PQC Understanding
- Cryptanalysis

## Tools
- Python
- SageMath

## Learning Outcome
Introduction to post-quantum cryptographic schemes and Kyber internals.
\`\`\`

---

## Quick Maths

\`\`\`markdown
# Quick Maths

## Challenge Description
Math-based cryptographic challenge.

## Category
Crypto

## Focus Areas
- Fast Computation
- Modular Arithmetic
- Number Theory

## Skills Used
- Mathematical Reasoning
- Python Scripting

## Tools
- Python

## Learning Outcome
Applying mathematical concepts to cryptographic problem solving.
\`\`\`

---

## RSA

\`\`\`markdown
# RSA

## Challenge Description
RSA cryptography challenge involving parameter analysis.

## Category
Crypto

## Focus Areas
- RSA Weaknesses
- Prime Factorization
- Key Recovery

## Skills Used
- Modular Arithmetic
- RSA Analysis
- Scripting

## Tools
- Python
- RsaCtfTool

## Learning Outcome
Understanding practical RSA attack surfaces and exploitation techniques.
\`\`\`

---

## Six to the Seven

\`\`\`markdown
# Six to the Seven

## Challenge Description
Cryptographic puzzle challenge.

## Category
Crypto

## Focus Areas
- Encoding Logic
- Number Transformation

## Skills Used
- Logical Analysis
- Pattern Recognition

## Tools
- Python

## Learning Outcome
Developing systematic approaches for decoding custom transformations.
\`\`\`

---

# Forensics

## Cartmans Business Venture

\`\`\`markdown
# Cartmans Business Venture

## Challenge Description
Digital forensics challenge involving artifact analysis.

## Category
Forensics

## Focus Areas
- Metadata Inspection
- File Analysis
- Artifact Recovery

## Skills Used
- Investigative Analysis
- Data Inspection

## Tools
- exiftool
- strings
- binwalk

## Learning Outcome
Understanding digital artifact extraction and forensic investigation workflow.
\`\`\`

---

## Fortnite Dumpy

\`\`\`markdown
# Fortnite Dumpy

## Challenge Description
Forensics challenge requiring extraction and analysis of hidden data.

## Category
Forensics

## Focus Areas
- Data Recovery
- Memory/File Inspection
- Hidden Information Analysis

## Skills Used
- File Carving
- Metadata Analysis
- Binary Inspection

## Tools
- binwalk
- foremost
- strings
- exiftool

## Learning Outcome
Practical exposure to digital forensics and hidden data recovery.
\`\`\`

---

## Rot Transmit

\`\`\`markdown
# Rot Transmit

## Challenge Description
Forensics and transmission decoding challenge.

## Category
Forensics

## Focus Areas
- Transmission Analysis
- Encoding Recovery
- Signal Interpretation

## Skills Used
- Pattern Recognition
- Encoding Analysis

## Tools
- CyberChef
- Python

## Learning Outcome
Learning how encoded forensic transmissions can be reconstructed and decoded.
\`\`\`

---

# OSINT

## Grass Toucher 3000

\`\`\`markdown
# Grass Toucher 3000

## Challenge Description
Open-source intelligence challenge.

## Category
OSINT

## Focus Areas
- Information Gathering
- Online Enumeration

## Skills Used
- Search Techniques
- Metadata Collection

## Tools
- Google Dorking
- Social Enumeration

## Learning Outcome
Understanding structured OSINT investigation workflows.
\`\`\`

---

## INTERNATIONAL BRAINROT

\`\`\`markdown
# INTERNATIONAL BRAINROT

## Challenge Description
OSINT challenge involving internet-based research.

## Category
OSINT

## Focus Areas
- Research Methodology
- Public Data Correlation

## Skills Used
- Investigation
- Correlation Analysis

## Tools
- Search Engines
- Public Databases

## Learning Outcome
Improving information tracing and public intelligence gathering.
\`\`\`

---

## Oh My God, They Killed Kenny!

\`\`\`markdown
# Oh My God, They Killed Kenny!

## Challenge Description
OSINT investigation challenge.

## Category
OSINT

## Focus Areas
- Geolocation
- Online Investigation
- Public Information Correlation

## Skills Used
- Reverse Search
- Data Correlation

## Tools
- Google Maps
- Reverse Image Search

## Learning Outcome
Developing structured online investigation methodology.
\`\`\`

---

## Sussiest Challenge

\`\`\`markdown
# Sussiest Challenge

## Challenge Description
OSINT-based intelligence gathering challenge.

## Category
OSINT

## Focus Areas
- Public Information Gathering
- Enumeration

## Skills Used
- Investigation
- Search Correlation

## Tools
- Google
- Metadata Tools

## Learning Outcome
Understanding practical OSINT workflows and analysis.
\`\`\`

---

# Steganography

## Like A Rolling Stone

\`\`\`markdown
# Like A Rolling Stone

## Challenge Description
Steganography challenge involving hidden data.

## Category
Stego

## Focus Areas
- Hidden Data Extraction
- File Inspection

## Skills Used
- Steganalysis
- Binary Inspection

## Tools
- stegsolve
- zsteg
- strings

## Learning Outcome
Understanding practical steganographic analysis techniques.
\`\`\`

---

## Only in Ohio

\`\`\`markdown
# Only in Ohio

## Challenge Description
Steganography challenge focused on uncovering concealed information.

## Category
Stego

## Focus Areas
- Embedded Data Analysis
- Hidden Message Recovery

## Skills Used
- Steganography Analysis
- Pattern Recognition

## Tools
- zsteg
- binwalk

## Learning Outcome
Improved understanding of hidden data extraction techniques.
\`\`\`

---

# Web Exploitation

## Brainrot Inject

\`\`\`markdown
# Brainrot Inject

## Challenge Description
Web exploitation challenge involving injection vulnerabilities.

## Category
Web

## Focus Areas
- Injection Attacks
- Input Validation Weaknesses

## Skills Used
- Payload Crafting
- Enumeration

## Tools
- Burp Suite
- Browser DevTools

## Learning Outcome
Understanding web injection attack vectors and exploitation workflow.
\`\`\`

---

## Hit Me

\`\`\`markdown
# Hit Me

## Challenge Description
Web challenge focused on request manipulation and exploitation.

## Category
Web

## Focus Areas
- HTTP Analysis
- Request Manipulation

## Skills Used
- Traffic Inspection
- Web Enumeration

## Tools
- curl
- Burp Suite

## Learning Outcome
Developing understanding of HTTP exploitation methodology.
\`\`\`

---

## Pibble

\`\`\`markdown
# Pibble

## Challenge Description
Web exploitation challenge involving application analysis.

## Category
Web

## Focus Areas
- Web Enumeration
- Vulnerability Discovery

## Skills Used
- Manual Testing
- Payload Testing

## Tools
- Burp Suite
- Browser DevTools

## Learning Outcome
Understanding systematic web vulnerability discovery and exploitation.
\`\`\`

---

## Real Time Rizz

\`\`\`markdown
# Real Time Rizz

## Challenge Description
Real-time web exploitation challenge.

## Category
Web

## Focus Areas
- Dynamic Request Analysis
- Real-time Exploitation

## Skills Used
- Web Testing
- Traffic Manipulation

## Tools
- Burp Suite
- WebSockets Analysis

## Learning Outcome
Understanding live request analysis and exploitation workflows.
\`\`\`

---

# Technical Skills Demonstrated

* Reverse Engineering
* Digital Forensics
* Cryptanalysis
* Binary Inspection
* Steganography
* OSINT Investigation
* Web Exploitation
* Vulnerability Analysis
* Python Scripting
* Enumeration
* Traffic Analysis
* Metadata Inspection

---

# Tools & Technologies Used

* Python
* Burp Suite
* Ghidra
* binwalk
* exiftool
* CyberChef
* pwntools
* GDB
* SageMath
* Browser DevTools
* curl
* stegsolve
* zsteg

---

# Repository Structure

\`\`\`text
writeups/
├── crypto/
├── forensics/
├── misc/
├── osint/
├── pwn/
├── rev/
├── stego/
└── web/
\`\`\`

---

# Repository

[https://github.com/vkumxr/SillyCTF2026-Writeups](https://github.com/vkumxr/SillyCTF2026-Writeups)`,
  },

  {
    slug: "evilginx-mfa-analysis",
    title: "Why MFA Alone Isn't Saving Organizations Anymore",
    excerpt:
      "Analysis of adversary-in-the-middle phishing techniques, MFA limitations, session hijacking risks, and defensive considerations.",
    category: "Security Research",
    tags: [
      "phishing",
      "evilginx",
      "redteam",
      "mfa",
      "security",
    ],
    date: "2026-05-20",
    readingMinutes: 8,
    body: `# Why MFA Alone Isn't Saving Organizations Anymore

## Introduction

Multi-Factor Authentication (MFA) remains one of the most effective defenses against account compromise. However, modern phishing techniques have evolved significantly, allowing attackers to bypass protections that were once considered highly reliable.

This article explores why MFA should be viewed as a layer of defense rather than a complete solution and discusses how organizations can better protect users against modern phishing attacks.

---

## The Evolution of Phishing

Traditional phishing attacks focused on stealing usernames and passwords through fake login pages.

As MFA adoption increased, attackers adapted. Instead of targeting credentials alone, they began targeting authenticated sessions and user trust.

Modern phishing campaigns often attempt to:

* Capture credentials
* Trick users into approving MFA prompts
* Steal authenticated browser sessions
* Abuse legitimate cloud services
* Evade traditional email security controls

The result is that a user may successfully complete MFA while an attacker still gains access to the account.

---

## Understanding Adversary-in-the-Middle Attacks

An Adversary-in-the-Middle (AiTM) attack places an attacker-controlled system between a victim and a legitimate service.

From the user's perspective:

1. The login page appears genuine.
2. Credentials are entered normally.
3. MFA is completed successfully.
4. Access appears legitimate.

However, the attacker may intercept authentication artifacts generated during the process.

This technique demonstrates an important security principle:

> MFA verifies identity during authentication, but it does not automatically protect authenticated sessions afterward.

---

## Why MFA Alone Is Not Enough

Organizations often deploy MFA and assume account compromise risks have been eliminated.

In reality, attackers increasingly target:

* Session tokens
* Browser trust relationships
* OAuth consent grants
* Device enrollment processes
* Social engineering weaknesses

These techniques focus on bypassing the protection indirectly rather than defeating MFA itself.

---

## Detection Opportunities

Security teams can improve visibility by monitoring:

### Impossible Travel Events

Users appearing in multiple geographic locations within unrealistic timeframes.

### New Device Registrations

Unexpected devices accessing sensitive services.

### Unusual Session Activity

Authentication sessions that deviate from established user behavior.

### Token Abuse Indicators

Repeated access from unfamiliar systems using valid sessions.

### Risk-Based Authentication Events

Identity provider alerts indicating suspicious sign-ins.

---

## Defensive Recommendations

Organizations should consider:

* Phishing-resistant MFA where possible
* Strong conditional access policies
* Continuous session monitoring
* Device trust validation
* User awareness training
* Security logging and alerting improvements
* Regular incident response exercises

Security should be treated as multiple layers working together rather than reliance on a single control.

---

## Key Takeaway

MFA remains essential and should be enabled everywhere possible.

However, modern attackers increasingly focus on techniques that operate around MFA rather than directly attacking it.

Organizations that combine MFA with strong monitoring, device trust, conditional access policies, and user education are significantly better positioned to defend against modern phishing threats.

MFA is a powerful control—but it is not the final layer.
`,
  },
];

export const categories = [
  "All",
  "CTF",
  "HackTheBox",
  "Security Research",
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
    location: "Bangalore, Karnataka (Onsite)",
    period: "May 2026 – Present",
    bullets: [
      "Working on ESP32-based IoT device testing and dashboard validation workflows.",
      "Gaining hands-on exposure to Matter protocol concepts and IoT application debugging.",
      "Assisting in device monitoring, documentation, and embedded systems testing.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "SaiKet Systems",
    location: "Bangalore, Karnataka (Remote)",
    period: "Jan 2026 – Feb 2026",
    bullets: [
      "Worked on ML-based workflows using Python and Hugging Face models for cybersecurity-related datasets and anomaly detection.",
      "Assisted in data preprocessing, model evaluation, and experimental documentation.",
    ],
  },
  {
    role: "Offensive Cyber Security Intern",
    company: "InLighnX Global Pvt. Ltd.",
    location: "Bangalore, Karnataka (Remote)",
    period: "Oct 2025 – Dec 2025",
    bullets: [
      "Worked on offensive cybersecurity concepts through hands-on Python-based security tool development in controlled testing environments.",
      "Developed utilities including PDF protection, credential testing, and authentication analysis tools.",
      "Gained practical exposure to vulnerability assessment, encryption workflows, and penetration testing fundamentals.",
    ],
  },
];