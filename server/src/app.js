const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const api = require('./routes/api')

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
}))

app.use(express.json())
app.use(morgan('dev'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")))

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "..", "..", "client", "dist", 'index.html'))
    })
}

app.use('/uploads', express.static(path.join(__dirname, '..', 'src', 'routes', 'uploads')))

app.use('/api/v1', api)

app.use(notFound);
app.use(errorHandler)

module.exports = app
