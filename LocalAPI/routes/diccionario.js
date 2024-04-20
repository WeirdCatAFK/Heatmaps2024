const express = require('express');
const mongo = require('../config/mongo');
const diccionario = express.Router();

diccionario.get('/getLast', async (req, res, next) => {
    try {
        const client = mongo.getClient();

        const database = client.db("Prod");
        const coll = database.collection("Diccionario");

        const query = { };
        const options = { projection: {_id:0, id_dic:1}, sort:{"id_dic": 1}}

        const cursor = await coll.find(query, options);

        if ((await coll.countDocuments(query)) === 0) {
            return res.status(204).json({ code: 204, message: "Sin documentos"});
        }
        let result = {}
        for await (const doc of cursor) {
            result = doc;
        }
        client.close();

        return res.status(200).json({ code: 200, message: result});
    } catch (err) {
        return res.status(400).json({ code: 400, message: err.message});
    }
});

diccionario.get('/:lugar([A-Za-z]+)', async (req, res, next) => {
    try {
        const client = mongo.getClient();

        const database = client.db("Prod");
        const coll = database.collection("Diccionario");

        const query = { lugar: req.params.lugar };
        const options = { projection: {_id:0, id_dic:1}, sort:{"id_news": 1}}

        const cursor = await coll.find(query, options);

        if ((await coll.countDocuments(query)) === 0) {
            return res.status(204).json({ code: 204, message: "Sin documentos"});
        }
        let result = {}
        for await (const doc of cursor) {
            result = doc;
        }
        client.close();

        return res.status(200).json({ code: 200, message: result});
    } catch (err) {
        return res.status(400).json({ code: 400, message: err.message});
    }
});

diccionario.post('/', async (req, res, next) => {
    const { id_dic, lugar, coords, id_news, cant } = req.body;

    if (id_dic && lugar && coords && id_news && cant) {
        try {
        const client = mongo.getClient();

        const database = client.db("Prod");
        const coll = database.collection("Diccionario");

        const doc = { id_dic, lugar, coords, id_news, cant };

        const result = await coll.insertOne(doc);

        client.close();

        return res.status(200).json({ code: 200, message: "Registro insertado con ID: " + result.insertedId});
        } catch (err) {
        return res.status(400).json({ code: 400, message: err.message});
        }
    } else {
        return res.status(500).json({ code: 500, message: "Campos incompletos"});
    }
});

diccionario.put('/', async (req, res, next) => {
    const { id_dic, id_news, cant } = req.body;
    const status = "procesado"
    if (id_dic && id_news && cant) {
      try {
        const client = mongo.getClient();
    
        const database = client.db("Prod");
        const coll = database.collection("Diccionario");
  
        const filter = { id_dic: id_dic };
    
        const updateDoc = {
          $set: {
            id_news: id_news,
            cant: cant
          },
        };
  
        const result = await coll.updateOne(filter, updateDoc);
    
        client.close();
    
        return res.status(200).json({ code: 200, message: result.matchedCount + " documento afectados"});
      } catch (err) {
        return res.status(400).json({ code: 400, message: err.errorResponse});
      }
    } else {
      return res.status(500).json({ code: 500, message: "Campos incompletos"});
    }
  });

module.exports = diccionario;