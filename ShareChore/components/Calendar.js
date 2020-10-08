import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import DateData from "./DateData";

const Calendar = () => {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [highlightedItems, setHighlightedItems] = useState([]);

  const onDateChange = (date, type) => {
    if (date != null) {
      let selectedDate = date.toString();

      if (type === "END_DATE") {
        setSelectedEndDate(selectedDate);
        //show add task button
      } else {
        setSelectedStartDate(selectedDate);
        setSelectedEndDate("");
      }
    }
  };

  function getDays(customDatesStyles) {
    setHighlightedItems(customDatesStyles);
    setLoading(false);
  }

  useEffect(() => {
    if (isLoading == true) {
    }
  }, []);

  console.log(highlightedItems);
  if (isLoading == true) {
    return (
      <View style={styles.container}>
        <DateData onSendDates={getDays} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          todayBackgroundColor="orange"
          todayTextStyle={{ fontWeight: "bold", color: "white" }}
          selectedDayColor="grey"
          selectedDayTextColor="#FFFFFF"
          customDatesStyles={highlightedItems}
          onDateChange={onDateChange}
        />
      </View>
    );
  }
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    marginTop: 30,
  },
});
