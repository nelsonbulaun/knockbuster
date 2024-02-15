import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../helpers";

// import Product from "../../server/models/Product";

export function FilterMenu({ setItemslist, originalList }) {
  // for each map out a new value, creates a checkbox
  const [genres, setGenres] = useState([]);
  const [searching, setSearching] = useState(false);
  const [genre, setGenre] = useState();

  function handleClick(val) {
    if (searching===true) {
      setSearching(false);
      setItemslist(originalList);
    }
    else {
    setGenre(val.genre);
    setSearching(true);
  };}

  useEffect(()=> {
    axios
    .get(`${url + "/products/search/genres/genrelist"}`)
    .then((res) => {
      const genrelist = res.data;
      setGenres(genrelist);
    });
    if (searching === true) { 
    axios
    .get(`${url + "/products/search/genre/" +genre}`)
    .then((res) => {
      const items = res.data;
      setItemslist(items);
      // console.log("http://localhost:8080/products/search/genre/"+genre)
    });
  }},[genre]);

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn glass btn-xs">
        Filters
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <div className="join join-vertical">
        {genres?.map((genre, index) => (
          <button key={index} className="btn btn-xs" onClick={() => handleClick({genre})}>
            {genre}
          </button>
        ))}</div>
      </ul>
    </div>
  );
}
