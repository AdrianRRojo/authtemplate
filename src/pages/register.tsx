import React, { useEffect, useState } from "react";
import { RegisterController } from "../controllers/registerController";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
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
  });



  const [rcMsg, setRcMsg] = useState<rcMessages[]>([{ id: "", message: "" }]);

  const getCookie = Cookies.get('Login');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

      try {
        const rcResponse: any | undefined = await RegisterController(formData);
        if (rcResponse) {
          if (getCookie) {
            navigate("/");
            rcResponse.map((msg: string, idx: string) => {
              setRcMsg((prevData) => [...prevData, { id: idx, message: msg }]);
            });
            
          } else {
            rcResponse.map((msg: string, idx: string) => {
              setRcMsg((prevData) => [...prevData, { id: idx, message: msg }]);
            });
          }

          // navigate('/home');
          //window.location.reload();
        } else {
          console.log("No good:", rcResponse);
        }
      } catch (error) {
        console.log("Error", error);
      }
    
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
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="bg-sky-700">
      <div className="flex flex-row min-h-screen justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-4/12 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 "
        >
          <div className="px-4 py-6 sm:p-8 flex flex-row justify-center items-center ">
            <div className="grid w-10/12 grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="fname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
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
                <label
                  htmlFor="lname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
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
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
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
                {isHovering && (
                  <div className="absolute inline-flex items-center justify-center w-3/12 overflow-hidden rounded-lg bg-slate-50 border-dashed border-2 border-gray-300 shadow">
                    <div className="px-4 py-5 sm:p-6">
                      <ol>
                        <li>Must contain a number</li>
                        <li>Must contain a capital letter</li>
                        <li>Must contain a special character (i.e: !, ?, $)</li>
                        <li>Must be at least 6 characters in length</li>
                      </ol>
                    </div>
                  </div>
                )}
                <label
                  htmlFor="password"
                  className="flex items-center text-sm font-medium text-gray-900"
                >
                  Password
                  <div
                    className="relative"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.25"
                      stroke="currentColor"
                      className="w-5 h-5 ml-2 hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </div>
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

            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              onClick={redirect}
              className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Existing User Login
            </button>
            <button
              type="submit"
              onClick={clearState}
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Register
            </button>
          </div>
          {rcMsg.map((msgs) => (
            <li
              className="text-red-500 text-md font-semibold px-5 list-none mb-0.5 text-center"
              key={msgs.id}
            >
              {msgs.message}
            </li>
          ))}
        </form>
      </div>
    </div>
  );
}
