import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import "../index.css";
import { ReactComponent as Gridicon } from "../assets/grid.svg";
import { ReactComponent as Linesicon } from "../assets/list.svg";
import { useAuth } from "../contexts/AuthContext";
import { ReactComponent as Searchicon } from "../assets/search.svg";
import { FilterMenu } from "../components/FilterMenu";
import { useCart } from "../contexts/CartContext";
import { useTotal } from "../contexts/TotalContext";
import { url } from "../helpers";
import { ItemCard } from "../components/ItemCard";
import { ItemLine } from "../components/ItemLine";

const ProductList = () => {
  const { user } = useAuth();
  const { cart, setCart } = useCart();
  const { quantity, setQuantity } = useTotal();
  const [itemslist, setItemslist] = useState([]);
  const [grid, setGrid] = useState(false);
  const [search, setSearch] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [genre, setGenre] = useState();
  const [genreSearch, setGenreSearch] = useState(false);
  const [originalList, setOriginalList] = useState();
  const storeduser = localStorage.getItem("user");
  const json_user = JSON.parse(storeduser);
  const [hoveredObject, setHoveredObject] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredObject(index);
  };

  const handleMouseLeave = () => {
    setHoveredObject(null);
  };

  function handleSearchChange(e) {
    setSearchStarted(true);
    setSearch(e.target.value);
    if (search) {
      axios.get(`${url + "/products/search/" + search}`).then((res) => {
        const items = res.data;
        setItemslist(items);
      });
    } else {
      axios.get(`${url + "/products"}`).then((res) => {
        const items = res.data;
        setItemslist(items);
      });
    }
  }

  function viewSwap() {
    switch (grid) {
      case true:
        setGrid(false);
        break;
      case false:
        setGrid(true);
        break;
    }
  }

  useEffect(() => {
    if (searchStarted == false) {
      axios.get(`${url + "/products"}`).then((res) => {
        const items = res.data;
        setItemslist(items);
        setOriginalList(items);
        setLoading(false);
      });
    }
  }, []);

  const render = () => {
    if (isLoading)
      return (
        <div className="h-full w-full">
          <div className="divider pt-0 mt-0" />
          <span className="loading loading-spinner loading-md"></span>
        </div>
      );

    return (
      <div className="h-full w-full">
        {" "}
        <div className="container mx-auto relative w-full">
          <div className="divider pt-0 mt-0" />
          {/* top bar */}
          <div className="align grid grid-cols-2 content-center">
            <div className="place-self-start">
              <FilterMenu
                genre={genre}
                setGenre={setGenre}
                setItemslist={setItemslist}
                originalList={originalList}
              />
            </div>
            <div className="place-self-end items-center object-cover">
              <div className="flex content-end gap-x-2  ">
                <button type="button" onClick={() => setIsOpen(!isOpen)}>
                  <Searchicon />
                </button>
                {isOpen && (
                  <form>
                    <input
                      className="text-black break-after-auto w-50 rounded outline-grey-900 h-5"
                      placeholder="Search"
                      onChange={handleSearchChange}
                    />
                  </form>
                )}

                <button onClick={viewSwap}>
                  {" "}
                  {grid ? <Linesicon /> : <Gridicon />}
                </button>
              </div>
            </div>
          </div>
          <div className="py-3"> </div>
          {grid ? (
            // GRID VIEW
            <div
              id="itemlist"
              className="grid grid-cols-6 justify-center gap-y-1 gap-x-1"
            >
              {itemslist?.map((item, index) => (
                <ItemCard
                  key={index}
                  item={item}
                  isHovered={hoveredObject === index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          ) : (
            // LINE VIEW
            <div
              id="itemlist"
              className="w-full h-full flex flex-col gap-y-0.5 justify-center "
            >
              {itemslist?.map((item, index) => (
                             <ItemLine
                             key={index}
                             item={item}
                           />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  return render();
};

export default ProductList;
