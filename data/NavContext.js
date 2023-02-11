import { createContext, useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

const NavContext = createContext();

export function NavFunction({ children }) {
  const BASEURL = "http://192.168.0.12/";
  // const BASEURL = "http://localhost/";
  const [page, setPage] = useState("Raktáron");
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Összes");
  const [update, setUpdate] = useState(false);
  const [items, setItems] = useState("");
  const [vegosszeg, setVegosszeg] = useState("-");

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

  const changeVegosszeg = () => {
    fetch(`${BASEURL}cart.php`, {
      method: "post",
      body: JSON.stringify({
        do: "updatevegosszeg",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        
        setVegosszeg(numberSeparator(json.vegosszeg));
      });
  };

  const numberSeparator = (num) => {
    let array = Array.from(num);
    array.reverse();

    let location = 3;
    let separated = 0;

    for (let i = 1; i < array.length; i++){
      if (i === location){
        array.splice(i, 0, " ");
        separated += 1;
        location += 3 + separated;
      }
    }

    array.reverse();
    
    console.log(array);
    return array.join("");
  }

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
        updateItems,
        changeVegosszeg,
        vegosszeg,
        numberSeparator
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export default NavContext;
