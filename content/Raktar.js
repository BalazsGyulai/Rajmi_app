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
  const { page, BASEURL, search, filter, update } = useContext(NavContext);
  const [res, setRes] = useState("");
  const WIDTH = Dimensions.get("window").width;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getItems();
  }, []);

  useEffect(() => {
    getItems();
    // let a = [
    //   {
    //     id: 1,
    //     nev: "szilvás",
    //     kiszereles: 0.5,
    //   },
    //   {
    //     id: 2,
    //     nev: "szilvás",
    //     kiszereles: 0.5,
    //   },
    //   {
    //     id: 3,
    //     nev: "szilvás",
    //     kiszereles: 0.5,
    //   },
    // ];
    // setRes(a);
  }, [search, filter, update]);

  const getItems = () => {
    fetch(`${BASEURL}palinkak.php`, {
      method: "post",
      body: JSON.stringify({
        search,
        filter,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setRes(json.data);
        setRefreshing(false);
      });
  };

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
        {res !== "" ? (
          res.length !== 0 ? (
            <Card array={res} />
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
