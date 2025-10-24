import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Note from '../models/Note.js';

// Load environment variables
dotenv.config();

const viewDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB\n');

        // Get all users
        const users = await User.find({});
        console.log('=== USERS ===');
        console.log(`Total: ${users.length}\n`);
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.email} (${user.username})`);
            console.log(`   Created: ${user.createdAt}`);
        });

        // Get all notes
        const notes = await Note.find({}).populate('user', 'email username');
        console.log('\n=== NOTES ===');
        console.log(`Total: ${notes.length}\n`);
        
        // Check for orphaned notes (notes without valid users)
        const orphanedNotes = [];
        
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            if (!note.user) {
                orphanedNotes.push(note);
                console.log(`${i + 1}. ⚠️  ORPHANED NOTE (no user)`);
            } else {
                console.log(`${i + 1}. Owner: ${note.user.email}`);
            }
            console.log(`   Title: ${note.title}`);
            console.log(`   Created: ${note.createdAt}`);
            console.log('---');
        }

        if (orphanedNotes.length > 0) {
            console.log(`\n⚠️  Found ${orphanedNotes.length} orphaned notes (notes with deleted users)`);
            console.log('Run "npm run delete-everything" to clean up the entire database');
        }

        // Close connection
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

viewDatabase();
