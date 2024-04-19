//Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//Routers
const news = require('./routes/news');
const dataset = require('./routes/dataset');
const diccionario = require('./routes/diccionario');

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

//API endpoints

app.use('/news', news);
app.use('/dataset', dataset);
app.use('/diccionario', diccionario);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
})