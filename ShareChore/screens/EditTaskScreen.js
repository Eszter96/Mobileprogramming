import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditTaskScreen = ({ route, navigation }) => {
  const [selectedEndDate, setEndDate] = useState(route.params.task.endDate);
  const [completed, setCompleted] = useState("");
  const [color, setColor] = useState("");

  let task =
    route.params?.editedTask != ""
      ? route.params?.editedTask
      : route.params.task.task;
  let username =
    route.params?.selectedUser != ""
      ? route.params?.selectedUser.username
      : route.params.task.userName;
  let userId =
    route.params?.selectedUser != ""
      ? route.params?.selectedUser.id
      : route.params.task.userId;
  let customDatesStyles = [
    {
      date: route.params.task.startDate,
      style: {
        backgroundColor: "#66ff33",
      },
    },
  ];

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

  const onDateChange = (date, type) => {
    if (date != null) {
      let selectedD = moment(Date.parse(date)).format("YYYY-MM-DD");
      setEndDate(selectedD);
    }
  };

  const changeStatus = (status) => {
    setCompleted(status);
    if (status == "completed") {
      setColor("green");
    } else {
      setColor("red");
    }
  };

  const date = new Date();
  const formattedDate = moment(date).format("YYYY-MM-DD");
  let minDate =
    route.params.task.startDate > formattedDate
      ? route.params.task.startDate
      : formattedDate;
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
