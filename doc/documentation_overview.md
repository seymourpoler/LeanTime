# LeanTime Documentation Overview

Welcome to the LeanTime project documentation! This page provides a map of all critical system docs and guidance on how to quickly find what you need, whether you’re building features, fixing bugs, or contributing improvements.

---

## 📚 Documentation Map
LeanTime documentation is designed around clear separation of concerns. Each major component has focused, easy-to-navigate documentation. Start here to orient yourself:

- **[README.md](../README.md)** — The landing page and high-level introduction. Features, getting started, setup, development workflow, testing, deployment, and contributing steps (for all users and contributors).
- **[Client AGENTS.md](../src/client/AGENTS.md)** — Focused on all client-side (frontend) internals: UI structure, architecture, module overview, file map, conventions, and safe change checklist.
- **[Server AGENTS.md](../src/server/AGENTS.md)** — All backend (server, API, timer logic) architecture, key files, event protocols, and patterns, with a checklist for robust server changes.

---

## 🗺️ How to Navigate These Docs
- If you’re working on frontend/UI/Socket.IO-client or want to change client behaviors, start with [Client AGENTS.md](../src/client/AGENTS.md).
- If you’re developing backend/API/Socket.IO-server/timer logic, begin with [Server AGENTS.md](../src/server/AGENTS.md).
- For overall project use, setup, and contribution, the [README.md](../README.md) is your quickstart.
- Whenever you change code that crosses the client-server boundary (like event names or contracts), **update both AGENTS.md files to keep docs in sync**.
- Reference the “Safe Change Checklist” at the end of each AGENTS.md before submitting PRs.

---

## ✍️ Contributing to Documentation
- All documentation lives alongside your code in this repository and is versioned with it.
- When you add a feature, fix a bug, or change a protocol/event, update the appropriate docs (including this overview if you reorganize files!).
- To contribute:
    - Follow the contributing process in [README.md](../README.md#contributing)
    - Submit clear, focused PRs linking updated code and relevant docs.
    - Review checklists and keep cross-references up to date.

---

## 🔗 Quick Links
- [README.md](../README.md)
- [Client AGENTS.md](../src/client/AGENTS.md)
- [Server AGENTS.md](../src/server/AGENTS.md)
- [License](../LICENSE.md)

---

Always use this file as a reference portal. Keeping documentation organized and cross-linked here helps the whole LeanTime community build, test, and maintain with confidence.
