import { createContext, useContext, useEffect, useState } from "react";

const AlertContext = createContext({
  notificationType: null,
  setNotificationType: () => {},
  notificationText: null,
  setNotificationText: () => {},
});

export const useAlert = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {
  const [notificationType, setNotificationType] = useState(null);
  const [notificationText, setNotificationText] = useState("");

  useEffect(() => {
    console.log(notificationText);
  }, [notificationText]);

  return (
    <AlertContext.Provider
      value={{  notificationType, setNotificationType, notificationText, setNotificationText }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
