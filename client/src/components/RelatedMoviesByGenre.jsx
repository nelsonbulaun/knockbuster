import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const site = "/products/";
import "../index.css";
import { url } from "../helpers";

export function RelatedMoviesByGenre({ genre, movieid = null, excludeShortLists = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${url + "/products/search/genre/" + genre}`)
      .then((res) => {
        const products = res.data;
        let filteredItems = [];
        if (movieid !== null) {
          filteredItems = products.filter((product) => product.id !== movieid);
        } else {
          filteredItems = products;
        }
        setItems(filteredItems);
        if (filteredItems.length > 12) {
          setItems(filteredItems.slice(0, 11));
        }
        setIsLoading(false);
      });
  }, [movieid]);

  const render = () => {
    if (isLoading)
      return (
        <span className="loading loading-spinner loading-md justify-self-center self-center" />
      );
    else if ((excludeShortLists == false && (items.length > 0)) || ((excludeShortLists == true) && (items.length > 4)))
      return (
        <div className="flex flex-row w-full py-2">
          <div className="flex flex-col text-left ">
            {" "}
            <h2 className="secondaryTitle text-blockbuster-yellow text-large">
              Other {genre} movies
            </h2>
            <div className="grid grid-flow-col items-start gap-x-2.5 h-60 w-full">
              {items.map((item, index) => (
                <Link to={site + item.id} key={index}>
                  <div className="w-40 h-60 flex-shrink-0 overflow-hidden shadow-lg hover:scale-y-110 hover:scale-x-110">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt={item.title}
                      key={item.id}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
  };

  return render();
}
