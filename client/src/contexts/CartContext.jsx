import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useAuth } from "./AuthContext";
import { url } from "../helpers";

const CartContext = createContext({
  cart: null,
  setCart: () => {},
});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const { user } = useAuth();
  const storeduser = localStorage.getItem("user");
  const json_user = JSON.parse(storeduser);

  useEffect(() => {
    if (storeduser) {
       const newCart = async () => {
         if (user && user.username) {
           Axios({
             method: "GET",
             withCredentials: true,
             url: `${url + "/carts/users/" + json_user.username}` ,
           }).then((res) => {
             setCart(res.data);
             console.log(res.data);
           });
         }
       };
       newCart();
    }
   }, [user]);
  

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
