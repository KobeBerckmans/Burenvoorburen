import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// streets.js - Express router for street-related endpoints
// Handles street search and related logic for Buren voor Buren
//
// Author: KobeBerckmans

const router = express.Router();

// Load environment variables from .env file for MongoDB credentials
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// MongoDB connection setup
// Uses password from environment variables for security
const password = process.env.MONGODB_PASSWORD;
if (!password) {
    console.error('MONGODB_PASSWORD is not set in .env file');
    process.exit(1);
}

// MongoDB URI for connecting to the cluster
const uri = `mongodb+srv://kobeberckmans:${password}@cluster1.tpiy3cp.mongodb.net/?retryWrites=true&w=majority&appName=FinalWork`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Persistent client connection for performance
let clientPromise = client.connect();

// Search endpoint for streets
// GET /search?q=... - Returns up to 10 matching streets (case-insensitive, partial match)
router.get('/search', async (req, res) => {
    const { q } = req.query;
    
    if (!q) {
        return res.json([]);
    }

    try {
        // Wait for MongoDB connection
        await clientPromise;
        const database = client.db("burenvoorburen");
        const collection = database.collection("streets");

        // Get all street documents
        const results = await collection.find({}).toArray();

        // Transform and filter results for matching streets
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
        // Sort: exact matches first, then partial, then alphabetically
        .sort((a, b) => {
            const aStartsWith = a.street.toLowerCase().startsWith(q.toLowerCase());
            const bStartsWith = b.street.toLowerCase().startsWith(q.toLowerCase());
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return a.street.localeCompare(b.street);
        })
        // Limit to 10 results for UI
        .slice(0, 10);

        res.json(transformedResults);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Er is een fout opgetreden bij het zoeken' });
    }
});

export default router; 