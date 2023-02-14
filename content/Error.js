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
import Svg, { Path, G, Circle, Defs, Rect, ClipPath } from "react-native-svg";
import NavContext from "../data/NavContext";

const Error = () => {
  const { error } = useContext(NavContext);
  const [errorStatus, setErrorStatus] = useState("");
  const [errorText, setErrorText] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (error.status === "error") {
      setErrorStatus("error");
      setErrorColor("#FF595E");
    } else if (error.status === "ok") {
      setErrorStatus("ok");
      setErrorColor("#8AC926");
    } else if (error.status === "warning") {
      setErrorStatus("warning");
      setErrorColor("#FFCA3A");
    }

    setErrorCode(error.code || "");
    setErrorText(error.text);
    setVisible(true);
  }, [error]);

  const changeVisible = () => {
    setVisible((visible) => !visible);
  };

  return (
    <View
      style={{
        padding: 10,
        position: "absolute",
        width: "80%",
        maxWidth: 500,
        height: 100,
        maxHeight: 100,
        right: 5,
        top: 48,
        backgroundColor: errorColor,
        borderRadius: 10,
        justifyContent: "center",
      }}
    >
      <Pressable
        onPressIn={changeVisible}
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {errorStatus === "ok" ? (
          <View
            style={{
              width: 50,
              height: 50,
            }}
          >
            <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <Circle
                cx="50"
                cy="50"
                r="38.5"
                stroke="black"
                stroke-width="3"
              />
              <Path
                d="M24 55.8475L38.6516 70.4991C39.0422 70.8896 39.6753 70.8896 40.0658 70.4991L74.2062 36.3587"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
              />
            </Svg>
          </View>
        ) : errorStatus === "error" ? (
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
              xmlns="http://www.w3.org/2000/svg"
            >
              <Circle
                cx="50"
                cy="50"
                r="38.5"
                stroke="black"
                stroke-width="3"
              />
              <Path
                d="M32 68L68.416 31.584"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
              />
              <Path
                d="M32 32L68.416 68.416"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
              />
            </Svg>
          </View>
        ) : errorStatus === "warning" ? (
          <View
            style={{
              width: 50,
              height: 50,
            }}
          >
            <Svg width="100%" height="100%" viewBox="0 0 100 100">
              <G clip-path="url(#clip0_56_2)">
                <Path
                  d="M55.1962 19L86.3731 73C88.6825 77 85.7957 82 81.1769 82H18.8231C14.2043 82 11.3175 77 13.6269 73L44.8038 19C47.1132 15 52.8868 15 55.1962 19Z"
                  fill="none"
                  stroke="#000"
                  stroke-width="3"
                />
                <Path
                  d="M47.4805 43.7598C47.4805 43.1152 47.7734 42.793 48.3594 42.793H50.1875C50.7734 42.793 51.0664 43.1152 51.0664 43.7598L50.6973 60.3535C50.6973 60.8809 50.4336 61.1445 49.9062 61.1445H48.6406C48.1133 61.1445 47.8496 60.8809 47.8496 60.3535L47.4805 43.7598ZM48.2891 68C47.7617 68 47.498 67.7363 47.498 67.209V65.0645C47.498 64.5371 47.7617 64.2734 48.2891 64.2734H50.2578C50.7852 64.2734 51.0488 64.5371 51.0488 65.0645V67.209C51.0488 67.7363 50.7852 68 50.2578 68H48.2891Z"
                  fill="#000"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_56_2">
                  <Rect width="100%" height="100%" />
                </ClipPath>
              </Defs>
            </Svg>
          </View>
        ) : (
          ""
        )}

        <Text
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            fontWeight: "bold",
          }}
        >
          {errorText}
        </Text>
      </Pressable>
    </View>
  );
};

export default Error;
