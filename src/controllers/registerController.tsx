import { FormData } from '../components/login'
import { useNavigate } from 'react-router-dom'

export const Register = async (data: FormData) => { 
    
    try{
        console.log("data: ", data)
    }catch{
        console.log("error")
    }
}