const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require('fs');

const key = JSON.parse(fs.readFileSync('../keys/API_Keys.JSON'))

const credentials = '../keys/X509-cert-1666855680580186375.pem'
const uri = key.MongoDB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
    tlsCertificateKeyFile: credentials,
    serverApi: ServerApiVersion.v1
});

module.exports = client;