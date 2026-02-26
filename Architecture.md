# LeanTime Architecture Overview

## Overview
LeanTime is a minimal countdown timer web app that uses a lightweight server-client architecture. The client interacts with an Express server via Socket.IO for real-time updates of the timer state. The project emphasizes simplicity, performance, and a seamless user experience.

## Key Components

### 1. **Frontend (Client)**
- **Purpose**: The client is responsible for rendering the user interface, displaying the timer, and interacting with the user via buttons and settings inputs.
- **Tech stack**:
  - Framework: None (uses Vite for build and dev middleware)
  - Language: TypeScript
  - Build Tool: Vite
- **Key Files**:
  - `index.html`: Provides the base HTML structure for the app.
  - `src/client/index.ts`: Entry point for the application.
  - `src/client/view.ts`: Manages DOM updates and user interactions.
  - `src/client/presenter.ts`: Coordinates interactions between the View, Service, and Sound logic.
  - `src/client/service.ts`: Wraps the Socket.IO client for real-time communication.
  - `src/client/sound.ts`: Handles the playback of the alarm sound.

### 2. **Backend (Server)**
- **Purpose**: The server acts as the source of truth for the timer's state. It uses Socket.IO for real-time updates and Express for handling requests.
- **Tech Stack**:
  - Framework: Express
  - Language: TypeScript
  - Real-Time Communication: Socket.IO
- **Key Files**:
  - `src/server/index.ts`: Sets up the Express server and integrates the Socket.IO functionality.
  - `src/server/dateTimeService.ts`: Implements the core logic for managing the countdown timer and its state.

## System Architecture
The architecture is split into two primary layers:

### 1. **Client Side**
- The client connects to the server via WebSocket (powered by Socket.IO).
- User actions like starting, pausing, resetting, or applying a new timer send corresponding events to the server.
- The client interfaces consist of four major modules:
  1. **View**: Manages DOM manipulations.
  2. **Presenter**: Bridges the View, Service, and Sound.
  3. **Service**: Handles Socket.IO communication with the server.
  4. **Sound**: Plays the alarm when the timer hits zero.

### 2. **Server Side**
- The Express-based server owns the canonical state of the countdown timer.
- The server updates the timer logic every second or based on user interactions.
- Socket.IO broadcasts these updates to all connected clients.

## Runtime Behavior
- On app load, the client establishes a WebSocket connection to the server.
- When the user interacts with the UI (e.g., starts the timer):
  - A Socket.IO event is sent to the server.
  - The server processes the event and updates the internal timer state.
  - The updated state is emitted via `updated_time` events back to the client.
- The timer defaults to 1500 seconds (25 minutes) unless modified by the user.
- When time reaches zero:
  - The server pauses the timer and the client plays an alarm.

## Development Workflow
- **Development server**: Run `npm run dev` to start the Express server with Vite middleware for hot module reloading.
- **Testing**: All tests are written using Vitest. Run tests with `npm run test`.
- **Production Build**: Use `npm run build` to generate a production-ready version of the app.
- **Runtime**: Use `npm run start` to start the production server.

## Socket.IO Integration
The following socket events are used for real-time communication between the client and server:

- **Client -> Server**:
  - `start`: Starts the timer.
  - `pause`: Pauses the timer.
  - `reset`: Resets the timer to the initial value.
  - `apply`: Sets the timer to a custom value.
- **Server -> Client**:
  - `updated_time`: Sends the updated timer state every second.

## Conventions and Patterns
- **Frontend**: Presentation logic is decoupled via the `Presenter` class, ensuring a clean separation of concerns.
- **Backend**: The `DateTimeService` encapsulates all core timer logic.
- **Testing**: 
  - For mocking and spying, `src/testing.ts` provides utilities for spying on class methods.
  - Presenter and DateTimeService have dedicated unit tests to ensure correctness.

## Key Design Decisions
1. **Simplicity**: No client-side frameworks are used, keeping the frontend light and fast.
2. **Single Source of Truth**: The server owns the timer state, ensuring synchronization between multiple clients.
3. **Real-Time**: Leveraging Socket.IO enables real-time two-way communication between client and server.

## Future Enhancements
- **Dark Mode**: Add styling for better accessibility and usability in low-light environments.
- **Persistent Storage**: Save timer states and user settings to retain them across sessions.
- **Progressive Web App**: Enable offline support via service workers.

---
By adhering to this architecture, LeanTime ensures a lightweight timer app with real-time interactivity and a minimal footprint.