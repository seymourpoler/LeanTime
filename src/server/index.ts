import express from "express";
import { createServer as createHttpServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { ServerToClient } from "./serverToClient.js";
import { ConfigurationTimer } from "./configurationTimer.js";

async function bootstrap() {
  const app = express();
  const httpServer = createHttpServer(app);
  const io = new Server(httpServer);
  const serverToClient = new ServerToClient(io);
  const configurationTimer = new ConfigurationTimer(serverToClient);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    socket.on("join_timer", (timerId: string) => {
      socket.join(timerId);

      console.log(`${socket.id} joined ${timerId}`);
    });

    socket.on("leave_timer", (timerId: string) => {
      console.log(`${socket.id} leaving ${timerId}`);

      socket.leave(timerId);
    });

    type StartTimerArgs = {
        sender: string;
        timerId: string;
    };
    socket.on("start_timer", (args: StartTimerArgs) => {
      console.log(`User started: ${args.sender} in timer ${args.timerId}`);

      configurationTimer.start(args.timerId);
    });

    type PauseTimerArgs = {
      sender: string;
      timerId: string
    };
    socket.on("pause_timer", (args: PauseTimerArgs) => {
      console.log(`User paused: ${args.sender} in timer ${args.timerId}`);

      configurationTimer.pause(args.timerId);
    });

    type ResetTimerArgs = {
      sender: string;
      timerId: string;
    };
    socket.on("reset_timer", (args: ResetTimerArgs) => {
      console.log(`User reset: ${args.sender} in timer ${args.timerId}`);

      configurationTimer.reset(args.timerId);
    });

    type ApplyTimerArgs = {
      sender: string;
      timerId: string;
      seconds: number;
    };
    socket.on("apply_timer", (args: ApplyTimerArgs) => {
        console.log(
          `User reset: ${args.sender} in timer ${args.timerId} with time ${args.seconds}`,
        );

        configurationTimer.apply(args.timerId, args.seconds);
      },
    );
  });

  if (process.env.NODE_ENV !== "production") {
    // In Dev: Vite handles the frontend requests as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In Prod: Serve the built files
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
  }

  const port: number = Number(process.env.PORT) || 3000;
  httpServer.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}

bootstrap();
