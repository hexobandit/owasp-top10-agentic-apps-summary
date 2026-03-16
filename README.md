# OWASP Top 10 for Agentic Applications (2026)

Security threats and mitigations for autonomous AI agent systems. 

## What's in This Repo

### Interactive Web Presentation (`webapp/`)
A portable, zero-dependency learning platform — just open `index.html` in any browser. 

Also available in here: https://threatbandit.com/academy/

| File | Description |
|------|-------------|
| `index.html` | Landing page — overview, risk domains, threat card grid |
| `quickref.html` | Quick reference — 3 bullets + real-world attack per threat, grouped by attack domain with filter tabs |
| `threats.html` | Deep-dive into all 10 threats with attack scenarios and mitigations |
| `style.css` | Dark cybersecurity-themed styling |
| `app.js` | Interactivity — expandable sections, quizzes, scroll animations, progress bar |

**Features:** inline SVG robot graphics, expandable attack scenarios, interactive mitigation checklists, quick-check quizzes with instant feedback, domain grouping (Control & Intent / Access & Execution / Ecosystem & Trust), reading progress bar, sticky sidebar navigation, color-coded severity levels, responsive design.

**Usage:** grab the `webapp/` folder, double-click `index.html`, done. No build step, no server, no dependencies.

### Reference Materials (`docs/`)

| File | Description |
|------|-------------|
| `OWASP-Top-10-for-Agentic-Applications-2026-12.6-1.pdf` | Official OWASP Top 10 for Agentic Applications (2026) PDF |
| `Agentic_Security_Blueprint.pdf` | Security blueprint document |
| `Agentic_Security_Blueprint.pptx` | Presentation deck |
| `agentic-apps-overview.png` | Visual overview infographic |
| `agentic-apps-overview2.png` | Visual overview infographic (alternate) |
| `agentic-apps-MindMap-3.png` | Mind map of all 10 threats |
| `OWASP_Security_for_Agentic_Applications.m4a` | Audio overview |

### Written Summaries

| File | Description |
|------|-------------|
| `README.md` | This file — quick reference for all 10 threats |
| `DETAILED.md` | Full breakdown with all vulnerabilities, attack scenarios, and mitigations |

---

## Threats & Mitigations (Quick Reference)

## ASI01: Agent Goal Hijack
*   **Threat Description:** Attackers manipulate an agent’s objectives, task selection, or decision pathways through prompt injection, deceptive tool outputs, or poisoned data. Unlike traditional LLM exploits, this subverts the agent's autonomous planning and multi-step behavior [1].
*   **Key Mitigations:**
    *   **Treat all natural-language inputs as untrusted** and route them through validation gates [2].
    *   Enforce **least privilege** for tools and require **human approval** for high-impact or goal-changing actions [3].
    *   Define and lock agent system prompts so goal priorities are explicit and auditable [3].
    *   Implement **intent capsules** to bind declared goals and constraints to each execution cycle via signed envelopes [4].

## ASI02: Tool Misuse and Exploitation
*   **Threat Description:** Agents apply legitimate tools in unintended or unsafe ways (e.g., deleting data, over-invoking costly APIs) due to prompt injection or misalignment. This focus is on the *unsafe application* of authorized tools [5, 6].
*   **Key Mitigations:**
    *   Define **per-tool least-privilege profiles** (scopes, rate limits, and egress allowlists) [7].
    *   Use **Policy Enforcement Middleware ("Intent Gates")** to validate arguments and intent before execution [8].
    *   Run code or tool execution in **isolated sandboxes** with strict network controls [9].
    *   Apply **adaptive tool budgeting** to throttle or revoke access when cost or rate ceilings are exceeded [8].

## ASI03: Identity and Privilege Abuse
*   **Threat Description:** Exploiting dynamic trust and delegation chains to escalate access. Attackers may reuse cached credentials or manipulate "confused deputy" scenarios where one agent trusts another's forged request [10, 11].
*   **Key Mitigations:**
    *   Issue **task-scoped, time-bound tokens** instead of long-lived credentials [12].
    *   **Isolate agent identities** and memory state per session to prevent cross-session data leakage [12].
    *   Mandate **per-action authorization** via a centralized policy engine that re-verifies each privileged step [13].
    *   Use **cryptographic identity attestation** (e.g., mTLS) to verify agent personas [12, 14].

## ASI04: Agentic Supply Chain Vulnerabilities
*   **Threat Description:** Compromise of third-party models, tools, plugins, or agent personas. Unlike static supply chains, agentic ecosystems often load components dynamically at runtime, increasing the attack surface [15, 16].
*   **Key Mitigations:**
    *   Operationalize **SBOMs and AIBOMs** with periodic attestations and content hashes [17, 18].
    *   **Pin all dependencies** (prompts, tools, configs) to specific commit IDs or content hashes [18].
    *   Implement a **supply chain kill switch** to instantly disable compromised components across the network [18].
    *   Use curated registries and auto-reject any unsigned or unverified artifacts [14, 17].

## ASI05: Unexpected Code Execution (RCE)
*   **Threat Description:** Adversaries exploit code-generation features to execute malicious scripts, binaries, or "vibe coding" runaway commands that compromise the host system or container [19, 20].
*   **Key Mitigations:**
    *   **Ban `eval()`** and similar unsafe evaluation functions in production agents [21].
    *   Run generated code in **hardened sandboxed containers** without root access and with restricted filesystem paths [21].
    *   Separate code generation from execution with **validation gates** and static analysis scans [21, 22].
    *   Require **human approval** for any elevated or high-impact code runs [22].

## ASI06: Memory & Context Poisoning
*   **Threat Description:** Corrupting retrievable context (RAG stores, embeddings, or long-term memory) with malicious data to bias future reasoning or plant backdoors that execute hidden instructions [23, 24].
*   **Key Mitigations:**
    *   **Segment memory** by user session and domain context to prevent cross-tenant vector bleed [25, 26].
    *   Scan all memory writes and retrieved outputs for malicious or sensitive content before committing to storage [25].
    *   **Weight retrieval by trust scores** and decay or expire unverified memory over time to limit poison persistence [27].
    *   Support rollback and quarantine for suspected poisoned entries in shared stores [27].

## ASI07: Insecure Inter-Agent Communication
*   **Threat Description:** Intercepting, spoofing, or manipulating messages between agents due to weak authentication or lack of integrity checks. This can lead to "semantics split-brain" or authority confusion [28, 29].
*   **Key Mitigations:**
    *   Enforce **end-to-end encryption** with per-agent credentials and **mutual authentication (mTLS)** [30].
    *   **Digitally sign all messages** and hash the payload and context to detect tampering [30].
    *   Use **versioned, typed message schemas** and reject any messages that fail validation [31].
    *   Protect against **replay attacks** using nonces, session identifiers, and short-term state hashes [32].

## ASI08: Cascading Failures
*   **Threat Description:** A single fault (e.g., a hallucination or poisoned tool) propagating autonomously across multiple agents and systems, compounding into widespread service failures [33, 34].
*   **Key Mitigations:**
    *   Implement **circuit breakers** and rate limits to detect and throttle fast-spreading commands [35].
    *   Use **digital twin replays** to test if a sequence of actions would trigger failures in an isolated environment before deployment [36].
    *   Maintain **tamper-evident, time-stamped logs** of all inter-agent messages and decisions for forensic traceability [36].
    *   Establish **blast-radius guardrails**, such as quotas and progress caps [35].

## ASI09: Human-Agent Trust Exploitation
*   **Threat Description:** Exploiting human over-reliance or authority bias (anthropomorphism) to trick users into approving harmful actions or disclosing secrets [37, 38].
*   **Key Mitigations:**
    *   Require **explicit multi-step confirmations** for extra-sensitive data or risky actions [39].
    *   Provide **non-model-generated risk summaries** instead of persuasive AI rationales [39].
    *   Use **visual trust cues** (e.g., red borders for high-risk recommendations) to reduce automation bias [40].
    *   Separate **preview from effect**, blocking network or state-changing calls during a "read-only" review context [40].

## ASI10: Rogue Agents
*   **Threat Description:** Agents that have lost behavioral integrity, pursuing hidden goals, scheming to bypass safeguards, or autonomously self-replicating maliciously [41, 42].
*   **Key Mitigations:**
    *   Deploy **watchdog agents** to monitor peer behavior and validate outputs for collusion patterns [43].
    *   Implement **per-agent cryptographic identity attestation** and enforce behavioral integrity baselines [43].
    *   Maintain **kill-switches and credential revocation** for instant containment of suspicious agents [43].
    *   Require **periodic behavioral attestation** and human approval before reintegrating remediated agents [44, 45].
