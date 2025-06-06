import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const password = process.env.MONGODB_PASSWORD;
if (!password) {
    console.error('MONGODB_PASSWORD is not set in .env file');
    process.exit(1);
}

const uri = `mongodb+srv://kobeberckmans:${password}@cluster1.tpiy3cp.mongodb.net/?retryWrites=true&w=majority&appName=FinalWork`;

// checkDatabase.js - Utility script to check MongoDB connection and print Historiek collection
// Prints all documents in the Historiek collection for debugging/inspection.
//
// Author: KobeBerckmans

/**
 * Connects to MongoDB and prints all documents in the Historiek collection
 * Useful for debugging and verifying database contents
 */
async function checkDatabase() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db("FinalWork");
        const collection = database.collection("Historiek");

        const documents = await collection.find({}).toArray();
        console.log(`Found ${documents.length} documents in database:`);
        
        documents.forEach((doc, index) => {
            console.log(`\nDocument ${index + 1}:`);
            console.log(`ID: ${doc._id}`);
            console.log(`Datum: ${doc.Datum}`);
            console.log(`Titel: ${doc.Titel}`);
            console.log(`Image path in DB: ${doc.img}`);
            console.log(`Full URL would be: http://localhost:3001${doc.img}`);
        });

    } catch (error) {
        console.error("Error checking database:", error);
    } finally {
        await client.close();
        console.log("\nDatabase connection closed");
    }
}

// Run the check
checkDatabase(); 