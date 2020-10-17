import React, { useEffect, useState } from "react";
import UserInput from "../components/UserInput";

// This screen is used to assign user to a particular task
const AddUserScreen = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation]);
  return <UserInput page={route.params.page} />;
};
export default AddUserScreen;
