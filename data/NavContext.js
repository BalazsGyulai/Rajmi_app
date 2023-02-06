import { createContext, useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

const NavContext = createContext();

export function NavFunction({ children }) {
    const BASEURL = "http://192.168.0.26/";
    const [page, setPage] = useState("Raktáron");
    const [showMenu, setShowMenu] = useState(false);
    const [search, setSearch] = useState("");

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
    search
}}
  >{children}</NavContext.Provider>;
}

export default NavContext;
