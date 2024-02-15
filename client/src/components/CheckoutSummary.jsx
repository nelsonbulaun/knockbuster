import React from "react";
import axios from "axios";
import "../index.css";
import { useState, useEffect, useReducer } from "react";
import { useCart } from "../contexts/CartContext";
import { useTotal } from "../contexts/TotalContext";
import { useAuth } from "../contexts/AuthContext";
import { ConvertKeytoCart } from "../helpers";
import { url } from "../helpers";


export function ConvertKeyToSummaryGrid(props) {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${url + "/products/" + props.pid}`).then((res) => {
      const item = res.data;
      setItem(item);
      setIsLoading(false);
    });
  }, [props.pid]);

  const render = () => {
    if (isLoading)
      return <span className="loading loading-spinner loading-md"></span>;

    return (
      <>
        <td className=" w-max-[30%]">
          <img
          
            src={item.image}
          />
        </td>
        <td className="text-base font-black leading-none text-gray-800">
          <div className="justify-center">
            <h1> 
          {item.title}
          </h1>
          <a className="text-xs"> 
          {props.ptype.type}
          </a>
          </div>
       
        </td>

        <td className="text-xs leading-3 text-gray-600 pt-2">
          {item.description}
        </td>
        <td className="text-xs leading-3 text-gray-600 pt-2">
          ${props.ptype.price}
        </td>
      </>
    );
  };
  return render();
}

export const CheckoutSummary = () => {
  const { cart, setCart } = useCart();
  const { total, quantity, setQuantity } = useTotal();
  const { user, setUser } = useAuth();
  const lsuser = localStorage.getItem("user");
  const json_user = JSON.parse(lsuser);

  function handleProductQuantityChange(prodId, prodType, prodQuantity) {
    axios({
      method: "POST",
      data: {
        username: json_user.username,
        productId: prodId,
        productType: prodType,
        quantity: prodQuantity,
      },
      withCredentials: true,
      url:   `${url + "/carts/update"}`,
    }).then((res) => {
      setCart(res.data);
    });
  }

  if (!cart) {
    <div> Your Cart is Empty </div>;
  } else {
    return (
      <div className="w-full h-fit top-25 overflow-y-auto overflow-x-hidden fixed sticky-0">
        <div className="w-full relative z-10 rounded-xl right-0 h-[90%] overflow-y-scroll transform translate-x-0 transition ease-in-out duration-700">
          <div className="flex md:flex-row flex-col justify-center" id="cart">
            <div
              className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
              id="scroll"
            >
              <div className="flex flex-col md:h-screen py-12 px-8 overflow-y-auto">
                <div className="justify-start text-black w-full font-bold">
                  Cart Summary
                </div>
                <div className="divider py-0 mb-0" />
                <div
                  className="w-full overflow-y-auto overflow-x-hidden"
                  id="scroll"
                >
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Type</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.products?.map((product, index) => (
                        <tr key={index}>
                     
                            <ConvertKeyToSummaryGrid
                              pid={product.productId}
                              ptype={product.productType}
                              border={index === 0 ? false : true}
                            />
                  
                          <td>
                            <div>
                              <div>
                                <button
                                  className="text-black"
                                  onClick={() =>
                                    handleProductQuantityChange(
                                      product.productId,
                                      product.productType,
                                      1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <div>
                                <p
                                  className="text-base text-black"
                                  key={product.quantity}
                                >
                                  {product.quantity}
                                </p>
                              </div>
                              <div>
                                <button
                                  className="text-black"
                                  onClick={() =>
                                    handleProductQuantityChange(
                                      product.productId,
                                      product.productType,
                                      -1
                                    )
                                  }
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="w-1/4 bg-gray-100 h-[80%] relative">
              <div className="flex flex-col md:h-screen py-12 px-8 overflow-y-auto">
                <div className="justify-start text-black w-full font-bold">
                  Cart Summary
                </div>
                <div className="divider py-0 mb-0" />
                <div className="text-black text-left py-0 m-0">
                  Subtotal ({quantity} items total): ${total}
                  <br />
                  Shipping: To Be Determined
                </div>
                <div className="divider py-0 mt-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
