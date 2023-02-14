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
import NavContext from "../data/NavContext";
import CartItem from "../UI/CartItem";

const Eladas = () => {
  const { BASEURL, vegosszeg, changeVegosszeg, changeError } =
    useContext(NavContext);
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
        if (json.status === "ok") {
          setCart(json.data);
        } else {
          changeError({
            status: "error",
            text: "Valami hiba lépett fel a szerverrel. Próbáld meg frissíteni az oldalt vagy próbálkozz később!",
          });
        }
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

        if (json.status === "ok"){
          getCartItems();
          changeVegosszeg();

          changeError({
            status: "ok",
            text: "Sikeres eladás!"
          })
        } else {
          changeError({
            status: json.status,
            code: json.code,
            text: "Hiba lépett fel az eladás közben. Próbáld meg újra vagy próbálkozz később!"
          })
        }
      });
  };

  return (
    <ScrollView
      style={{
        width: "100%",
        zIndex: 1,
        padding: 5,
        marginBottom: 50,
        height: Dimensions.get("window").height,
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
          {cart != "" && cart.length != 0 ? (
            <>
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
                  <Svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <Path
                      d="M83 38.5H75.084C74.1559 38.5 73.3498 39.1385 73.1372 40.0419L70.3235 52M70.3235 52L65.8436 71.0399C65.6423 71.8954 64.8789 72.5 64 72.5V72.5M70.3235 52H30.5623C29.1189 52 28.1508 53.4823 28.731 54.804L35.9749 71.304C36.294 72.0307 37.0125 72.5 37.8062 72.5H64M64 72.5V75C64 76.1046 63.1046 77 62 77H32M50 42.5V19.5M50 19.5L57.5 27M50 19.5L42.5 27"
                      stroke="#fff"
                      stroke-width="2"
                    />
                    <Circle
                      cx="38"
                      cy="82"
                      r="3"
                      stroke="#fff"
                      stroke-width="2"
                    />
                    <Circle
                      cx="58"
                      cy="82"
                      r="3"
                      stroke="#fff"
                      stroke-width="2"
                    />
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
              >
                {vegosszeg} Ft
              </Text>
            </>
          ) : (
            <View
              style={{
                width: "100%",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderColor: `#023047`,
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "flex-end",
                }}
              >
                <Svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <G clip-path="url(#clip0_56_2)">
                    <Path
                      d="M55.1962 19L86.3731 73C88.6825 77 85.7957 82 81.1769 82H18.8231C14.2043 82 11.3175 77 13.6269 73L44.8038 19C47.1132 15 52.8868 15 55.1962 19Z"
                      fill="white"
                      stroke="#023047"
                      stroke-width="2"
                    />
                    <Path
                      d="M47.4805 43.7598C47.4805 43.1152 47.7734 42.793 48.3594 42.793H50.1875C50.7734 42.793 51.0664 43.1152 51.0664 43.7598L50.6973 60.3535C50.6973 60.8809 50.4336 61.1445 49.9062 61.1445H48.6406C48.1133 61.1445 47.8496 60.8809 47.8496 60.3535L47.4805 43.7598ZM48.2891 68C47.7617 68 47.498 67.7363 47.498 67.209V65.0645C47.498 64.5371 47.7617 64.2734 48.2891 64.2734H50.2578C50.7852 64.2734 51.0488 64.5371 51.0488 65.0645V67.209C51.0488 67.7363 50.7852 68 50.2578 68H48.2891Z"
                      fill="#023047"
                    />
                  </G>
                  <Defs>
                    <ClipPath id="clip0_56_2">
                      <Rect width="100" height="100" fill="white" />
                    </ClipPath>
                  </Defs>
                </Svg>
              </View>
              <Text
                style={{
                  color: "#023047",
                }}
              >
                Nincs semmi a kosárban
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Eladas;
