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
  const WIDTH = Dimensions.get("window").width;
  const [bkg_color, setbgr_btn] = useState("#fff");

  const EditHandler = () => {
    setbgr_btn("#F37335");
  };

  return array.map((item) => {
    return (
      <View>
        <ItemInCard key={item.id} item={item}/>
        {/* <Pressable
          onLongPress={EditHandler}
          key={item.id}
          style={[
            styles.card,
            {
              width: WIDTH >= 800 ? WIDTH / 5 - 10 : WIDTH / 2 - 10,
              height: WIDTH >= 800 ? WIDTH / 5 - 10 : WIDTH / 2 - 10,
              backgroundColor: bkg_color,
            },
          ]}
        >
          <Text style={[styles.text, styles.bold]}>{item.nev}</Text>
          <Text style={[styles.text, styles.italic]}>{item.kiszereles}</Text>
          <View
            style={{
              width: "80%",
              height: 1,
              backgroundColor: "#d3d3d3",
            }}
          ></View>
          <Text style={styles.text}>10 db</Text>
        </Pressable> */}
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
