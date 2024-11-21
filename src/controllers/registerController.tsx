import { FormData } from "../components/login";
// import { useNavigate } from 'react-router-dom'

export const Register = async (data: FormData) => {
  console.log("Data: ", JSON.stringify(data));
  try {
    // const options = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // };

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
