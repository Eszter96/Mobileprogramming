import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AvatarTransLator from "./AvatarTranslator";

const ListTasks = (props) => {
  function displayAvatar(filename) {
    const property = filename;
    return (
      <View style={{ width: 20, height: 20 }}>
        {AvatarTransLator[property]}
      </View>
    );
  }
  return (
    <View style={{ flexDirection: "row", marginLeft: 20 }}>
      <Text>{props.task} </Text>
      <Text style={{ color: "red" }}>Due to: {props.endDate} </Text>
      {displayAvatar(props.fileName)}
      <Text>{props.userName} </Text>
    </View>
  );
};
export default ListTasks;
