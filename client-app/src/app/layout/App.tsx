import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  //#region Consts
  // New ActivityStore react hook to replace handlers and present cleaner code.
  const { activityStore } = useStore();

  //#endregion

  // Use the useEffect hook to use Axios to make our API call.
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  // Check to see if the app is loading before displaying the content.
  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Reactivities..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '6.97385rem' }}>
        {/* Pass in 'activities' state into the dashboard */}
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App); // 'observer' allows 'App' to be an observer for the Activity Store.
