import React, { useState, useEffect } from "react";

//ended up not using it because I still have to define all the options
// didn't make the code any more organized or short
//have to figure out a way as to minimize the code

function useFetch(url, options = {}) {

    const [response, setresponse] = useState()
    const [error, seterror] = useState()

    useEffect( ()=>{
        
        fetch(url, options)
        .then((res)=> res.json())
        .then((resp)=> {
           setresponse(resp) 
        })
        .catch((err)=> {seterror(err)})

    }, [url, options])

  return {response, error}
}

export default useFetch;
