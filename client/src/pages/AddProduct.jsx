import { useState, useReducer } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import movieCollage from "../assets/moviecollage.jpg";
import { SplitScreen } from "../components/SplitScreen";
import { url } from "../helpers";

const initialState = {
  title: "",
  description: "",
  year: "",
  genre: "",
  certificate: "",
  director: "",
  writers: "",
  actors: "",
  price: "",
  image: "",
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

export const AddProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  function handleSubmit(e) {
    Axios({
      method: "POST",
      url: `${url + "/product/add"}`,
      data: state,
      withCredentials: true,
    }).then((res) => console.log(res));
    dispatch({ type: "RESET_FORM" });
  }
  const formFields = [
    "title",
    "description",
    "year",
    "genre",
    "certificate",
    "director",
    "writers",
    "actors",
    "price",
    "image"
  ]

  const content = 
  <div>
  <form className="flex flex-col gap-y-1">
  {Object.keys(initialState).map((field) => (
        <input
          key={field}
          className="text-[#1b4796] break-after-auto rounded border border-[#1b4796] flex bg-transparent"
          placeholder={field}
          value={state[field]}
          onChange={handleChange}
          name={field}
        />
      ))}
                  <button className="btn btn-sm bg-[#1b4796]" onClick={handleSubmit}>
                    {" "}
                    Send{" "}
                  </button>
                </form>
              </div>
  return (
    <SplitScreen title={"Requst A Product."} image={movieCollage} content={content} />

   
  );
};

export default AddProduct;
