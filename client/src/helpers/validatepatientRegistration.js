export const validatePatientRegistration = (data) => {

if(data.patientName !== "" && data.patientEmail !== "" && data.patientPhone !== "" && data.bloodGroup !== ""){
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ig
    const matching = data.patientEmail.match(regex)
if(matching){

if(data.patientPhone.length === 10){
    return true
}
else { return {status : false, message: "Enter a valid phone number"}  }

}
else { return { status : false, message : "A valid email is required"}}


}
else{  return { status : false, message: "All fields are required" } }


}