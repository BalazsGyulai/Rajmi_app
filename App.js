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

const App = () => {
  const [StatusBarColor, setStatusBarColor] = useState("");


  return (
    <>
      <StatusBar
        backgroundColor={StatusBarColor.color}
        barStyle={StatusBarColor.style}
        hidden={false}
      />
      <View style={styles.container}>
        <NavFunction>
          <ActualPage />
          <Nav style={(newVal) => setStatusBarColor(newVal)} />
        </NavFunction>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default App;
