import Cookies from "js-cookie";
import ar from '../imgs/ar.png';

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function Nav() {
  const getCookie = Cookies.get("Login");

  return (
    <div className=" bg-slate-400">
      <div className="flex justify-start"><img src={ar} className="absolute " alt="AR Logo"/></div>
      <div className="flex justify-end">
        {getCookie ? (
          <a href="/account">account</a>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </div>
  );
}
