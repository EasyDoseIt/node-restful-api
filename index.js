require('dotenv').config();
const cors = require('cors');

const server = require("./api/server.js");

const dbPort = process.env.DB_PORT;

const PORT = process.env.PORT || dbPort || 4000;

server.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
})