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
  const WIDTH = Dimensions.get("window").width;

  useEffect(() => {
    // fetch(`${BASEURL}stats.php`, {
    //   method: "post",
    //   body: JSON.stringify({
    //     get: "playedYears",
    //     gameID: "Bali62cae449dafba6.41342841",
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(json);

    //     // setRes(json.data);
    //   });

    let a = [
      {
        id: 1,
        nev: "szilvás",
        kiszereles: 0.5,
      },
      {
        id: 2,
        nev: "szilvás",
        kiszereles: 0.5,
      },
      {
        id: 3,
        nev: "szilvás",
        kiszereles: 0.5,
      },
    ];

    setRes(a);
  }, [search]);

  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        zIndex: 1,
        padding: 5
      }}
    >
      <View
        style={{
          flexDirection: "row",
          zIndex: 1
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
