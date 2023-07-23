const express = require('express');
const app = express()
const port = process.env.PORT || 5000 ;
const cors = require("cors")
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8hd0j1r.mongodb.net/?retryWrites=true&w=majority`;
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

    const collageCollection = client.db('campusDB').collection('collage') ;
    const admissionsCollection = client.db('campusDB').collection('admissions') ;
    const submitAdmissionsCollection = client.db('campusDB').collection('submitAdmissions') ;

    app.get('/collage',async(req, res)=> {
        const result = await collageCollection.find().toArray() ;
        res.send(result)
    })

    app.get('/collage/:id', async(req, res)=>{
      const id = req.params.id ;
      const query = {_id : new ObjectId(id)}
      const result = await collageCollection.findOne(query) ;
      res.send(result)
    })

    app.get('/collage/search/:text', async (req, res)=>{
      const text = req.params.text ;
      const result = await collageCollection.find({$or: [ { collegeName: { $regex: text, $options: "i" } }]}).toArray()
      res.send(result)
    })

    app.get('/admissions', async(req, res)=> {
      const result = await admissionsCollection.find().toArray() ;
      res.send(result)
    })

    app.get('/admissions/:id', async (req, res)=>{
      const id = req.params.id ;
      const query = {_id : new ObjectId(id)} ;
      const result = await admissionsCollection.findOne(query) ;
      res.send(result)
    })

    app.post('/submitApplication', async(req, res) =>{
      const admissionData = req.body ;
      const result = await submitAdmissionsCollection.insertOne(admissionData) ;
      res.send(result)
    })


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