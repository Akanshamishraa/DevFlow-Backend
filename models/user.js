import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

 const userSchema = new mongoose.Schema({
    username:{
        type:String ,
        required:[true,'username is required'],
        trim:true // removes whitespace from both ends of a string
},
email:{
    type:String ,
    required :[true,"email is required"],
    unique:true,// ensures that the email is unique in the database
    trim:true,
    lowercase:true,// converts the email to lowercase before saving it to the database

},
password:{
    type:String,
    required:[true,"password id required"],
    minlength:[6,"password must be at least 6 characters long"],
}
 },{
    timestamps:true // automatically adds createdAt and updatedAt fields to the schema  
 });
 userSchema.pre('save',async function (){     // Agar password change nahi hua hai (jaise user ne sirf email update kiya ho), toh aage badho
    if(!this.isModified('password')){
        return ;
    }
    
        const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(10): Hashing function ko aur secure banane ke liye isme random noise/text inject kiya jata hai jise salt bolte hain. 10 rounds of calculation standard setting hai.
        this.password = await bcrypt.hash(this.password,salt); // Hashing function mein password aur salt daalkar hash code generate karte hain
    
    
  
    

 });
 userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password); // entered password ko hash karke database mein stored password ke saath compare karte hain
 }
 const User = mongoose.model('User',userSchema);
 export default User;

 

 