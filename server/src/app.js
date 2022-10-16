const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const api = require('./routes/api')

const app = express()

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}else{
app.use(express.static(path.join(__dirname, "..", "client", "build")))

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", 'index.html'));
  });
}

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
}))

app.use('/api/v1', api)

app.use(notFound);
app.use(errorHandler)


app.use('/uploads', express.static(path.join(__dirname, 'src', 'routes', 'uploads')))


module.exports = app
