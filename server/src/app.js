const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const api = require('./routes/api')

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(express.json())
app.use(morgan('dev'))

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "..", "..", "client", "build")))

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "..", "client", "build", "index.html"))
    })
}

app.use('/api/v1', api)

app.use(notFound);
app.use(errorHandler)

module.exports = app
