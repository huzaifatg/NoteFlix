import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const cleanupUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Find all users
        const users = await User.find({});
        console.log('\n=== ALL USERS IN DATABASE ===');
        console.log(`Total users: ${users.length}\n`);
        
        users.forEach((user, index) => {
            console.log(`${index + 1}. Email: ${user.email}`);
            console.log(`   Username: ${user.username}`);
            console.log(`   Created: ${user.createdAt}`);
            console.log(`   Password hash length: ${user.password.length}`);
            console.log('---');
        });

        // Find duplicate emails
        const emailCounts = {};
        users.forEach(user => {
            emailCounts[user.email] = (emailCounts[user.email] || 0) + 1;
        });

        const duplicates = Object.entries(emailCounts).filter(([email, count]) => count > 1);
        
        if (duplicates.length > 0) {
            console.log('\n=== DUPLICATE EMAILS FOUND ===');
            for (const [email, count] of duplicates) {
                console.log(`${email}: ${count} accounts`);
                
                // Find all users with this email
                const duplicateUsers = await User.find({ email }).sort({ createdAt: -1 });
                
                console.log('  Keeping newest account:');
                console.log(`    ID: ${duplicateUsers[0]._id}, Created: ${duplicateUsers[0].createdAt}`);
                
                console.log('  Will delete these older accounts:');
                for (let i = 1; i < duplicateUsers.length; i++) {
                    console.log(`    ID: ${duplicateUsers[i]._id}, Created: ${duplicateUsers[i].createdAt}`);
                }
            }

            // Ask for confirmation (you'll need to modify this to actually delete)
            console.log('\n=== ACTION REQUIRED ===');
            console.log('To delete duplicate accounts, uncomment the deletion code in this script.');
            console.log('The script will keep the NEWEST account for each email and delete older ones.');
            
            // UNCOMMENT BELOW TO ACTUALLY DELETE DUPLICATES
            // console.log('\nDeleting duplicates...');
            // for (const [email, count] of duplicates) {
            //     const duplicateUsers = await User.find({ email }).sort({ createdAt: -1 });
            //     // Keep the first (newest), delete the rest
            //     for (let i = 1; i < duplicateUsers.length; i++) {
            //         await User.findByIdAndDelete(duplicateUsers[i]._id);
            //         console.log(`Deleted: ${duplicateUsers[i].email} (${duplicateUsers[i]._id})`);
            //     }
            // }
            // console.log('Duplicates deleted successfully!');
        } else {
            console.log('\n✅ No duplicate emails found!');
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

cleanupUsers();
