import React from "react";
import { Image, Text } from "react-native";

const AvatarsData = [
  {
    id: 1,
    active: false,
    filename: "avatarred",
    image: <Image source={require("../assets/images/avatarred.png")} />,
  },

  {
    id: 2,
    active: false,
    filename: "avatarpink",
    image: <Image source={require("../assets/images/avatarpink.png")} />,
  },

  {
    id: 3,
    active: false,
    filename: "avatarblue",
    image: <Image source={require("../assets/images/avatarblue.png")} />,
  },
];
export default AvatarsData;
