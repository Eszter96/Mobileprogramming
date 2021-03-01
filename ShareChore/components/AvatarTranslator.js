import React from "react";
import { Image } from "react-native";

// This file is getting called when a particular avatar has to be assigned to a particular user using the filenames (avatarred, avatarpink, avatarblue) as property

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
