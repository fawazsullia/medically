require("dotenv").config();


const serverConfig = {

environment : process.env.ENVIRONMENT,
port : process.env.PORT || 5000,
secret : process.env.SECRET,
uri : process.env.URI


}

module.exports = serverConfig