import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const site = "/products/";
import { url } from "../helpers";


export const NewReleases = () => {
  const [itemslist, setItemslist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get( `${url + "/products/get/new-releases"}`).then((res) => {
      const items = res.data;
      setItemslist(items);
      setIsLoading(false);
    });
  }, []);

  if (itemslist.length > 7) {
    setItemslist(itemslist.slice(0, 6));
  }
  const render = () => {
    if (isLoading)
      return (
        <span className="loading loading-spinner loading-md justify-self-center self-center" />
      );
    return (
      <div className="text-left">
        <h2 className="secondaryTitle text-blockbuster-yellow text-large pb-1">
          New Releases
        </h2>
        <div className="flex gap-x-2.5">
          {itemslist.map((item, index) => (
            <Link to={site + item.id} key={index}>
              <img
                className="h-60 w-40 shadow-lg hover:scale-y-110 hover:scale-x-110 overflow-x-scroll"
                src={item.image}
                alt={item.title}
                key={item.id}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  };
  return render();
};
