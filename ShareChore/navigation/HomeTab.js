import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import AddUserScreen from "../screens/AddUserScreen";

const HomeTab = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialScreen="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="AddUser" component={AddUserScreen} />
    </Stack.Navigator>
  );
};
export default HomeTab;
