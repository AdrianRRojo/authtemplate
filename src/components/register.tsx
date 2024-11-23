import { useEffect,useState } from "react";
import { registerController } from "../controllers/registerController";

export interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  phone: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [phone,setPhone] = useState("+1 ");
  useEffect(() => {
    console.log("Phone: ", formData.phone); 
  }, [formData.phone]);

  const [rcMsg, setRcMsg] = useState<any[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault();

    try {
        setFormData((prevData) => ({
            ...prevData, phone
          }));
      const rcResponse: any = await registerController(formData)
        .then(response => response)
        .catch(e => console.warn(e));
      if(!rcResponse.ok){
        console.log("rcResponse is not okay:", rcResponse);
        rcResponse.map((msg: string, idx: string) => {
          setRcMsg((prevData) => ([
            ...prevData, {id: idx, message: msg}
          ]));
        });
          
      }else{
        console.log("rcResponse is okay:", rcResponse)   
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const formatThePhoneNumber = (
    value: string,
    onChange: (phoneNumber: string) => void
  ) => {
    // Remove non-digit characters except the '+' symbol
    const cleanedValue = value.replace(/\D/g, "");

    let formattedValue = "+1";

    if (cleanedValue.length > 1) {

      if (cleanedValue.length > 1) {
        formattedValue += ` (${cleanedValue.slice(1, 4)})`;
      }

      if (cleanedValue.length > 4) {
        formattedValue += ` ${cleanedValue.slice(4, 7)}`;
      }


      if (cleanedValue.length > 7) {
        formattedValue += `-${cleanedValue.slice(7, 11)}`;
      }
    }


    if (cleanedValue.length <= 1) {
      formattedValue = "+1";
    }


    setPhone(formattedValue);
    onChange(formattedValue);
    // <input type="hidden" name="phone" value={phone} onChange={handleInputChange} hidden/>

  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  return (
    <div className="columns-6">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname" className="">
          First Name:{" "}
        </label>
        <input
          id="fname"
          type="text"
          name="fname"
          className="border-2 border-blue-400"
          onChange={handleInputChange}
          value={formData.fname}
          required
        />

        <label htmlFor="lname"> Last Name: </label>
        <input
          id="lname"
          type="text"
          name="lname"
          className="border-2 border-blue-400"
          onChange={handleInputChange}
          value={formData.lname}
          required
        />

        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          name="email"
          className="border-2 border-blue-400"
          onChange={handleInputChange}
          value={formData.email}
          required
        />

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          className="border-2 border-blue-400"
          onChange={handleInputChange}
          value={formData.password}
          required
        />

        <label htmlFor="phoneForm">Phone: </label>
        <input
          id="phoneForm"
          type="phoneForm"
          name="phoneForm"
          maxLength={20}
          className="border-2 border-blue-400"
          onChange={(e)=> formatThePhoneNumber(e.target.value, setPhone)}
          value={phone}
          
        />

        <button type="submit">Submit</button>
      </form>
      {rcMsg.map(msgs => (
        <li key={msgs.id}>{msgs.message}</li>
      ))}
    </div>
  );
}
