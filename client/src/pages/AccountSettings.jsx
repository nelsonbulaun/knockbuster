import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import "../index.css";
import PasswordChange from "./PasswordChange";
import { useAuth } from "../contexts/AuthContext";
import { ObjectToString } from "./Cart";
import Accordion from "../components/Accordian";
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
};
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SHIPPING":
      return {
        ...state,
        shipping: { ...state.shipping, [action.field]: action.value },
      };
    default:
      return state;
  }
};

const ManageAddresses = () => {
  const { user, setUser } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleInputChange = (field, value) => {
    dispatch({
      type: "UPDATE_SHIPPING",
      field,
      value: value || "",
    });
  };

  function updateAddress(val) {
    const newAddress = {
      firstName: val.firstName,
      lastName: val.lastName,
      address: val.address,
      city: val.city,
      province: val.province,
      postalCode: val.postalCode,
      country: val.country,
    };
    if (val.apartment) {
      newAddress.apartment = val.apartment;
    }
    if (val.company) {
      newAddress.company = val.company;
    }
    axios({
      method: "POST",
      data: {
        username: user.username,
        oldAddress: selectedAddress,
        newAddress: newAddress,
      },
      withCredentials: true,
      url: `${url + "/user/updateAddress"}`,
    }).then((res) => {
      if ((res.status = 200)) {
        setUser(res.data);
      }
      if ((res.status = 422)) {
        console.log(res.data.errors);
      }
      // console.log(val.firstName);
    });
  }
  
  function saveAddress(val) {
    const requestData = {
      username: user.username,
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
      url: `${url + "/user/addAddress"}`
    }).then((res) => {
      if ((res.status = 200)) {
        setUser(res.data);
      }
      if ((res.status = 422)) {
        console.log(res.data.errors);
      }
      // console.log(val.firstName);
    });
  }
  function removeAddress(e) {
    axios({
      method: "POST",
      data: {
        username: user.username,
        addressToRemove: selectedAddress,
      },
      withCredentials: true,
      url: `${url + "/user/removeAddress"}`

    }).then((res) => {
      // console.log(res.data)
      setUser(res.data);
    });
  }

  function handleSelect(val) {
    if (val != null) {
      setSelectedAddress(val);
      Object.keys(initialState.shipping).forEach((field) => {
        dispatch({
          type: "UPDATE_SHIPPING",
          field: field,
          value: val[field] || "",
        });
      });
    } else if (val == null) {
      setSelectedAddress(val);
      Object.keys(initialState.shipping).forEach((field) => {
        dispatch({
          type: "UPDATE_SHIPPING",
          field: field,
          value: "",
        });
      });
    }
  }

  useEffect(() => {}, [selectedAddress]);

  return (
    <div>
      <div className="py-2 w-full flex justify-start">
        <select
          onChange={(e) => {
            handleSelect(user.address[e.target.value]);
          }}
          defaultValue="placeholder"
          className="bg-white rounded border border-slate-300 mr-1 place-content-end"
        >
          <option className="text-slate-300" value="placeholder" disabled>
            Saved Addresses
          </option>
          <option className="text-slate-300" value={null}>
            Add New Address
          </option>
          {user.address?.map((addressSolo, index) => (
            <option key={index} value={index}>
              {ObjectToString(addressSolo)}
            </option>
          ))}
        </select>
      </div>
      <form id="shippingInfo" className="flex flex-col w-full gap-y-2">
        <div className="flex flex-row relative w-full gap-x-2">
          <div className="flex-col w-full flex">
            <a className="text-left text-sm">First Name</a>
            <input
              className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
              value={state.shipping.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </div>
          <div className="flex-col w-full flex">
            <a className="text-left text-sm">Last Name</a>
            <input
              className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
              value={state.shipping.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>
        </div>
        <div className="flex-col w-full flex">
          <a className="text-left text-sm">Company (Optional)</a>
          <input
            className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
            value={state.shipping.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
          />
        </div>
        <div className="flex-col w-full flex">
          {" "}
          <a className="text-left text-sm">Address</a>
          <input
            className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
            value={state.shipping.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="flex-col flex w-full">
          <a className="text-left text-sm">Apartment, Suite, etc. (Optional)</a>
          <input
            className="mr-1 text-black rounded border border-slate-300 bg-white flex grow"
            value={state.shipping.apartment}
            onChange={(e) => handleInputChange("apartment", e.target.value)}
          />
        </div>

        <div className="flex flex-row relative gap-x-2">
          <div className="flex-col flex w-full">
            <a className="text-left text-sm">City</a>
            <input
              className="text-black mr-1 rounded border border-slate-300 bg-white flex grow"
              value={state.shipping.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
          <div className="flex-col flex  w-full">
            <a className="text-left text-sm">Province</a>
            <input
              className="text-black mr-1 rounded border border-slate-300 bg-white flex grow"
              value={state.shipping.province}
              onChange={(e) => handleInputChange("province", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row relative w-full gap-x-2">
          <div className="flex-col flex  w-full">
            <a className="text-left text-sm">Country</a>
            <input
              className="text-black rounded border mr-1 border-slate-300 bg-white flex grow"
              value={state.shipping.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </div>
          <div className="flex-col flex  w-full">
            <a className="text-left text-sm">Postal Code</a>
            <input
              className="text-black  rounded border border-slate-300 bg-white mr-1 flex grow "
              value={state.shipping.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            />
          </div>
        </div>
  
      </form>
      <div className="gap-x-2 flex py-2">
          {selectedAddress ? (
            <button
              className="btn btn-sm"
              onClick={() => updateAddress(state.shipping)}
            >
              Update
            </button>
          ) : (
            <button
              className="btn btn-sm"
              onClick={() => saveAddress(state.shipping)}
              >
              Save
            </button>
          )}
          {selectedAddress ? (
            <button className="btn btn-sm" onClick={() => removeAddress()}>
              Remove
            </button>
          ) : (
            <> </>
          )}
        </div>
    </div>
  );
};

export const AccountSettings = () => {
  const { user, setUser } = useAuth();

  const accItems = [
    {
      title: "Manage Addresses",
      content: <ManageAddresses />,
    },
    {
      title: "Change Password",
      content: (
        <div className="flex w-full">
          {" "}
          <PasswordChange />
        </div>
      ),
    },
  ];

  // dropdown menus for account settings, changing passwords, removing addresses,
  // editing addresses
  return (
    <div className="h-full w-full flex justify-center">
      <div className="h-full w-[80%] flex flex-col justify-center bg-slate-100 rounded-md">
        <h1 className="text-start px-4 pt-6 font-bold"> Account Settings </h1>
        <Accordion items={accItems} />
      </div>
    </div>
  );
};

export default AccountSettings;
