import React, { useEffect, useState } from "react";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";
const DateData = (props) => {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState("");
  const [isLoading, setLoading] = useState(true);
  //  const [dates, setDates] = useState([]);
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
          console.log(data);
          let customDatesStyles = [];
          data.map((date) => {
            let startDate = moment(Date.parse(date.startDate)).format(
              "YYYY-MM-DD"
            );
            let endDate = moment(Date.parse(date.endDate)).format("YYYY-MM-DD");
            customDatesStyles.push({
              date: endDate,
              style: { borderWidth: 2, borderColor: "red" },
            });
            customDatesStyles.push({
              date: startDate,
              style: { backgroundColor: "#66ff33" },
            });
          });
          props.onSendDates(customDatesStyles);
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
  return null;
};
export default DateData;
