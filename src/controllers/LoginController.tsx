

import {LoginFormData} from "../pages/login";

import bcrypt from "bcryptjs-react";
import Cookies from 'js-cookie';


const salt = bcrypt.genSaltSync(10);

export const LoginController = async (data: LoginFormData) => {
    const email: string = data.email.toLowerCase();
    const password: string = data.password;
    var errors = false;
    const errorList: string[] = [];
    const success: string[] = [];
    var errorMsg: string;
   

    const findUserByEmail = async (email: string) => {
        
        const searchParams = new URLSearchParams({email: email});
        try{
            const getUser = await fetch(`${process.env.REACT_APP_SERVER_URL}/getUserIDByEmail?${searchParams}`);
            
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

    const userID: string = await findUserByEmail(email);


    if(userID === "0"){
        errorMsg = "User does not exist";
        errorList.push(errorMsg);
        errors = true;
    }
    
    const checkLogin = async(userID: string) => {
        const searchParams = new URLSearchParams({id: userID});

        try{
            const getPass = await fetch(`${process.env.REACT_APP_SERVER_URL}/getUserInfoByID?${searchParams}`);

            const getPassResponse = await getPass.json();

            if(!getPass.ok){
                throw new Error("Error getting user data");
            }else{
                if(getPassResponse.exists == true){
                    // console.log(getPassResponse);
                    return bcrypt.compareSync(password, getPassResponse.pass);
                }else{
                    return false;
                }
            }
        }catch(error){
            console.log(error);
        }
    }
    const pass = await checkLogin(userID);

    if(!pass){
        errorMsg = "Unable to login: Please verify credientials are correct.";
        errorList.push(errorMsg);
        errors = true;
    }
    
    if(errors){
        return errorList;
    }else{
      const today: Date = new Date();

      const signature: any = today + userID;

      var tokenSalt = bcrypt.genSaltSync(10);
      const token = bcrypt.hashSync(signature,tokenSalt);

      Cookies.set('Login',token, {expires: 2, path: '/'});
      success.push("Login successful");
      return success;
    }
}