const express = require('express');
const cors = require('cors');
const products = require('./data/data');

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));

app.get('/', (req, res) => {
    res.send('Hello from API')
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product._id === req.params.id);
    res.json(product);
});

module.exports = app;
