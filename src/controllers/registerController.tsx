import {FormData} from "../pages/register";
import bcrypt from "bcryptjs-react";
import Cookies from 'js-cookie';


const salt = bcrypt.genSaltSync(10);


// import { useCookies } from "react-cookie";


export const RegisterController = async (data: FormData) => {
  // const [cookies, setCookie, removeCookie] = useCookies(['login']);

  var errors = false;
  var errorMsg: string;
  const errorList: string[] = [];
  const success: string[] = [];
  var email: string = data.email;

  var fname: string = data.fname;
  var lname: string = data.lname;
  var password: string = data.password;
  var userID: any | undefined;
  email = data.email.toLowerCase();
  data.email = data.email.toLowerCase();
  const CheckIfUserExists = async(email: string) => {
    const searchParams  = new URLSearchParams({
      email: email
    })
    try{
      const userIdResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/getUserIDByEmail?${searchParams}`);
      userID = await userIdResponse.json();
  
      if(!userIdResponse.ok){
        // console.log("user id not ok")
        return true
      }

      return userID.exists !== false;
      
    }catch(error){
      console.log(error);
    }
  }
  
  const userExists = await CheckIfUserExists(email);

  if(userExists){
   
    errorMsg = "Email already in use";
    errorList.push(errorMsg);
    errors = true;

  }
  const regex = /[^a-zA-Z0-9\s]/;
  // Length checks
  if (email.length < 4) {
    errorMsg = "Please set a valid email";
    errorList.push(errorMsg);
    errors = true;
  }

  if (fname.length < 2) {
    errorMsg = "First name length is invalid";
    errorList.push(errorMsg);
    errors = true;
  }
  if (lname.length < 2) {
    errorMsg = "Last name length is invalid";
    errorList.push(errorMsg);
    errors = true;
  }
  if (password.length < 6) {
    errorMsg = "Password length is invalid";
    errorList.push(errorMsg);
    errors = true;
  }

  // fname and lname check
  if(regex.test(fname)){
    errorMsg =
      "First and Last name cannot contain special characters.";
      errorList.push(errorMsg);
      errors = true;
  }
  if(regex.test(fname)){
    errorMsg =
      "First and Last name cannot contain special characters.";
      errorList.push(errorMsg);
      errors = true;
  }
  //password checks
  function hasUpperCase(str: string) {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
        return true;
      }
    }
    return false;
  }
  if (!hasUpperCase(password)) {
    errorMsg =
      "Please ensure password meets all requirements: No capitalized character";
      errorList.push(errorMsg);
    errors = true;
  }


  if (!regex.test(password)) {
    errorMsg =
      "Please ensure password meets all requirements: Does not contain a special character";
      errorList.push(errorMsg);
      errors = true;
  }



  if (errors) {
    return errorList;
  } else {
    //console.log("Data: ", JSON.stringify(data));
    password = data.password;
    //for log in later:
    /*
    bcrypt.compareSync(password, hashedPassword)
  */
    data.password = bcrypt.hashSync(password, salt);
    
      const today: Date = new Date();

      const fname: string = data.fname;
      const signature: any = today + fname;

      var tokenSalt = bcrypt.genSaltSync(10);
      const token = bcrypt.hashSync(signature,tokenSalt);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify(data),
      });
      

      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      else{
        // setCookie('login', true, {path: '/', maxAge: 100000})
     
        Cookies.set('Login',token, {expires: 2, path: '/'});
        success.push("Registration Successful");
        return success;
      }

      // const info = await response.json();
      // console.log("info: ", info);

      
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
};
