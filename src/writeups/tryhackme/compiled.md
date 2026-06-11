# TryHackMe — Compiled

**Platform:** TryHackMe  
**Category:** Reverse Engineering  
**Difficulty:** Easy  
**Tools Used:** Ghidra, file, strings, bash  

---

## Overview

"Compiled" is a beginner-level reverse engineering challenge on TryHackMe. You're given a binary and asked for a password. There is no web interface, no network service — just you, the binary, and a decompiler. The goal is to understand how the program validates input and reconstruct the correct password from static analysis alone.

---

## Reconnaissance

### Step 1 — Basic File Inspection

Before throwing anything into a decompiler, always start with quick passive recon on the binary itself.

```bash
file Compiled.Compiled
```

This tells you the architecture, whether it's stripped, dynamically or statically linked, etc. For a CTF binary, you're typically looking at an ELF 64-bit LSB executable.

```bash
strings Compiled.Compiled
```

Running `strings` is a fast first pass — sometimes passwords, flags, or interesting literals are sitting in the binary unobfuscated. In this case, you'd spot things like:

```
Password: 
DoYouEven%sCTF
__dso_handle
_init
Try again!
Correct!
```

Even without a decompiler, these strings already hint at the logic: the program reads input in a formatted way (`DoYouEven%sCTF`), and there are two comparison targets — `__dso_handle` and `_init`. This alone is nearly enough to solve the challenge, but let's go deeper.

---

### Step 2 — Running the Binary

```bash
chmod +x Compiled.Compiled
./Compiled.Compiled
```

```
Password: test
Try again!
```

The binary accepts input, compares it against something, and prints either `Correct!` or `Try again!`. The goal is clear: find the input that triggers `Correct!`.

> **Note:** If you're on the AttackBox, the binary won't execute. But you can still fully solve it with static analysis in Ghidra — execution isn't required.

---

## Static Analysis with Ghidra

### Step 3 — Loading the Binary

1. Open Ghidra and create a new project.
2. Import `Compiled.Compiled` via **File → Import File**.
3. Double-click the binary to open it in the CodeBrowser.
4. When prompted to analyze, click **Yes** and use default settings.
5. Wait for auto-analysis to finish.

Navigate to the `main` function via **Symbol Tree → Functions → main** or use the search shortcut `G` and type `main`.

---

### Step 4 — Decompiled `main` Function

Ghidra's decompiler produces the following pseudocode:

```c
undefined8 main(void)
{
  int iVar1;
  char local_28 [32];
  
  fwrite("Password: ", 1, 10, stdout);
  __isoc99_scanf("DoYouEven%sCTF", local_28);

  iVar1 = strcmp(local_28, "__dso_handle");
  if ((-1 < iVar1) && (iVar1 = strcmp(local_28, "__dso_handle"), iVar1 < 1)) {
    printf("Try again!");
    return 0;
  }

  iVar1 = strcmp(local_28, "_init");
  if (iVar1 == 0) {
    printf("Correct!");
  } else {
    printf("Try again!");
  }
  return 0;
}
```

---

## Code Analysis — Line by Line

### Buffer Declaration

```c
char local_28 [32];
```

A 32-byte stack buffer to hold whatever the user inputs. No bounds checking, but that's not the attack surface here.

---

### The `scanf` Format String

```c
__isoc99_scanf("DoYouEven%sCTF", local_28);
```

This is the most interesting line. The format string is `"DoYouEven%sCTF"`, not the usual `"%s"`.

How does `scanf` interpret this?

- It first looks for the **literal prefix** `DoYouEven` in the input stream. If the input doesn't start with `DoYouEven`, nothing gets stored.
- `%s` then reads a string of non-whitespace characters, storing them into `local_28`.
- The literal suffix `CTF` acts as a **delimiter** — `scanf` stops reading the `%s` token when it hits `CTF` in the input.

**Examples to build intuition:**

| Input | What gets stored in `local_28` |
|---|---|
| `DoYouEven_initCTF` | `_init` |
| `DoYouEven_CTF` | `_` |
| `DoYouEven_init` | `_init` (no CTF delimiter needed if input ends) |
| `DoYouEvenanytext` | `anytext` |
| `test` | *(nothing — prefix doesn't match)* |

So `local_28` receives only the **segment between `DoYouEven` and `CTF`** (or end of input).

---

### The Double `strcmp` Guard

```c
iVar1 = strcmp(local_28, "__dso_handle");
if ((-1 < iVar1) && (iVar1 = strcmp(local_28, "__dso_handle"), iVar1 < 1)) {
    printf("Try again!");
    return 0;
}
```

`strcmp` returns:
- `< 0` if `local_28` is lexicographically less than the target
- `0` if they are equal
- `> 0` if `local_28` is greater

The condition `-1 < iVar1` is true when `strcmp >= 0`, and `iVar1 < 1` is true when `strcmp <= 0`. Together: `iVar1 == 0`, i.e., **exact match with `__dso_handle`**. If the stored input equals `__dso_handle`, the program exits early with `Try again!`.

This is a **decoy / exclusion guard** — it blocks a specific value that might otherwise trigger the next check due to how `strcmp` ordering works.

> `__dso_handle` is a real ELF symbol (related to shared object destructors). Its presence here as a comparison string is deliberate misdirection — it appears alongside `_init` (another real ELF symbol for initialization routines) in the binary's symbol table.

---

### The Real Check

```c
iVar1 = strcmp(local_28, "_init");
if (iVar1 == 0) {
    printf("Correct!");
} else {
    printf("Try again!");
}
```

Straightforward: if `local_28 == "_init"`, you win.

---

## Putting It Together

We need `local_28` to equal `_init`. Given the `scanf` format string `"DoYouEven%sCTF"`, the input that produces `_init` in `local_28` is:

```
DoYouEven_init
```

(With or without `CTF` appended — both work since `%s` stops at `CTF` if present, or at end-of-input if not.)

---

## Solution

```bash
./Compiled.Compiled
Password: DoYouEven_init
Correct!
```

**Password: `DoYouEven_init`**

---

## Why Not `DoYouEven__dso_handleCTF`?

The exclusion guard explicitly blocks `__dso_handle`. Even though:

1. `_init` < `__dso_handle` lexicographically (underscore ordering)
2. Both are real ELF symbols present in the binary

...the program only accepts `_init`. The `__dso_handle` guard exists to confuse analysts into thinking that's a viable candidate.

---

## Alternative — Solving Without Execution (AttackBox / Static Only)

Even if you can't run the binary, the `strings` output combined with Ghidra's decompiler is enough:

1. `strings` reveals the format string `DoYouEven%sCTF` and the comparison targets.
2. Ghidra shows the exact comparison logic.
3. Mentally trace: `scanf("DoYouEven%sCTF", buf)` + input `DoYouEven_init` → `buf = "_init"` → `strcmp(buf, "_init") == 0` → `Correct!`.

No execution needed.

---

## Key Concepts

**Custom `scanf` format strings** — `scanf` isn't limited to `%s`, `%d` etc. It can match literal characters as delimiters, which changes how input is parsed. Recognizing non-standard format strings is an important reverse engineering skill.

**`strcmp` return value semantics** — The double-condition guard (`-1 < iVar1 && iVar1 < 1`) is a verbose way of writing `iVar1 == 0`. Ghidra sometimes generates this pattern during decompilation of optimized code; recognizing it saves time.

**ELF symbol names as decoys** — `__dso_handle` and `_init` are real internal ELF symbols. Using them as comparison targets is a cheap but effective way to confuse people who run `strings` and assume both are relevant.

**Static analysis is sufficient** — Many RE challenges don't require dynamic execution. Ghidra + `strings` + mental execution is often enough for beginner/intermediate binaries.

---

## Tools Reference

| Tool | Purpose |
|---|---|
| `file` | Identify binary type, architecture, and linking |
| `strings` | Extract printable strings — fast first recon |
| `Ghidra` | Full decompilation and static analysis |

---

*Tags: `reverse-engineering` `ghidra` `tryhackme` `ctf` `scanf` `static-analysis` `elf`*