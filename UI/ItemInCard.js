import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
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
import Svg, { Path, G } from "react-native-svg";
import NavContext from "../data/NavContext";

const ItemInCard = ({ item }) => {
  const { BASEURL, updateItems, items, changeVegosszeg } = useContext(NavContext);
  const WIDTH = Dimensions.get("window").width;
  const [bkg_color, setbgr_btn] = useState("#fff");
  const [edit, setEdit] = useState(false);
  const [TextColor, setTextColor] = useState("#000");
  const [TextColor2, setTextColor2] = useState("#c4c4c4");
  const [changeItemColor, setChangeItemColor] = useState("");
  const [styleColor, setStyleColor] = useState(item.color);
  const [inputColor, setInputColor] = useState("212529");
  const [incart, setincart] = useState(false);
  const [was_longpressed, setlongPressed] = useState(false);

  useEffect(() => {
    item.darab === 0
      ? setStyleColor(checkColor())
      : setStyleColor(checkColor());

    item.in_cart != null ? setincart(false) : setincart(true);
    
    changeVegosszeg();
  }, [items]);

  const checkColor = () => {
    return item.darab === 0 ? "cccccc" : item.color;
  };

  const CartHandler = () => {
    was_longpressed
      ? ""
      : fetch(`${BASEURL}cart.php`, {
          method: "post",
          body: JSON.stringify({
            do: "cart",
            item: item.id,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            updateItems();
          });
    setlongPressed(false);
  };

  const EditHandler = () => {
    setlongPressed(true);
    edit ? setStyleColor(checkColor()) : setStyleColor("F37335");
    changeItemColor != "" && changeItemColor != item.color
      ? editItemColor()
      : "";
    setEdit(!edit);
  };

  const deleteHandler = () => {
    fetch(`${BASEURL}multiplepalinka.php`, {
      method: "post",
      body: JSON.stringify({
        id: item.id,
        do: "delete",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        updateItems();
        setEdit(false);
        edit ? setbgr_btn("#fff") : setbgr_btn("#F37335");
      });
  };

  const plusItemHandler = () => {
    fetch(`${BASEURL}multiplepalinka.php`, {
      method: "post",
      body: JSON.stringify({
        id: item.id,
        do: "add",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        updateItems();
      });
  };

  const minusItemHandler = () => {
    fetch(`${BASEURL}multiplepalinka.php`, {
      method: "post",
      body: JSON.stringify({
        id: item.id,
        do: "minus",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        updateItems();
      });
  };

  const editItemColor = () => {
    fetch(`${BASEURL}multiplepalinka.php`, {
      method: "post",
      body: JSON.stringify({
        id: item.id,
        do: "colorChange",
        color: changeItemColor,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        updateItems();
      });
  };

  return (
    <Pressable
      onPressIn={() => setlongPressed(false)}
      onLongPress={EditHandler}
      onPressOut={CartHandler}
      key={item.id}
      style={[
        styles.card,
        {
          width: WIDTH >= 800 ? WIDTH / 5 - 15 : WIDTH / 2 - 15,
          height: 170,
          backgroundColor: bkg_color,
          borderColor: incart ? "#d3d3d3" : "#00b4d8",
          borderWidth: incart ? 1 : 2,
        },
      ]}
    >
      <View
        style={{
          height: "100%",
          flexDirection: "row",
          paddingRight: 1,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            width: 16,
            height: "100%",
            backgroundColor: `#${styleColor}`,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
        <View
          style={{
            width:
              WIDTH >= 800
                ? WIDTH / 5 - 35 - (edit ? 30 : 0)
                : WIDTH / 2 - 35 - (edit ? 30 : 0),
            alignItems: "flex-start",
            justifyContent: "space-around",
            paddingLeft: 10,
            borderRadius: 8,
          }}
        >
          {edit ? (
            <TextInput
              placeholder={`#${item.color}`}
              style={{
                width: "80%",
                height: 30,
                padding: 5,
                fontSize: 13,
                textAlign: "center",
                borderColor: `#${inputColor}`,
                backgroundColor: "#ffffff70",
                borderWidth: 2,
                borderStyle: "solid",
                borderRadius: 8,
              }}
              onChangeText={setChangeItemColor}
              onFocus={() => setInputColor("F37335")}
              onBlur={() => setInputColor("212529")}
              cursorColor="#F37335"
            />
          ) : (
            ""
          )}

          <Text style={[styles.text, styles.bold, { color: TextColor }]}>
            {item.nev}
          </Text>
          <Text style={[styles.text, { color: `#${styleColor}` }]}>
            {item.darab}
          </Text>
          <Text style={[styles.text, styles.italic, { color: TextColor2 }]}>
            {item.kiszereles}
          </Text>
        </View>

        {/* Edit side navbar */}
        {edit ? (
          <View
            style={{
              width: 30,
              height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              paddingTop: 1,
              paddingBottom: 1,
              borderRadius: 8,
            }}
          >
            <Pressable
              style={{
                width: 28,
                height: 28,
                backgroundColor: "#f00",
                borderRadius: 8,
              }}
              onPressIn={deleteHandler}
            >
              <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                <G id="close">
                  <Path
                    id="Vector 5"
                    d="M20.5 28H78M41 22.5V19.5C41 18.3954 41.8954 17.5 43 17.5H56C57.1046 17.5 58 18.3954 58 19.5V22.5M26 36.5C26 36.5 26 75 26 77C26 79 28 81 30.5 81C33 81 66.5 81 69 81C71.5 81 73.5 79 73.5 77C73.5 75 73.5 36.5 73.5 36.5M58 40.5V69M41 40.5V69"
                    stroke="#fff"
                    stroke-width="5"
                  />
                </G>
              </Svg>
            </Pressable>
            <View>
              <Pressable
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#023047",
                  borderRadius: 8,
                  marginBottom: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPressIn={plusItemHandler}
              >
                <Svg width="90%" height="90%" viewBox="0 0 100 100" fill="none">
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
              <Pressable
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#023047",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPressIn={minusItemHandler}
              >
                <Svg width="90%" height="90%" viewBox="0 0 100 100" fill="none">
                  <G id="close">
                    <Path
                      id="top"
                      d="M87.5 55H12C9.79086 55 8 53.2091 8 51C8 48.7909 9.79086 47 12 47H87.5C89.7091 47 91.5 48.7909 91.5 51C91.5 53.2091 89.7091 55 87.5 55Z"
                      fill="#fff"
                    />
                  </G>
                </Svg>
              </Pressable>
            </View>
          </View>
        ) : (
          ""
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderStyle: "solid",
    borderRadius: 8,
    alignItems: "center",
    margin: 5,
    flexDirection: "row",
  },

  text: {
    padding: 5,
    fontSize: 32,
    fontWeight: "bold",
  },

  italic: {
    fontSize: 16,
    fontWeight: "300",
  },

  bold: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ItemInCard;
