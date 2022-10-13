const express = require('express');
const cors = require('cors');
const app = express();
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const api = require('./routes/api');

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello from API');
});


module.exports = app;
