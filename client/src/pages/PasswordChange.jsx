import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../index.css";
import { url } from "../helpers";


export const PasswordChange = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleNewPasswordChange(e) {
    setNewPassword(e.target.value);
  }
  function handleConfirmNewPasswordChange(e) {
    setConfirmNewPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        //fix new fields
        // email: registerEmail,
        username: username,
        password: password,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      },
      withCredentials: true,
      url: `${url + "/user/change-password"}`
    }).then((res) => console.log(res));
  }

  return (
    <>
      <div className="mx-full flex flex-col">

    
            <form
              className="grid grid-cols-1 space-y-0.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <a className="text-left text-sm">Username</a>
              <input
                className="text-black rounded border mr-1 border-slate-300 bg-white flex grow"
              
                value={username}
                onChange={handleUsernameChange}
              />
              <a className="text-left text-sm">Password</a>
              <input
                className="text-black rounded border mr-1 border-slate-300 bg-white flex grow"
   
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <a className="text-left text-xs">New Password</a>
              <input
                className="text-black rounded border mr-1 border-slate-300 bg-white flex grow"
   
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <a className="text-left text-sm">Confirm New Password</a>
              <input
                className="text-black rounded border mr-1 border-slate-300 bg-white flex grow"
             
                type="password"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
              />

              <button
                className="px-6 pb-2 pt-2.5 outline-grey-900"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
        </div>
    </>
  );
};

export default PasswordChange;
