import { useState } from "react";
import { LoginController } from "../controllers/LoginController";
import { useNavigate } from "react-router-dom";

export interface LoginFormData {
    email: string;
    password: string;
}

interface rcMessages {
    id: string;
    message: String;
} 

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    });

    const [rcMsg, setRcMsg] = useState<rcMessages[]>([{id: "", message: ""}]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const rcResponse: any | undefined = await LoginController(formData);
            if (rcResponse) {
                // console.log("rcResponse is not okay:", rcResponse[0]);
                if(rcResponse[0] === "Login successful"){
                    rcResponse.map((msg: string, idx: string) => {
                        setRcMsg((prevData) => [
                            ...prevData,
                            { id: idx, message: msg },
                        ]);
                        
                    });
                    navigate('/');
                }else{
                    console.log("rcResponse is not okay:", rcResponse[0]);
                    rcResponse.map((msg: string, idx: string) => {
                        setRcMsg((prevData) => [
                            ...prevData,
                            { id: idx, message: msg },
                        ]);
                        
                    });
                }
                
                // navigate('/home');
                //window.location.reload();
            } else {
                console.log("No good:", rcResponse);
                
            }
        } catch (error) {
            console.log("Error", error);
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const clearState = () => {
        setRcMsg([]);
    };

    const redirect = () => {
        navigate("/register");
    }
    return (
        <div className="bg-sky-700">
            <div className="flex flex-row min-h-screen justify-center items-center">
                <form onSubmit={handleSubmit} className="w-4/12 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 ">
                    <div className="px-4 py-6 sm:p-8 flex flex-row justify-center items-center ">
                        <div className="grid w-10/12 grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                            <div className="sm:col-span-6">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                                        onChange={handleInputChange}
                                        value={formData.email}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                                        onChange={handleInputChange}
                                        value={formData.password}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                            <div
                                className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">

                                <button
                                    onClick={redirect}
                                    className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">New
                                    User Login
                                </button>
                                <button
                                    type="submit"
                                    onClick={clearState}
                                    className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                >
                                    Login
                                </button>
                            </div>

                        {rcMsg.map(msgs => (
                            <li className="text-red-500 text-md font-semibold px-5 list-none mb-0.5 text-center"
                                key={msgs.id}>{msgs.message}</li>
                        ))}

                </form>


            </div>
        </div>
);
}
