import React, { useState, useEffect } from "react";
import { Alert, Button, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles/MyStyles";
import AvatarsData from "../components/AvatarsData";

// This screen is used to add user to the users database
const UserInput = () => {
  // Default value of the avatars is the data from AvatarsData
  const [avatars, setHighlighted] = useState(AvatarsData);
  const [fileName, setFileName] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setLoading] = useState(true);

  async function addData() {
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
    Alert.alert("User has been added!");
    setUserName("");
  }

  useEffect(() => {
    if (isLoading == true) {
      setLoading(false);
    }
  });

  // Get the filename and the id of the selected avatar
  const getSource = (filename, key) => {
    setFileName(filename);
    setActiveImage(key);
  };

  // Using the id of the selected avatar to set an avatar active (same logic as in UserInput.js for highlighting the selected user) - overwrite the AvatarsData for avatars
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
        <View>
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              marginVertical: 20,
              marginTop: 40,
            }}
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
                  /* Set the style of an avatar depending on being active or not */
                  style={
                    avatar.active == true ? styles.active : styles.inactive
                  }
                >
                  {/* Getting Image component */}
                  {avatar.image}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
        }}
      >
        <Button
          title="Add"
          disabled={fileName != "" && userName != "" ? false : true}
          onPress={addData}
        />
      </View>
    </View>
  );
};
export default UserInput;
