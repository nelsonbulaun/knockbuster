import filmreel from "../assets/filmreel.mp4";
import "../index.css";
import { NewReleases } from "../components/NewReleases";
import { useState, useEffect } from "react";
import { RelatedMoviesByGenre } from "../components/RelatedMoviesByGenre";
import axios from "axios";
import CarouselScratch from "../components/Carousel";
import { url } from "../helpers";

const Home = () => {
  const [genres, setGenres] = useState();
  const [itemslist, setItemslist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genreResponse, itemsResponse] = await Promise.all([
          axios.get("http://localhost:8080/products/search/genres/genrelist"),
          axios.get("http://localhost:8080/products"),
        ]);

        setGenres(genreResponse.data);

        let items = itemsResponse.data;
        if (items.length > 5) {
          items = items.slice(0, 6);
        }
        setItemslist(items);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const render = () => {
    if (isLoading)
      return <span className="loading loading-spinner loading-md"></span>;
    return (
      <>
        <div className="w-full h-full ">
          <div className=" w-full flex-col justify-center place-content-center absolute ">
            {itemslist.length > 0 ? (
              <div className="h-[50vh] -mt-[10vh] w-full relative top-0">
                <CarouselScratch itemslist={itemslist} />
              </div>
            ) : null}

            <div className="mt-20 m-5 z-100 relative">
              <NewReleases />

              {genres?.map((genre, index) => (
                <RelatedMoviesByGenre
                  key={index}
                  genre={genre}
                  movieid={null}
                  excludeShortLists={true}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };
  return render();
};
export default Home;