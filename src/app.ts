import express, { Express } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import { getHelmetConfig } from "../src/config/helmetConfig";
import eventRoutes from "../src/api/v1/routes/eventRoutes";


// Initialize Express application
const app: Express = express();

// Apply basic Helmet security
app.use(getHelmetConfig());

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Health Check Endpoints.
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use(express.json());

// API Routes.
app.use("/api/v1/events", eventRoutes);

export default app;
