import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import "../index.css";
import { url } from "../helpers";
// const totalapi = `${url + "/carts/total/"}`;
const apisite = "http://localhost:8080/products/";
const site = "/products/";

const TotalContext = createContext({
  cart: null,
  setCart: () => {},
  quantity: null,
  setQuantity: () => {},
});

export const useTotal = () => useContext(TotalContext);

const TotalProvider = ({ children }) => {
  const { cart } = useCart();
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `${url + "/carts/total/" + user.username}` ,
      }).then((res) => {
        console.log(res.data);
        setQuantity(res.data.totalQuantity);
        if (res.data.totalAmount) {
          setTotal(res.data.totalAmount.toFixed(2));
        } else {
          setTotal(0);
        }
        setLoading(false);
      });
    }
  }, [cart, user]);

  return (
    <TotalContext.Provider value={{ total, setTotal, quantity, setQuantity }}>
      {children}
    </TotalContext.Provider>
  );
};

export default TotalProvider;
