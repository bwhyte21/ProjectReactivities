import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  //#region Consts

  // Use the useState hook to help import Activities and set the response to 'activities'.
  // Now the useState is a type of Activity[], which means the ": any" can be removed from activities.map(...) due to it now having Type Safety.
  const [activities, setActivities] = useState<Activity[]>([]);
  // New: Adding " | undefined" to state that the incoming activity can be an activity OR undefined.
  const [selectedActivity, setSelctedActivity] = useState<Activity | undefined>(undefined);
  // New: Display the status of form whether creating or editing.
  const [editMode, setEditMode] = useState(false);
  
  //#endregion

  // Use the useEffect hook to use Axios to make our API call.
  // Added Activity[] for TypeSafety for the response.
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/Activities').then((response) => {
      // Set the response data to activities.
      setActivities(response.data);
    });
  }, []);

  //#region Functions

  function selectActivityHandler(id: string) {
    // New: As soon as an activity ("a") is matched with the incoming activity ("id"), select activity.
    setSelctedActivity(activities.find((a) => a.id === id));
  }

  function cancelSelectActivityHandler() {
    // New: set selected activity to undefined.
    setSelctedActivity(undefined);
  }

  function formOpenHandler(id?: string) {
    // If "id" is populated, select activity, else cancel.
    id ? selectActivityHandler(id) : cancelSelectActivityHandler();
    // Set edit mode to true.
    setEditMode(true);
  }

  function formCloseHandler() {
    // If an activity is being created/edited and the user clicks "cancel", close the form.
    setEditMode(false);
  }

  
  function upsertActivityHandler(activity: Activity){
    // Check whether we are updating or creating an activity.  check ? updateAct : createAct.
    activity.id ? setActivities([...activities.filter((x) => x.id !== activity.id), activity]) : setActivities([...activities, activity]); // "..." = spread operator.
    // Set edit mode to false.
    setEditMode(false);
    // Set selected activity to the one just created to display successful creatrion.
    setSelctedActivity(activity);
  }

  //#endregion

  return (
    <Fragment>
      <NavBar openForm={formOpenHandler} />
      <Container style={{ marginTop: '6.97385rem' }}>
        {/* Pass in 'activities' state into the dashboard */}
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivityHandler}
          cancelSelectActivity={cancelSelectActivityHandler}
          editMode={editMode}
          openForm={formOpenHandler}
          closeForm={formCloseHandler}
          upsertActivity={upsertActivityHandler}
        />
      </Container>
    </Fragment>
  );
}

export default App;
