const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const api = require('./routes/api')

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
}))

app.use('/api/v1', api)

app.use(notFound);
app.use(errorHandler)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
    res.send('Hello from API')
});


module.exports = app
