import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export default observer(function ActivityDetails() {
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  // Get id from route param.
  const { id } = useParams<{ id: string }>();

  // We want an effect after we get that activity.
  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  // If we don't have an activity, just return.
  if (loadingInitial || !activity) {
    return <LoadingComponent content={'Loading...'} />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity}/>
          <ActivityDetailedInfo activity={activity}/>
          <ActivityDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
          <ActivityDetailedSidebar/>
      </Grid.Column>
    </Grid>
  );
});
