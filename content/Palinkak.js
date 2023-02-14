import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Svg, { Path, G, Circle, Defs, Rect, ClipPath } from "react-native-svg";
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

const Palinkak = ({ palinkak }) => {
  return palinkak.map((palinka, index) => {
    return palinka.nev !== "" ? (
      <View
        key={index}
        style={{
          padding: 5,
          marginTop: 5,
          width: Dimensions.get("window").width >= 1000 ?
            Dimensions.get("window").width / 2 - 15 : 
            Dimensions.get("window").width - 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            padding: 5,
          }}
        >
          {palinka.nev}
        </Text>
        <BarChart
          data={{
            labels: palinka.kiszereles,
            datasets: [
              {
                data: palinka.eladva,
              },
            ],
          }}
          width={
            Dimensions.get("window").width >= 1000 ?
            Dimensions.get("window").width / 2 - 20 : 
            Dimensions.get("window").width - 20 }
          height={Dimensions.get("window").height / 2.5 - 10}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#fff",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(${palinka.color[0]} ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 1,
            useShadowColorFromDataset: false, // optional
          }}
          verticalLabelRotation={45}
          showValuesOnTopOfBars={true}
        />
      </View>
    ) : (
      ""
    );
  });
};

export default Palinkak;
