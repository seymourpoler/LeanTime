# AGENTS.md

## Purpose
LeanTime is a minimal countdown timer web app. The client UI uses Socket.IO to talk to a small Express server that owns the timer state and broadcasts updates.

## Tech Stack
- Vite (frontend build + dev middleware)
- Express + Socket.IO (server + realtime timer updates)
- TypeScript (client + server)
- Vitest (tests)

## Quick Start
- Dev server (API + Vite middleware): `npm run dev`
- Run tests: `npm run test`
- Production build: `npm run build`
- Production server: `npm run start`

Note: `npm run start` sets `NODE_ENV=production` inline; on Windows you may need a shell-specific variant if running it manually.

## Architecture Overview
- Client renders `index.html` and uses `src/client/index.ts` to wire up View, Service, Presenter, and Sound.
- Server runs from `src/server/index.ts` and owns the canonical countdown timer in `DateTimeService`.
- Socket events:
  - Client -> Server: `start`, `pause`, `reset`, `apply`
  - Server -> Client: `updated_time`

## Repo Map (Most Important Files)
- `index.html`: App shell and DOM elements (buttons, timer display, settings inputs).
- `src/client/index.ts`: Client entry wiring.
- `src/client/view.ts`: DOM access and UI events.
- `src/client/presenter.ts`: Presentation logic (view + service + sound).
- `src/client/service.ts`: Socket.IO client wrapper.
- `src/client/sound.ts`: Alarm playback (`public/alarm.mp3`).
- `src/server/index.ts`: Express + Socket.IO server and Vite middleware.
- `src/server/dateTimeService.ts`: Countdown logic and state.
- `src/testing.ts`: Vitest helper to mock all methods.
- `src/client/presenter.test.ts`: Presenter tests.
- `src/server/dateTimeService.test.ts`: Timer service tests.

## Runtime Behavior (Key Details)
- The server is the source of truth for the timer. It emits `updated_time` every second when running.
- Default timer is 1500 seconds (25 minutes) unless changed via Apply.
- When time hits 0, the presenter plays the alarm and pauses the timer.
- In dev, Vite runs as middleware on the same Express server; no separate Vite dev command is used.
- Vite proxy for `/socket.io` is configured in `vite.config.ts`.

## Conventions and Patterns
- TypeScript with ESM imports (`type: module` in `package.json`).
- Presentation logic is isolated in `Presenter` and should only talk to `View`, `Service`, and `Sound`.
- Socket event names are string literals; keep them consistent between client and server.

## Testing Notes
- Tests use Vitest. Run with `npm run test`.
- When mocking, use `spyAllMethodsOf` to replace class methods with spies.

## Safe Change Checklist
- If you change socket event names, update both client and server.
- If you change default time, update tests that expect 1500 seconds.
- If you adjust DOM ids, update `View` and `index.html` together.
- If you change timer logic, adjust `DateTimeService` tests.
