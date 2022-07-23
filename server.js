const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const URL = process.env['MONGO_URL']
app.use(cors())



//connect to mongoose
mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));


require('./models/user')
require('./models/form')
    
app.use(express.json());
    
app.use(require('./routes/auth'))
app.use(require('./routes/form'))

app.listen(process.env.PORT || 5000, function (req, res) {
    console.log("express server is running on 5000");
})
