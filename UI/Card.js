import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import NavContext from "../data/NavContext";
import ItemInCard from "./ItemInCard"

const Card = ({ array }) => {
  const { showMenu, changeShowMenu } = useContext(NavContext);

  return array.map((item) => {
    return (
      <View>
        <ItemInCard key={item.id} item={item}/>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  card: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    alignItems: "center",
    margin: 5,
  },

  text: {
    padding: 5,
    fontSize: 13,
  },

  italic: {
    color: "#c4c4c4",
    fontSize: 12,
  },

  bold: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Card;
