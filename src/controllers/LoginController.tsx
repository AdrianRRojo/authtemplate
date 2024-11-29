import {LoginFormData} from "../components/login";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const LoginController = async (data: LoginFormData) => {
    const email: string = data.email;
    const password: string = data.password;


    const findUserByEmail = async (email: string) => {
        const searchParams = new URLSearchParams({email: email});

        try{
            const getUser = await fetch(`http://${process.env.REACT_APP_SERVER_URL}/getUserIDByEmail/${searchParams}`);

            const getUserResponse: string = await getUser.json();

            if(!getUserResponse) {
                throw new Error("Error getting user data");
            }else{

            }

        }

    }
}