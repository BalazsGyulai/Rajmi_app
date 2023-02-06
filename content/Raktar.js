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
import Card from "../UI/Card";
import AddItem from "./AddItem";

const Raktar = () => {
  const { page, BASEURL, search } = useContext(NavContext);
  const [res, setRes] = useState("");

  useEffect(() => {
    fetch(`${BASEURL}palinkak.php`, {
      method: "post",
      body: JSON.stringify({
        search: search,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);

        setRes(json.data);
      });
  }, [search]);

  return (
    <ScrollView
      style={{
        zIndex: 1,
        padding: 10
      }}
    >
      {res !== "" ? 

        res.length !== 0 ?
        <Card array={res} />
        : <AddItem />
       : ""}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Raktar;
