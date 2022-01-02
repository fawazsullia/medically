const appConfig = {

environment : process.env.REACT_APP_ENVIRONMENT,
baseUrl : process.env.REACT_APP_BASE_URL,
credentials : process.env.REACT_APP_ENVIRONMENT === "production" ? "inlcude" : "omit"


}

export default appConfig