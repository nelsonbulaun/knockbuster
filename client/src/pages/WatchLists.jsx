import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useWatchLists } from "../contexts/WatchListContext";
import { Fragment } from "react";
import { Link } from "react-router-dom";
const site = "/products/";
import { ConvertKeytoCart } from "../helpers";
import { url } from "../helpers";

export const WatchListMenu = () => {
  const [listName, setListName] = useState("");
  const [selectedWatchList, setSelectedWatchList] = useState(null);
  const { user } = useAuth();
  const { watchLists, setWatchLists } = useWatchLists();
  const [filteredWatchList, setFilteredWatchList] = useState();
  const [isOpen, setIsOpen] = useState(false);

  function handleListNameChange(e) {
    setListName(e.target.value);
  }

  function addWatchList(e) {
    axios({
      method: "POST",
      url: `${url + "/watchlist/addList"}`,
      data: {
        username: user.username,
        listname: listName,
      },
      withCredentials: true,
    }).then((res) => setWatchLists(res.data));
  }

  function removeFromWatchList(val1, val2) {
    axios({
      method: "POST",
      url: `${url + "/watchlist/removeProduct"}`,
      data: {
        username: user.username,
        listname: selectedWatchList,
        productId: val1,
        productType: val2,
      },
      withCredentials: true,
    }).then((res) => console.log(res.data));
  }

  useEffect(() => {
    if (selectedWatchList === null && watchLists?.length > 0) {
      setSelectedWatchList(watchLists[0].listname);
    }
  }, [watchLists, selectedWatchList]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-row mt-5 h-full w-[80%] justify-center bg-white rounded-l-xl border-t border-black/50">
        <div className="basis-1/5 bg-white h-full flex flex-col rounded-l-xl">
          <div className="flex flex-col ml-4 items-start h-full">
            <div className="flex flex-row justify-between items-center w-full pt-5 h-10 ">
              <h1 className="font-bold text-slate-500">Your Watch Lists</h1>{" "}
              <button
                type="button"
                className="self-middle mr-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                +
              </button>
            </div>
            {watchLists?.map((item, index) => (
              <div
                key={index}
                className={
                  selectedWatchList != null &&
                  item.listname === selectedWatchList
                    ? "bg-slate-200 w-full border-y border-l border-black/50 rounded-l-md"
                    : "bg-white w-full border-r border-black/50"
                }
              >
                <button
                  className="m-2"
                  onClick={() => {
                    setSelectedWatchList(item.listname);
                    console.log(selectedWatchList);
                  }}
                  key={index}
                  value={item.listname}
                >
                  {item.listname}
                </button>
              </div>
            ))}
            <div className="flex flex-row border-r border-black/50 w-full">
              {isOpen && (
                <form>
                  <input
                    className="text-black break-after-auto w-auto rounded outline-grey-900"
                    placeholder="Create Watchlist"
                    value={listName}
                    onChange={handleListNameChange}
                  />
                  <button
                    className="btn btn-xs"
                    onClick={(e) => addWatchList(e)}
                  >
                    {" "}
                    Submit
                  </button>
                </form>
              )}
            </div>
            <div className="flex-grow h-full w-full border-r border-black/50"></div>{" "}
          </div>
        </div>
        <div className="basis-4/5 bg-slate-200 h-full rounded-l-lg">
          <div className="-ml-[1px] border-l rounded-tl-lg border-black/50 pt-5 h-10">
            <h1 className="font-bold "> </h1>
          </div>
          <div className="h-full flex flex-col p-2">
            {selectedWatchList != null ? (
              watchLists
                .find((list) => list.listname === selectedWatchList)
                ?.products?.map((product, index) => (
                  <Fragment key={index}>
                    <div className="flex flex-row h-fit py-2">
                      <Link className="flex" to={site + product.productId}>
                        <ConvertKeytoCart
                          pid={product.productId}
                          ptype={product.productType}
                          border={false}
                        />
                      </Link>
                      <button
                        className="self-start"
                        onClick={() =>
                          removeFromWatchList(
                            product.productId,
                            product.productType
                          )
                        }
                      >
                        {" "}
                        X{" "}
                      </button>
                    </div>
                  </Fragment>
                ))
            ) : (
              <> </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
