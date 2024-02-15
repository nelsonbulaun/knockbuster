import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import Navbar from "./components/navbar/Navbar";
import Header from "./Header";
import App from "./App";
import "./index.css";
import AuthProvider from "./contexts/AuthContext";
import CartProvider from "./contexts/CartContext";
import TotalProvider from "./contexts/TotalContext";
import AlertProvider from "./contexts/AlertContext";
import WatchListProvider from "./contexts/WatchListContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <WatchListProvider>
            <TotalProvider>
              <AlertProvider>
                <App />
              </AlertProvider>
            </TotalProvider>
          </WatchListProvider>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  </>
);
