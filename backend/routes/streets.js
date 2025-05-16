import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// MongoDB connection
const password = process.env.MONGODB_PASSWORD;
if (!password) {
    console.error('MONGODB_PASSWORD is not set in .env file');
    process.exit(1);
}

const uri = `mongodb+srv://kobeberckmans:${password}@cluster1.tpiy3cp.mongodb.net/?retryWrites=true&w=majority&appName=FinalWork`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Search endpoint
router.get('/search', async (req, res) => {
    const { q } = req.query;
    
    if (!q) {
        return res.json([]);
    }

    try {
        await client.connect();
        const database = client.db("burenvoorburen");
        const collection = database.collection("streets");

        // Search in the streets array and return matching documents
        const results = await collection.find({}).toArray();

        // Transform the results to include the matching street
        const transformedResults = results.flatMap(contrei => 
            contrei.streets
                .filter(street => 
                    // Case-insensitive partial match
                    street.toLowerCase().includes(q.toLowerCase())
                )
                .map(street => ({
                    _id: `${contrei._id}-${street}`,
                    street,
                    contrei: contrei.name,
                    type: contrei.type
                }))
        )
        // Sort results by relevance (exact matches first, then partial matches)
        .sort((a, b) => {
            const aStartsWith = a.street.toLowerCase().startsWith(q.toLowerCase());
            const bStartsWith = b.street.toLowerCase().startsWith(q.toLowerCase());
            
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            
            // If both start with or both don't start with, sort alphabetically
            return a.street.localeCompare(b.street);
        })
        // Limit results to prevent overwhelming the UI
        .slice(0, 10);

        res.json(transformedResults);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Er is een fout opgetreden bij het zoeken' });
    } finally {
        await client.close();
    }
});

export default router; 