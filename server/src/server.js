require('dotenv').config();
const http = require('http');
const connectDB = require('./services/mongo');
const app = require('./app')

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

function startServer() {
    server.listen(PORT, async () => {
        console.log(`Server listening in ${process.env.NODE_ENV} on port ${PORT}`);
        await connectDB()
    });
}

startServer();