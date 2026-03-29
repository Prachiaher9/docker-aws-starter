import express from "express";
import type { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Config
const PORT = process.env.PORT || 3000;

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Yjs + Socket.IO binding
const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

// Middleware (basic)
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello world",
    success: true,
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "ok",
    success: true,
  });
});

// Global error handlers (basic safety)
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});