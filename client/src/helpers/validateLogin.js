export const validateLogin = function (data) {
  if (data.name !== "" && data.password !== "") {

    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ig
    const validEmail = data.email.match(regex)

    if(validEmail){
        return true
    }
    else { return {status : false, message: "Enter a valid email"} }
  } else {
    return { status: false, message: "Email and Password required" };
  }
};
