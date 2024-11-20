import express from "express";
import { getUserProfile, login, logout, register } from "../Controllers/userControllers.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/profile/:userId",getUserProfile);


export default router;
