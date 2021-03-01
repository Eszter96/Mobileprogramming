import React from "react";
import TaskInput from "../components/TaskInput";

// This screen is used to add or edit task depending on where the user navigate to this screen from
/* There are two params what are received from another (HomeScreen or EditTaskScreen): 
title - this will be set to the title of the screen depending on whether the user wants to add or edit task - this has been configured in the HomeTabs.js
page - where from the user comes from so the screen will know where to send back the data */
const AddTaskScreen = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation]);
  return <TaskInput page={route.params.page} />;
};
export default AddTaskScreen;
