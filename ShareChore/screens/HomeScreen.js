import React, { useState } from "react";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  Button,
  Image,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import DateData from "../components/DateData";
import ListTasks from "../components/ListTasks";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ListUsers from "../components/ListUsers";

//This screen is used to display calendar also, add new tasks and view old ones
const HomeScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true); // This used to reload page or at the beginning to get the datas from components before the screen displays the calendar: delete date selection, display changes in tasks
  const [highlightedItems, setHighlightedItems] = useState([]); // Contains styles for start and end dates of tasks
  const [taskList, setTaskList] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]); // The result of the filterTasks function whenever the user clicks another date
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
          task: route.params?.editedTask,
          endDate: selectedEndDate,
          startDate: selectedStartDate,
          state: "not completed",
        }),
      }
    );

    const responseData = await response.text();
    console.log(responseData);

    Alert.alert("Task has been added!");

    // Reset every possible value used on screen
    setBtnText("+");
    setEnabled(false);
    setSelectedEndDate("");
    setSelectedStartDate("");
    filterTasks();
    navigation.setParams({
      editedTask: "",
      selectedUser: "",
    });
    setLoading(true);
  }

  // This is used to update changes (for example adding new user to the app) and set the screen to default state
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onDateChange();
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

      // If there a date selected and the user presses the round button to add task, the already selected date will be set as start date so the end date can be set next
      if (type === "END_DATE") {
        setSelectedEndDate(selectedD);
        // If the user want to choose a new start date (after end date is selected), we can set again the start date first
      } else {
        setSelectedStartDate(selectedD);
        setSelectedEndDate(null);
      }
    }
  };

  // Change the sign on the round shaped button by clicking on it
  const addTask = () => {
    // If there was "+" sign on the button when it was clicked,
    if (btnText == "+") {
      setEnabled(true); // the range selection will be enabled,
      setBtnText("✕"); // and the text on the button will be switched to X
    } else {
      setBtnText("+"); // Otherwise set back the button to + sign,
      setEnabled(false); // and disable range selection,
      setSelectedEndDate(""); // and reset the start date and end date as well
      setSelectedStartDate("");
      navigation.setParams({
        editedTask: "",
        selectedUser: "",
      });
      // Refresh page if escape from the add task view
      refresh();
    }
  };

  // Get the users using the ListUsers component
  function getUsers(elements) {
    setUsers(elements);
  }

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

    // Set an array for the final styles, which doesn't include any duplication also has there the special dates with combined styles
    let filteredCustomDatesStyles = [];

    // Set an array for all the dates in order to detect duplications
    let allDays = [];

    // Mapping through on the customDateStyles received from DateData and get the date from the actual element
    customDatesStyles.map((cDS) => {
      let date = cDS.date;
      if (!allDays.includes(date)) {
        // Proceed only with those days which are not included yet in the allDays array
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
    setHighlightedItems(filteredCustomDatesStyles); // Set equal the highlightedItems with the filtered array which will be used in the calendar as "customDatesStyles"
    setTaskList(taskData);
    setLoading(false);
  }

  let selectedTaskList = [];
  // Filter tasks by the selected date
  const filterTasks = (selectedD) => {
    taskList.forEach((t) => {
      // Get the task even if not a start date or an end date is selected, but the date in fitting in the range of the endDate and startDate of a particular task
      if (selectedD >= t.startDate && t.endDate >= selectedD) {
        let task = t.task;
        let userId = t.userId;
        let endDate = t.endDate;
        let startDate = t.startDate;
        let state = t.state;
        let id = t.id;
        let userName;
        let fileName;

        // Get which user the task is assigned to by the userid which is included in the tasks table in the database as well
        // Set as userName and fileName value the proper username and filename for the avatar (which comes from the users database)
        users.forEach((user) => {
          if (user.id == userId) {
            userName = user.username;
            fileName = user.filename;
          }
        });

        selectedTaskList.push({
          task,
          state,
          userId,
          endDate,
          startDate,
          userName,
          fileName,
          id,
        });
      }
    });
    setSelectedTasks(selectedTaskList);
  };

  // This function is called when the user presses the refresh button
  const refresh = () => {
    setLoading(true);
    filterTasks();
  };

  // Make active the selected task so the user will be allowed to edit that particular task by displaying there an edit button (returnnBtn)
  const selectTask = (key) => {
    let filteredTask = [];
    selectedTasks.forEach((t) => {
      let task = t.task;
      let state = t.state;
      let userId = t.userId;
      let endDate = t.endDate;
      let startDate = t.startDate;
      let id = t.id;
      let userName = t.userName;
      let fileName = t.fileName;
      let active;
      if (id == key) {
        active = true;
      } else {
        active = false;
      }
      filteredTask.push({
        task,
        state,
        userId,
        endDate,
        startDate,
        id,
        userName,
        fileName,
        active,
      });
    });
    setSelectedTasks(filteredTask);
  };

  function returnBtn(taskdata) {
    if (taskdata.active == true) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("EditTask", { task: taskdata })}
          style={{
            width: 30,
            height: 30,
            backgroundColor: "orange",
            borderRadius: 200,
            padding: 5,
            marginLeft: 30,
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../assets/edit_icon.png")}
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  // Return view depending on the state of the grey round button on the top of the screen "x/+"
  function returnView() {
    if (btnText == "✕") {
      return (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "grey",
            paddingTop: 15,
          }}
        >
          <View style={{ marginLeft: 30 }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: "black" }}>Task: </Text>
              <Text style={{ fontSize: 16, color: "white" }}>
                {route.params?.editedTask}
              </Text>
              <View>
                <View
                  style={{
                    width: 20,
                    height: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AddTask", {
                        title: "Add task", // This will be the header title of the screen we navigate to (see AddTaskScreen.js)
                        page: "Home", // Navigate to Add Task screen and send to that screen the name of the screen where from we navigate there so the data will be sent back to this screen
                      })
                    }
                  >
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={require("../assets/edit_icon.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: "black" }}>Assign to: </Text>
              <Text style={{ fontSize: 16, color: "white" }}>
                {route.params?.selectedUser.username}
              </Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AddUser", {
                      title: "Add User", // Same logic here as in case of adding task
                      page: "Home",
                    })
                  }
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={require("../assets/edit_icon.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                fontSize: 15,
                color: "black",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Select a range from the calendar!
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 15, color: "black", marginBottom: 5 }}>
                Start date:{" "}
              </Text>
              <Text style={{ fontSize: 15, color: "white", marginBottom: 5 }}>
                {selectedStartDate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 15, color: "black", marginBottom: 5 }}>
                End date:{" "}
              </Text>
              <Text style={{ fontSize: 15, color: "white", marginBottom: 5 }}>
                {selectedEndDate}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Button
              title="Save"
              disabled={
                // Keep disabled the button until the user doesn't give every data needed to create a new task
                selectedStartDate != "" &&
                selectedEndDate != "" &&
                route.params?.editedTask != "" &&
                route.params?.selectedUser.username != ""
                  ? false
                  : true
              }
              onPress={addData}
            />
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
          {/* Display the result of filterTasks()*/}
          <FlatList
            keyExtractor={(item) => selectedTasks.indexOf(item).toString()}
            data={selectedTasks}
            renderItem={(itemData) => (
              <View
                key={itemData.item.id}
                style={{ marginBottom: 5, flexDirection: "row" }}
              >
                <TouchableOpacity
                  onPress={() => selectTask(itemData.item.id)}
                  style={{ flexDirection: "row" }}
                >
                  <ListTasks
                    task={itemData.item.task}
                    endDate={itemData.item.endDate}
                    userId={itemData.item.userId}
                    fileName={itemData.item.fileName}
                    userName={itemData.item.userName}
                    id={itemData.item.id}
                    active={itemData.item.active}
                    state={itemData.item.state}
                  />
                </TouchableOpacity>
                {returnBtn(itemData.item)}
              </View>
            )}
          />
        </View>
      );
    }
  }
  // While the screen is loading get datas from different components
  if (isLoading == true) {
    return (
      <View style={styles.container}>
        <ListUsers setUsers={getUsers} />
        <DateData onSendDates={getDays} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "white",
            paddingTop: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginVertical: 20,
              color: "#0693e3",
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            ShareChore
          </Text>
          <View
            style={{
              position: "absolute",
              top: "50%",
              right: "5%",
              backgroundColor: "grey",
              width: 30,
              height: 30,
              justifyContent: "center",
              borderRadius: 200,
            }}
          >
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="orange"
              style={{ borderRadius: 200, width: 30, height: 30 }}
              onPress={addTask}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  {btnText}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{
              position: "absolute",
              top: "50%",
              right: "20%",
              backgroundColor: "orange",
              width: 30,
              height: 30,
              justifyContent: "center",
              borderRadius: 200,
            }}
          >
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="orange"
              style={{ borderRadius: 200, width: 30, height: 30, padding: 5 }}
              onPress={refresh}
            >
              <View>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={require("../assets/refreshicon.png")}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ paddingTop: 10 }}>
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
        </View>
        {returnView()}
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
});
