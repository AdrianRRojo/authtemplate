import { FormData } from '../components/login'
// import { useNavigate } from 'react-router-dom'

export const Register = async (data: FormData) => { 
    console.log("Data: ", JSON.stringify(data));
    const options = {
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: JSON.stringify(data)
           
    }
    try{
        // console.log("data: ", data)
       fetch("http://0.0.0.0:8000", options)
        .then(response2 => response2.json())
        .then(data2 => console.log(data2))
        .catch(e => console.log(e));
       



    }catch{
        console.log("error")
    }
}