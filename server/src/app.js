const express = require('express');
const products = require('./data/data');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from API')
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product=> product._id === req.params.id);
    res.json(product);
});

module.exports = app;
