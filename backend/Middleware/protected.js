import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';

const protectedRoute = async (req, res, next) => {
       try {
           const token=req.cookies.jwt;
           if(!token){
               return res.status(401).json({msg:"Unauthorized"})
           }

           const decode=jwt.verify(token,process.env.JWT_KEY); // this will return the value of means userId
             if(!decode){
                 return res.status(401).json({msg:"Unauthorized"})
             }
              const user=await User.findById(decode.userId).select("-password");
                if(!user){
                    return res.status(401).json({msg:"Unauthorized"})
                }  

                req.user=user;
                console.log(req.user._id);
                next(); 
       } catch (error) {
           console.log(error)
        
       }
}

export default protectedRoute;