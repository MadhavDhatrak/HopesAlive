import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';

const protectedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No Bearer token found" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        console.log("Decoded token:", decoded); // Debug log
        console.log("Token:", token); // Debug log
        const user = await User.findById(decoded.userId).select("-password");
        console.log("User:", user); // Debug log
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Auth error:", error); // Debug log
        res.status(401).json({ message: error.message });
    }
};

export default protectedRoute;