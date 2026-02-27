# AGENTS.md

## Purpose
LeanTime client is a minimal web UI for controlling and observing a countdown timer in real time via Socket.IO. The client handles all interaction and display, delegating timer state to the server.

## Tech Stack
- Vite (frontend build and dev middleware)
- TypeScript (client code)
- Socket.IO-client (realtime updates)
- Vitest (client tests)

## Quick Start (Client)
- Run the app in dev (client+API): `npm run dev`
- Build production client bundle: `npm run build`
- Tests: `npm run test`

## Architecture Overview (Client)
- Loads `index.html` and wires up UI in `src/client/index.ts`.
- Main modules:
  - `view.ts`: DOM access and UI event handling
  - `presenter.ts`: Presentation logic, connects view/service/sound
  - `service.ts`: Socket.IO client logic
  - `sound.ts`: Plays alarm on timer end
- Socket events sent: `start`, `pause`, `reset`, `apply`
- Socket events received: `updated_time`

## Key Files (Client)
- `index.html`: UI shell and display controls
- `src/client/index.ts`: Entry point, module wiring
- `src/client/view.ts`: DOM and UI logic
- `src/client/presenter.ts`: Presentation controller
- `src/client/service.ts`: Socket.IO logic
- `src/client/sound.ts`: Alarm sound

## Runtime Behavior
- Connects to server for timer data; strictly a display/controller, not a timer owner
- Plays alarm (`public/alarm.mp3`) at end of countdown

## Patterns and Conventions
- Isolated presentation/logic in Presenter; stays loosely coupled to View & Service
- Socket event names must match server contract

## Client-side Testing Notes
- `src/client/presenter.test.ts` for presenter logic
- Use `spyAllMethodsOf` for mocking

## Safe Change Checklist (Client)
- If changing DOM ids, update both View and `index.html`
- If changing socket events, update handler strings, client and server
- Adjust presenter tests if logic is refactored
