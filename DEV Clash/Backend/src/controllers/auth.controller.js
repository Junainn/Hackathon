import User from "../models/user.model.js";
import bcrypt from "bcrypt";


import { validateEmail } from "../utils/validate.utils.js";
import { generateToken } from "../utils/generateToken.js";
export const userRegister = async (req, res,next) => {
    const { name, email, password, role } = req.body;
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
        if(role==='student'){
            // Validate CUET student email format
            if (!validateEmail(role, email)) {
                const error = new Error("Invalid CUET student email format");
                error.statusCode = 400;
                throw error;
            }
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        const token = generateToken(newUser._id, newUser.role, res);
        //console.log("User registered successfully:", newUser);
        res.status(201).json({ success: true, message: "User registered successfully" });
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
        const token = generateToken(user._id, user.role, res);
        console.log("User logged in successfully:", user);
        res.status(200).json({ success: true, message: "User logged in successfully", token });
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