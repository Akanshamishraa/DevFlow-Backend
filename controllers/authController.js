import User from '../models/user.js';
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
}