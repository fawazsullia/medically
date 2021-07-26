export const validateLogin = function (data) {
  if (data.drEmail !== "" && data.password !== "") {

    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ig
    const validEmail = data.drEmail.match(regex)

    if(validEmail){
        return true
    }
    else { return {status : false, message: "Enter a valid email"} }
  } else {
    return { status: false, message: "Email and Password required" };
  }
};
