import { NavLink } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import { url } from "../helpers";

const userls = localStorage.getItem("user");
const json_user = JSON.parse(userls);

export const ItemLine = ({ item }) => {
  const { setCart } = useCart();

  function handleAddtoCart(val, val2) {
    axios({
      method: "POST",
      data: {
        username: json_user.username,
        productId: val,
        productType: val2,
        quantity: 1,
      },
      withCredentials: true,
      url: `${url + "/carts/update"}`,
    }).then((res) => {
      setCart(res.data);
    });
  }
  return (
    <div className="flex place-items-center border border-black bg-black/75 w-full hover:bg-black/80">
      <img
        className="object-cover w-full  h-96 md:h-[284px] md:w-48"
        src={item.image}
      />

      <div className="px-4 w-full h-96 md:h-auto flex-row place-content-center place-items-center">
        <NavLink to={"/products/" + item.id}>
          <h5 className="justify-center font-itcmachine text-3xl text-outline-solid tracking-[0.07em] text-black-900 dark:text-white">
            {item.title}
          </h5>
        </NavLink>
        <div className="flex w-full justify-center">
          <p className="mb-2 mt-0 font-normal text-white dark:text-gray-400">
            {item.year}&nbsp; • &nbsp;
          </p>
          <p className="mb-2">{item.certificate}</p>
        </div>

        <p className="justify-center mb-2 font-normal text-white dark:text-gray-400">
          {item.description}
        </p>

        <p className="mb-2 font-normal text-white dark:text-gray-400">
          ${item.price}
        </p>
        <button
          className="btn glass no-animation"
          onClick={() => handleAddtoCart(item.id, item.productType[0])}
        >
          {" "}
          Add To Cart{" "}
        </button>
      </div>
    </div>
  );
};
