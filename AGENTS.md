# AGENTS.md (Root)

## Documentation Split

The agent and architecture documentation for LeanTime has been split into two targeted files:

- [Client AGENTS.md](./src/client/AGENTS.md) – All architecture, usage, and conventions details for the client-side code/UI
- [Server AGENTS.md](./src/server/AGENTS.md) – All server-side architecture, usage, and conventions

Consult the appropriate file for detailed info on:
- File structure
- Architecture and tech stack
- Startup and development details
- Testing tips
- Change checklists


**Important protocol note:**
- The timer system now supports multiple independent timers (rooms) via `timerId`. All timer actions and updates are scoped to a specific timer room.
- Socket event names have changed. The current contract uses:
  - Client → Server: `join_timer`, `leave_timer`, `start_timer`, `pause_timer`, `reset_timer`, `apply_timer`
  - Server → Client: `timer_updated`
- If you change any event names, timer ID logic, or cross-boundary protocol, **always update both client and server docs** to keep contracts in sync.

For details/examples, see `src/client/service.ts` and `src/server/index.ts`.

For supporting architectural and workflow documentation (e.g., MVP, TDD, overview), see the `doc/` folder in the project root.

