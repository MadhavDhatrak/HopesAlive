import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign(
        { userId }, 
        process.env.JWT_KEY, 
        { expiresIn: '15d' }
    );
};

export default generateToken;