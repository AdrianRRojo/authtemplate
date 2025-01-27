import {FormData} from "../pages/landing";
import bcrypt from "bcryptjs-react";
import Cookies from 'js-cookie';


const salt = bcrypt.genSaltSync(10);


// import { useCookies } from "react-cookie";


export const SubmitController = async (data: FormData) => {
  // const [cookies, setCookie, removeCookie] = useCookies(['login']);

  var errors = false;
  var errorMsg: string;
  const errorList: string[] = [];
  const success: string[] = [];


  var company: string = data.company;
  var jobTitle: string = data.jobTitle;
  var jobDescription: string = data.jobDescription;
  var resume  = data.resume;
  var userID: any | undefined;

  if (jobTitle.length < 2) {
    errorMsg = "Last name length is invalid";
    errorList.push(errorMsg);
    errors = true;
  }
  if (jobDescription.length < 6) {
    errorMsg = "jobDescription length is invalid";
    errorList.push(errorMsg);
    errors = true;
  }




  if (errors) {
    return errorList;
  } else {
    console.log("Data: ", JSON.stringify(data));

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/create_CL`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify(data),
      });
      

      if (!response.ok) {
        throw new Error("Failed to Submit");
      }
      else{
        // setCookie('login', true, {path: '/', maxAge: 100000})
     
        // Cookies.set('Login',token, {expires: 2, path: '/'});
        success.push("Submission Successful");
        return success;
      }

      // const info = await response.json();
      // console.log("info: ", info);

      
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  }
};
