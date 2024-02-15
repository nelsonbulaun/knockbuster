import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import movieCollage from "../assets/moviecollage.jpg";
import { SplitScreen } from "../components/SplitScreen";
const storeduser = localStorage.getItem("user");
import { url } from "../helpers";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const { user, setAuth, setUser } = useAuth();
  const { setNotificationType, setNotificationText } = useAlert();
  const navigate = useNavigate();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    Axios({
      method: "POST",
      url: `${url + "/login"}`,
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      alert(res.data);
      if (res.status === 200 && res.data === "Successfully Authenticated") {
        // if a stored user already exists, remove it form the local storage for replacement
        if (storeduser) {
          localStorage.removeItem("user");
        }
        getUser();
      }
      setUsername("");
      setPassword("");
    });
  }

  function getUser() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `${url + "/user"}`,
    }).then((res) => {
      setData(res.data);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setAuth(true);
        setUser(res.data);
        setNotificationType("alert");
        setNotificationText(`Welcome Back ${res.data.username}`);
        console.log(user);
      }
      navigate("/");
    });
  }

  const content = (
    <div>
      <div className="text-left pb-3">
        <Link to="/register">
          <a className="text-sm">New User? Create An Account</a>
        </Link>
      </div>
      <form
        className="flex flex-col space-y-0.5 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="text-[#1b4796] break-after-auto rounded border border-[#1b4796] flex bg-transparent"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          className="text-[#1b4796] break-after-auto rounded border border-[#1b4796] flex bg-transparent "
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          className="btn btn-sm outline-grey-900 bg-[#1b4796]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
  return (
    <SplitScreen title={"Login."} image={movieCollage} content={content} />
  );
  // return (
  //   <div className="h-full w-full">
  //     <div className="divider pt-0 mt-0" />

  //     <div className="h-[90vh] w-full flex justify-center items-center relative -top-20">
  //       <div className="h-[50vh] w-1/2 justify-center flex flex-col items-center bg-blockbuster-yellow divide-y-2 relative shadow-lg rounded-md">
  //         <div className="h-full container shadow-sm flex flex-row justify-center items-center absolute rounded-l-lg">
  //           <div
  //             className="h-[50vh] basis-1/2 flex justify-center items-center relative rounded-l-lg"
  //             style={{
  //               backgroundImage: `url(${movieCollage})`,
  //               backgroundSize: "cover",
  //               backgroundPosition: "center",
  //               borderTopLeftRadius: "0.5rem",
  //             }}
  //           >
  //             <div className="absolute inset-0 bg-yellow-500 opacity-50 rounded-l-lg"></div>
  //             <Link to="/">
  //               <div id="logo" className="w-fit rotate-355 bg-[white]/30 p-2">
  //                 <div
  //                   id="logo"
  //                   className="w-fit border border-[#1b4796] border-r-0 p-2"
  //                 >
  //                   <h1 id="titleinverted" className="text-3xl">
  //                     {" "}
  //                     KnockBuster{" "}
  //                   </h1>
  //                 </div>
  //               </div>
  //             </Link>
  //           </div>
  //           <div className="basis-1/2 rounded-r-lg shadow-sm flex flex-col sm:py-12 items-center bg-blockbuster-yellow h-full justify-center relative">
  //             <div className="justify-start flex flex-col">
  //               <div className="text-left pb-3">
  //                 <h1 className="secondaryTitle  text-[#1b4796] text-3xl">
  //                   LOGIN.
  //                 </h1>
  //                 <Link to="/register">
  //                   <a className="text-sm">New User? Create An Account</a>
  //                 </Link>
  //               </div>
  //               <form
  //                 className="flex flex-col space-y-0.5 w-full"
  //                 onSubmit={(e) => e.preventDefault()}
  //               >
  //                 <input
  //                   className="text-white break-after-auto rounded border border-[#1b4796] flex bg-transparent"
  //                   placeholder="Username"
  //                   value={username}
  //                   onChange={handleUsernameChange}
  //                 />
  //                 <input
  //                   className="text-white break-after-auto rounded border border-[#1b4796] flex bg-transparent "
  //                   type="password"
  //                   placeholder="Password"
  //                   value={password}
  //                   onChange={handlePasswordChange}
  //                 />
  //                 <button
  //                   className="btn btn-sm outline-grey-900 bg-[#1b4796]"
  //                   onClick={handleSubmit}
  //                 >
  //                   Submit
  //                 </button>
  //               </form>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //);
};

export default Login;
