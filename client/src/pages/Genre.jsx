import { useEffect, useState, Fragment } from "react";
import { NavLink, useParams, Link } from "react-router-dom";
import axios from "axios";
import CarouselScratch from "../components/Carousel";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { url } from "../helpers";
import { ItemLine } from "../components/ItemLine";
const site = "/products/";


export const Genres = () => {
  const {user} = useAuth();
  const {cart, setCart} = useCart();
  const { genre } = useParams();
  const [itemslist, setItemslist] = useState([]);
  const [carouselList, setCarouselList] = useState([]);
  const userls = localStorage.getItem("user");
  const json_user = JSON.parse(userls);

  useEffect(() => {
    axios
    .get(`${url + "/products/search/genre/" +genre}`)
      .then((res) => {
        const items = res.data;
        setItemslist(items);
        if (items.length > 5) {
          setCarouselList(items.slice(0, 5));
        } else {
          setCarouselList(items);
        }
      });
  }, [genre]);


  return (
    <div className="relative h-full w-full justify-center items-center">
      <div className="absolute p-10 pt-12 text-4xl" id="title">
        {genre}
      </div>
      <div>
        <CarouselScratch itemslist={carouselList} />
      </div>
      <div className="container mx-auto relative w-full">
        <div
          id="itemlist"
          className="flex w-full h-full flex-col mx-5 gap-y-0.5 items-center justify-center "
        >
          {itemslist?.map((item, index) => (
                  <ItemLine
                  key={index}
                  item={item}
          
                />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Genres;
