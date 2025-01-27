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

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration - this needs to be before routes
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:5173',
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

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    // Serve frontend build files
    const frontendBuildPath = path.join(__dirname, '../frontend/dist');
    
    // Serve static files
    app.use(express.static(frontendBuildPath));
    
    // Serve favicon
    app.get('/favicon.ico', (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'favicon.png'));
    });
    
    // Handle all other routes by serving index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Start server
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});

