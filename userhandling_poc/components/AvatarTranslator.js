import React from "react";
import { Image } from "react-native";

const AvatarTransLator = {
  avatarred: (
    <Image
      style={{ width: "100%", height: "100%" }}
      source={require("../assets/images/avatarred.png")}
    />
  ),
  avatarpink: (
    <Image
      style={{ width: "100%", height: "100%" }}
      source={require("../assets/images/avatarpink.png")}
    />
  ),
  avatarblue: (
    <Image
      style={{ width: "100%", height: "100%" }}
      source={require("../assets/images/avatarblue.png")}
    />
  ),
};
export default AvatarTransLator;
