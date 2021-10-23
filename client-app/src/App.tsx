import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  // Use the useState hook to help import Activities and set the response to 'activities'.
  const [activities, setActivities] = useState([]);

  // Use the useEffect hook to use Axios to make our API call.
  useEffect(() => {
    axios.get("https://localhost:5001/api/Activities").then((response: any) => {
      // monitor response, remove later
      console.log(response);
      // Set the response data to activities.
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {activities.map((activity: any) => (
            <li key={activity.id}>
              {activity.title}, {activity.venue}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
