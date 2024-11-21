import { FormData } from "../components/register";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

export const registerController = async (data: FormData) => {
  var errors = false;
  var errorMsg: string;
  const errorList: string[] = [];
  var email = data.email;
  var fname = data.fname;
  var lname = data.lname;
  var password = data.password;

  // Length checks
  if (email.length < 4) {
    errorMsg = "Please set a valid email";
    errorList.push(errorMsg);
    errors = true;
  }
  if (fname.length < 2) {
    errorMsg = "First name length is invalid";
    errors = true;
  }
  if (lname.length < 2) {
    errorMsg = "Last name length is invalid";
    errors = true;
  }
  if (password.length < 6) {
    errorMsg = "Password length is invalid";
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
    errors = true;
  }

  const regex = /[^a-zA-Z0-9\s]/;
  if (!regex.test(password)) {
    errorMsg =
      "Please ensure password meets all requirements: Does not contain a special character";
    errors = true;
  }

  const hasNumber = /\d/.test(password);

  if (!hasNumber) {
    errorMsg =
      "Please ensure password meets all requirements: Does not contain a number";
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
    bcrypt.compare(password, hashedPassword)
  */
    data.password = hashedPassword;

    try {
      const response = await fetch("http://0.0.0.0:8000", {
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

      const info = await response.json();
      console.log(info);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
};
