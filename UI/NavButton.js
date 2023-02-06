import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Platform,
} from "react-native";
import NavContext from "../data/NavContext";

const Nav = ({ icon, left }) => {
  const { showMenu, changeShowMenu } = useContext(NavContext);

  const MenuClick = () => {
    changeShowMenu(!showMenu);
  };
  return (
    <Pressable onPressIn={MenuClick} style={[styles.menubtn, {left: left}]}>
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menubtn: {
    width: 48,
    marginRight: 5,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Nav;
