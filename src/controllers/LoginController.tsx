import { useEffect, useState } from "react";
import {LoginFormData} from "../components/login";
// import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;

export const LoginController = async (data: LoginFormData) => {
    const email: string = data.email;
    const password: string = data.password;

    var [userID, setUserID] = useState("0");

    const findUserByEmail = async (email: string) => {
        const searchParams = new URLSearchParams({email: email});
        console.log(`http://${process.env.REACT_APP_SERVER_URL}/getUserIDByEmail/${searchParams}`)
        try{
            const getUser = await fetch(`http://${process.env.REACT_APP_SERVER_URL}/getUserIDByEmail/${searchParams}`);
            
            const getUserResponse = await getUser.json();

            if(!getUser.ok) {
                throw new Error("Error getting user data");
            }else{
                return getUserResponse.userID;
            }

        }catch(error){
            console.error(error);
        }
    }

    setUserID = await findUserByEmail(email);

    console.log("user id: ", userID);
}