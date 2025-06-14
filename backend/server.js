import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import streetsRouter from './routes/streets.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware om hoofdlettergevoelige charset te fixen
app.use((req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('charset=UTF-8')) {
    req.headers['content-type'] = req.headers['content-type'].replace('charset=UTF-8', 'charset=utf-8');
  }
  next();
});

// Get the absolute path to the images directory
const imagesPath = '/Users/kobeberckmans/Desktop/Burenvoorburen/src/assets/images';
console.log('Images directory path:', imagesPath);

// Serve static files from the images directory
app.use('/assets/images', express.static(imagesPath));

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

// Connect to MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

connectToMongo();

// Helper function to get the correct image path
// Returns a static path for images, or the original URL if already absolute
function getImagePath(imgName) {
    if (!imgName) return null;
    // If it's already a full URL, return it as is
    if (imgName.startsWith('http')) {
        return imgName;
    }
    // Otherwise, just use the filename with the assets path
    const filename = imgName.split('/').pop().toLowerCase();
    return `/assets/images/${filename}`;
}

// News endpoint
// Returns all news items from the Historiek collection
app.get('/api/news', async (req, res) => {
    try {
        const database = client.db("FinalWork");
        const collection = database.collection("Historiek");
        
        const newsItems = await collection.find({}).sort({ Datum: -1 }).toArray();
        
        // Transform the data
        const transformedItems = newsItems.map(item => ({
            _id: item._id,
            datum: item.Datum,
            titel: item.Titel,
            beschrijving: item.Berschrijving,
            img: getImagePath(item.img)
        }));
        
        res.json(transformedItems);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

// Volunteers endpoint
// Registers a new volunteer in the volunteers collection
app.post('/api/volunteers', async (req, res) => {
    try {
        const database = client.db("FinalWork");
        const collection = database.collection("volunteers");
        const { naam, voornaam, adres, tel, mail, motivatie } = req.body;
        if (!naam || !voornaam || !mail) {
            return res.status(400).json({ error: 'Naam, voornaam en mail zijn verplicht.' });
        }
        const result = await collection.insertOne({ naam, voornaam, adres, tel, mail, motivatie, createdAt: new Date() });
        res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
        console.error("Error saving volunteer:", error);
        res.status(500).json({ error: "Failed to save volunteer" });
    }
});

// Help requests endpoint
// Submits a new help request to the helpRequests collection
app.post('/api/help-requests', async (req, res) => {
    try {
        const database = client.db("FinalWork");
        const collection = database.collection("helpRequests");
        const { naam, soort, bericht, datum, straat, nummer, telefoon, contrei, uur } = req.body;
        if (!naam || !soort || !bericht || !datum || !straat || !nummer || !telefoon || !contrei || !uur) {
            return res.status(400).json({ error: 'Alle velden zijn verplicht.' });
        }
        const result = await collection.insertOne({
            naam,
            soort,
            bericht,
            datum,
            straat,
            nummer,
            telefoon,
            contrei,
            uur,
            createdAt: new Date()
        });
        res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
        console.error("Error saving help request:", error);
        res.status(500).json({ error: "Failed to save help request" });
    }
});

// Contact endpoint
// Handles contact form submissions
app.post('/api/contact', async (req, res) => {
    try {
        const database = client.db("FinalWork");
        const collection = database.collection("contacts");
        const { email, subject, message } = req.body;
        if (!email || !subject || !message) {
            return res.status(400).json({ error: 'Alle velden zijn verplicht.' });
        }
        const result = await collection.insertOne({ email, subject, message, createdAt: new Date() });
        res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
        console.error("Error saving contact message:", error);
        res.status(500).json({ error: "Failed to save contact message" });
    }
});

// Feedback endpoint
// POST: Submit feedback (name, message)
// GET: Retrieve all feedback
app.post('/api/feedback', async (req, res) => {
    try {
        const database = client.db("FinalWork");
        const collection = database.collection("feedback");
        const { naam, boodschap } = req.body;
        if (!naam || !boodschap) {
            return res.status(400).json({ error: 'Naam en boodschap zijn verplicht.' });
        }
        const result = await collection.insertOne({ naam, boodschap, datum: new Date() });
        res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "Failed to save feedback" });
    }
});
app.get('/api/feedback', async (req, res) => {
    try {
        const database = client.db("FinalWork");
        const collection = database.collection("feedback");
        const feedback = await collection.find({}).sort({ datum: -1 }).toArray();
        res.json(feedback);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Failed to fetch feedback" });
    }
});

// Routes
app.use('/api/streets', streetsRouter);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Serving images from: ${imagesPath}`);
    console.log(`Images available at: http://localhost:${port}/assets/images/`);
}); 