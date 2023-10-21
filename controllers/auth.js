import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedprofile:Math.floor(Math.random()*1000),
      impressions:Math.floor(Math.random()*1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    //status code 201 something has been created
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Logging in
export const login = async (req,res)=>{
    try{
        const{email,password}=req.body;
        const user = await User.find({email:email});
        if(!user) res.status(400).json({msg:"User does not exist"});
        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch) res.status(400).json({msg:"Invalid Credentials"});
        const token = Jwt.sign({id:user._id},precess.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user})

    } catch(error){
        res.status(500).json({error:error.message});
    }
}