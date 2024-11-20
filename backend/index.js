import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/ConnectDB.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import incidentRoutes from "./Routes/incidentRoutes.js";
import ngoRoutes from "./Routes/NgoRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/users",userRoutes);
app.use("/api/incidents",incidentRoutes);
app.use("/api/ngo",ngoRoutes);

app.listen(port, () => {
    connectDB();
  console.log(`Server is running on port ${port}`);
});

