const express = require('express');
const mongo = require('../config/mongo');
const news = express.Router();

news.get('/', (req, res, next) => {
  try {
    const client = mongo.getClient();

    client.connect();

    client.db("admin").command({ ping: 1 });

    client.close();
    
    return res.status(200).json({ code: 200, message: result});
  } catch (err) {
    return res.status(400).json({ code: 400, message: err.errorResponse});
  }
});

news.post('/', async (req, res, next) => {
  const { id_news, url, contenido, analisis } = req.body;
  const status = "pendiente"
  if (id_news && url && contenido && analisis) {
    try {
      const client = mongo.getClient();
  
      const database = client.db("Prod");
      const coll = database.collection("News");
  
      const doc = { id_news, url, contenido, analisis, status }
  
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

module.exports = news;