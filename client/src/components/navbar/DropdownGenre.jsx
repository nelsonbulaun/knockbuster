import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { url } from "../../helpers";
const axiosurl = url+"/products/search/genres/genrelist"

export const DropdownGenre = ({ isOpen, onClose }) => {
  const [genres, setGenres] = useState();

  useEffect(() => {
    axios
      .get(axiosurl)
      .then((res) => {
        const genrelist = res.data;
        setGenres(genrelist);
        console.log(res.data);
      });
  }, []);

  return (
    <div className="relative inline-block">
      <button onClick={() => isOpen && onClose()}>
        <a id="title" className="non-active-class text-xl p-1 ">
          Genres
        </a>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-[500px] rounded-md outline outline-t-none backdrop-blur outline-solid outline-black/10 shadow-xl left-1/2 transform -translate-x-1/2">
          <div className="grid grid-cols-5">
            {genres?.map((genre) => (
              <NavLink role="menuitem" key={genre} to={"genres/" + genre}>
                {genre}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownGenre;
