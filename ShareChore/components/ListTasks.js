import React from "react";
import { Text, View } from "react-native";
import AvatarTransLator from "./AvatarTranslator";
import moment from "moment";

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

  const date = new Date();
  const formattedDate = moment(date).format("YYYY-MM-DD");

  function displayState() {
    if (props.state == "completed") {
      return (
        <View>
          <Text style={{ color: "green", fontSize: 18, marginRight: 15 }}>
            COMPLETED
          </Text>
        </View>
      );
    } else {
      return (
        <Text
          style={{
            fontSize: 18,
            color: formattedDate > props.endDate ? "grey" : "red", // Set to grey due to text if the task is overdue
            marginRight: 15,
          }}
        >
          Due to: {props.endDate}
        </Text>
      );
    }
  }

  // Display tasks and resposible user using the data of selectedTasks (as props) from the HomeScreen
  return (
    <View
      style={{
        flexDirection: "column",
        borderBottomWidth: 2,
        borderColor: props.active == true ? "#cfcfcf" : "#f1f1f1",
      }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: props.active == true ? "bold" : "normal",
          }}
        >
          {props.task}{" "}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {displayState()}
          {displayAvatar(props.fileName)}
          <Text
            style={{
              fontSize: 18,
              fontWeight: props.active == true ? "bold" : "normal",
            }}
          >
            {" "}
            {props.userName}{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default ListTasks;
