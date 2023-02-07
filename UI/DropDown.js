import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import Svg, { Path, G } from "react-native-svg";
import NavContext from "../data/NavContext";

const DropDown = ({title, press}) => {
    const {changeFilter} = useContext(NavContext);

    const PressesFilterHandler = () => {
        press(title);
      };

  return (
    <Pressable style={[styles.dropDown]} onPressIn={PressesFilterHandler}>
      <Text style={styles.dropDownText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    dropDown: {
      alignItems: "center",
      justifyContent: "center",
      height: 30,
    },
  
    dropDownText: {
      color: "#fff"
    }
  });

export default DropDown;
