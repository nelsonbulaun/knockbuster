import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAlert } from "./AlertContext";
import { url } from "../helpers";

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const storeduser = localStorage.getItem("user");
  const json_user = JSON.parse(storeduser);
  const { notificationType, setNotificationType, notificationText, setNotificationText } = useAlert();

  useEffect(() => {
    console.log(json_user);
    const fetchData = async () => {
      // case user is not set, but previously stored user exists
      if (!user && storeduser) {
        setUser(json_user);

        // user is set and is not a temp user
        if ( json_user != undefined && !(json_user["username"].startsWith("temp-"))) {
          setAuth(true);
          setNotificationType("alert");
          setNotificationText(`Welcome Back ${json_user.username}`);
          console.log(notificationText);
        }
        // creates a temp user
      } else if (!user && !storeduser) {
        try {
          const res = await axios.post(`${url + "/register"}`, {
            email: "temp",
            username: `temp-${uuidv4()}`,
            password: "temp",
            first_name: "temp",
            last_name: "temp",
          }, { withCredentials: true });

          if (res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
            console.log(res.data.username);
          } else {
            console.log("Error:", res.statusText);
          }
        } catch (error) {q
          console.error("Error:", error.message);
        }
      }
    };

    fetchData();
  }, [json_user]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;