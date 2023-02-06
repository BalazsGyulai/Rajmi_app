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

const ActualPage = () => {
  const { page } = useContext(NavContext);

  return (
    <ScrollView
      style={{
        top: 48,
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      {page === "Raktáron" ? <Raktar /> : ""}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ActualPage;
