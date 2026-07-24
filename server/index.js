const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"], // ফ্রন্টএন্ডের পোর্ট অ্যাড করা হয়েছে
        credentials: true,
    })
);
app.use(express.json());

// MongoDB URI
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const db = client.db("CrowdFunding");
        const usersCollection = db.collection("users");
        const campaignsCollection = db.collection("campaigns");

        // =========================
        // User Routes
        // =========================

        // Save User
        app.post("/users", async (req, res) => {
            const user = req.body;
            const existingUser = await usersCollection.findOne({
                email: user.email,
            });

            if (existingUser) {
                return res.send({
                    message: "User already exists",
                    insertedId: null,
                });
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // Get All Users
        app.get("/users", async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });

        // Get Single User
        app.get("/users/:email", async (req, res) => {
            const email = req.params.email;
            const result = await usersCollection.findOne({ email });
            res.send(result);
        });

        // =========================
        // Campaign Routes
        // =========================

        // Create Campaign (Updated to match frontend structure)
        app.post("/campaigns", async (req, res) => {
            const campaignData = req.body;
            
            // ডাটাবেসে সেভ করার সময় ফিল্ডের নামগুলো স্ট্যান্ডার্ড করে দেওয়া হলো 
            // যাতে হোমপেজে (TopCampaigns) ঠিকমতো ডেটা শো করে
            const newCampaign = {
                title: campaignData.title,
                category: campaignData.category,
                minDonation: campaignData.goal, // Frontend থেকে goal হিসেবে আসছে
                funding_goal: campaignData.goal, 
                deadline: campaignData.deadline,
                image: campaignData.image, // Frontend থেকে image হিসেবে আসছে
                campaign_image_url: campaignData.image,
                description: campaignData.description,
                creator_name: campaignData.creatorName,
                creator_email: campaignData.creatorEmail,
                raised_amount: campaignData.raisedAmount || 0,
                status: campaignData.status || "active",
                createdAt: campaignData.createdAt || new Date().toISOString(),
            };

            const result = await campaignsCollection.insertOne(newCampaign);
            res.send(result);
        });

        // Get All Campaigns
        app.get("/campaigns", async (req, res) => {
            const result = await campaignsCollection.find().toArray();
            res.send(result);
        });

        // Top Campaigns (Based on raised amount)
        app.get("/campaigns/top", async (req, res) => {
            const result = await campaignsCollection
                .find()
                .sort({ raised_amount: -1 })
                .limit(8)
                .toArray();
            res.send(result);
        });

        // Get a Single Campaign by ID
        app.get("/campaigns/:id", async (req, res) => {
            const id = req.params.id;
            try {
                if (!ObjectId.isValid(id)) {
                    return res.status(400).send({ error: "Invalid Campaign ID" });
                }
                const query = { _id: new ObjectId(id) };
                const result = await campaignsCollection.findOne(query);
                
                if (!result) {
                    return res.status(404).send({ error: "Campaign not found" });
                }
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: "Server error while fetching campaign" });
            }
        });

        // =========================
        // Root & DB Ping
        // =========================
        app.get("/", (req, res) => {
            res.send("🚀 Crowdfunding Server is Running");
        });

        await client.db("admin").command({ ping: 1 });
        console.log("✅ MongoDB Ping Successful");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

run();

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});