import { createContext, useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

const NavContext = createContext();

export function NavFunction({ children }) {
  const BASEURL = "http://192.168.0.26/";
  const [page, setPage] = useState("Raktáron");
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Összes");
  const [update, setUpdate] = useState(false);
  const [items, setItems] = useState("");

  const updateItems = () => {
    fetch(`${BASEURL}palinkak.php`, {
      method: "post",
      body: JSON.stringify({
        search,
        filter,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setItems(json.data);
      });
  };

  const changeFilter = (val) => {
    setFilter(val);
  };

  const changeShowMenu = (val) => {
    setShowMenu(val);
  };

  const changePage = (val) => {
    setPage(val);
  };

  const changeUpdate = (val) => {
    setUpdate(val);
  };

  return (
    <NavContext.Provider
      value={{
        changeShowMenu,
        showMenu,
        page,
        changePage,
        BASEURL,
        setSearch,
        search,
        filter,
        changeFilter,
        changeUpdate,
        update,
        items,
        updateItems
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export default NavContext;
