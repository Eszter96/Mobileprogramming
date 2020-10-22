import { useEffect, useState } from "react";
import moment from "moment";

// This file is fetching the data from the tasks table, which is used by the HomeScreen.js

const DateData = (props) => {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState("");
  const [isLoading, setLoading] = useState(true);

  async function fetchData() {
    await fetch(
      "https://inner-encoder-291018.appspot.com/rest/taskservice/getalltask"
    ).then((result) =>
      result
        .json()
        .catch((err) => {
          setSomeErrors(err);
          setErrors(true);
          console.log("JSON Error: " + err);
        })
        .then((data) => {
          // The result is received as "data"
          let startDates = [];
          let endDates = [];
          let taskData = [];
          let customDatesStyles = []; // Array of styles for particular days depending on being endDate or startDate of a task

          data.forEach((date) => {
            let id = date.id;
            let userId = date.userId;
            let task = date.task;
            let state = date.state;
            // Format dates
            let startDate = moment(Date.parse(date.startDate)).format(
              "YYYY-MM-DD"
            );
            let endDate = moment(Date.parse(date.endDate)).format("YYYY-MM-DD");
            taskData.push({ task, startDate, endDate, userId, id, state });

            // Adding style object including dates to the customDatesStyles array used by the calendar - if it is endDate it will be red border, if it is startDate it will be green
            customDatesStyles.push({
              date: endDate,
              style: { borderWidth: 3, borderColor: "red" },
            });

            customDatesStyles.push({
              date: startDate,
              style: { backgroundColor: "#66ff33" },
            });

            // Get all startDates and endDates in separated arrays
            startDates.push(startDate);
            endDates.push(endDate);
          });

          // Send created arrays (customDatesStyles, startDates, endDates) and fetching results as a whole (taskData) to HomeScreen.js
          props.onSendDates(customDatesStyles, taskData, startDates, endDates);
        })
        .catch((anError) => {
          setSomeErrors(anError);
          console.log(anError);
        })
    );
  }

  useEffect(() => {
    if (isLoading == true) {
      fetchData();
      setLoading(false);
    }
  });

  // Don't need to return anything here
  return null;
};
export default DateData;
