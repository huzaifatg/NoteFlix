import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const deleteAllUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Count users before deletion
        const count = await User.countDocuments();
        console.log(`\n⚠️  WARNING: About to delete ${count} users!`);
        
        // List all users
        const users = await User.find({});
        console.log('\nUsers to be deleted:');
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.email} (${user.username})`);
        });

        // Delete all users
        const result = await User.deleteMany({});
        console.log(`\n✅ Deleted ${result.deletedCount} users successfully!`);

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

deleteAllUsers();
