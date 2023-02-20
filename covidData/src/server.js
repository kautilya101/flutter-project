const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const mainRouter = require('./routes/main.routes')
const app = express()
app.use(bodyParser.json())
PORT = 3200
app.use(cors())
app.use('/v1',mainRouter);
app.listen(3200,() => {
    console.log(`server running on ${PORT}`)
})