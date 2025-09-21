import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Register User
export async function registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
        console.log("Request body during registration:", req.body);

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase();

        // Check if user already exists
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        console.log("Generated salt:", salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Hashed password during registration:", hashedPassword);

        // Save the user
        const user = new User({
            username,
            email: normalizedEmail,
            password: hashedPassword,
        });
        const savedUser = await user.save();

        console.log("Saved user:", savedUser);

        // Generate token
        const token = generateToken(savedUser._id);

        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            token: token,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// Login User
export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        console.log("Login request body:", req.body);

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase();

        // Find user by email
        const user = await User.findOne({ email: normalizedEmail });
        console.log("User found during login:", user);

        if (user) {
            console.log("Password provided during login:", password);
            console.log("Password in database:", user.password);

            // Compare passwords
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("Password valid during login:", isPasswordValid);

            if (isPasswordValid) {
                res.json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user._id),
                });
            } else {
                console.log("Invalid password");
                res.status(401).json({ message: "Invalid email or password" });
            }
        } else {
            console.log("User not found");
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}