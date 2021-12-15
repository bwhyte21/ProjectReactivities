import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  //#region Consts
  // New ActivityStore react hook to replace handlers and present cleaner code.
  const { activityStore } = useStore();

  // Use the useState hook to help import Activities and set the response to 'activities'.
  // Now the useState is a type of Activity[], which means the ": any" can be removed from activities.map(...) due to it now having Type Safety.
  const [activities, setActivities] = useState<Activity[]>([]);
  // Display when an activity is being submitted to the API.
  const [submitFlag, setSubmitFlag] = useState(false);

  //#endregion

  // Use the useEffect hook to use Axios to make our API call.
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  //#region Functions

  // Handle the deletion of an activity.
  function deleteActivityHandler(id: string) {
    // Set submit to true to trigger the loading indicator.
    setSubmitFlag(true);
    // Delete the activity that matches the id selected.
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      // We use the submit flag, but aren't actually submitting because...delete.
      setSubmitFlag(false);
    });
  }

  //#endregion

  // Check to see if the app is loading before displaying the content.
  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Reactivities..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '6.97385rem' }}>
        {/* Pass in 'activities' state into the dashboard */}
        <ActivityDashboard
          activities={activityStore.activities}
          deleteActivity={deleteActivityHandler}
          submitFlag={submitFlag}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App); // 'observer' allows 'App' to be an observer for the Activity Store.
