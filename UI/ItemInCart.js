import React, { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
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

const ItemInCart = ({ item }) => {
  const { BASEURL, changeVegosszeg, numberSeparator, changeError } = useContext(NavContext);
  const [border_color_db, setborder_color_db] = useState("#d3d3d3");
  const [border_color_ar, setborder_color_ar] = useState("#d3d3d3");
  const [db, setdb] = useState("");
  const [ar, setAr] = useState("");
  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;

  useEffect(() => {
    item.db !== "0" ? setdb(item.db) : setdb("");
    item.ar !== "0" ? setAr(item.ar) : setAr("");
    changeVegosszeg();
  }, [item.ar, item.db]);

  const dbBlurHandler = () => {
    setborder_color_db("#d3d3d3");

    fetch(`${BASEURL}cart.php`, {
      method: "post",
      body: JSON.stringify({
        do: "updatedb",
        item: item.id,
        db: db,
      }),
    })
      .then((response) => response.json())
      .then((json) => {

        if (json.status === "ok"){
          changeVegosszeg();
        } else {
          changeError({
            status: json.status,
            code: json.code,
            text: "Valami hiba lépett fel a darab frissítésénél. Próbáld meg frissíteni az oldalt vagy próbálkozz később!"
          })
        }
      });
  };

  const arBlurHandler = () => {
    setborder_color_ar("#d3d3d3");

    fetch(`${BASEURL}cart.php`, {
      method: "post",
      body: JSON.stringify({
        do: "updatear",
        item: item.id,
        ar: ar,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "ok"){
          changeVegosszeg();
        } else {
          changeError({
            status: json.status,
            code: json.code,
            text: "Valami hiba lépett fel az ár frissítésénél. Próbáld meg frissíteni az oldalt vagy próbálkozz később!"
          })
        }
      });
  };

  return (
    <View
      style={{
        width: WIDTH >= 800 ? WIDTH / 2 : WIDTH - 20,
        height: "auto",
        minHeight: 50,
        flexDirection: "row",
        padding: 5,
        borderColor: `#d3d3d3`,
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 8,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 8,
          borderRadius: 4,
          height: "100%",
          backgroundColor: `#${item.color}`,
        }}
      ></View>
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          width: WIDTH >= 800 ? "40%" : "30%",
          height: "100%",
          justifyContent: "space-between",
          borderColor: `#d3d3d3`,
          borderRightWidth: 2,
          borderStyle: "solid",
        }}
      >
        <Text
          style={{
            width: WIDTH >= 800 ? "auto" : "100%",
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 16,
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {item.nev}
        </Text>
        <Text
          style={{
            paddingRight: 10,
            paddingLeft: 10,
            fontSize: 14,
            color: "#c4c4c4",
            backgroundColor: "#fff",
            fontWeight: "300",
          }}
        >
          {item.kiszereles}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: WIDTH >= 800 ? "60%" : "70%",
          flexWrap: "wrap",
        }}
      >
        <View
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            width: WIDTH >= 800 ? "33%" : "50%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderColor: "#d3d3d3",
            borderRightWidth: 2,
            borderStyle: "solid",
          }}
        >
          <TextInput
            onFocus={() => setborder_color_db("#F37335")}
            onBlur={dbBlurHandler}
            style={{
              padding: 0,
              paddingLeft: 10,
              paddingRight: 10,
              textAlign: "center",
              width: "70%",
              height: 35,
              fontSize: 14,
              borderColor: border_color_db,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 8,
            }}
            placeholder={`${item.db}`}
            cursorColor="#F37335"
            onChangeText={setdb}
            value={db}
            inputMode="numeric"
            keyboardType="numeric"
          />
          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              fontSize: 14,
            }}
          >
            db
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            width: WIDTH >= 800 ? "33%" : "50%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderColor: "#d3d3d3",
            borderRightWidth: 2,
            borderStyle: "solid",
          }}
        >
          <TextInput
            onFocus={() => setborder_color_ar("#F37335")}
            onBlur={arBlurHandler}
            style={{
              padding: 0,
              paddingLeft: 10,
              paddingRight: 10,
              textAlign: "center",
              width: "70%",
              height: 35,
              fontSize: 14,
              borderColor: border_color_ar,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 8,
            }}
            placeholder={`${item.ar}`}
            cursorColor="#F37335"
            onChangeText={setAr}
            value={ar}
            inputMode="numeric"
            keyboardType="numeric"
          />
          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              fontSize: 14,
            }}
          >
            Ft
          </Text>
        </View>
        <View
          style={{
            padding: 5,
            width: WIDTH >= 800 ? "33%" : "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 8,
              fontSize: 15,
            }}
          >
          {numberSeparator(ar * db)} Ft
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemInCart;
