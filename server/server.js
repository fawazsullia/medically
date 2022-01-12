"use strict";
//import dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const serverConfig = require('./serverConfig')
const fileupload = require('express-fileupload')



//different configuration based on environments
if(serverConfig.environment === "production"){

  app.set("trust proxy", 1);
  //middlewares
  app.use(
    cors({
      origin: "https://medically.netlify.app",
      credentials: true,
    })
  );
  
  // intitialize session storage
  const store = new MongoDBStore({
    uri: serverConfig.uri,
    collection: "mySessions",
  });
  
  store.on("error", function (error) {
    console.log(error);
  });
  
  // use express session
  app.use(
    session({
      key: "user_sid",
      secret: serverConfig.secret,
      name: "ideaproject",
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        secure: true,
        maxAge: 604800000,
        sameSite: "none",
      },
    })
  );
  

}
else {

app.use(cors())

}


app.use(express.json());
app.use(
  fileupload())


//router to check if session exists
app.get("/get-user", (req, res) => {
  if (req.session && req.session.cookie && req.session.drName) {
    res
      .status(200)
      .json({
        signedIn: true,
        drName: req.session.drName,
        uprn: req.session.uprn,
      })
      .end();
  } else {
    res.status(401).json({ signedIn: false, drName: "", uprn: "" }).end();
  }
});

//ping route to check if server is alive
app.get('/ping', (req, res)=>{
  res.send("Pingggg!!!!")
})


//import routes
const authRoute = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const fileRoutes = require('./routes/fileRoutes');

//route middlewares
app.use("/auth", authRoute);
app.use("/patient", patientRoutes);
app.use("/file", fileRoutes);

//database and sever
mongoose.connect(
  serverConfig.uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(" database connected");
  }
);
app.listen(serverConfig.port, console.log("listening on 5000"));
