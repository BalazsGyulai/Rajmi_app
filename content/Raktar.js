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
import Card from "../UI/Card";
import AddItem from "./AddItem";

const Raktar = () => {
  const { page, BASEURL, search, filter, update, items, updateItems } = useContext(NavContext);
  const [res, setRes] = useState("");
  const WIDTH = Dimensions.get("window").width;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updateItems();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    updateItems();
  }, [search, filter, update]);

  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        zIndex: 1,
        padding: 5,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          zIndex: 1,
        }}
      >
        {items !== "" ? (
          items.length !== 0 ? (
            <Card array={items} />
          ) : (
            <AddItem />
          )
        ) : (
          ""
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Raktar;
