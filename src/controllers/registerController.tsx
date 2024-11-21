import { FormData } from "../components/register";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

export const registerController = async (data: FormData) => {
  console.log("Data: ", JSON.stringify(data));
  var password = data.password;
  var hashedPassword = bcrypt.hashSync(password, salt);
  //for log in later:
  /*
    bcrypt.compare(password, hashedPassword)
  */
  data.password = hashedPassword;

  
  
  try {


    const response = await fetch("http://0.0.0.0:8000",{
      method: "POST",
      headers: { 
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "*",  
          "Access-Control-Allow-Methods": "POST",  },
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
};
