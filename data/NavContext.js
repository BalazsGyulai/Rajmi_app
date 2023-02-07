import { createContext, useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

const NavContext = createContext();

export function NavFunction({ children }) {
    const BASEURL = "http://www.gyulaibalazs.hu/RAJMI_APP/";
    const [page, setPage] = useState("Raktáron");
    const [showMenu, setShowMenu] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Összes");

    const changeFilter = (val) => {
      setFilter(val);
    }

    const changeShowMenu = (val) => {
        setShowMenu(val);
    }

    const changePage = (val) => {
      setPage(val);
    }

  return <NavContext.Provider
value={{
    changeShowMenu,
    showMenu,
    page,
    changePage,
    BASEURL,
    setSearch,
    search,
    filter,
    changeFilter
}}
  >{children}</NavContext.Provider>;
}

export default NavContext;
