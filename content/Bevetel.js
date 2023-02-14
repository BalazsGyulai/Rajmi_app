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
import Palinkak from "./Palinkak";
import NavContext from "../data/NavContext";
import ListStat from "./ListStat";

const Bevetel = () => {
  const { BASEURL, changeErrorm, numberSeparator } = useContext(NavContext);
  const [yearStat, setYearStat] = useState("");
  const [palinkak, setPalinkak] = useState("");
  const [yearStatdb, setYearStatdb] = useState(5);
  const [palinkakYear, setPalinkakYear] = useState(new Date().getFullYear());
  const [visibleChart, setVisibleChart] = useState(true);

  useEffect(() => {
    getYearsStat();
  }, [yearStatdb]);

  useEffect(() => {
    getPalinakdb();
  }, [palinkakYear]);

  const getYearsStat = () => {
    fetch(`${BASEURL}stats.php`, {
      method: "post",
      body: JSON.stringify({
        do: "getYearStat",
        years: yearStatdb,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "error") {
          changeError({
            status: json.status,
            code: json.code,
            text: "Valami hiba lépett fel a szerverrel. Próbáld meg frissíteni az oldalt vagy próbálkozz később!",
          });
        } else {
          setYearStat(json);
        }
      });
  };

  const getPalinakdb = () => {
    fetch(`${BASEURL}stats.php`, {
      method: "post",
      body: JSON.stringify({
        do: "getPalinkakdb",
        year: palinkakYear,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "error") {
          changeError({
            status: json.status,
            code: json.code,
            text: "Valami hiba lépett fel a szerverrel. Próbáld meg frissíteni az oldalt vagy próbálkozz később!",
          });
        } else {
          setPalinkak(json);
        }
      });
  };

  const hexToRgb = (hex) => {
    var result = hex;
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  return (
    <ScrollView
      style={{
        padding: 5,
        marginBottom: 50,
        height: Dimensions.get("window").height,
      }}
    >
      {yearStat != "" ? (
        <View
          style={{
            padding: 5,
            backgroundColor: "#F37335",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                padding: 5,
                width: 300,
                height: "auto",
                minHeight: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderColor: "#fff",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 8,
              }}
            >
              <Pressable onPressIn={() => setYearStatdb(yearStatdb - 1)}>
                <Svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                  <G clip-path="url(#clip0_57_8)">
                    <Path
                      d="M67.7764 7.99999L26 49.7764L67.7764 91.5528"
                      stroke="#fff"
                      strokeWidth="4"
                    />
                  </G>
                  <Defs>
                    <ClipPath id="clip0_57_8">
                      <Rect width="100" height="100" fill="white" />
                    </ClipPath>
                  </Defs>
                </Svg>
              </Pressable>
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff",
                }}
              >
                {yearStatdb} éves statisztika
              </Text>
              <Pressable onPressIn={() => setYearStatdb(yearStatdb + 1)}>
                <Svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                  <G clip-path="url(#clip0_59_18)">
                    <Path
                      d="M38.2585 91.2349L76.2349 45.9764L30.9764 8"
                      stroke="#fff"
                      strokeWidth="4"
                    />
                  </G>
                  <Defs>
                    <ClipPath id="clip0_59_18">
                      <Rect width="100" height="100" fill="white" />
                    </ClipPath>
                  </Defs>
                </Svg>
              </Pressable>
            </View>
            <View
              style={{
                marginLeft: 5,
                padding: 5,
                width: 65,
                height: "auto",
                minHeight: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#fff",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 8,
              }}
            >
              <Pressable
                onPressIn={() =>
                  setVisibleChart((visibleChart) => !visibleChart)
                }
              >
                {visibleChart ? (
                  <Svg width="50" height="50" viewBox="0 0 100 100" fill="none">
                    <Path
                      d="M16 81.5H84M24 71.5V16.5M37.5 71.5V48M51 71.5V35M62 55.5V71.5M76 71.5V25.5"
                      stroke="#fff"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </Svg>
                ) : (
                  <Svg
                    width="50"
                    height="50"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Circle cx="18" cy="24" r="5" fill="#fff" />
                    <Circle cx="18" cy="50" r="5" fill="#fff" />
                    <Circle cx="18" cy="76" r="5" fill="#fff" />
                    <Path
                      d="M31 24H89.5M31 50H89.5M31 76H89.5"
                      stroke="#fff"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </Svg>
                )}
              </Pressable>
            </View>
          </View>

          {visibleChart ? (
            <LineChart
              data={{
                labels: yearStat["ev"],
                datasets: [
                  {
                    data: yearStat["fizetve"],
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
                    strokeWidth: 2, // optional
                  },
                ],
              }}
              width={Dimensions.get("window").width - 20}
              height={Dimensions.get("window").height / 2.5 - 10}
              verticalLabelRotation={45}
              chartConfig={{
                backgroundGradientFrom: "#F3733500",
                backgroundGradientFromOpacity: 1,
                backgroundGradientTo: "#F3733500",
                backgroundGradientToOpacity: 1,
                color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 1,
                useShadowColorFromDataset: false, // optional
              }}
              bezier
            />
          ) : (
            yearStat["ev"].map((ev, index) => {
              return (
                <ListStat ev={ev} bevet={yearStat["fizetve"][index]} index={index} />
              );
            })
          )}
        </View>
      ) : (
        ""
      )}

      {palinkak !== "" ? (
        <>
          <View
            style={{
              marginTop: 10,
              width: 150,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderColor: "#D3D3D3",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 8,
            }}
          >
            <Pressable onPressIn={() => setPalinkakYear(palinkakYear - 1)}>
              <Svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                <G clip-path="url(#clip0_57_8)">
                  <Path
                    d="M67.7764 7.99999L26 49.7764L67.7764 91.5528"
                    stroke="#023047"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0_57_8">
                    <Rect width="100" height="100" fill="white" />
                  </ClipPath>
                </Defs>
              </Svg>
            </Pressable>
            <Text
              style={{
                fontSize: 18,
                color: "#023047",
              }}
            >
              {palinkakYear}
            </Text>
            <Pressable onPressIn={() => setPalinkakYear(palinkakYear + 1)}>
              <Svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                <G clip-path="url(#clip0_59_18)">
                  <Path
                    d="M38.2585 91.2349L76.2349 45.9764L30.9764 8"
                    stroke="#023047"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0_59_18">
                    <Rect width="100" height="100" fill="white" />
                  </ClipPath>
                </Defs>
              </Svg>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection:
                Dimensions.get("window").width >= 1000 ? "row" : "column",
              flexWrap: "wrap",
              backgroundColor: "#fff",
            }}
          >
            <Palinkak palinkak={palinkak} />
          </View>
        </>
      ) : (
        ""
      )}
    </ScrollView>
  );
};

export default Bevetel;
