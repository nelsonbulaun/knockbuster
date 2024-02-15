import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


export const TrailerModal = ({src}) => {

  return (
    <div className="mx-full justify-center flex flex-col items-center">
      <div
        className="container rounded-lg shadow-sm flex flex-col justify-center items-center fit-content"
      >
        <iframe
      width="1080"
      height="720"
      src={src}
      title="Youtube Player"
      frameBorder="0"
      allowFullScreen
    />
      </div>
    </div>
  );
};

export default TrailerModal;