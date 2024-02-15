import { Link } from "react-router-dom";
import { useState, useReducer } from "react";
import axios from "axios";
import "../index.css";
import movieCollage from "../assets/moviecollage.jpg";
import { SplitScreen } from "../components/SplitScreen";
import { url } from "../helpers";


const initialState = {
  email: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  address: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const formInputs = [
    "email",
    "username",
    "password",
    "firstName",
    "lastName",
    "address",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "POST",
      data: state,
      withCredentials: true,
      url: `${url + "/register"}`
    }).then((res) => console.log(res));
    dispatch({ type: "RESET_FORM" });
  }

  const content = (
    <div>
      <form
        className="flex flex-col space-y-0.5 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        {formInputs.map((element) => (
          <input
            key={element} 
            className="text-[#1b4796] break-after-auto rounded border border-[#1b4796] flex bg-transparent"
            placeholder={element}
            value={state.element} 
            onChange={handleChange}
          />
        ))}
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
    <SplitScreen title={"Register."} image={movieCollage} content={content} />
  );
};

export default Register;
