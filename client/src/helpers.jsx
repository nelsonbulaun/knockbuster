import { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as DVDIcon } from "./assets/dvd.svg";
import { ReactComponent as BluRayIcon } from "./assets/bluray.svg";
// export const url = "http://localhost:8080";
export const url = "https://knockbuster-server.onrender.com";


export function ConvertKeytoCart(props) {
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

  
    useEffect(() => {
      axios.get(`${url + "/products/" + props.pid}`).then((res) => {
        const item = res.data;
        setItem(item);
        setIsLoading(false);
      });
    }, [props.pid]);

    const handleImageLoad = () => {
      setIsImageLoaded(true);
    };

    const render = () => {
      if (isLoading)
        return <span className="loading loading-spinner loading-md"></span>;
  
      return (
        <div
          className={
            props.border === true
              ? "md:flex items-center border-t py-8 border-gray-200"
              : "md:flex items-center border-gray-200"
          }
        >
          <div className="w-1/4">
            <img
              className="w-full h-full object-center object-cover"
              src={item.image}
              onLoad={handleImageLoad}

            ></img>
          </div>
          <div className="md:w-3/4 w-full">
            <p className="text-base font-black leading-none text-gray-800">
              {item.title}
            </p>
            <p className="text-xs leading-3 text-gray-600 pt-2">
              {item.description}
            </p>
            <p className="text-xs leading-3 text-gray-600 pt-2">
              {props.ptype.type}&nbsp; • &nbsp;${props.ptype.price}
            </p>
          </div>
        </div>
      );
    };
    return render();
  }

  export function productIcon(val) {
    switch (val) {
      case "DVD":
        return <DVDIcon />;
        break;
      case "Blu-Ray":
        return <BluRayIcon />;
        break;
    }
  }