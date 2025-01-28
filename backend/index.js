import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/ConnectDB.js";
import userRoutes from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import incidentRoutes from "./Routes/incidentRoutes.js";
import ngoRoutes from "./Routes/NgoRoutes.js";
import volunteerRoutes from "./Routes/volunteerRoutes.js"; 
import cors from "cors";
import docuSignRoutes from './Routes/docuSignRoutes.js';
import petRoutes from './Routes/petRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration - this needs to be before routes
app.use(cors({
    origin: ['https://hopesalive-8.onrender.com', 'https://hopesalive-8.onrender.com/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/docusign", docuSignRoutes);
app.use("/api/pets", petRoutes);

// Serve uploaded files
app.use("/api/uploads", express.static("uploads"));

// Serve static files
const frontendBuildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendBuildPath));

// Handle all routes
app.get('*', (req, res) => {
    // Check if the request is for an API route
    if (req.url.startsWith('/api/')) {
        return res.status(404).json({ message: 'API route not found' });
    }
    
    // Serve the frontend app
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

