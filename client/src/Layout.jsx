import Header from "./Header";
import Navbar from "./components/navbar/Navbar";
import "./index.css";
import { Outlet } from "react-router-dom";
import { Alert } from "./Alert";

const Layout = () => {
  return (
    <>
      <Header />
      <Alert />
      <Navbar />

      <div id="content" className="w-full h-full justify-center">
        <img
          id="itemProfileBg"
          className="h-full w-full bg-[linear-gradient(to_bottom_right,rgba(0,9,75)0%,rgba(0,9,75,0.8)1%,rgba(0,9,75,0.7)10%,rgba(0,9,75,0.5)50%,rgba(50,82,123,0.4)100%)]"
        />

        <Outlet />
      </div>
    </>
  );
};

export default Layout;
