import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined; // Match the type of props being passed in.
  selectActivity: (id:string) => void; // Since this function returns nothing, just add "=> void".
  cancelSelectActivity: () => void; // Takes no params, returns void.
}

// Destructuring the properties that we're passing into the dashboard rather than using "props: Props".
// TL;DR: {activities}: Prop > props: Props.
export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity}/>
      </Grid.Column>
      <Grid.Column width="6">
        {/* Check if activities exist before trying to access them. */}
        {/* New: Check if any activities have been selected before trying to access them. */}
        {selectedActivity && <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} />}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
}
