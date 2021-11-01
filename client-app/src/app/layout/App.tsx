import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

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
        {/* Pass in 'activities' state into the dashboard */}
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
}

export default App;
