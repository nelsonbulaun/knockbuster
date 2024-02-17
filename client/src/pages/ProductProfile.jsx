import "../App.css";
import { useParams } from "react-router-dom";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { RelatedMoviesByGenre } from "../components/RelatedMoviesByGenre";
import { useCart } from "../contexts/CartContext";
import { useTotal } from "../contexts/TotalContext";
import { useWatchLists } from "../contexts/WatchListContext";
import TrailerModal from "../components/trailerModal";
import Modal from "../components/Modal";
import { ReactComponent as PlayIcon } from "../assets/play.svg";
import { url } from "../helpers";
const apisite = url + "/products/";


// create function that imports object name, price, description
const ProductProfile = () => {
  const user = localStorage.getItem("user");
  const json_user = JSON.parse(user);
  const { id } = useParams();
  const { cart, setCart } = useCart();
  // const { quantity, setQuantity } = useTotal();
  const { watchLists, setWatchLists, updateListInWatchLists } = useWatchLists();
  const [item, setItem] = useState([]);
  const [selectedWatchList, setSelectedWatchList] =
    useState("Your Watch Lists");
  const [backgroundImage, setBackgroundImage] = useState();
  const [genreList, setGenreList] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [trailerModalState, setTrailerModalState] = useState(false);

  const options = watchLists?.map((item, index) => (
    <button
      className="dropdownItem"
      key={index}
      value={item.listname}
      onClick={(e) => {
        handleAddtoWatchList(e, id, selectedVersion);
      }}
    >
      {item.listname}
    </button>
  ));

  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching a new item
    axios.get(apisite + id).then((res) => {
      const item = res.data;
      console.log(res.data);
      console.log(id);
      setItem(item);
      setGenreList(item.genre);
      setIsLoading(false);
      setSelectedVersion(item.productType[0]);
      setSelectedWatchList("Your Watch Lists");
      if (res.data.trailerImage) {
        setBackgroundImage(item.trailerImage);
      }
    });
  }, [id]);

  function selectVersion(e) {
    setSelectedVersion(e);
  }

  function handleSubmit(id, selectedVersion) {
    axios({
      method: "POST",
      data: {
        username: json_user.username,
        productId: id,
        productType: selectedVersion,
        quantity: 1,
      },
      withCredentials: true,
      url:`${url + "/carts/update"}`,
    }).then((res) => {
      if (res.status === 200) {
        setCart(res.data);
      }
    });
  }

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    console.log(event.target.value);
    setSelectedWatchList(value);
  };

  async function handleAddtoWatchList(e, val, val2) {
    try {
      const response = await axios({
        method: "POST",
        data: {
          username: json_user.username,
          listname: e.target.value,
          productId: val,
          productType: val2,
        },
        withCredentials: true,
        url: `${url + "/watchList/addProduct"}`,
      });

      if (response.status === 200) {
        console.log(response.data);
        updateListInWatchLists(e.target.value, response.data);
        alert(`Item Added To ${e.target.value}`);
      }

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        alert(error.response.data.msg);
      }
    }
  }

  return (
    <div className="flex">
      <img
        id="itemProfileBg"
        style={{
          display: "flex",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          position: "fixed",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          zIndex: -1000,
        }}
      />

      <div className="w-full">
        <img
          className="m-6 h-[400px] rounded-md float-left overflow-hidden shadow-xl"
          src={item.image}
        />
        <div className="flex flex-col p-6 text-left">
          <div className="mb-2 text-xl font-medium text-blockbuster-yellow ">
            <div className="justify-between flex pr-[15px]">
              <div>
                <div className="flex flex-row items-center">
                  <h1 className="secondaryTitle text-[30px]">{item.title}</h1>
                  {item.trailer ? <div> <button
                    className="text-left my-2 px-2 font-semibold"
                    onClick={() => setTrailerModalState(true)}
                  >
                    <PlayIcon />
                  </button>
                  <Modal
                    onClose={() => {
                      setTrailerModalState(false);
                    }}
                    show={trailerModalState}
                  >
                    <TrailerModal src={item.trailer} />
                  </Modal></div> : <> </>}
                
                </div>
                <div className="flex-col">
                  {item.productType && item.productType.length > 0 ? (
                    item.productType.map((object, index) => (
                      <button
                        onClick={() => selectVersion(object)}
                        key={index}
                        className={`secondaryTitle mb-4 mr-2 text-base text-neutral-600 dark:text-neutral-200 ${
                          selectedVersion === object ? "selected" : ""
                        }`}
                      >
                        {object.type}: ${object.price}
                      </button>
                    ))
                  ) : (
                    <p className="secondaryTitle mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      ${item.price}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                  <button
                    className="hover:text-blockbuster-blue hover:bg-blockbuster-yellow text-blockbuster-yellow font-bold py-2 px-4 border border-blockbuster-yellow rounded btn-md"
                    onClick={() => handleSubmit(id, selectedVersion)}
                  >
                    {" "}
                    ADD TO CART{" "}
                  </button>
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-warning btn-xs m-1 text-xs no-animation"
                  >
                    Save for later
                  </div>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-sm">
                    {options}
                  </ul>
                </div>
              </div>
            </div>
            {item.category != null ? (
              <>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  Category: {item.category}
                </p>{" "}
              </>
            ) : (
              <></>
            )}

            {/* <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"> */}
            <h2 className="secondaryTitle">Genre</h2>
            {/* </p> */}
            <p className="secondaryTitle tracking-wide mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {item.genre?.map((genre) => genre + " ")}
            </p>
            <h2 className="secondaryTitle">Description</h2>
            <p className="secondaryTitle tracking-wide mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {item.description}
            </p>
            <h2 className="secondaryTitle">Director</h2>
            <p className="secondaryTitle mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {item.director}
            </p>
            <h2 className="secondaryTitle">Actors</h2>
            {item.actors?.map((actor, index) => (
              <p
                className="secondaryTitle text-base text-neutral-600 dark:text-neutral-200"
                key={index}
              >
                {actor}
              </p>
            ))}

          </div>
        </div>
        <div className="mx-5 w-full">
          {genreList.map((genre, index) => (
            <div className="flex flex-row w-full py-2" key={index}>
              {" "}
              <RelatedMoviesByGenre genre={genre} movieid={item.id} />{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductProfile;
