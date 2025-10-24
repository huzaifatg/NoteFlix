import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js"; // Import new auth routes
import userRoutes from "./routes/userRoutes.js"; // Import user routes
import {protect} from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

app.use(express.json());
app.use(rateLimiter);

// Auth Routes
app.use("/api/auth", authRoutes); // Add new authentication routes
app.use("/api/user", userRoutes);

// Protected Routes
app.use("/api/notes", protect, notesRoutes); // Apply the 'protect' middleware here

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
});