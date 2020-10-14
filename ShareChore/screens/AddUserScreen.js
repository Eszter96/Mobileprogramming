import { NavigationHelpersContext } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { Button, View, Text, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AvatarTransLator from "../components/AvatarTranslator";

const AddUserScreen = ({ route, navigation }) => {
  const [users, setUserList] = useState(route.params.users);
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);

  function displayAvatar(filename) {
    const property = filename;
    return (
      <View style={{ width: 40, height: 40 }}>
        {AvatarTransLator[property]}
      </View>
    );
  }

  const getId = (key) => {
    let newArray = [];
    let selectedUser;
    users.forEach((element) => {
      let username = element.username;
      let filename = element.filename;
      let points = element.points;
      let id = element.id;
      let active;
      if (id == key) {
        active = true;
        selectedUser = { id, username };
      } else {
        active = false;
      }
      newArray.push({ id, username, filename, points, active });
    });
    setUser(selectedUser);

    setUserList(newArray);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "column",
              marginBottom: 20,
              marginLeft: 20,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => getId(item.id)}
            >
              {displayAvatar(item.filename)}
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 5,
                  marginLeft: 10,
                  fontWeight: item.active ? "bold" : "normal",
                }}
              >
                {item.username} ({item.points})
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View>
        <Button
          title="Assing"
          onPress={() => {
            navigation.navigate("Home", { selectedUser: user });
          }}
        />
      </View>
    </View>
  );
};
export default AddUserScreen;
