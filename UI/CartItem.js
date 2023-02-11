import React, { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  Pressable,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import NavContext from "../data/NavContext";
import ItemInCart from "./ItemInCart";

const CartItem = ({ array }) => {
  return array.map((item) => {
    return (
      <View style={{
        alignItems: "center",
        marginBottom: 7,
      }}>
        <ItemInCart key={item.id} item={item} />
      </View>
    );
  });
};

export default CartItem;
