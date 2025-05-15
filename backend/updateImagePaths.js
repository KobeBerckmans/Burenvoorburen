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

async function updateImagePaths() {
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

        // Get all documents
        const documents = await collection.find({}).toArray();
        console.log(`Found ${documents.length} documents to update`);

        // Update each document
        for (const doc of documents) {
            if (doc.img) {
                // Extract just the filename and convert to lowercase
                const filename = doc.img.split('/').pop().toLowerCase();
                // Use the path that we know works
                const newPath = `/assets/images/${filename}`;
                
                console.log(`Updating document ${doc._id}:`);
                console.log(`  Old path: ${doc.img}`);
                console.log(`  New path: ${newPath}`);

                await collection.updateOne(
                    { _id: doc._id },
                    { $set: { img: newPath } }
                );
            }
        }

        console.log("All documents updated successfully!");
        console.log("You can verify the images are working by visiting:");
        console.log("http://localhost:3001/assets/images/historiek1.jpg");

    } catch (error) {
        console.error("Error updating documents:", error);
    } finally {
        await client.close();
        console.log("Database connection closed");
    }
}

// Run the update
updateImagePaths(); 