import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {
    //#region Const(s)
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  // Destructure the needed properties from activityStore to be used.
  const { selectedActivity, editMode } = activityStore;
  //#endregion

  // Use the useEffect hook to use Axios to make our API call.
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  // Check to see if the app is loading before displaying the content.
  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Reactivities..." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {/* Check if an activity has been selected before trying to access it. */}
        {selectedActivity && !editMode && <ActivityDetails />}
        {/* We only want the current activity form component to show unless edit mode is active. */}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
});
