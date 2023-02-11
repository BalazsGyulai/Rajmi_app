import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Svg, { Path, G, Circle } from "react-native-svg";
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
import NavContext from "../data/NavContext";
import CartItem from "../UI/CartItem";

const Eladas = () => {
  const { BASEURL, vegosszeg } = useContext(NavContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const WIDTH = Dimensions.get("window").width;
  const [cart, setCart] = useState("");
  const [sellbtn_color, setsellbtn_color] = useState("#023047");

  useEffect(() => {
    getCartItems();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCartItems();
    setRefreshing(false);
  }, []);

  const getCartItems = () => {
    fetch(`${BASEURL}cart.php`, {
      method: "post",
      body: JSON.stringify({
        do: "getItems",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setCart(json);
      });
  };

  const sellbtnHandler = () => {
    setsellbtn_color("#023047");

    fetch(`${BASEURL}cart.php`, {
      method: "post",
      body: JSON.stringify({
        do: "sellItems",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
      });    
  }

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
      <View>
        {cart !== "" && cart.length !== 0 ? <CartItem array={cart} /> : ""}
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: WIDTH >= 800 ? WIDTH / 2 : WIDTH * 0.9,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPressIn={() => setsellbtn_color("#F37335")}
            onPressOut={sellbtnHandler}
            style={{
              backgroundColor: sellbtn_color,
              width: 200,
              height: 50,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
              }}
            >
              <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                <Path
                  d="M83 38.5H75.084C74.1559 38.5 73.3498 39.1385 73.1372 40.0419L70.3235 52M70.3235 52L65.8436 71.0399C65.6423 71.8954 64.8789 72.5 64 72.5V72.5M70.3235 52H30.5623C29.1189 52 28.1508 53.4823 28.731 54.804L35.9749 71.304C36.294 72.0307 37.0125 72.5 37.8062 72.5H64M64 72.5V75C64 76.1046 63.1046 77 62 77H32M50 42.5V19.5M50 19.5L57.5 27M50 19.5L42.5 27"
                  stroke="#fff"
                  stroke-width="2"
                />
                <Circle cx="38" cy="82" r="3" stroke="#fff" stroke-width="2" />
                <Circle cx="58" cy="82" r="3" stroke="#fff" stroke-width="2" />
              </Svg>
            </View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "200",
                fontSize: 16,
              }}
            >
              Eladás
            </Text>
          </Pressable>
          <Text
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            color: "#023047",
            fontWeight: "bold",
          }}
          >{vegosszeg} Ft</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Eladas;
