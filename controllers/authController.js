import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d', // token will expire in 30 days
}
    );
};
export const registerUser = async(req,res)=>{
    const{username,email,password}=req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"user already exist with this email"});

        }
        const newUser = new User ({username,email,password});
        await newUser.save();
        res.status(201).json({
            message:"user registred successfully",
            user:{
                id:newUser._id,
                username:newUser.username,
                email:newUser.email,
            }
        });  
    }
    catch(error){
        console.error("Error in registerUser:",error);
        res.status(500).json({message:"Internal server error"});
    }
};
export const LoginUser = async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
    
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const token = generateToken(user._id);
    res.status(200).json({
        message:"Login successful",
        token,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }

    });
} catch(error){
    console.error("Error in LoginUser:",error);
    res.status(500).json({message:"Internal server error"});

}};