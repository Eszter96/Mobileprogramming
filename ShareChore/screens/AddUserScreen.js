import React from "react";
import UserInput from "../components/UserInput";

// This screen is used to assign user to a particular task
/*Same logic is used here as in case of the AddTaskScreen.js*/
const AddUserScreen = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation]);
  return <UserInput page={route.params.page} />;
};
export default AddUserScreen;
