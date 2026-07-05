import jwt from "jsonwebtoken";
import User from "../models/user.js";
 
const protect =async (req,res,next)=>{
    let token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer ')){
        return res.status(401).json({message:"Not authorized, no token"});
    }
    try{
        // 2. Token string ko split karke extract kiya ("Bearer eyJ..." -> "eyJ...")
        const tokenString = token.split(' ')[1];
        const decoded = jwt.verify(tokenString,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
         next();

    } catch (error) {
        return res.status(401).json({message:"Not authorized,token failed"});
    }
   
}
export default protect ;