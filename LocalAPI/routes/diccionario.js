const express = require('express');
const mongo = require('../config/mongo');
const diccionario = express.Router();

diccionario.get('/', (req, res, next) => {
    const result = "hi diccionario :3"
    
    return res.status(200).json({ code: 200, message: result});
});

module.exports = diccionario;