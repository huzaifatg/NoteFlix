import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures each email is unique
            match: [/.+@.+\..+/, "is invalid"], // A basic regex to validate the email format
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// This code will run before a user document is saved
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// A method to compare a given password with the hashed password in the database
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;