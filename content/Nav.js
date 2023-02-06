import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import NavButton from "../UI/NavButton";
import NavMenu from "../UI/NavMenu";
import Search from "./Search";
import NavContext from "../data/NavContext";
import MenuSvg from "../icon/MenuSVG";

const COLORS = {
  0: {
    color: "#fff",
    style: "dark-content",
  },
  1: {
    color: "#F37335",
    style: "light-content",
  },
};

const Nav = ({ style }) => {
  const { showMenu } = useContext(NavContext);

  useEffect(() => {
    if (showMenu) {
      style(COLORS[1]);
    } else {
      setTimeout(() => {
        style(COLORS[0]);
      }, 350);
    }
  }, [showMenu]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 48,
        }}
      >
        <NavButton icon={MenuSvg} left={5} />
        <Search />
      </View>
      <NavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  menubtn: {
    left: 5,
    width: 40,
    height: 40,
  },
});

export default Nav;
