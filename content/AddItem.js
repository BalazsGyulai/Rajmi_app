import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Svg, { Path, G } from "react-native-svg";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Platform,
  Dimensions,
  TextInput,
} from "react-native";
import NavContext from "../data/NavContext";

const AddItem = () => {
  const { search, filter, BASEURL, changeFilter, changeUpdate, update } = useContext(NavContext);
  const [customFilter, setCustomFilter] = useState("");
  const WIDTH = Dimensions.get("window").width;

  const CreateItem = () => {
    fetch(`${BASEURL}addpalinka.php`, {
      method: "post",
      body: JSON.stringify({
        search,
        filter: filter === "Összes" ? customFilter : filter,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        changeUpdate(!update);
      });

  };

  return (
    <View
      style={[
        styles.card,
        {
          width: WIDTH >= 800 ? WIDTH / 5 - 10 : WIDTH / 2 - 10,
          height: WIDTH >= 800 ? WIDTH / 5 - 10 : WIDTH / 2 - 10,
        },
      ]}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[styles.text, styles.bold]}>{search}</Text>

        <Text style={[styles.text, styles.italic]}>{filter === "Összes" ? "Válassz kiszerelést" : filter}</Text>
      </View>
      <Pressable style={styles.add} onPressIn={CreateItem}>
        <View
          style={{
            width: "80%",
            height: 1,
            backgroundColor: "#fff",
            marginBottom: 3,
          }}
        ></View>
        <Svg
          width="100%"
          height="80%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <G id="close">
            <Path
              id="top"
              d="M87.5 55H12C9.79086 55 8 53.2091 8 51C8 48.7909 9.79086 47 12 47H87.5C89.7091 47 91.5 48.7909 91.5 51C91.5 53.2091 89.7091 55 87.5 55Z"
              fill="#fff"
            />
            <Path
              id="bottom"
              d="M55 11.5V87C55 89.2091 53.2091 91 51 91C48.7909 91 47 89.2091 47 87V11.5C47 9.29086 48.7909 7.5 51 7.5C53.2091 7.5 55 9.29086 55 11.5Z"
              fill="#fff"
            />
          </G>
        </Svg>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: "#D3D3D3",
    bottom: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F37335",
  },

  input: {
    padding: 10,
    width: "90%",
    height: 30,
    fontSize: 12,
    textAlign: "center",
    borderColor: "#023047",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
  },

  text: {
    padding: 5,
    fontSize: 13,
    color: "#fff",
  },

  italic: {
    fontSize: 12,
  },

  bold: {
    fontWeight: "bold",
    fontSize: 15,
  },

  add: {
    width: "100%",
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});

export default AddItem;
