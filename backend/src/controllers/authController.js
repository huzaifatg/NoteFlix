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
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const normalizedEmail = email.toLowerCase();
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Don't hash here - the User model's pre-save hook will handle it
        const user = new User({
            username,
            email: normalizedEmail,
            password: password, // Pass plain password, let the model hash it
        });
        const savedUser = await user.save();

        const token = generateToken(savedUser._id);

        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            token: token,
        });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Login User
export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        if (user) {
            console.log("Password provided during login:", password);
            console.log("Password in database:", user.password);

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
        console.error("Error logging in user:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}