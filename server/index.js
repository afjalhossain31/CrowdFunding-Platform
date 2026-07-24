const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://your-frontend-domain.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
let usersCollection;
let campaignsCollection;

async function connectDB() {
  if (db) return;

  await client.connect();

  db = client.db("CrowdFunding");

  usersCollection = db.collection("users");
  campaignsCollection = db.collection("campaigns");

  console.log("✅ MongoDB Connected");
}

connectDB();

// Root
app.get("/", async (req, res) => {
  res.send("🚀 Crowdfunding Server is Running");
});

// ================= USERS =================

app.post("/users", async (req, res) => {
  await connectDB();

  const user = req.body;

  const existing = await usersCollection.findOne({
    email: user.email,
  });

  if (existing) {
    return res.send({
      message: "User already exists",
      insertedId: null,
    });
  }

  const result = await usersCollection.insertOne(user);

  res.send(result);
});

app.get("/users", async (req, res) => {
  await connectDB();

  const result = await usersCollection.find().toArray();

  res.send(result);
});

app.get("/users/:email", async (req, res) => {
  await connectDB();

  const result = await usersCollection.findOne({
    email: req.params.email,
  });

  res.send(result);
});

// ================= CAMPAIGNS =================

app.post("/campaigns", async (req, res) => {
  await connectDB();

  const body = req.body;

  const campaign = {
    title: body.title,
    category: body.category,
    image: body.image,
    campaign_image_url: body.image,
    description: body.description,
    minDonation: Number(body.minDonation),
    funding_goal: Number(body.funding_goal || body.minDonation),
    raised_amount: Number(body.raised_amount || 0),
    deadline: body.deadline,
    creator_name: body.creator_name,
    creator_email: body.creator_email,
    createdAt: new Date(),
  };

  const result = await campaignsCollection.insertOne(campaign);

  res.send(result);
});

app.get("/campaigns/top", async (req, res) => {
  await connectDB();

  const result = await campaignsCollection
    .find()
    .sort({
      raised_amount: -1,
    })
    .limit(8)
    .toArray();

  res.send(result);
});

app.get("/campaigns", async (req, res) => {
  await connectDB();

  const result = await campaignsCollection.find().toArray();

  res.send(result);
});

app.get("/campaigns/:id", async (req, res) => {
  await connectDB();

  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: "Invalid ID",
    });
  }

  const result = await campaignsCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!result) {
    return res.status(404).send({
      error: "Campaign not found",
    });
  }

  res.send(result);
});

// Export for Vercel
module.exports = app;