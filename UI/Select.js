import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import Svg, { Path, G } from "react-native-svg";
import NavContext from "../data/NavContext";

const Select = () => {
    const [bgr_btn, setbgr_btn] = useState("#023047");

  return (
    <Pressable
      style={{
        position: "absolute",
        top: 5,
        right: 5,
        width: 100,
        height: 38,
        backgroundColor: bgr_btn,
        borderRadius: 24,
      }}

      onPressIn={() => {setbgr_btn("#F37335")}}
      onPressOut={() => {setbgr_btn("#023047")}}
    >
      <View style={{
        flexDirection: "row",
        height: "100%",
        width: "100%",
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: "center",
      }}>
        <Svg
          width="40%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M55 10H47C45.8954 10 45 10.8954 45 12V14C45 15.1046 45.8954 16 47 16H55C56.1046 16 57 15.1046 57 14V12C57 10.8954 56.1046 10 55 10Z"
            stroke="#fff"
            stroke-width="3"
          />
          <Path
            d="M47 16C47 16 47 29 47 34.5C47 40 41.5 40 41.5 45C41.5 50 41.5 59 41.5 59M55.5 16C55.5 16 55.5 29 55.5 34.5C55.5 40 61 40.5 61 45C61 49.5 61 59 61 59M41.5 59H61M41.5 59V72M61 59V72M61 72V87.5C61 89.1569 59.6569 90.5 58 90.5H44.5C42.8431 90.5 41.5 89.1569 41.5 87.5V72M61 72H41.5"
            stroke="#fff"
            stroke-width="3"
          />
        </Svg>
        <Text
        style={{
            color: "#fff",
        }}
        >0.5 l</Text>
      </View>
    </Pressable>
  );
};

export default Select;
