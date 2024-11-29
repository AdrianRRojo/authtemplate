import { useEffect, useState } from "react";
import { RegisterController } from "../controllers/registerController";
import { useNavigate } from "react-router-dom";
import {clear} from "@testing-library/user-event/dist/clear";
export interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  phone: string;

}

interface rcMessages {
  id: string;
  message: String;
}

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [phone, setPhone] = useState("+1 ");
  useEffect(() => {
    console.log("Phone: ", formData.phone);
  }, [formData.phone]);

  const [rcMsg, setRcMsg] = useState<rcMessages[]>([{id: "", message: ""}]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setFormData((prevData) => ({
        ...prevData,
        phone,
      }));
      const rcResponse: any | undefined = await RegisterController(formData)
        .then((response) => response)
        .catch((e) => console.warn(e));
      if (rcResponse) {
        console.log("rcResponse is not okay:", rcResponse);
        rcResponse.map((msg: string, idx: string) => {
          setRcMsg((prevData) => [
            ...prevData,
            { id: idx, message: msg },
          ]);
        });
        // navigate('/home');
        //window.location.reload();
      } else {
        //console.log("No good:", rcResponse);
        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const formatThePhoneNumber = (
    value: string,
    onChange: (phoneNumber: string) => void,
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

  const clearState = () => {
    setRcMsg([]);
  };

  const redirect = () => {
    navigate("/login");
  }
  return (
    <div className="bg-sky-700">
      <div className="flex flex-row min-h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="w-4/12 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 ">
          <div className="px-4 py-6 sm:p-8 flex flex-row justify-center items-center ">
            <div className="grid w-10/12 grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="fname" className="block text-sm/6 font-medium text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="fname"
                    type="text"
                    name="fname"
                    onChange={handleInputChange}
                    value={formData.fname}
                    required
                    autoComplete="given-name"
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="lname" className="block text-sm/6 font-medium text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="lname"
                    type="text"
                    name="lname"
                    autoComplete="family-name"
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleInputChange}
                    value={formData.lname}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleInputChange}
                    value={formData.email}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleInputChange}
                    value={formData.password}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phoneForm" className="block text-sm/6 font-medium text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phoneForm"
                    type="text"
                    name="phoneForm"
                    maxLength={20}
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm/6"
                    onChange={(e) => formatThePhoneNumber(e.target.value, setPhone)}
                    value={phone}
                  />
                </div>
              </div>
              {/* <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="street-address"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                  State
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    name="region"
                    type="text"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    id="postal-code"
                    name="postal-code"
                    type="text"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm/6"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">

            <button
                onClick={redirect}
                className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Existing User Login</button>
            <button
              type="submit"
              onClick={clearState}
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Register
            </button>
          </div>
        {rcMsg.map(msgs => (
            <li className="text-red-500 text-md font-semibold px-5 list-none mb-0.5 text-center"  key={msgs.id}>{msgs.message}</li>
        ))}
        </form>


      </div>
      </div>
  );
}
