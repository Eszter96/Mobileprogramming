import React, { useEffect, useState } from "react";

// This will fetch the data from the users table, the result is used by the UsersScreen.js, UserInput.js and the HomeScreen.js
const ListUsers = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState("");

  async function fetchData() {
    let res = null;
    try {
      res = await fetch(
        "https://inner-encoder-291018.ew.r.appspot.com/rest/userservice/getAll"
      );
    } catch (error) {
      setErrors(true);
    }

    try {
      const responseData = await res.json();

      // Sending the response data on screen where it's used
      props.setUsers(responseData);
    } catch (err) {
      setErrors(true);
      setSomeErrors("ERROR: " + hasError + " my error " + err);
      console.log(someError);
    }
  }

  useEffect(() => {
    if (isLoading == true) {
      fetchData();
      setLoading(false);
    }
  });
  return null;
};
export default ListUsers;
