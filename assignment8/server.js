const express = require('express')
const cors = require('cors');
const app = express()
const port = 4000

const bodyParser = require('body-parser');
const routes = require('./app/routes/routes')

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/assignment9", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

mongoose.connection.on('connected', function(){
    console.log("connection success")
})

routes(app);


app.listen(port, () => {
  console.log(`Node.JS App Running at http://localhost:${port}`)
})