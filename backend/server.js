import express from "express";
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("APP running on PORT:", PORT);
  });
});

