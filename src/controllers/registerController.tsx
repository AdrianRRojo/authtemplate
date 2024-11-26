import {  useState } from "react";
import { FormData } from "../components/register";
import bcrypt from "bcryptjs";
import Cookies from 'js-cookie';


const salt = bcrypt.genSaltSync(10);


// import { useCookies } from "react-cookie";


export const RegisterController = async (data: FormData) => {
  // const [cookies, setCookie, removeCookie] = useCookies(['login']);

  var errors = false;
  var errorMsg: string;
  const errorList: string[] = [];
  var email = data.email;
  var fname = data.fname;
  var lname = data.lname;
  var password = data.password;
  var userID: any | undefined;

  const CheckIfUserExists = async(email: string) => {
    const searchParams  = new URLSearchParams({
      email: email
    })
    try{
      const userIdResponse = await fetch(`http://0.0.0.0:8000/getUserByEmail?${searchParams}`);
      userID = await userIdResponse.json();
      console.log("UserID from RC: ", userID);
      if(!userIdResponse.ok){
        console.log("user id not ok")
      }

      if(userID.exists === false){
        console.log("MSG:", userID.exists);
          return false
      }else{
        return true
      }
      
    }catch(error){
      console.log(error);
    }
  }
  
  const userExists = await CheckIfUserExists(data.email);

  if(userExists){
    console.log("hello?");
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

  const hasNumber = /\d/.test(password);

  if (!hasNumber) {
    errorMsg =
      "Please ensure password meets all requirements: Does not contain a number";
      errorList.push(errorMsg);
      errors = true;
  }

  if (errors) {
    return errorList;
  } else {
    console.log("Data: ", JSON.stringify(data));
    var password = data.password;
    var hashedPassword = bcrypt.hashSync(password, salt);
    //for log in later:
    /*
    bcrypt.compareSync(password, hashedPassword)
  */
    data.password = hashedPassword;
    
      const today: Date = new Date();

      const fname: string = data.fname;
      const signature: any = today + fname;

      var tokenSalt = bcrypt.genSaltSync(10);
      const token = bcrypt.hashSync(signature,tokenSalt);
    try {
      const response = await fetch("http://0.0.0.0:8000/register", {
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
        
      }

      const info = await response.json();
      console.log("info: ", info);

      return true;
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
};
