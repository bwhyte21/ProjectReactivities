import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';

function App() {
  // Use the useState hook to help import Activities and set the response to 'activities'.
  // New: now the useState is a type of Activity[], which means the ": any" can be removed from activities.map(...) due to it now having Type Safety.
  const [activities, setActivities] = useState<Activity[]>([]);

  // Use the useEffect hook to use Axios to make our API call.
  // New: added Activity[] for TypeSafety for the response.
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/Activities').then((response) => {
      // Set the response data to activities.
      setActivities(response.data);
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '6.97385rem' }}>
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>
              {activity.title} | {activity.venue}, {activity.city}
            </List.Item>
          ))}
        </List>
      </Container>
    </Fragment>
  );
}

export default App;
