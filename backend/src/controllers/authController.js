import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 

// Helper function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Register a new user
export async function registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
        console.log("Request body:", req.body);

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        // Create and save the user
        const user = new User({ username, email, password: hashedPassword });
        const savedUser = await user.save();

        console.log("Saved user:", savedUser);

        // Generate a token
        const token = generateToken(savedUser._id);

        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            token: token,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Log in a user
export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        console.log("Login request body:", req.body);

        // Find the user by email
        const user = await User.findOne({ email });
        console.log("User found:", user);

        // Check if the user exists and the password is correct
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("Password matched");
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            console.log("Invalid email or password");
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}