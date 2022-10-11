const express = require('express');
const cors = require('cors');
const app = express();

const api = require('./routes/api');

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use('/v1', api);

app.get('/', (req, res) => {
    res.send('Hello from API');
});


module.exports = app;
