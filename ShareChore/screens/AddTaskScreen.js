import React, { useState } from "react";
import { View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

// This screen is used to create new task
const AddTaskScreen = ({ navigation }) => {
  const [task, setTask] = useState("");

  const taskInputHandler = (enteredText) => {
    setTask(enteredText);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginTop: 100,
          width: "80%",
          alignSelf: "center",
          borderBottomWidth: 2,
          borderColor: "black",
        }}
      >
        <TextInput
          autoFocus
          style={{ fontSize: 20 }}
          value={task}
          placeholder="Task"
          onChangeText={taskInputHandler}
        />
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Button
          title="Add"
          onPress={() => {
            navigation.navigate("Home", {
              task: task,
            }); /* Sending back the received data from input to the HomeScreen (line 202) */
          }}
        />
      </View>
    </View>
  );
};
export default AddTaskScreen;
