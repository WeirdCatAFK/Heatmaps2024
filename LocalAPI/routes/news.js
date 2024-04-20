const express = require('express');
const mongo = require('../config/mongo');
const news = express.Router();

news.get('/', async (req, res, next) => {
  try {
    const client = mongo.getClient();
  
    const database = client.db("Prod");
    const coll = database.collection("News");

    const query = { status: "pendiente" };
    const options = { projection: {_id:0}}

    const cursor = await coll.find(query, options);

    const count = await coll.countDocuments(query)
    if (count === 0) {
      return res.status(204).json({ code: 204, message: "Sin documentos pendientes"});
    }
    let result = {}
    let i = 1;
    for await (const doc of cursor) {

      result[i++] = doc;

    }
    client.close();

    return res.status(200).json({ code: 200, message: result});
  } catch (err) {
    return res.status(400).json({ code: 400, message: err.errorResponse});
  }
});

news.post('/', async (req, res, next) => {
  const { id_news, url, contenido } = req.body;
  const status = "pendiente";
  const analisis = " "
  if (id_news && url && contenido) {
    try {
      const client = mongo.getClient();
  
      const database = client.db("Prod");
      const coll = database.collection("News");
  
      const doc = { id_news, url, contenido, analisis, status };
  
      const result = await coll.insertOne(doc);
  
      client.close();
  
      return res.status(200).json({ code: 200, message: "Registro insertado con ID: " + result.insertedId});
    } catch (err) {
      return res.status(400).json({ code: 400, message: err.errorResponse});
    }
  } else {
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
  }
});

news.put('/', async (req, res, next) => {
  const { id_news, analisis } = req.body;
  const status = "procesado"
  if (id_news && analisis) {
    try {
      const client = mongo.getClient();
  
      const database = client.db("Prod");
      const coll = database.collection("News");

      const filter = { id_news: id_news };
  
      const updateDoc = {
        $set: {
          analisis: analisis,
          status: status
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

module.exports = news;