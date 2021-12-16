import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {
  //#region Const(s)
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
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
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
});
