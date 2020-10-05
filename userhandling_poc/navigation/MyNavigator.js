import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import UserInput from "../components/UserInput";
import SettingsScreen from "../screens/SettingsScreen";

const MyNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
    " ": {
      screen: UserInput,
      navigationOptions: {
        gestureDirection: "horizontal-inverted",
      },
    },
  },
  {
    initialRouteName: "Settings",
    mode: "modal",
  }
);

export default createAppContainer(MyNavigator);
