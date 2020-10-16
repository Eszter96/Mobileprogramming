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
        initialParams={{ task: "", selectedUser: "" }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          title: "Add task",
          headerStyle: {
            backgroundColor: "grey",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUserScreen}
        options={{
          title: "Add user",
          headerStyle: {
            backgroundColor: "grey",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};
export default HomeTab;
