import { useEffect,useState } from "react";
import { Register } from "../controllers/registerController";

export interface FormData {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone: string;

}
// const user: Users = {name: "Test user", id: 1, role: "Admin", banned: false}


export default function Login(){
    const [formData, setFormData] = useState<FormData>({
        fname: '',
        lname: '',
        email: '',
        password: '',
        phone: "(000)-000-0000",
    })

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try{
            await Register(formData);
        }catch(error){
            console.log('Error', error);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormData((prevData) => ({...prevData, [name]: value}))
    }
    
    return(
        <div className="columns-6">
            <form onSubmit={handleSubmit} >
                <label htmlFor="fname" className="">First Name: </label>
                <input id="fname" type="text" name="fname" className="border-2 border-blue-400" onChange={handleInputChange} value={formData.fname} required/>

                <label htmlFor="lname"> Last Name: </label>
                <input id="lname" type="text" name="lname" className="border-2 border-blue-400" onChange={handleInputChange} value={formData.lname} required/>
                
                <label htmlFor="email">Email: </label>
                <input id="email" type="email" name="email" className="border-2 border-blue-400" onChange={handleInputChange} value={formData.email} required/>
                
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" name="password" className="border-2 border-blue-400" onChange={handleInputChange} value={formData.password} required/>
                
                <label htmlFor="phone">Phone: </label>
                <input id="phone" type="phone" name="phone" className="border-2 border-blue-400" onChange={handleInputChange} value={formData.phone}/>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}