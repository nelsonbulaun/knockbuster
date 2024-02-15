import React, { useState } from "react";
import { useEffect } from "react";

const CarouselScratch = ({ itemslist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % itemslist.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? itemslist.length - 1 : currentImageIndex - 1
    );
  };

  const autoAdvance = () => {
    nextImage();
  };

  useEffect(() => {
    const interval = setInterval(autoAdvance, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  const imageContainerStyle = {
    display: "flex",
    width: `${itemslist.length * 100}%`,
    transition: "transform 0.5s ease-in-out",
    transform: `translateX(-${currentImageIndex * (100 / itemslist.length)}%)`,
  };

  const imageStyle = {
    flex: `0 0 ${100 / itemslist.length}%`,
    maxWidth: "100%",
  };

  return (
    <div className="w-full relative shadow-3xl justify-center">
      <a
        id="title"
        className="opacity-0 hover:opacity-100 hover:text-blockbuster-yellow duration-500 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold m-20"
      >
        {itemslist[currentImageIndex]?.title}
      </a>

      <div className="pointer-events-none gradient-overlay absolute inset-0" />
      <div id="containerStyle">
        <div style={imageContainerStyle}>
          {itemslist.map((item, index) => (
            <img
              key={index}
              className="pointer-events-none object-cover object-[50%,35%] h-[600px] w-full z-10 gradient-overlay"
              src={item.trailerImage ? item.trailerImage : item}
              style={imageStyle}
            />
          ))}
        </div>
      </div>

      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button className="z-[20]" onClick={previousImage}>
          ❮
        </button>
        <button className="z-[20]" onClick={nextImage}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default CarouselScratch;
