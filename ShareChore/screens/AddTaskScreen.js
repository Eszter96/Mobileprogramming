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
    <View style={{ flex: 1 }}>
      <TextInput
        value={task}
        placeholder="Task"
        onChangeText={taskInputHandler}
      />
      <Button
        title="Add"
        onPress={() => {
          navigation.navigate("Home", {
            task: task,
          }); /* Sending back the received data from input to the HomeScreen (line 202) */
        }}
      />
    </View>
  );
};
export default AddTaskScreen;
