import User from "../models/User.js";
import bcrypt from "bcrypt";

// Fetch User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
    const { name, email, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update name and email
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }

        // Update password
        if (oldPassword && newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            user.markModified("password"); // Ensure password is marked as modified
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } catch (error) {
        console.error("Error updating user profile:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete User Profile
export const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.remove();
        res.json({ message: "User profile deleted successfully" });
    } catch (error) {
        console.error("Error deleting user profile:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};