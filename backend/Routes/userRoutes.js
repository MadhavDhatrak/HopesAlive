import express from "express";
import protectedRoute from '../Middleware/protected.js';
import { getUserProfile, login, logout, register, getUserIncidents } from "../Controllers/userControllers.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/profile/:userId",getUserProfile);
router.get('/my-incidents/:userId', getUserIncidents);


export default router;
