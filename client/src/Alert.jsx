import { useAlert } from "./contexts/AlertContext";
import { useEffect } from "react";

export const Alert = () => {
  const { notificationType, setNotificationType, notificationText, setNotificationText} = useAlert();

  function closeNotification(){
    setNotificationType(null);
    setNotificationText("");
  }

  return (
    <>
      {notificationType !== null ? (
        <div id="alert" className="w-full grid h-fit bg-blue-300 ">
          <a style={{ animation: "moveRight 20s linear infinite" }} className="font-bold text-center align-middle text-blockbuster-yellow"> {notificationText} </a>
          <button className="btn-glass btn-xs justify-self-end z-[100] absolute mx-[20px]" onClick={() => closeNotification()}> X </button>
          </div>

      ) : (
        <></>
      )}
    </>
  );
};

export default Alert;
