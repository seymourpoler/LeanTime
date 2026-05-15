# AGENTS.md (Server)

## Purpose & Navigation
This document describes LeanTime’s server-side design—the backend, all timer state logic, API/service structure, and cross-boundary event handling.

**Use this file if you are:**
- Developing or maintaining server/timer/API logic
- Handling backend event contracts
- Modifying real-time protocols

**Navigation:**
- [Documentation Overview](../../doc/documentation_overview.md) — Full map of LeanTime docs and contribution guide
- [Main README.md](../../README.md) — Project intro, installation, contributing, license
- [Client AGENTS.md](../client/AGENTS.md) — Frontend architecture, UI pattern, module overview

---

## Tech Stack
- Express (server API and middleware)
- Socket.IO (realtime communication)
- TypeScript (server code)
- Vite (dev middleware)
- Vitest (server tests)

---

## Quick Start (Server)
- Run dev server (API + Vite): `npm run dev`
- Run production server: `npm run start`
- Run tests: `npm run test`
- Production server command sets `NODE_ENV=production` (customize for Windows)

---

## Architecture Overview (Server)
- Starts from `src/server/index.ts`, owns canonical countdown timer
- Main modules:
  - `dateTimeService.ts`: Timer and state logic
  - Express handler for serving static and API
  - Socket.IO server instance
- Socket events handled: `start`, `pause`, `reset`, `apply` (from client)
- Socket events emitted: `updated_time` (to clients)

---

## Key Files (Server)
- `src/server/index.ts`: Express and Socket.IO entry
- `src/server/dateTimeService.ts`: Timer management logic
- `src/server/dateTimeService.test.ts`: Timer service unit tests
- `vite.config.ts`: Vite proxy setup for websocket
- `src/testing.ts`: Test support/mocking

---

## Runtime Behavior
- Owns canonical timer, emits `updated_time` every second
- Applies settings changes from clients
- In dev, Vite middleware wraps server (no separate dev command)

---

## Patterns and Conventions
- Keep all timer state calculations on the server
- Strict socket event contract (literal names)
- Ensure concurrency safety when editing timer state

---

## Server-side Testing Notes
- All logic tested with Vitest
- Unit tests for dateTimeService
- Use mocking helpers for isolation

---

## Safe Change Checklist (Server)
- If changing socket events, contracts, or protocol boundaries, update both this file, [Client AGENTS.md](../client/AGENTS.md), and associated tests
- If changing timer logic, update both timer/service tests and this documentation
- Review and update [Documentation Overview](../../doc/documentation_overview.md) and [README](../../README.md) if changes are significant
- Update Vite config if updating proxies
- Before submitting your PR, follow contributing steps in README

---

For an up-to-date map of system documentation and contributing protocols, start at the [LeanTime Documentation Overview](../../doc/documentation_overview.md).