import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import AddUserScreen from "../screens/AddUserScreen";
import EditTaskScreen from "../screens/EditTaskScreen";

const HomeTab = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialScreen="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ editedTask: "", selectedUser: "" }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={
          (({ route }) => ({ title: route.params.title }), // Set title according to how the users wants to use the particular screen (add/edit)
          { headerStyle: { backgroundColor: "grey" }, headerTintColor: "#fff" })
        }
      />
      <Stack.Screen
        name="AddUser"
        component={AddUserScreen}
        options={
          (({ route }) => ({ title: route.params.title }), // Set title according to how the users wants to use the particular screen (add/edit)
          {
            headerStyle: {
              backgroundColor: "grey",
            },
            headerTintColor: "#fff",
          })
        }
      />
      <Stack.Screen
        name="EditTask"
        component={EditTaskScreen}
        initialParams={{ editedTask: "", selectedUser: "" }}
        options={{
          title: "Edit task",
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
