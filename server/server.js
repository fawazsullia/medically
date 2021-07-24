"use strict";
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require('./routes/authRoutes');

const database_uri = `mongodb+srv://fawazsullia:kenkaneki13@cluster0.v2b1a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

//middlewares
app.use(express.json())

//route middlewares
app.use('/auth', authRoute);


//database and sever
mongoose.connect(database_uri, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> { console.log(" database connected")})
app.listen(5000, console.log("listening on 5000"));
