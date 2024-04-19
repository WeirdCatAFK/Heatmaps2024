const express = require('express');
const mongo = require('../config/mongo');
const dataset = express.Router();

dataset.get('/', (req, res, next) => {
    const result = "hi dataset :3"
    
    return res.status(200).json({ code: 200, message: result});
});

module.exports = dataset;