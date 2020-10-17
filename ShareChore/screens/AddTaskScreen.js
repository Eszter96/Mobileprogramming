import React, { useState } from "react";
import TaskInput from "../components/TaskInput";

// This screen is used to create new task
const AddTaskScreen = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation]);
  return <TaskInput page={route.params.page} />;
};
export default AddTaskScreen;
