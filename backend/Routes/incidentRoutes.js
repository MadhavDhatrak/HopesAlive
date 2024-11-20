import express from "express";
import { createIncident, getIncidentById, getIncidents } from "../Controllers/incidentControllers.js";
import protectedRoute from "../Middleware/protected.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router=express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/create",protectedRoute ,upload.single('animalPhoto'), createIncident);
router.get("/", protectedRoute, getIncidents);
router.get("/:id",protectedRoute, getIncidentById);



export default router;
