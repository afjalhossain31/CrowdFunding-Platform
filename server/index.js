const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI from .env file
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Database and Collections Setup
        // ==========================================
        const db = client.db("CrowdFunding");
        const usersCollection = db.collection("users");
        const campaignsCollection = db.collection("campaigns");

        // API Routes will go here
        // ==========================================

        // 1. Save User Data to Database
        app.post('/users', async (req, res) => {
            const user = req.body;
            // চেক করা হচ্ছে ইউজার আগে থেকেই ডাটাবেসে আছে কি না
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);

            if (existingUser) {
                return res.send({ message: 'User already exists', insertedId: null });
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // 2. Get All Users (এডমিন ড্যাশবোর্ডের জন্য কাজে লাগবে)
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });

        // 3. Create a New Campaign
        app.post('/campaigns', async (req, res) => {
            const newCampaign = req.body;
            const result = await campaignsCollection.insertOne(newCampaign);
            res.send(result);
        });

        // 4. Get All Campaigns (হোমপেইজে দেখানোর জন্য)
        app.get('/campaigns', async (req, res) => {
            const result = await campaignsCollection.find().toArray();
            res.send(result);
        }); 


        // Root Route
        app.get('/', (req, res) => {
            res.send('Crowdfunding Server is running...');
        });

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});