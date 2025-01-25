import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/ConnectDB.js";
import userRoutes from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import incidentRoutes from "./Routes/incidentRoutes.js";
import ngoRoutes from "./Routes/NgoRoutes.js";
import volunteerRoutes from "./Routes/volunteerRoutes.js"; 
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(cookieParser());
app.use("/api/users",userRoutes);
app.use("/api/incidents",incidentRoutes);
app.use("/api/ngo",ngoRoutes);
app.use("/api/volunteer",volunteerRoutes);
app.use("/api/uploads", express.static("uploads"));

app.listen(port, () => {
    connectDB();
  console.log(`Server is running on port ${port}`);
});

