import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Note from '../models/Note.js';

// Load environment variables
dotenv.config();

const deleteEverything = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Count before deletion
        const userCount = await User.countDocuments();
        const noteCount = await Note.countDocuments();
        
        console.log(`\n⚠️  WARNING: About to delete:`);
        console.log(`   - ${userCount} users`);
        console.log(`   - ${noteCount} notes`);
        console.log(`   - Total: ${userCount + noteCount} documents\n`);

        // Delete all notes
        const notesResult = await Note.deleteMany({});
        console.log(`✅ Deleted ${notesResult.deletedCount} notes`);

        // Delete all users
        const usersResult = await User.deleteMany({});
        console.log(`✅ Deleted ${usersResult.deletedCount} users`);

        console.log('\n🎉 Database completely cleaned!');

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

deleteEverything();
