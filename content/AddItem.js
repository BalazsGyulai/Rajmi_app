import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Platform,
  Dimensions
} from "react-native";
import NavContext from "../data/NavContext";

const AddItem = () => {
    const {search} = useContext(NavContext);
    const WIDTH = Dimensions.get("window").width;

  return (
    <View style={[styles.card, {
        width: (WIDTH >= 800 ? (WIDTH / 5) - 10 : (WIDTH / 2) - 10),
        height: (WIDTH >= 800 ? (WIDTH / 5) - 10 : (WIDTH / 2) - 10)
      }]}>
          <Text style={[styles.text, styles.bold]}>{search}</Text>
          <Text style={[styles.text, styles.italic]}>0.5 l</Text>
            <View style={{
                width: "80%",
                height: 1,
                backgroundColor: "#d3d3d3"
            }}></View>
          <Text style={styles.text}>10 db</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    card: {
      borderColor: "#D3D3D3",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 8,
      alignItems: "center"
    },
  
    text: {
      padding: 5,
      fontSize: 13
    },
  
    italic: {
      color: "#c4c4c4",
      fontSize: 12,
    },
  
    bold:{
      fontWeight: "bold",
      fontSize: 15
    }
  });

export default AddItem