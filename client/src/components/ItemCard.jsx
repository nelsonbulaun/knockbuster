import { Link } from "react-router-dom";
import { productIcon } from "../helpers";

export const ItemCard = ({ item, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="relative rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] h-[1/3]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHovered ? (
        <HoveredObject item={item} />
      ) : (
        <NonHoveredObject item={item} />
      )}
    </div>
  );
};

const HoveredObject = ({ item }) => {
  return (
    <div className="absolute hover:scale-y-110 hover:scale-x-110 hover:z-[100] block  rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-black">
      <div className="relative overflow-hidden bg-cover bg-no-repeat">
        <div className="absolute flex h-full w-full bg-black/75 place-content-center align-middle">
          <div className="flex-col place-items-center self-center p-6">
            <Link to={"/products/" + item.id}>
              <h5 className="mb-2 font-itcmachine text-3xl tracking-[0.07em] text-black-900 dark:text-white">
                {item.title}
              </h5>
            </Link>
            <div className="flex justify-center">
              {item.productType && item.productType.length > 0 ? (
                item.productType.map((object, index) => (
                  <div key={index} className="mx-2 mb-4 flex items-center">
                    {" "}
                    {productIcon(object.type)}{" "}
                    <div className="flex items-center mx-2">
                      <p className="text-base text-neutral-200">
                        ${object.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="secondaryTitle mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  ${item.price}
                </p>
              )}
            </div>
            <p className="text-sm font-base text-neutral-600 dark:text-neutral-200  mb-4 ">
              {item.description}
            </p>

            <div className="place-content-end">
              <button
                className="btn btn-xs bg-grey-500 hover:bg-grey-700 self-end text-white font-bold border border-grey-700 rounded"
                onClick={() => handleAddtoCart(item.id)}
              >
                {" "}
                Add To Cart{" "}
              </button>
            </div>
          </div>
        </div>
        <img className="aspect-[2/3] rounded-t-lg" src={item.image} />
      </div>
    </div>
  );
};

const NonHoveredObject = ({ item }) => {
  return (
    <div className="relative">
      <img
        className="relative aspect-[2/3] overflow-hidden h-full object-fill bg-no-repeat rounded-t-lg"
        src={item.image}
      />
    </div>
  );
};
