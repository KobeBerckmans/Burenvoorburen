import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

// Street data structure
const streetData = [
    {
        name: "Centrum-Noord",
        type: "STADSKERN",
        streets: [
            "Academiestraat", "Albertvest", "Alexianenweg", "Danebroekstraat", 
            "Delportestraat", "Dr Geensstraat", "Gilainstraat", "Grote Markt", 
            "Heistraat", "IJzerstraat", "Kabbeekvest", "Kalkmarkt", 
            "Ketelmakersstraat", "Kliniekstraat", "Kloostergang", "Leuvensestraat", 
            "Oude Leuvensestraat", "Oude Vestenstraat", "Raeymaekersvest", 
            "Rijschoolstraat", "Strijdersstraat", "Violetstraat", "Waaibergstraat", 
            "Withuisstraat", "Zegestraat"
        ],
        notes: "Academiestraat (exclusief deel tussen 'De Baron' en de Ooievaarstraat), Albertvest (binnenring), Withuisstraat (binnenring)"
    },
    {
        name: "Centrum-Zuid (VeDoVe)",
        type: "STADSKERN",
        streets: [
            "Ark Van Noëstraat", "Broekstraat", "Croonestraat", "Donystraat", 
            "Eeuwfeeststraat", "Generaal Guffenstraat", "Hennemarkt", "Kattestraat",
            "Kapelstraat", "Kleine Kattestraat", "Leopoldvest", "Liefdestraat", 
            "Nieuwstraat", "Ooievaarsstraat", "Oorlogsvrijwilligersstraat", 
            "Sliksteenvest", "Spiegelstraat", "Trapstraat", "Veldbornstraat"
        ],
        notes: "Kapelstraat tussen Donystraat en Veldbornstraat, Leopoldvest (binnen- en buitenring, inclusief residentie Beatrijs), Sliksteenvest (binnenring)"
    },
    {
        name: "Centrum-Zuid (Drakendorp)",
        type: "STADSKERN",
        streets: [
            "Beauduinstraat", "Beggaardenstraat", "Bergévest", "Bostsestraat",
            "Hoegaardenstraat", "Huidvetterstraat", "Driemolenstraat", "Gasthuismolenstraat",
            "Goossensvest", "Grote Bergstraat", "Meendijkstraat", "Minderbroederstraat",
            "Oude Kleerkoperstraat", "Peperstraat", "Kapelstraat", "Kapucijnenhof",
            "Kapucijnenplein", "Kapucijnenstraat", "Kleine Bergstraat", "Kloosterhof",
            "Kortestraat", "Lombardstraat", "Moespikvest", "Mulkstraat",
            "Paardebrugstraat", "Reizigersstraat", "Sacreasgang", "Sint-Helenavest",
            "Sint-Jorisplein", "Sint Katharinastraat", "Torsinplein", "Veemarkt",
            "Vinckenboschvest", "Wolmarkt"
        ],
        notes: "Bostsestraat vanaf kruising Vinckenboschvest en Moespikvest tot Torsinplein, Goossensvest tussen kruising Hoegaardenstraat tot kruising met Meendijkstraat/Invalsweg, Kapelstraat tussen Donystraat en Kapucijnenplein, Mulkstraat tussen Goossensvest en spoorlijn, Vinckenboschvest (binnenring)"
    },
    {
        name: "Galgeveld",
        type: "STADSRAND",
        streets: [
            "Breisemstraat", "Elsenbosveld", "Elsenbosweg", "Galgestraat",
            "Grote Breisemstraat", "Hortensialaan", "Kaasweg", "Leuvenselaan",
            "Merelhof", "Oude Aarschotsebaan", "Schansstraat", "Seringenhof",
            "Swinnenstraat", "Van Dormaelstraat", "Veldstraat", "Verzetstraat",
            "Withuisstraat", "Zijpstraat"
        ],
        notes: "Leuvenselaan (kant Galgeveld) vanaf kruising met Withuisstraat tot aan kruising Westelijke Ring, Leuvenselaan (kant Colruyt) vanaf Grijpenveldstraat tot aan kruising Westelijke Ring, Withuisstraat (buitenring)"
    },
    {
        name: "Watertoren",
        type: "STADSRAND",
        streets: [
            "Aarschotsesteenweg", "Acacialaan", "Albertvest", "De Scheper",
            "Deelberg", "Kasteelstraat", "Krekeldreef", "Park Nieuwen Hoven",
            "Park Passionisten", "Pollepelstraat", "Rozenhof", "Soesterlaan",
            "Valkenswaardlaan", "Vissenakenstraat", "Vogelzangstraat", "Watertorenstraat"
        ],
        notes: "Aarschotsesteenweg tot kruising met Deken Rochettelaan, Albertvest (buitenring), Vissenakenstraat tot kruising met Deelberg"
    },
    {
        name: "Het DOK van Tienen",
        type: "STADSRAND",
        streets: [
            "Dietsesteenweg", "Houtemveldweg", "Dwarsweg", "Oplintersesteenweg",
            "Kabbekvest"
        ],
        notes: "Gebied tussen Dietsesteenweg tot aan kruising met Houtemveldweg, Noordgrens afgebakend door Houtemveldweg en Dwarsweg, Oplintersesteenweg (enkel Westzijde, richting Houtemstraat), Kabbekvest (buitenring)"
    },
    {
        name: "Omgeving Viandra",
        type: "STADSRAND",
        streets: [
            "Oplintersesteenweg", "Grensstraat", "Industriepark", "Slachthuisstraat",
            "Leopoldvest", "Sliksteenvest"
        ],
        notes: "Gebied tussen Oplintersesteenweg (zijde Viander) tot aan kruising met Grensstraat, Grensstraat, Industriepark, Slachthuisstraat en Leopoldvest/Sliksteenvest (deze 2 vesten behoren evenwel tot contrei 2)"
    },
    {
        name: "Grimde",
        type: "STADSRAND",
        streets: [
            "Slachthuisstraat", "Industriepark", "Oude Getestraat", "Oude Spoorweg",
            "Ambachtenlaan", "Oostelijke Ring", "Zuidelijke Ring", "Vinckenboschvest"
        ],
        notes: "Gebied tussen Slachthuisstraat/Industriepark (behorende tot contrei 8), Oude Getestraat, Oude Spoorweg, Ambachtenlaan, Oostelijke Ring, Zuidelijke Ring tot aan spoorlijn, zone Suikerraffinaderij, Vinckenboschvest (buitenring)"
    },
    {
        name: "Potterie",
        type: "STADSRAND",
        streets: [
            "Moespikvest", "Begijnhof", "Mulkendelpad", "Lovensteen",
            "Zuidelijke Ring", "Invalsweg"
        ],
        notes: "Gebied tussen Moespikvest, Begijnhof, Mulkendelpad, Lovensteen richting Zuidelijke Ring, Zuidelijk Ring (binnenring) tot aan kruising met Invalsweg, Invalsweg (zijde Getestraat) tot aan Moespikvest"
    },
    {
        name: "De Mulk",
        type: "STADSRAND",
        streets: [
            "E40", "Invalsweg", "Viaductstraat", "Grijpenveldstraat",
            "Walstraat", "Driebek", "Dievendaal"
        ],
        notes: "Gebied tussen E40, Invalsweg tot aan kruising met spoorweg, spoorweg volgend tot kruising met Viaductstraat, Grijpenveldstraat tot aan kruising Walstraat, site Affilips, Driebek (behorende tot contrei 20), Dievendaal (contrei 20)"
    },
    {
        name: "IJzerenweg",
        type: "STADSRAND",
        streets: [
            "Astridvest", "Avendorenstraat", "Berkenhof", "Distelstraat",
            "Goossensvest", "Leuvenselaan", "Westelijke Ring", "Grijpenveldstraat",
            "Martelarenplein", "Papanekelderstraat", "Sint-Martinusstraat",
            "Spikdorenstraat", "Steenwegstraat", "Tramstraat", "Vierde Lansierslaan",
            "Zijdelingsestraat", "Mulkstraat"
        ],
        notes: "Leuvenselaan tot aan kruising met de Grijpenweg (behalve stuk tussen Withuisstraat en Westelijke Ring, kant Galgeveld), site Affilips, spoorlijn tot aan kruising met Mulkstraat"
    },
    {
        name: "Kumtich",
        type: "DORPEN",
        streets: [
            "Westelijke Ring", "Mene", "E40", "Breisembroekstraat",
            "Wolmersweg", "Vossekortweg", "Kumtichstraat", "Bijvoordseweg",
            "Kleinbeek"
        ],
        notes: "Gebied tussen Westelijke Ring met kruising Mene, Mene tot aan E40, E40 tot aan grens Stad Tienen, grens stad Tienen volgend tot aan Breisembroekstraat, Breisembroekstraat tot aan kruising met Wolmersweg richting Vossekortweg, Vossekortweg, Kumtichstraat, Bijvoordseweg, Kleinbeek tot aan Kruising Westelijke ring, Westeljke ring tot aan kruising met Mene"
    },
    {
        name: "Vissenaken",
        type: "DORPEN",
        streets: [
            "Breisembroekstraat", "Lindestraat", "Lindeboonweg", "Vissenakenstraat",
            "Watertorenstraat", "Deken Rochttelaan", "Kaasweg", "Kumtichstraat",
            "Vossekotweg"
        ],
        notes: "Gebied tussen Breisembroekstraat, grens stad Tienen volgend tot aan Lindestraat, Lindeboonweg, Vissenakenstraat, Watertorenstraat en Deken Rochttelaan (behorende tot contrei 6), Kaasweg, Kumtichstraat, Vossekotweg richting Breisembroekstraat"
    },
    {
        name: "Sint-Margriete-Houtem",
        type: "DORPEN",
        streets: [
            "Vissenakenstraat", "Lindeboomweg", "Lindestraat", "Uilstraat",
            "Herestraat", "Windmolenstraat", "Oplintersesteenweg", "Dwarsstraat",
            "Houtelveldweg", "Deelberg"
        ],
        notes: "Gebied tussen Vissenakenstraat (behorende bij contrei 14), Lindeboomweg, Lindestraat, grenzen Stad Tienen volgend, Uilstraat, Uilstraat tot aan kruising Herestraat, over velden richting Windmolenstraat, Oplintersesteenweg tot aan kruising met Dwarsstraat (behorende bij contrei 7), Houtelveldweg en Deelberg (behorende bij contrei 6)"
    },
    {
        name: "Oplinter",
        type: "DORPEN",
        streets: [
            "Grensstraat", "Oude Getestraat", "Oude Spoorweg", "Uilstraat",
            "Windmolenstraat", "Oplintersesteenweg"
        ],
        notes: "Gebied tussen Grensstraat (behorende aan contrei 8), Oude Getestraat, bezinkingsputten, Oude Spoorweg, grens Stad Tienen tot aan Uilstraat, Uilstraat, Windmolenstraat en Oplintersesteenweg tussen Windmolenstraat en Grensstraat (deze grens vanaf Uilstraat behoort aan contrei 15)"
    },
    {
        name: "Hakendover/Meer",
        type: "DORPEN",
        streets: [
            "Oude Spoorweg", "Houbaertstraat", "Ranshovenstraat", "Ranshovenveld",
            "Bameling", "Bostveld", "Zuidelijke Ring", "Oostelijke Ring",
            "Ambachtenlaan"
        ],
        notes: "Gebied tussen Oude Spoorweg, grens Stad Tienen tot aan spoorlijn, spoorlijn tot aan Houbaertstraat, Ranshovenstraat tot aan kruising met Ranshovenveld, Bameling, Bostveld, Zuidelijke Ring, Oostelijke Ring en Ambachtenlaan (behorende tot contrei 9)"
    },
    {
        name: "Goetsenhoven",
        type: "DORPEN",
        streets: [
            "E40", "Lange Steen", "Bameling", "Ranshovenveld",
            "Houbaertstraat"
        ],
        notes: "Gebied met E40 tussen grens Stad Tienen en kruising met Lange Steen, lijn tussen Langesteen en Bameling, Ranshovenveld, Houbaertstraat tot aan grens Stad Tienen deze volgend tot aan E40"
    },
    {
        name: "Bost",
        type: "DORPEN",
        streets: [
            "Invalsweg", "Zuidelijke Ring", "Bostveld", "Waterplankstraat",
            "Langesteen", "Aststraat", "E40"
        ],
        notes: "Gebied tussen Invalsweg tot aan kruising met Zuidelijke Ring, Zuidelijke Ring (buitenring), Bostveld, lijn tussen Bameling en Langesteen aan kruising met Waterplankstraat, Langesteen tot kruising met Aststraat, lijn richting E40"
    },
    {
        name: "Oorbeek",
        type: "DORPEN",
        streets: [
            "Dievendal", "Driebek", "Westelijke Ring", "Mene", "E40"
        ],
        notes: "Gebied tussen Dievendal, Driebek, Westelijke Ring tot aan kruising met Mene, Mene volgend tot aan E 40, E40 tot lijn Dievendaal/Driebek"
    }
];

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

async function loadStreets() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db("burenvoorburen");
        const collection = database.collection("streets");

        // Drop existing collection to start fresh
        await collection.drop().catch(() => console.log("Collection didn't exist, creating new one"));

        // Insert the street data
        const result = await collection.insertMany(streetData);
        console.log(`Successfully inserted ${result.insertedCount} buurten with their streets`);

        // Create indexes for faster searching
        await collection.createIndex({ "streets": 1 });
        await collection.createIndex({ "name": 1 });
        await collection.createIndex({ "type": 1 });
        console.log("Created indexes for faster searching");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB");
    }
}

// Run the load function
loadStreets(); 