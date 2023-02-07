import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Dimensions, Pressable } from "react-native";
import Svg, { Path, G } from "react-native-svg";
import NavContext from "../data/NavContext";
import Select from "../UI/Select"

const Search = () => {
  const { setSearch, search } = useContext(NavContext);
  const [color, setColor] = useState("#023047");
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(Dimensions.get("window").width);
  }, []);

  return (
    <View
      style={{
        width: width - 48 - 15,
        minWidth: 300,
        maxWidth: 500,
        padding: 5,
        flexDirection: "row"
      }}
    >
      <TextInput
        style={[styles.input, { borderColor: color }]}
        placeholder="Keresés"
        onFocus={() => setColor("#F37335")}
        onBlur={() => setColor("#023047")}
        cursorColor="#F37335"
        onChangeText={setSearch}
        value={search}
      />
      <Select />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: "100%",
    paddingRight: 105,
    paddingLeft: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 24
  },
});

export default Search;
