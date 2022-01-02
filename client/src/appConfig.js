const appConfig = {

environment : process.env.NODE_ENV,
baseUrl : process.env.NODE_ENV == "production" ? "https://medically-app.herokuapp.com" : "http://localhost:5000",
credentials : process.env.NODE_ENV == "production" ? "inlcude" : "omit"


}

export default appConfig