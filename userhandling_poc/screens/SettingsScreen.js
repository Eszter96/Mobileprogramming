import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Button } from "react-native";
import ListUsers from "../components/ListUsers";
import AvatarTransLator from "../components/AvatarTranslator";

const SettingsScreen = (props) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getUsers = (elements) => {
    setUsers(elements);
  };

  function displayAvatar(filename) {
    const property = filename;
    return (
      <View style={{ width: 40, height: 40 }}>
        {AvatarTransLator[property]}
      </View>
    );
  }

  useEffect(() => {
    if (isLoading == true) {
      getUsers();
      setLoading(false);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={{ fontSize: 20, alignSelf: "center", marginVertical: 20 }}>
          Users
        </Text>
        <ListUsers setUsers={getUsers} />
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View
              style={{ flexDirection: "row", marginBottom: 20, marginLeft: 20 }}
            >
              {displayAvatar(item.filename)}
              <Text style={{ fontSize: 20, paddingTop: 5, marginLeft: 10 }}>
                {item.username} ({item.points})
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Button
          title="Add user"
          onPress={() => {
            props.navigation.navigate({ routeName: " " });
          }}
        />
      </View>
    </View>
  );
};
export default SettingsScreen;
