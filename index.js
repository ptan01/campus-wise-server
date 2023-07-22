const express = require('express');
const app = express()
const port = process.env.PORT || 5000 ;
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors())
app.use(express.json())

// user: campusWise
// pass : 0V0ZZjNdx7PcL2Mc




const uri = "mongodb+srv://campusWise:0V0ZZjNdx7PcL2Mc@cluster0.8hd0j1r.mongodb.net/?retryWrites=true&w=majority";
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
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=> {
    res.send('campus wise is running')
})

app.listen(port , ()=> {
    console.log('campus wise is running on port', port)
})