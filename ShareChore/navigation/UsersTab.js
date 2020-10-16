import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UsersScreen from "../screens/UsersScreen";
import UserInputScreen from "../screens/UserInputScreen";

const UsersTab = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialScreen="Users">
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name=" "
        component={UserInputScreen}
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
export default UsersTab;
