import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

//This screen can be reached by clicking the edit button for an already existing task appears for selected day
const EditTaskScreen = ({ route, navigation }) => {
  const [selectedEndDate, setEndDate] = useState(route.params.task.endDate);
  const [completed, setCompleted] = useState("");
  const [color, setColor] = useState("");

  // The editedTask has an initial parameter (see HomeTab screen) which is an empty string. If that's changing that new value will be set for the task variable.
  let task =
    route.params?.editedTask != ""
      ? route.params?.editedTask
      : route.params.task.task;

  // The same logic here as in case of editedTask
  let username =
    route.params?.selectedUser != ""
      ? route.params?.selectedUser.username
      : route.params.task.userName;

  // The since the selectedUser contains both username and id, we can get the id from it (see UserInput.js component)
  let userId =
    route.params?.selectedUser != ""
      ? route.params?.selectedUser.id
      : route.params.task.userId;

  // Indicate the startdate of the task what the user want to edit
  let customDatesStyles = [
    {
      date: route.params.task.startDate,
      style: {
        backgroundColor: "#66ff33",
      },
    },
  ];

  // By setting the mindate will be disabled those dates what are before the start date or if the currend date is bigger then the start date the we set that as mindate
  const date = new Date(); // Get current date
  const formattedDate = moment(date).format("YYYY-MM-DD");
  let minDate =
    route.params.task.startDate > formattedDate
      ? route.params.task.startDate
      : formattedDate;

  // With this function we can save the changes
  async function saveData() {
    const response = await fetch(
      "https://inner-encoder-291018.ew.r.appspot.com/rest/taskservice/edittask",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: route.params.task.id,
          task: task,
          endDate: selectedEndDate,
          state: completed,
          userId: userId,
        }),
      }
    );

    const responseData = await response.text();
    console.log(responseData);

    Alert.alert("Task has been modified!");
  }

  // The selected date will be set to the endDate
  const onDateChange = (date) => {
    if (date != null) {
      let selectedD = moment(Date.parse(date)).format("YYYY-MM-DD");
      setEndDate(selectedD);
    }
  };

  // If the user press the "completed" text then it becomes green indicating that the user set the status to complete, and if the "Not completed" text is selected then it becomes red
  // The other text will be always set back to grey
  const changeStatus = (status) => {
    setCompleted(status);
    if (status == "completed") {
      setColor("green");
    } else {
      setColor("red");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 10 }}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={false}
          todayBackgroundColor="orange"
          todayTextStyle={{
            fontWeight: "bold",
            color: "white",
          }}
          selectedDayStyle={{ borderWidth: 3, borderColor: "red" }}
          minDate={minDate}
          onDateChange={onDateChange}
          customDatesStyles={customDatesStyles}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          Select end date from the calendar!{" "}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16 }}>End date: </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {selectedEndDate}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>Task: </Text>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddTask", {
                  title: "Edit task",
                  page: "EditTask",
                })
              }
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{task}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>Username: </Text>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddUser", {
                  title: "Edit user",
                  page: "EditTask",
                })
              }
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {username}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={() => changeStatus("completed")}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: color == "green" ? "green" : "grey",
              }}
            >
              COMPLETED
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeStatus("not completed")}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: color == "red" ? "red" : "grey",
              }}
            >
              NOT COMPLETED
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Button title="Save changes" onPress={() => saveData()} />
      </View>
    </View>
  );
};
export default EditTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
});
