import React, { useState } from "react";
import { Text, View, FlatList, Button } from "react-native";
import ListUsers from "../components/ListUsers";
import AvatarTransLator from "../components/AvatarTranslator";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateData from "../components/DateData";

// This screen is used to display the users, and delete users from database
const UsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [userIdList, setUserIdList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const deleteUser = async (id) => {
    //console.log(id);
    const response = await fetch(
      "https://inner-encoder-291018.ew.r.appspot.com/rest/userservice/deleteuser/" +
        id,
      {
        method: "DELETE",
      }
    );
    if (userIdList.includes(id)) {
      deleteTask(id);
    }
    setLoading(true);
  };

  const deleteTask = async (id) => {
    const response = await fetch(
      "https://inner-encoder-291018.ew.r.appspot.com/rest/taskservice/deletetask/" +
        id,
      {
        method: "DELETE",
      }
    );
    setLoading(true);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
    });

    return unsubscribe;
  }, [navigation]);

  const getUsers = (elements) => {
    setUsers(elements);
    setLoading(false);
  };

  const getDays = (customDatesStyles, taskData, startDates, endDates) => {
    let array = [];
    taskData.forEach((task) => {
      let userId = task.userId;
      array.push(userId);
    });
    setUserIdList(array);
  };

  // Display proper avatar using AvatarTransLator (same as in ListTasks and AddUserScreen)
  function displayAvatar(filename) {
    const property = filename;
    return (
      <View style={{ width: 40, height: 40 }}>
        {AvatarTransLator[property]}
      </View>
    );
  }

  if (isLoading == true) {
    return (
      <View style={{ flex: 1 }}>
        <DateData onSendDates={getDays} />
        <ListUsers setUsers={getUsers} />
        <View
          style={{
            backgroundColor: "white",
            paddingTop: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 2,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginVertical: 20,
              color: "grey",
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            Users
          </Text>
        </View>
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
              <View style={{ flexDirection: "row" }}>
                {displayAvatar(item.filename)}
                <TouchableOpacity onLongPress={() => deleteUser(item.id)}>
                  <Text style={{ fontSize: 20, paddingTop: 5, marginLeft: 10 }}>
                    {item.username} ({item.points})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button
            title="Add user"
            onPress={() => {
              navigation.navigate(" ");
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <View
            style={{
              backgroundColor: "white",
              paddingTop: 15,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 2,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginVertical: 20,
                color: "grey",
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              Users
            </Text>
          </View>
          <View>
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
                  <View style={{ flexDirection: "row" }}>
                    {displayAvatar(item.filename)}
                    <TouchableOpacity onLongPress={() => deleteUser(item.id)}>
                      <Text
                        style={{ fontSize: 20, paddingTop: 5, marginLeft: 10 }}
                      >
                        {item.username} ({item.points})
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button
            title="Add user"
            onPress={() => {
              navigation.navigate(" ");
            }}
          />
        </View>
      </View>
    );
  }
};
export default UsersScreen;
