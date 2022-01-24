function formatDate(){
    let date = new Date();
    let reqDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    reqDate = reqDate.toString();

    return reqDate
}

export default formatDate