import React, { useContext, useEffect, useState } from "react";
import {
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
import Raktar from "./Raktar";
import Eladas from "./Eladas"

const ActualPage = () => {
  const { page } = useContext(NavContext);

  return (
    <View
      style={{
        top: 48,
        width: "100%",
        height: "100%",
      }}
    >
      {page === "Raktáron" ? <Raktar /> : page === "Eladás" ? <Eladas /> : ""}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ActualPage;
