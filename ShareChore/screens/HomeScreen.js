import React, { Component, useEffect, useState } from "react";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
  Button,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import DateData from "../components/DateData";
import ListTasks from "../components/ListTasks";
import { FlatList, TextInput } from "react-native-gesture-handler";
import ListUsers from "../components/ListUsers";

const HomeScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [highlightedItems, setHighlightedItems] = useState([]);
  const [isAddDisabled, setAddDisabled] = useState(true);
  const [isShowDisabled, setShowDisabled] = useState(true);
  const [isStartDate, setIsStartDate] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [view, setView] = useState();
  const [users, setUsers] = useState([]);
  const [isEnabled, setEnabled] = useState(false);
  const [btnText, setBtnText] = useState("+");
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [taskInput, setTaskInput] = useState("");
  const [userNames, setUserNames] = useState([]);
  // const selectedUser = route.params?.selectedUser;

  async function addData() {
    const response = await fetch(
      "https://inner-encoder-291018.ew.r.appspot.com/rest/taskservice/addtask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: route.params?.selectedUser.id,
          task: route.params?.task,
          endDate: selectedEndDate,
          startDate: selectedStartDate,
        }),
      }
    );
    const responseData = await response.text();
    console.log(responseData);
    setLoading(true);
    Alert.alert("Task has been added!");
    setBtnText("+");
    setEnabled(false);
    setSelectedEndDate("");
    setSelectedStartDate("");
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      filterTasks();
      setSelectedStartDate("");
    });

    return unsubscribe;
  }, [navigation]);

  const onDateChange = (date, type) => {
    if (date != null) {
      let selectedD = moment(Date.parse(date)).format("YYYY-MM-DD");
      filterTasks(selectedD);
      if (btnText == "+") {
        setSelectedStartDate(selectedD);
      } else {
        if (type === "END_DATE") {
          setSelectedEndDate(selectedD);
        } else {
          setSelectedStartDate(selectedD);
          setSelectedEndDate(null);
        }
      }
    }
  };

  const addTask = () => {
    if (btnText == "+") {
      setEnabled(true);
      setBtnText("✕");
    } else {
      setBtnText("+");
      setEnabled(false);
      setSelectedEndDate("");
    }
  };

  const getUsers = (elements) => {
    setUsers(elements);
    let usernames = [];
    elements.forEach((element) => {
      let username = element.username;
      usernames.push(username);
    });
    setUserNames(usernames);
  };

  function getDays(customDatesStyles, taskData, startDates, endDates) {
    let specialDaysArr = [];
    startDates.map((sD) => {
      if (endDates.includes(sD)) {
        specialDaysArr.push(sD);
      }
    });
    let filteredCustomDatesStyles = [];
    let allDays = [];
    customDatesStyles.map((cDS) => {
      let date = cDS.date;
      if (!allDays.includes(date)) {
        if (!specialDaysArr.includes(date)) {
          filteredCustomDatesStyles.push(cDS);
        } else {
          filteredCustomDatesStyles.push({
            date: date,
            style: {
              backgroundColor: "#66ff33",
              borderWidth: 2,
              borderColor: "red",
            },
          });
        }
        allDays.push(date);
      }
    });
    setHighlightedItems(filteredCustomDatesStyles);
    setTaskList(taskData);
    setLoading(false);
  }

  let selectedTaskList = [];
  const filterTasks = (selectedD) => {
    taskList.forEach((t) => {
      if (selectedD >= t.startDate && t.endDate >= selectedD) {
        let task = t.task;
        let userId = t.userId;
        let endDate = t.endDate;
        let userName;
        let fileName;
        users.forEach((user) => {
          if (user.id == userId) {
            userName = user.username;
            fileName = user.filename;
          }
        });
        selectedTaskList.push({ task, userId, endDate, userName, fileName });
      }
    });
    setSelectedTasks(selectedTaskList);
  };

  function returnView() {
    if (btnText == "✕") {
      return (
        <View>
          <Text>Add Task</Text>
          <Text>Select a range from the calendar!</Text>
          <Text>Start date: {selectedStartDate}</Text>
          <Text>End date: {selectedEndDate}</Text>
          <Text>Assing task to: {route.params?.selectedUser.username}</Text>
          <Text>Task: {route.params?.task}</Text>
          <View style={{ width: "80%" }}>
            <View>
              <Button
                title="Select user"
                onPress={() => {
                  navigation.navigate("AddUser", { users: users });
                }}
              />
            </View>
            <View>
              <Button
                title="Add Task"
                onPress={() => navigation.navigate("AddTask")}
              />
            </View>
            <View>
              <Button title="Save" onPress={addData} />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <FlatList
            keyExtractor={(item) => selectedTasks.indexOf(item).toString()}
            data={selectedTasks}
            renderItem={(itemData) => (
              <View key={itemData.item.id}>
                <ListTasks
                  task={itemData.item.task}
                  endDate={itemData.item.endDate}
                  id={itemData.item.id}
                  fileName={itemData.item.fileName}
                  userName={itemData.item.userName}
                />
              </View>
            )}
          />
        </View>
      );
    }
  }

  if (isLoading == true) {
    return (
      <View style={styles.container}>
        <DateData onSendDates={getDays} />
        <ListUsers setUsers={getUsers} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, alignSelf: "center", marginVertical: 20 }}>
          ShareChore
        </Text>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={isEnabled}
          todayBackgroundColor="orange"
          todayTextStyle={{
            fontWeight: "bold",
            color: "white",
          }}
          selectedDayColor={"grey"}
          selectedDayTextColor="#FFFFFF"
          customDatesStyles={highlightedItems}
          onDateChange={onDateChange}
        />
        {returnView()}
        <View
          style={{
            position: "absolute",
            bottom: "5%",
            right: "10%",
            backgroundColor: "grey",
            width: 40,
            height: 40,
            justifyContent: "center",
            borderRadius: 200,
          }}
        >
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="orange"
            style={{ borderRadius: 200, width: 40, height: 40 }}
            onPress={addTask}
          >
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: "white",
                  alignSelf: "center",
                  marginTop: 2,
                }}
              >
                {btnText}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    marginTop: 20,
  },
});
