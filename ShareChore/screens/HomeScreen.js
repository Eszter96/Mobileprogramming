import React, { Component, useEffect, useState } from "react";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  Button,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import DateData from "../components/DateData";
import ListTasks from "../components/ListTasks";
import { FlatList } from "react-native-gesture-handler";
import ListUsers from "../components/ListUsers";

//This screen is used to display calendar also, add new tasks and view old ones
const HomeScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [highlightedItems, setHighlightedItems] = useState([]); // Contains styles for start and end dates of tasks
  const [taskList, setTaskList] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEnabled, setEnabled] = useState(false); // This enables or disables the user to select range from calendar
  const [btnText, setBtnText] = useState("+"); // This enables or disables the user to add task
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

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

    // Reset every possible value used on screen
    setBtnText("+");
    setEnabled(false);
    setSelectedEndDate("");
    setSelectedStartDate("");
    filterTasks();
  }

  // This is used to update changes (for example adding new user to the app) and set the screen to default state
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      filterTasks();
      setLoading(true);
    });

    return unsubscribe;
  }, [navigation]);

  const onDateChange = (date, type) => {
    // If date is selected we use that date depending on other conditions
    if (date != null) {
      // Format selected date
      let selectedD = moment(Date.parse(date)).format("YYYY-MM-DD");

      // Filter tasks depending on selected date
      filterTasks(selectedD);

      // If we don't want to add new task (so we find "+" sign in the round button), that means the range selection is disabled, but we can set the start date in case the user want to use that date as start date
      if (btnText == "+") {
        setSelectedStartDate(selectedD);
        // If the range selection is enabled so the user wants to determine start and end date those will be set
      } else {
        // If there a date selected and the user presses the round button to add task, the already selected date will be set as start date so the end date can be set next
        if (type === "END_DATE") {
          setSelectedEndDate(selectedD);
          // If the user want to choose a new start date (after end date is selected), we can set again the start date first
        } else {
          setSelectedStartDate(selectedD);
          setSelectedEndDate(null);
        }
      }
    }
  };

  // Change the sign on the round shaped button by clicking on it
  const addTask = () => {
    // If there was "+" sign on the button when it was clicked,
    if (btnText == "+") {
      setEnabled(true); // the range selection will be enabled (line ~270),
      setBtnText("✕"); // and the text on the button will be switched to X
    } else {
      setBtnText("+"); // Otherwise set back the button to + sign,
      setEnabled(false); // and disable range selection,
      setSelectedEndDate(""); // and reset the start date and end date as well
      setSelectedStartDate("");
      filterTasks(); // reset filter as well
      setLoading(true); // and update the calendar in case the user added new task
    }
  };

  // Get the users using the ListUsers component
  const getUsers = (elements) => {
    setUsers(elements);
    let usernames = [];
    elements.forEach((element) => {
      let username = element.username;
      usernames.push(username);
    });
    setUserNames(usernames);
  };

  // Get days using the DateData component
  function getDays(customDatesStyles, taskData, startDates, endDates) {
    // Set an array for the dates which needs special styling
    let specialDaysArr = [];

    // If there is a date which is a start date and end date at the same time, that day will be added to the specialDaysArr
    startDates.map((sD) => {
      if (endDates.includes(sD)) {
        specialDaysArr.push(sD);
      }
    });

    // Set an array for the final styles, which doen't include any duplication also has there the special dates with combined styles
    let filteredCustomDatesStyles = [];

    // Set an array for all the dates in order to detect duplications
    let allDays = [];

    // Mapping through on the customDateStyles received from DateData and get the date from the actual element
    customDatesStyles.map((cDS) => {
      let date = cDS.date;
      if (!allDays.includes(date)) {
        // Proceed only the days which is not included yet in the allDays array
        if (!specialDaysArr.includes(date)) {
          // If the date is not included in the specialDayArr then the actual whole element from the customDatesStyles will be added to the filtered array as it is
          filteredCustomDatesStyles.push(cDS);
        } else {
          // Otherwise we change the style for that day and add the date to the filtered array with combined style (with red border and green background) as it indicates a start and end date at the same time
          filteredCustomDatesStyles.push({
            date: date,
            style: {
              backgroundColor: "#66ff33",
              borderWidth: 2,
              borderColor: "red",
            },
          });
        }
        allDays.push(date); // If the date in question wasn't included yet in the allDays array it will be added to prevent duplication for that day
      }
    });
    setHighlightedItems(filteredCustomDatesStyles); // Set equal the highlightedItems with the filtered array which will be used in the calendar as "customDatesStyles" (line ~271)
    setTaskList(taskData);
    setLoading(false);
  }

  let selectedTaskList = [];
  // Filter tasks by the selected date
  const filterTasks = (selectedD) => {
    taskList.forEach((t) => {
      // We get the task even if not a start date or an end date is selected, but the date in fitting in the range of the endDate and startDate of a particular task
      if (selectedD >= t.startDate && t.endDate >= selectedD) {
        let task = t.task;
        let userId = t.userId;
        let endDate = t.endDate;
        let userName;
        let fileName;

        // We get which user the task is assigned to by the userid which is included in the tasks table as well
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

  // Return view depending on the state of the round shaped button (296)
  function returnView() {
    if (btnText == "✕") {
      return (
        <View>
          <Text>Add Task</Text>
          <Text>Select a range from the calendar!</Text>
          <Text>Start date: {selectedStartDate}</Text>
          <Text>End date: {selectedEndDate}</Text>
          <Text>Assign task to: {route.params?.selectedUser.username}</Text>
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
          {/* Display the result of filterTasks() (168)*/}
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
  // While the screen is loading get datas from different components, but until that diplay the basic view then the refreshed view
  if (isLoading == true) {
    return (
      <View style={styles.container}>
        <DateData onSendDates={getDays} />
        <ListUsers setUsers={getUsers} />
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
