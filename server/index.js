const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Database Collections
    const db = client.db("crowdFundingDB");
    const userCollection = db.collection("users");
    const campaignCollection = db.collection("campaigns");
    const contributionCollection = db.collection("contributions");
    const withdrawalCollection = db.collection("withdrawals");

    // Basic Test Route
    app.get('/', (req, res) => {
      res.send('Crowdfunding server is running');
    });

    // পরবর্তীতে আমরা এখানে Role-based API এবং JWT ভেরিফিকেশন যোগ করব

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});