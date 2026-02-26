# LeanTime

![CI Status](https://github.com/seymourpoler/LeanTime/actions/workflows/ci.yml/badge.svg)

LeanTime is a lightweight and minimalistic countdown timer web app. Designed for simplicity and efficiency, it features real-time synchronization using Socket.IO and provides an intuitive user interface for tasks that require precise time management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Real-Time Timer**: Provides a synchronized timer state across multiple clients.
- **Simple Interface**: Easy-to-use UI for starting, pausing, resetting, and customizing the timer.
- **Customizable**:
  - Modify the timer’s initial value with the "Apply" function.
  - Sleek alarm sound on completion.
- **Fast Feedback Loop**: Instant updates powered by Socket.IO.

---

## Tech Stack

- **Frontend**: Vite + TypeScript
  - No frameworks for maximum simplicity.
- **Backend**: Express + Socket.IO (TypeScript-based)
- **Testing**: Vitest, with focused unit tests for stability and accuracy.
- **Build**: Vite for development and production builds.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/seymourpoler/LeanTime.git
   ```
2. Navigate to the project directory:
   ```bash
   cd LeanTime
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Development Workflow

- Start the development server:
  ```bash
  npm run dev
  ```
  This will start the Express server and Vite middleware with hot-reloading.

- Run tests:
  ```bash
  npm run test
  ```
  This will execute all unit tests using Vitest.

- Build for production:
  ```bash
  npm run build
  ```
  This will bundle and optimize the codebase into the `dist/` directory.

- Start the production server:
  ```bash
  npm run start
  ```

---

## Testing

We use Vitest for testing the project’s critical functionalities. To execute tests, run:
```bash
npm run test
```
Tests include:
- Unit tests for timer logic in the backend (`DateTimeService`)
- Presenter logic on the client side

---

## Deployment

LeanTime is currently deployed on [Railway](https://leantime-production-d603.up.railway.app/). You can access the live instance using the link.

---

## Contributing

Contributions are welcome! Please adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md).

To get started:
- Fork this repository.
- Create a new branch.
- Submit a pull request with a clear explanation of changes.

---

## License

This project is licensed under the [MIT License](LICENSE.md).

---

Enjoy using LeanTime! Feedback and suggestions are always appreciated.