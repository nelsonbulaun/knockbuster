import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { url } from "../helpers";
const storeduser = localStorage.getItem("user");


export const Logout = () => {
  const { setAuth, user, setUser } = useAuth();
  const navigate = useNavigate();

  function handleLogOut() {
    Axios({
      method: "GET",
      url: `${url + "/log-out"}`,
      withcredentials: true,
    }).then((res) => {
      localStorage.removeItem("user");
      setAuth(false);
      setUser();
    });
  }

  useEffect(()=>{
    if (!storeduser){
      navigate("/knockbuster/login");
    }
  },[]);

  return (
    <div>
      {/* <h1> Would you like to Log Out?</h1> */}
      <button
        className="btn btn-sm no-animation bg-grey-500 hover:bg-grey-700 text-slate-300 font-bold py-2 px-4 border border-grey-700 rounded"
        onClick={handleLogOut}
      >
        {" "}
        Log Out
      </button>
    </div>
  );
};
