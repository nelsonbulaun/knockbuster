import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useAuth } from "./AuthContext";
import { url } from "../helpers";
const site = `${url + "/watchlist/users/"}`;


const WatchListsContext = createContext({
  watchLists: [],
  setWatchLists: () => {},
});

export const useWatchLists = () => useContext(WatchListsContext);

const WatchListsProvider = ({ children }) => {
  const [watchLists, setWatchLists] = useState();
  const { user } = useAuth();
  const storeduser = localStorage.getItem("user");
  const json_user = JSON.parse(storeduser);
  

  useEffect(() => {
    if (storeduser) {
       const newWatchLists = async () => {
         if (user && user.username) {
           Axios({
             method: "GET",
             withCredentials: true,
             url: site + user.username,
           }).then((res) => {
             setWatchLists(res.data);
             console.log(res.data);
           });
         }
       };
       newWatchLists();
    }
   }, [user]);
  

   const updateListInWatchLists = (listname, updatedData) => {
    const updatedWatchLists = [...watchLists];

    const listIndex = updatedWatchLists.findIndex((watchList) => watchList.listname === watchList.listname);

    if (listIndex !== -1) {
      updatedWatchLists[listIndex] = { ...updatedWatchLists[listIndex], ...updatedData };

      setWatchLists(updatedWatchLists);
    }
  };


  return (
    <WatchListsContext.Provider value={{ watchLists, setWatchLists, updateListInWatchLists }}>
      {children}
    </WatchListsContext.Provider>
  );
};

export default WatchListsProvider;
