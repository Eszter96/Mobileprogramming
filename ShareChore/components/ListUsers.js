import React, { useEffect, useState } from "react";

// This will fetch the data from the users table, this file is used by the UsersScreen.js (line 48) and the HomeScreen.js (line 235)
const ListUsers = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState("");

  async function fetchData() {
    //Variable res is used later, so it must be introduced before try block and so cannot be const
    let res = null;
    try {
      //This will wait the fetch to be done - it is also timeout which might be a response (server timeouts)
      res = await fetch(
        "https://inner-encoder-291018.ew.r.appspot.com/rest/userservice/getAll"
      );
    } catch (error) {
      setErrors(true);
    }

    try {
      //Getting json from the response
      const responseData = await res.json();

      // Sending the response to UsersScreen and HomeScreen
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
