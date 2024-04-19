const express = require('express');
const mongo = require('../config/mongo');
const news = express.Router();

news.get('/', (req, res, next) => {
const result = "Pinged your deployment. You successfully connected to MongoDB!"
  try {
    mongo.connect();

    mongo.db("admin").command({ ping: 1 });

    return res.status(200).json({ code: 200, message: result});
  } catch (err) {
    return res.status(400).json({ code: 400, message: err.errorResponse});
  } finally {
    mongo.close();
  }
});

module.exports = news;