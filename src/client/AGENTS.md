# AGENTS.md (Client)

## Purpose & Navigation
This document details the LeanTime client—everything to do with the frontend and UI, real-time synchronization, and related conventions.

**Use this file if you are:**
- Working with the web UI or presentation logic
- Modifying client-to-server communication (Socket.IO events)
- Updating frontend tests or workflows

**Navigation:**
- [Documentation Overview](../../doc/documentation_overview.md) — Full map of LeanTime docs and contribution guide
- [Main README.md](../../README.md) — Project intro, quickstart, contributing, license
- [Server AGENTS.md](../server/AGENTS.md) — Server/backend architecture, event contracts, timer logic

---

## Tech Stack
- Vite (frontend build and dev middleware)
- TypeScript (client code)
- Socket.IO-client (realtime updates)
- Vitest (client tests)

---

## Quick Start (Client)
- Run the app in dev (client+API): `npm run dev`
- Build production client bundle: `npm run build`
- Run tests: `npm run test`

---

## Architecture Overview (Client)
- Loads `index.html` and wires up UI in `src/client/index.ts`.
- Main modules:
  - `view.ts`: DOM access and UI event handling
  - `presenter.ts`: Presentation logic, connects view/service/sound
  - `service.ts`: Socket.IO client logic
  - `sound.ts`: Plays alarm on timer end
- Socket events sent: `start`, `pause`, `reset`, `apply`
- Socket events received: `updated_time`

---

## Key Files (Client)
- `index.html`: UI shell and display controls
- `src/client/index.ts`: Entry point, module wiring
- `src/client/view.ts`: DOM and UI logic
- `src/client/presenter.ts`: Presentation controller
- `src/client/service.ts`: Socket.IO logic
- `src/client/sound.ts`: Alarm sound

---

## Runtime Behavior
- Connects to server for timer data; strictly a display/controller, not a timer owner
- Plays alarm (`public/alarm.mp3`) at end of countdown

---

## Patterns and Conventions
- Isolated presentation/logic in Presenter; stays loosely coupled to View & Service
- Socket event names must match server contract

---

## Client-side Testing Notes
- `src/client/presenter.test.ts` for presenter logic
- Use `spyAllMethodsOf` for mocking

---

## Safe Change Checklist (Client)
- If changing DOM ids, update both View and `index.html`
- If changing socket events or client-server protocol, update both this file, [Server AGENTS.md](../server/AGENTS.md), and referenced tests
- When adding features or refactoring, update all relevant docs ([Documentation Overview](../../doc/documentation_overview.md), README)
- Adjust presenter tests if logic is refactored
- Before submitting PRs, re-read the contributing notes in README

---

For full system architecture and contribution info, always start at the [LeanTime Documentation Overview](../../doc/documentation_overview.md).