import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  // Destructure the needed properties from activityStore to be used.
  const { selectedActivity, editMode } = activityStore;
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
