import React, { useState, useEffect } from "react";
import { Alert, Button, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles/MyStyles";

import AvatarsData from "./AvatarsData";

const UserInput = (props) => {
  const [avatars, setHighlighted] = useState(AvatarsData);
  const [fileName, setFileName] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setLoading] = useState(true);

  async function addData() {
    console.log("These will be added: " + fileName, userName);
    const response = await fetch(
      "https://inner-encoder-291018.ew.r.appspot.com/rest/userservice/adduser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: fileName, username: userName }),
      }
    );
    const responseData = await response.text();
    console.log(responseData);
    Alert.alert("User has been added!");
    setUserName("");
  }

  useEffect(() => {
    if (isLoading == true) {
      setLoading(false);
    }
  });

  const getSource = (filename, key) => {
    console.log(key);
    console.log(filename);
    setFileName(filename);
    setActiveImage(key);
  };

  const setActiveImage = (key) => {
    let newArray = [];
    avatars.map((avatar) => {
      let id = avatar.id;
      let filename = avatar.filename;
      let image = avatar.image;
      let active;
      if (avatar.id == key) {
        active = true;
      } else {
        active = false;
      }
      newArray.push({ id, filename, image, active });
    });
    setHighlighted(newArray);
  };

  const userNameInputHandler = (enteredText) => {
    setUserName(enteredText);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View>
          <Text
            style={{ fontSize: 20, alignSelf: "center", marginVertical: 20 }}
          >
            Select Avatar
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {avatars.map((avatar) => (
            <View key={avatar.id}>
              <TouchableOpacity
                onPress={() => getSource(avatar.filename, avatar.id)}
              >
                <View
                  style={
                    avatar.active == true ? styles.active : styles.inactive
                  }
                >
                  {avatar.image}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            marginTop: 60,
            marginBottom: 20,
          }}
        >
          Set Username
        </Text>
        <TextInput
          value={userName}
          style={{
            alignSelf: "center",
            fontSize: 20,
            borderBottomWidth: 2,
            padding: 10,
            width: "80%",
          }}
          placeholder="Username"
          onChangeText={userNameInputHandler}
        />
      </View>
      <View style={{ width: "80%", marginTop: 20, alignSelf: "center" }}>
        <Button title="Add User" onPress={addData} />
      </View>
    </View>
  );
};
export default UserInput;
