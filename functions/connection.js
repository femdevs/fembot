const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(
    "mongodb+srv://benpai:BenpaiIsCool1@cluster0.ykfraxw.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    });
client.connect(err => {
    const collection = client.db("test").collection("devices")
    client.close();
});
