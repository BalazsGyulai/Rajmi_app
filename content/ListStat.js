import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Svg, {
  Path,
  G,
  Circle,
  Defs,
  Rect,
  ClipPath,
  strokeWidth,
  strokeLinecap,
} from "react-native-svg";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Platform,
  Dimensions,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import NavContext from "../data/NavContext";


const ListStat = ({ev, bevet, index}) => {
    const {numberSeparator} = useContext(NavContext);
    const [bevetel, setBevetel] = useState("");

    useEffect(() =>{
       setBevetel(numberSeparator(bevet));
    }, [])

  return (
    <View key={index} style={{
        flexDirection: "row",
        width: "80%",
        minWidth: 200,
        maxWidth: 300,
        height: "auto",
        minHeight: 50,
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Text style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16
        }}>{ev}</Text>
        <Text style={{
            paddingLeft: 10,
          color: "#fff",
          fontWeight: "normal",
          fontSize: 16
        }}>{bevetel} Ft</Text>
      </View>
  )
}

export default ListStat