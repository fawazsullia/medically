export const validateRegistration = function (data, confirm_password) {
  if (
    data.drName !== "" &&
    data.drEmail !== "" &&
    data.affiliated_hospital !== "" &&
    data.password !== "" &&
    data.confirm_password !== ""
  ) {

const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ig
 const matching = data.drEmail.match(regex)

 if(matching){ 

if(data.password.length >= 8){
  
if(data.password === confirm_password){
    return true
}
else {
    return { status : false, message: "Passwords don't match"  }
}


}
else {  return {status : false, message : 'Password must be at least 8 characters long'}}

  }
 else {  return { status: false, message : "Enter a valid email id" } }



  } else {
    return { status: false, message: "All fields are compulsory" };
  }
};
