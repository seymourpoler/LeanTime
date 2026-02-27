# AGENTS.md

## Purpose
LeanTime server manages the countdown timer state and exposes it to clients via Socket.IO for real-time updates.

## Tech Stack
- Express (server API and middleware)
- Socket.IO (realtime communication)
- TypeScript (server code)
- Vite (dev middleware)
- Vitest (server tests)

## Quick Start (Server)
- Run dev server (API + Vite): `npm run dev`
- Run production server: `npm run start`
- Run tests: `npm run test`
- Production server command sets `NODE_ENV=production` (customize for Windows)

## Architecture Overview (Server)
- Starts from `src/server/index.ts`, owns canonical countdown timer
- Main modules:
  - `dateTimeService.ts`: Timer and state logic
  - Express handler for serving static and API
  - Socket.IO server instance
- Socket events handled: `start`, `pause`, `reset`, `apply` (from client)
- Socket events emitted: `updated_time` (to clients)

## Key Files (Server)
- `src/server/index.ts`: Express and Socket.IO entry
- `src/server/dateTimeService.ts`: Timer management logic
- `src/server/dateTimeService.test.ts`: Timer service unit tests
- `vite.config.ts`: Vite proxy setup for websocket
- `src/testing.ts`: Test support/mocking

## Runtime Behavior
- Owns canonical timer, emits `updated_time` every second
- Applies settings changes from clients
- In dev, Vite middleware wraps server (no separate dev command)

## Patterns and Conventions
- Keep all timer state calculations on the server
- Strict socket event contract (literal names)
- Ensure concurrency safety when editing timer state

## Server-side Testing Notes
- All logic tested with Vitest
- Unit tests for dateTimeService
- Use mocking helpers for isolation

## Safe Change Checklist (Server)
- If changing socket events or contract, update both client and server
- If changing timer logic, adjust both timer/service tests
- Update Vite config if updating proxies
