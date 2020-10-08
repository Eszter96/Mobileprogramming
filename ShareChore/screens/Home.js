import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon } from "react-native-elements";

import Calendar from "../components/Calendar";

const Home = () => {
  return (
    <View style={styles.container}>
      <Calendar />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  testText: {
    fontSize: 40,
  },
});
