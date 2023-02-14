import React, { useState, useContext } from "react";
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Nav from "./content/Nav";
import ActualPage from "./content/ActualPage";
import { NavFunction } from "./data/NavContext";
import Error from "./content/Error";

const App = () => {
  const [StatusBarColor, setStatusBarColor] = useState("");

  return (
    <>
      <StatusBar
        backgroundColor={StatusBarColor.color}
        barStyle={StatusBarColor.style}
        hidden={false}
      />
      <NavFunction>
        <View style={styles.container}>
          <ActualPage />
          <Nav style={(newVal) => setStatusBarColor(newVal)} />
        </View>

        <Error />
      </NavFunction>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default App;
