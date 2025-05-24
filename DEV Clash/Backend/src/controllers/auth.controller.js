import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import bcrypt from "bcrypt";


import { validateEmail } from "../utils/validate.utils.js";
import { generateToken } from "../utils/generateToken.js";
export const userRegister = async (req, res,next) => {
    const { name, email, password, role, shopName } = req.body;
    try{
        // Validate input
        if (!name || !email || !password || !role) {
           const error = new Error("All fields are required");
            error.statusCode = 400;
            throw error;
        }
        if (password.length < 6) {
            const error = new Error("Password must be at least 6 characters long");
            error.statusCode = 400;
            throw error;
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists with this email");
            error.statusCode = 400;
            throw error;
        }
        // Create new user
         const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        if(role==='student'){
            // Validate CUET student email format
            if (!validateEmail(role, email)) {
                const error = new Error("Invalid CUET student email format");
                error.statusCode = 400;
                throw error;
            }
            const token = generateToken(newUser._id, newUser.role, res);
        }
        
        
        // Hash password
       

        

        await newUser.save();
        let vendorId;
        
         if (role === 'vendor') {
            const vendor = new Vendor({ user: newUser._id, name: shopName || name });
            vendorId = vendor._id;
            const token = generateToken(vendorId, newUser.role, res);
            await vendor.save();
        }
        //console.log("User registered successfully:", newUser);
        res.status(201).json({ success: true, message: "User registered successfully",user: {_id:newUser._id,name:newUser.name,email:newUser.email,role:newUser.role}});
    }
    catch(err){
        next(err);
    }
}

export const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            const error = new Error("Email and password are required");
            error.statusCode = 400;
            throw error;
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("Invalid credentials");
            error.statusCode = 404;
            throw error;
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        // Generate token
        let token;
        if (user.role === 'vendor') {
            const vendor = await Vendor.findOne({ user: user._id });
             token = generateToken(vendor._id, user.role, res);
            
        }
        else{
            token = generateToken(user._id, user.role, res);
        }
        console.log("User logged in successfully:", user);
        res.status(200).json({ success: true, message: "User logged in successfully", token,user:{_id:user._id,name:user.name,email:user.email,role:user.role} });
    } catch (err) {
        next(err);
    }
}

export const userLogout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error logging out user" });
    }
}