import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  // Use the useState hook to help import Activities and set the response to 'activities'.
  const [activities, setActivities] = useState([]);

  // Use the useEffect hook to use Axios to make our API call.
  useEffect(() => {
    axios.get('https://localhost:5001/api/Activities').then((response: any) => {
      // Set the response data to activities.
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}, {activity.venue}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
