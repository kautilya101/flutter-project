const bodyParser = require('body-parser');
const express = require('express');
const todoRouter = require('./routes/todo.route')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/v1',todoRouter);

app.listen(3500, () => {
    console.log("Server is running on port : 3500");
})