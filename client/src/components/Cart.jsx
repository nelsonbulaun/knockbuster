import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import { useCart } from "../contexts/CartContext";
import { useTotal } from "../contexts/TotalContext";
import { Fragment } from "react";
import "../index.css";
import { useAuth } from "../contexts/AuthContext";
import { ConvertKeytoCart } from "../helpers";
const site = "/products/";
import { url } from "../helpers";

const initialState = {
  shipping: {
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  },
  billing: {
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    isSameAsShipping: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SHIPPING":
      return {
        ...state,
        shipping: { ...state.shipping, [action.field]: action.value },
        ...(state.billing.isSameAsShipping && {
          billing: {
            ...state.billing,
            [action.field]: action.value,
          },
        }),
      };
    case "UPDATE_BILLING":
      return {
        ...state,
        billing: { ...state.billing, [action.field]: action.value },
      };
    case "TOGGLE_SAME_AS_SHIPPING":
      return {
        ...state,
        billing: {
          ...state.billing,
          isSameAsShipping: !state.billing.isSameAsShipping,
        },
      };
    default:
      return state;
  }
};

export const ObjectToString = (val) => {
  let resultString = "";

  for (const key in val) {
    if (
      val.hasOwnProperty(key) &&
      val[key] !== undefined &&
      val[key] !== null
    ) {
      resultString += `${val[key]} `;
    }
  }

  return resultString;
};

export const CartTest = () => {
  const { cart, setCart } = useCart([]);
  const { total, quantity, setQuantity } = useTotal();
  const { user, setUser } = useAuth();
  const lsuser = localStorage.getItem("user");
  const json_user = JSON.parse(lsuser);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (field, value, isBilling = false) => {
    dispatch({
      type: isBilling ? "UPDATE_BILLING" : "UPDATE_SHIPPING",
      field,
      value,
    });
  };

  const handleSameAsShipping = (dispatch, isSameAsShipping) => {
    if (!isSameAsShipping) {
      dispatch({ type: "TOGGLE_SAME_AS_SHIPPING" });
      Object.keys(state.shipping).forEach((field) => {
        dispatch({
          type: "UPDATE_BILLING",
          field: field,
          value: state.shipping[field],
        });
      });
    } else {
      dispatch({ type: "TOGGLE_SAME_AS_SHIPPING" });
    }
  };

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
      url: `${url + "/carts/update"}`,
      
    }).then((res) => {
      setCart(res.data);
    });
  }

  const handleShippingFromAddress = (addressObj) => {
    const shippingFields = [
      "firstName",
      "lastName",
      "company",
      "address",
      "apartment",
      "city",
      "province",
      "country",
      "postalCode",
    ];

    if (addressObj === "placeholder") {
      console.log("Saved Addresses selected");
      return;
    }
    shippingFields.forEach((field) => {
      dispatch({
        type: "UPDATE_SHIPPING",
        field: field,
        value: addressObj[field] || "",
      });
    });
  };

  function saveAddress(val) {
    const requestData = {
      username: json_user.username,
      firstName: val.firstName,
      lastName: val.lastName,
      address: val.address,
      city: val.city,
      province: val.province,
      postalCode: val.postalCode,
      country: val.country,
    };
    if (val.apartment) {
      requestData.apartment = val.apartment;
    }
    if (val.company) {
      requestData.company = val.company;
    }
    axios({
      method: "POST",
      data: requestData,
      withCredentials: true,
      url: `${url + "/user/addAddress"}`,
    }).then((res) => {
      if ((res.status = 200)) {
        setUser(res.data);
      }
      if ((res.status = 422)) {
        console.log(res.data.errors);
      }
      console.log(val.firstName);
    });
  }

  useEffect(() => {}, [state.shipping, state.billing]);

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
              {" "}
              <div className="justify-start text-black w-full font-bold">
                Contact Information
              </div>
              <div className="divider" />
              <div className="flex-col w-full h-full relative">
                <div className="flex flex-col text-black text-left relative gap-y-2 mt-2">
                  <div className="flex flex-row w-full justify-between">
                    <a className="flex max-w-[33%]">Shipping Address</a>
                    {user.address ? (
                      <div className="container bg-white flex flex-col max-w-[66%]">
                        <select
                          defaultValue="placeholder"
                          className="bg-white rounded border  border-slate-300 mr-1"
                          onChange={(e) =>
                            handleShippingFromAddress(
                              user.address[e.target.value]
                            )
                          }
                        >
                          <option
                            className="text-slate-300"
                            value="placeholder"
                            disabled
                          >
                            Saved Addresses
                          </option>
                          {user.address?.map((address, index) => (
                            <option key={index} value={index}>
                              {ObjectToString(address)}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <> </>
                    )}
                  </div>
                  <form
                    id="shippingInfo"
                    className="flex flex-col w-full gap-y-2"
                  >
                    <div className="flex flex-row relative w-full ">
                      <input
                        className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                        placeholder="First Name"
                        value={state.shipping.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                      />
                      <input
                        className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                        placeholder="Last Name"
                        value={state.shipping.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                      />
                    </div>
                    <input
                      className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                      placeholder="Company (Optional)"
                      value={state.shipping.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                    />
                    <input
                      className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                      placeholder="Address"
                      value={state.shipping.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                    <input
                      className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                      placeholder="Apartment, Suite, etc. (Optional)"
                      value={state.shipping.apartment}
                      onChange={(e) =>
                        handleInputChange("apartment", e.target.value)
                      }
                    />
                    <div className="flex flex-row relative">
                      <input
                        className="text-black mr-1 rounded border border-slate-300 bg-white flex grow"
                        placeholder="City"
                        value={state.shipping.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                      />
                      <input
                        className="text-black mr-1 rounded border border-slate-300 bg-white flex grow"
                        placeholder="Province"
                        value={state.shipping.province}
                        onChange={(e) =>
                          handleInputChange("province", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-row relative w-full ">
                      <input
                        className="text-black rounded border mr-1 border-slate-300 bg-white flex grow"
                        placeholder="Country"
                        value={state.shipping.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                      />

                      <input
                        className="text-black  rounded border border-slate-300 bg-white mr-1 flex grow "
                        placeholder="Postal Code"
                        value={state.shipping.postalCode}
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value)
                        }
                      />
                    </div>
                  </form>
                  <div className="w-full flex justify-end">
                    <button
                      className="btn btn-sm"
                      onClick={() => saveAddress(state.shipping)}
                    >
                      {" "}
                      Save Address
                    </button>
                  </div>
                </div>
                <div className="divider" />
                <div className="flex flex-col text-black text-left relative gap-y-2 mt-2">
                  <form
                    id="billingInfo"
                    className="flex flex-col w-full gap-y-2"
                  >
                    <div>
                      Billing Address
                      <br />
                      <a className="text-sm">Same As Shipping </a>
                      <input
                        type="checkbox"
                        label="Same As Shipping"
                        onChange={() =>
                          handleSameAsShipping(
                            dispatch,
                            state.billing.isSameAsShipping
                          )
                        }
                      ></input>
                    </div>
                    <div className="flex flex-col text-black text-left relative gap-y-2 mt-2">
                      {" "}
                      <div className="flex flex-row w-full relative">
                        <input
                          className={
                            state.billing.isSameAsShipping
                              ? "mr-1 text-black rounded border border-slate-200 bg-slate-300 flex grow"
                              : "mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                          }
                          disabled={
                            state.billing.isSameAsShipping ? "disabled" : ""
                          }
                          placeholder="First Name"
                          value={
                            !state.billing.isSameAsShipping
                              ? state.billing.firstName
                              : state.shipping.firstName
                          }
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value, true)
                          }
                        />
                        <input
                          className={
                            state.billing.isSameAsShipping
                              ? "mr-1 text-black rounded border border-slate-200 bg-slate-300 flex grow"
                              : "mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                          }
                          disabled={
                            state.billing.isSameAsShipping ? "disabled" : ""
                          }
                          placeholder="Last Name"
                          value={
                            !state.billing.billingIsShipping
                              ? state.billing.lastName
                              : state.shipping.lastName
                          }
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value, true)
                          }
                        />
                      </div>
                    </div>
                    <input
                      className={
                        state.billing.isSameAsShipping
                          ? "mr-1 text-black rounded border border-slate-200 bg-slate-300"
                          : "mr-1 text-black rounded border border-slate-300 bg-white"
                      }
                      disabled={
                        state.billing.isSameAsShipping ? "disabled" : ""
                      }
                      placeholder="Company(Optional)"
                      value={
                        !state.billing.billingIsShipping
                          ? state.billing.company
                          : state.shipping.company
                      }
                      onChange={(e) =>
                        handleInputChange("address", e.target.value, true)
                      }
                    />
                    <input
                      className={
                        state.billing.isSameAsShipping
                          ? "mr-1 text-black rounded border border-slate-200 bg-slate-300"
                          : "mr-1 text-black rounded border border-slate-300 bg-white"
                      }
                      disabled={
                        state.billing.isSameAsShipping ? "disabled" : ""
                      }
                      placeholder="Address"
                      value={
                        !state.billing.billingIsShipping
                          ? state.billing.address
                          : state.shipping.address
                      }
                      onChange={(e) =>
                        handleInputChange("address", e.target.value, true)
                      }
                    />
                    <input
                      className={
                        state.billing.isSameAsShipping
                          ? "mr-1 text-black rounded border border-slate-200 bg-slate-300"
                          : "mr-1 text-black rounded border border-slate-300 bg-white"
                      }
                      disabled={
                        state.billing.isSameAsShipping ? "disabled" : ""
                      }
                      placeholder="Apartment, Suite, etc. (Optional)"
                      value={
                        !state.billing.billingIsShipping
                          ? state.billing.apartment
                          : state.shipping.apartment
                      }
                      onChange={(e) =>
                        handleInputChange("apartment", e.target.value, true)
                      }
                    />
                    <div className="flex flex-row relative">
                      <input
                        className={
                          state.billing.isSameAsShipping
                            ? "mr-1 text-black rounded border border-slate-200 bg-slate-300 flex grow"
                            : "mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                        }
                        disabled={
                          state.billing.isSameAsShipping ? "disabled" : ""
                        }
                        placeholder="City"
                        value={
                          !state.billing.billingIsShipping
                            ? state.billing.city
                            : state.shipping.city
                        }
                        onChange={(e) =>
                          handleInputChange("city", e.target.value, true)
                        }
                      />
                      <input
                        className={
                          state.billing.isSameAsShipping
                            ? "mr-1 text-black rounded border border-slate-200 bg-slate-300 flex grow"
                            : "mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                        }
                        disabled={
                          state.billing.isSameAsShipping ? "disabled" : ""
                        }
                        placeholder="Province"
                        value={
                          !state.billing.billingIsShipping
                            ? state.billing.province
                            : state.shipping.province
                        }
                        onChange={(e) =>
                          handleInputChange("province", e.target.value, true)
                        }
                      />
                    </div>
                    <div className="flex flex-row relative w-full">
                      <input
                        className={
                          state.billing.isSameAsShipping
                            ? "mr-1 text-black rounded border border-slate-200 bg-slate-300 flex grow"
                            : "mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                        }
                        disabled={
                          state.billing.isSameAsShipping ? "disabled" : ""
                        }
                        placeholder="Country"
                        value={
                          !state.billing.billingIsShipping
                            ? state.billing.country
                            : state.shipping.country
                        }
                        onChange={(e) =>
                          handleInputChange("country", e.target.value, true)
                        }
                      />

                      <input
                        className={
                          state.billing.isSameAsShipping
                            ? "mr-1 text-black rounded border border-slate-200 bg-slate-300 flex grow"
                            : "mr-1 text-black rounded border border-slate-300 bg-white flex grow"
                        }
                        disabled={
                          state.billing.isSameAsShipping ? "disabled" : ""
                        }
                        placeholder="Postal Code"
                        value={
                          !state.billing.billingIsShipping
                            ? state.billing.postalCode
                            : state.shipping.postalCode
                        }
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value, true)
                        }
                      />
                    </div>
                  </form>
                  <div className="divider"></div>
                  <div className="w-full flex justify-items-end justify-end">
                    <button className="btn justify-self-end btn-sm">
                      Proceed To Payment
                    </button>
                  </div>
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
                <div
                  className="w-full overflow-y-auto overflow-x-hidden h-screen"
                  id="scroll"
                >
                  {cart.products?.map((product, index) => (
                    <Fragment key={index}>
                      <div className="py-8">
                        <Link to={site + product.productId}>
                          <ConvertKeytoCart
                            pid={product.productId}
                            ptype={product.productType}
                            border={index === 0 ? false : true}
                          />
                        </Link>
                        <div className="flex justify-center">
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
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CartTest;
