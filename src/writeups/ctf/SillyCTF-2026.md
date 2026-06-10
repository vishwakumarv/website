---
title: "SillyCTF 2026 Writeups"
date: 2026-05-14
category: CTF
tags: [cryptography, reverse, web, forensics, osint, steganography]
image:
  path: /assets/img/posts/SillyCTF.png
excerpt: Complete writeups and solutions for SillyCTF 2026 CTF challenges across Crypto, Forensics, OSINT, Steganography, and Web Exploitation.
---

# SillyCTF 2026 — Complete Writeups

> **Repository:** [github.com/vishwakumarv/SillyCTF2026-Writeups](https://github.com/vishwakumarv/SillyCTF2026-Writeups)

---

## Table of Contents

- [Cryptography](#cryptography)
  - [Cryptos](#cryptos)
  - [ECC](#ecc)
  - [Kyber](#kyber)
  - [Quick Maths](#quick-maths)
  - [RSA](#rsa)
  - [Six to the Seven](#six-to-the-seven)
- [Forensics](#forensics)
  - [Cartmans Business Venture](#cartmans-business-venture)
  - [Fortnite Dumpy](#fortnite-dumpy)
  - [Rot Transmit](#rot-transmit)
- [OSINT](#osint)
  - [Grass Toucher 3000](#grass-toucher-3000)
  - [INTERNATIONAL BRAINROT](#international-brainrot)
  - [Oh My God, They Killed Kenny!](#oh-my-god-they-killed-kenny)
  - [Sussiest Challenge](#sussiest-challenge)
- [Steganography](#steganography)
  - [Like A Rolling Stone](#like-a-rolling-stone)
  - [Only in Ohio](#only-in-ohio)
- [Web Exploitation](#web-exploitation)
  - [Brainrot Inject](#brainrot-inject)
  - [Hit Me](#hit-me)
  - [Pibble](#pibble)
  - [Real Time Rizz](#real-time-rizz)

---

## Cryptography

### Cryptos

| Field | Detail |
|-------|--------|
| **Category** | Crypto |
| **Tools** | CyberChef, Python, Online Decoders |
| **Skills** | Cryptanalysis, Pattern Recognition, Encoding Analysis |

**Approach:** Identified the cryptographic pattern and reversed layered encodings step by step.

**Focus Areas:** Cipher Analysis · Decoding · Cryptographic Enumeration

**Key Takeaway:** Layered encodings and cryptographic transformations can be reversed systematically by identifying each layer's signature before attempting to decode.

---

### ECC

| Field | Detail |
|-------|--------|
| **Category** | Crypto |
| **Tools** | SageMath, Python |
| **Skills** | Python Scripting, ECC Understanding, Parameter Analysis |

**Approach:** Analyzed elliptic curve parameters to identify mathematical weaknesses and reconstruct the cryptographic operation.

**Focus Areas:** ECC Analysis · Mathematical Reconstruction · Cryptographic Weakness Analysis

**Key Takeaway:** Weak or reused curve parameters in ECC implementations can expose the private key to recovery attacks.

---

### Kyber

| Field | Detail |
|-------|--------|
| **Category** | Crypto |
| **Tools** | Python, SageMath |
| **Skills** | PQC Understanding, Cryptanalysis |

**Approach:** Explored the structure of Kyber's lattice-based scheme and analyzed where the challenge deviated from the standard spec.

**Focus Areas:** Lattice Cryptography · Kyber Analysis · Post-Quantum Concepts

**Key Takeaway:** Introduction to attacking post-quantum cryptographic schemes — understanding the underlying lattice math is essential before attempting any analysis.

---

### Quick Maths

| Field | Detail |
|-------|--------|
| **Category** | Crypto |
| **Tools** | Python |
| **Skills** | Logical Analysis, Pattern Recognition, Modular Arithmetic |

**Approach:** Decoded a custom transformation by identifying the number-theoretic pattern and scripting a fast reversal.

**Focus Areas:** Fast Computation · Modular Arithmetic · Number Theory

**Key Takeaway:** Custom math-based encodings often follow a recognizable pattern — scripting the inverse is usually straightforward once the pattern is identified.

---

### RSA

| Field | Detail |
|-------|--------|
| **Category** | Crypto |
| **Tools** | Python, RsaCtfTool |
| **Skills** | Modular Arithmetic, RSA Analysis, Scripting |

**Approach:** Identified exploitable RSA parameters (weak primes, small exponent, etc.) and used RsaCtfTool to automate key recovery.

**Focus Areas:** RSA Weaknesses · Prime Factorization · Key Recovery

**Key Takeaway:** CTF RSA challenges almost always hinge on one of a small set of classical weaknesses — building familiarity with all of them pays off quickly.

---

### Six to the Seven

| Field | Detail |
|-------|--------|
| **Category** | Crypto |
| **Tools** | Python |
| **Skills** | Logical Analysis, Pattern Recognition |

**Approach:** Recognized the encoding scheme from the title hint and wrote a targeted decoding script.

**Focus Areas:** Encoding Logic · Number Transformation

**Key Takeaway:** Challenge titles in CTFs are rarely random — they often hint directly at the transformation in use.

---

## Forensics

### Cartmans Business Venture

| Field | Detail |
|-------|--------|
| **Category** | Forensics |
| **Tools** | exiftool, strings, binwalk |
| **Skills** | Investigative Analysis, Metadata Inspection, Data Inspection |

**Approach:** Examined embedded metadata and file artifacts to recover hidden information from the challenge file.

**Focus Areas:** Metadata Inspection · File Analysis · Artifact Recovery

**Key Takeaway:** Always run `exiftool` and `strings` on a forensics file before anything else — metadata artifacts are frequently the low-hanging fruit.

---

### Fortnite Dumpy

| Field | Detail |
|-------|--------|
| **Category** | Forensics |
| **Tools** | binwalk, foremost, strings, exiftool |
| **Skills** | File Carving, Metadata Analysis, Binary Inspection |

**Approach:** Used binwalk and foremost to carve embedded files out of the challenge binary, then analyzed the recovered artifacts.

**Focus Areas:** Data Recovery · Memory/File Inspection · Hidden Information Analysis

**Key Takeaway:** File carving tools like `binwalk` and `foremost` are essential — compound files frequently conceal other formats at specific byte offsets.

---

### Rot Transmit

| Field | Detail |
|-------|--------|
| **Category** | Forensics |
| **Tools** | CyberChef, Python |
| **Skills** | Pattern Recognition, Encoding Analysis, Transmission Analysis |

**Approach:** Reconstructed an encoded transmission by identifying the encoding scheme and reversing it through CyberChef.

**Focus Areas:** Transmission Analysis · Encoding Recovery · Signal Interpretation

**Key Takeaway:** Encoded forensic transmissions often combine a standard encoding with a simple rotation or XOR — CyberChef's Magic mode is a good first step.

---

## OSINT

### Grass Toucher 3000

| Field | Detail |
|-------|--------|
| **Category** | OSINT |
| **Tools** | Google Dorking, Social Enumeration |
| **Skills** | Search Techniques, Metadata Collection |

**Approach:** Applied structured Google dorks and social platform enumeration to gather and correlate publicly available information.

**Focus Areas:** Information Gathering · Online Enumeration

**Key Takeaway:** Building a structured OSINT workflow prevents tunnel vision — enumerate broadly before pivoting to a specific lead.

---

### INTERNATIONAL BRAINROT

| Field | Detail |
|-------|--------|
| **Category** | OSINT |
| **Tools** | Search Engines, Public Databases |
| **Skills** | Investigation, Correlation Analysis |

**Approach:** Cross-referenced public data sources to trace the target's digital footprint across platforms.

**Focus Areas:** Research Methodology · Public Data Correlation

**Key Takeaway:** International OSINT often requires platform-specific knowledge — different regions favor different social networks and databases.

---

### Oh My God, They Killed Kenny!

| Field | Detail |
|-------|--------|
| **Category** | OSINT |
| **Tools** | Google Maps, Reverse Image Search |
| **Skills** | Reverse Search, Data Correlation, Geolocation |

**Approach:** Used reverse image search and geographic cues within the image to pinpoint the location.

**Focus Areas:** Geolocation · Online Investigation · Public Information Correlation

**Key Takeaway:** Geolocation OSINT is a combination of image metadata, environmental cues (signage, vegetation, architecture), and iterative map search.

---

### Sussiest Challenge

| Field | Detail |
|-------|--------|
| **Category** | OSINT |
| **Tools** | Google, Metadata Tools |
| **Skills** | Investigation, Search Correlation |

**Approach:** Gathered and correlated public intelligence to identify the target entity described in the challenge.

**Focus Areas:** Public Information Gathering · Enumeration

**Key Takeaway:** "Sus" challenges in OSINT often require reading between the lines — the challenge description itself may contain the first lead.

---

## Steganography

### Like A Rolling Stone

| Field | Detail |
|-------|--------|
| **Category** | Stego |
| **Tools** | stegsolve, zsteg, strings |
| **Skills** | Steganalysis, Binary Inspection |

**Approach:** Ran the image through stegsolve bit-plane analysis and confirmed hidden data with zsteg.

**Focus Areas:** Hidden Data Extraction · File Inspection

**Key Takeaway:** For image stego, always run through `zsteg` (PNG/BMP) first — it covers LSB, color channel, and bit-plane combinations automatically.

---

### Only in Ohio

| Field | Detail |
|-------|--------|
| **Category** | Stego |
| **Tools** | zsteg, binwalk |
| **Skills** | Steganography Analysis, Pattern Recognition |

**Approach:** Identified appended data via binwalk and extracted the concealed message with zsteg.

**Focus Areas:** Embedded Data Analysis · Hidden Message Recovery

**Key Takeaway:** Checking for appended data at the end of a file (after the EOF marker) is a quick win in stego challenges that many solvers overlook.

---

## Web Exploitation

### Brainrot Inject

| Field | Detail |
|-------|--------|
| **Category** | Web |
| **Tools** | Burp Suite, Browser DevTools |
| **Skills** | Payload Crafting, Enumeration |

**Approach:** Identified an injection point through DevTools, crafted a payload, and confirmed execution via Burp Suite intercepted responses.

**Focus Areas:** Injection Attacks · Input Validation Weaknesses

**Key Takeaway:** Always map all input fields before testing — injection surfaces are not always the obvious ones (forms, search boxes).

---

### Hit Me

| Field | Detail |
|-------|--------|
| **Category** | Web |
| **Tools** | curl, Burp Suite |
| **Skills** | Traffic Inspection, Web Enumeration |

**Approach:** Intercepted and analyzed the HTTP request/response cycle to identify a manipulable parameter or header.

**Focus Areas:** HTTP Analysis · Request Manipulation

**Key Takeaway:** HTTP headers (especially custom ones) are frequently overlooked attack surfaces in web challenges.

---

### Pibble

| Field | Detail |
|-------|--------|
| **Category** | Web |
| **Tools** | Burp Suite, Browser DevTools |
| **Skills** | Manual Testing, Payload Testing |

**Approach:** Performed systematic web enumeration and manually tested endpoints until a vulnerability was identified and exploited.

**Focus Areas:** Web Enumeration · Vulnerability Discovery

**Key Takeaway:** Methodical enumeration — spidering the app, checking JS source, reviewing API paths — is more reliable than jumping straight to automated scanning.

---

### Real Time Rizz

| Field | Detail |
|-------|--------|
| **Category** | Web |
| **Tools** | Burp Suite, WebSocket Analysis |
| **Skills** | Web Testing, Traffic Manipulation |

**Approach:** Analyzed live WebSocket traffic in Burp Suite and manipulated real-time messages to trigger the vulnerability.

**Focus Areas:** Dynamic Request Analysis · Real-time Exploitation

**Key Takeaway:** WebSocket traffic requires a different mindset than HTTP — messages can be stateful and order-dependent, so replay attacks may need careful sequencing.

---

## Skills & Tools Summary

### Skills Demonstrated

- Reverse Engineering
- Digital Forensics
- Cryptanalysis (RSA, ECC, PQC)
- Binary Inspection & File Carving
- Steganography Analysis
- OSINT Investigation & Geolocation
- Web Exploitation (Injection, HTTP Manipulation, WebSockets)
- Vulnerability Analysis
- Python Scripting
- Traffic Analysis with Burp Suite
- Metadata Inspection

### Tools Used

| Category | Tools |
|----------|-------|
| **Crypto** | Python, SageMath, RsaCtfTool, CyberChef |
| **Forensics** | binwalk, foremost, exiftool, strings |
| **Stego** | stegsolve, zsteg |
| **Web** | Burp Suite, curl, Browser DevTools |
| **OSINT** | Google Dorking, Reverse Image Search, Google Maps |
| **RE / General** | Ghidra, GDB, pwntools |

---

## Repository Structure

```
SillyCTF2026-Writeups/
├── crypto/
│   ├── cryptos/
│   ├── ecc/
│   ├── kyber/
│   ├── quick-maths/
│   ├── rsa/
│   └── six-to-the-seven/
├── forensics/
│   ├── cartmans-business-venture/
│   ├── fortnite-dumpy/
│   └── rot-transmit/
├── osint/
│   ├── grass-toucher-3000/
│   ├── international-brainrot/
│   ├── oh-my-god-they-killed-kenny/
│   └── sussiest-challenge/
├── stego/
│   ├── like-a-rolling-stone/
│   └── only-in-ohio/
└── web/
    ├── brainrot-inject/
    ├── hit-me/
    ├── pibble/
    └── real-time-rizz/
```

---

> Full solutions, scripts, and flag proofs available in the [GitHub repository](https://github.com/vishwakumarv/SillyCTF2026-Writeups).