import React, { useState } from "react";
import { View, Button, FlatList, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AvatarTransLator from "./AvatarTranslator";
import ListUsers from "./ListUsers";

const UserInput = (props) => {
  const [users, setUserList] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
    });

    return unsubscribe;
  }, [navigation]);

  // AvatarTranslator is used to get the proper avatar (samr as in UserScreen and ListTask)
  function displayAvatar(filename) {
    const property = filename;
    return (
      <View style={{ width: 40, height: 40 }}>
        {AvatarTransLator[property]}
      </View>
    );
  }

  // Highlight selected user by id, by adding "active" property to the user we can render "active" user with a highlighted style
  const getId = (key) => {
    let newArray = [];
    let selectedUser;

    // Iterating through the users and if we find the user with the id in the parameter (key), the user will be set to "active" (same logic as in UserInputScreen.js)
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

  const getUsers = (elements) => {
    setLoading(true);
    setUserList(elements);
    setLoading(false);
  };

  if (isLoading == true) {
    return (
      <View style={{ flex: 1 }}>
        <ListUsers setUsers={getUsers} />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 20, flex: 1 }}>
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
                      /* If the user is "active" then we set bold fontweight otherwise it will remain the same as before */
                      fontWeight: item.active ? "bold" : "normal",
                    }}
                  >
                    {item.username}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <View>
            <Button
              title="Assign"
              onPress={() => {
                navigation.navigate(props.page, {
                  selectedUser: user,
                });
              }} // Sending back the selected user to the sceen has been sent to this component as property
            />
          </View>
        </View>
      </View>
    );
  }
};
export default UserInput;
