import { UserModel } from '../models/UserModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'





// 1. SIGNUP 
const handleSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || name.trim().length === 0)
      return res.status(400).json({ errMsg: "name is required" });
    if (!email || email.trim().length === 0)
      return res.status(400).json({ errMsg: "email is required" });
    if (!password || password.length < 6)
      return res.status(400).json({ errMsg: "password must be at least 6 characters" });


    const existingUser = await UserModel.findOne({ email: email });

    console.log("Existing user:", existingUser)


    if (existingUser) {
      return res.status(400).json({ errMsg: "Email already registered and user exists" });
    }

    console.log("Password before hashing:", password);


    const hashedPassword = await bcrypt.hash(password, 10)
   


    // Create new user
    const newUser = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword

    });

    return res.status(201).json({
      message: "User created successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ errMsg: "Server Error" });
  }
};

//  user login
const handleLogin = async (req, res) => {
  try {
    console.log("API reached.");
    const { email, password } = req.body;



    if (!email || email.trim().length === 0)
      return res.status(400).json({ errMsg: "email is required" });
    if (!password || password.length < 2)
      return res.status(400).json({ errMsg: "valid password is required" });


    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ errMsg: "user not found" });
    }

  
  


    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ errMsg: "invalid password" })
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      user: { name: user.name, email: user.email },
      token: token,
      message: "login success"
    });


  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ errMsg: "Server Error" });
  }
};

export { handleSignup, handleLogin }