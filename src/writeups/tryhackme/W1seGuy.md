# W1seGuy — TryHackMe CTF Writeup

**Platform:** TryHackMe  
**Category:** Cryptography  
**Difficulty:** Easy  
**Author of original writeup:** Aakash Raman  

---

## Overview

W1seGuy is a TryHackMe cryptography challenge that involves understanding XOR encryption and recovering a key via a known-plaintext attack. Two flags are up for grabs — one derived from breaking the XOR cipher, and a second obtained by submitting the recovered key to the server.

---

## Step 1 — Analyzing the Source Code

The challenge provides a Python server script. Key observations:

- A random **5-character alphanumeric key** is generated each session using `string.ascii_letters + string.digits`.
- The flag (`THM{...}`) is XOR-encrypted character-by-character with the key (cycling if needed).
- The result is hex-encoded and sent to the connecting client.
- If you send back the correct key, the server responds with **Flag 2** (the real flag from `flag.txt`).

```python
import random
import socketserver
import socket, os
import string

flag = open('flag.txt','r').read().strip()

def send_message(server, message):
    enc = message.encode()
    server.send(enc)

def setup(server, key):
    flag = 'THM{thisisafakeflag}'
    xored = ""

    for i in range(0,len(flag)):
        xored += chr(ord(flag[i]) ^ ord(key[i%len(key)]))

    hex_encoded = xored.encode().hex()
    return hex_encoded

def start(server):
    res = ''.join(random.choices(string.ascii_letters + string.digits, k=5))
    key = str(res)
    hex_encoded = setup(server, key)
    send_message(server, "This XOR encoded text has flag 1: " + hex_encoded + "\n")

    send_message(server,"What is the encryption key? ")
    key_answer = server.recv(4096).decode().strip()

    try:
        if key_answer == key:
            send_message(server, "Congrats! That is the correct key! Here is flag 2: " + flag + "\n")
            server.close()
        else:
            send_message(server, 'Close but no cigar' + "\n")
            server.close()
    except:
        send_message(server, "Something went wrong. Please try again. :)\n")
        server.close()

class RequestHandler(socketserver.BaseRequestHandler):
    def handle(self):
        start(self.request)

if __name__ == '__main__':
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    server = socketserver.ThreadingTCPServer(('0.0.0.0', 1337), RequestHandler)
    server.serve_forever()
```

---

## Step 2 — Connecting to the Server

Connect via netcat on port 1337:

```bash
nc <MACHINE_IP> 1337
```

The server responds with a hex-encoded XOR ciphertext, e.g.:

```
This XOR encoded text has flag 1: 6c26293e...
```

---

## Approach 1 — CyberChef (Known-Plaintext Attack)

### The Key Insight

TryHackMe flags always start with `THM{`. This means we **know the first 4 plaintext characters**, which lets us recover the first 4 characters of the key directly via XOR.

### Recovering the Key (First 4 Characters)

Since `ciphertext[i] = plaintext[i] XOR key[i]`, we can reverse it:

```
key[i] = ciphertext[i] XOR plaintext[i]
```

Take the **first 4 bytes** of the hex ciphertext and XOR them against the hex representation of `THM{` in CyberChef. This gives you the first 4 characters of the encryption key (e.g., `8ndE`).

### Recovering the 5th Character

The key is 5 characters long. Brute-force the last character from `string.ascii_letters + string.digits` (62 possibilities). Use CyberChef's XOR recipe with the candidate full key and check if the output decodes to a valid `THM{...}` flag.

In the example session, the correct key was `8ndEw`.

---

## Approach 2 — Python Script (Automated)

The following script automates the known-plaintext attack and brute-forces the final key character:

```python
import binascii
import string
import itertools
from concurrent.futures import ThreadPoolExecutor, as_completed
import argparse

def find_key_start(encrypted_text, known_start):
    encrypted_bytes = binascii.unhexlify(encrypted_text)
    num_iterations = min(len(encrypted_bytes), len(known_start))
    key_start = ""
    for i in range(num_iterations):
        key_char = chr(encrypted_bytes[i] ^ ord(known_start[i]))
        key_start += key_char
    return key_start

def xor_decode(hex_encoded, key):
    xored = binascii.unhexlify(hex_encoded)
    decoded = ''.join(chr(xored[i] ^ ord(key[i % len(key)])) for i in range(len(xored)))
    return decoded

def test_key(key, hex_encoded, known_start, known_end):
    decoded_flag = xor_decode(hex_encoded, key)
    if decoded_flag.startswith(known_start) and decoded_flag.endswith(known_end):
        return key, decoded_flag
    return None

def generate_and_test_keys_with_prefix(hex_encoded, known_start, known_end, prefix):
    key_length = 5
    remaining_length = key_length - len(prefix)
    valid_chars = string.ascii_letters + string.digits
    matching_flags = []

    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = []
        key_iterator = (prefix + ''.join(key_tuple)
                        for key_tuple in itertools.product(valid_chars, repeat=remaining_length))
        for key in key_iterator:
            futures.append(executor.submit(test_key, key, hex_encoded, known_start, known_end))
        for future in as_completed(futures):
            result = future.result()
            if result:
                matching_flags.append(result)

    return matching_flags

def main():
    parser = argparse.ArgumentParser(description='Find key and decode XOR encrypted data.')
    parser.add_argument('-e', '--encrypted', type=str, required=True,
                        help='Hex-encoded encrypted data')
    args = parser.parse_args()

    known_start = "THM{"
    known_end = "}"

    prefix = find_key_start(args.encrypted, known_start)
    print(f"Potential Key Start: {prefix}")

    matching_flags = generate_and_test_keys_with_prefix(args.encrypted, known_start, known_end, prefix)
    if matching_flags:
        for key, flag in matching_flags:
            print(f"Derived Key:   {key}")
            print(f"Decoded Flag:  {flag}")
    else:
        print("No valid flag found.")

if __name__ == "__main__":
    main()
```

**Usage:**

```bash
python3 decrypt.py -e <hex_encoded_ciphertext>
```

The script outputs the derived key and Flag 1 directly.

---

## Flags

**Flag 1** (decoded from the XOR ciphertext):

```
THM{p1alntExtAtt4ckcAnr3alLyhUrty0urxOr}
```

**Flag 2** (obtained by submitting the correct key back to the server):

```
THM{BrUt3_ForC1nG_XOR_cAn_B3_FuN_nO?}
```

---

## Takeaways

- **Known-plaintext XOR attacks** are trivial when you know even a few bytes of the plaintext — here, the `THM{` flag format gave us 4 of 5 key characters for free.
- Short, randomly generated XOR keys are extremely weak. A 5-character key over a 62-character alphabet has only ~916 million combinations, brute-forceable in seconds on a single thread.
- **CyberChef** is a powerful tool for quick manual crypto analysis; Python scripting is better for automation and repeatability.

---

*Tags: `cryptography` `xor` `tryhackme` `ctf` `known-plaintext-attack` `cyberchef` `python`*