import React from "react";
import axios from "axios";
import { useCart } from "../../contexts/CartContext";
import { useTotal } from "../../contexts/TotalContext";
import { useEffect, useState } from "react";
import "../../index.css";
import { url } from "../../helpers";
// const totalapi = "http://localhost:8080/carts/total/";
const apisite = url + "/products/";
// const url = "http://localhost:8080/carts/";
// const site = "/products/";

export function Findkey(props) {
  const [item, setItem] = useState([]);
  const [cost, setCost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(apisite + props.pid).then((res) => {
      const item = res.data;
      setItem(item);
      setCost(item.price * props.quantity);
      setIsLoading(false);
    });
  }, [props.pid]);

  const render = () => {
    if (isLoading)
      return <span className="loading loading-spinner loading-md"></span>;
    return (
      <div className="flex items-center border-t border-gray-200">
        <div className="w-1/4">
          <img
            className="w-full h-full object-center object-cover"
            src={item.image}
          />
        </div>
        <div className="md:w-3/4 m-1 h-full">
          <p className="text-base font-black leading-none text-gray-800">
            {item.title}
          </p>
          <p className="text-xs leading-3 text-gray-600 pt-2">
            {props.ptype.type}&nbsp; • &nbsp;${props.ptype.price}
          </p>
          <p className="text-xs leading-3 text-gray-600 pt-2">
            {item.description}
          </p>
          <p className="text-xs leading-3 text-gray-600 pt-2">
            Amount in Cart: {props.quantity}
          </p>
          <p className="text-xs leading-3 text-gray-600 pt-2">
            ${(props.ptype.price * props.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    );
  };
  return render();
}

export default function CartDropdownTest() {
  const { cart } = useCart();
  const user = localStorage.getItem("user");
  const json_user = JSON.parse(user);
  const { total } = useTotal();

  if (cart) {
    return (
      <div>
        {cart.products?.map((product, index) => (
          <div className="px-1" key={index}>
            {/* {console.log(product.productId)} */}
            <Findkey
              pid={product.productId}
              ptype={product.productType}
              quantity={product.quantity}
            />
          </div>
        ))}
     
      </div>
    );
  } else {
    return <div>empty</div>;
  }
}
