import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AvatarTransLator from "./AvatarTranslator";

// This is used by HomeScreen to display the tasks when a date is selected

const ListTasks = (props) => {
  // Getting avatars using the AvatarTranslator (same as in AddUserScreen and UserScreen)
  function displayAvatar(filename) {
    const property = filename;
    return (
      <View style={{ width: 20, height: 20 }}>
        {AvatarTransLator[property]}
      </View>
    );
  }
  // Display tasks and resposible user using the data of selectedTasks (as props) from the HomeScreen
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
