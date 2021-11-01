import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';

interface Props {
  activities: Activity[];
}

// Destructuring the properties that we're passing into the dashboard rather than using "props: Props".
// TL;DR: {activities}: Prop > props: Props.
export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities}/>
      </Grid.Column>
    </Grid>
  );
}
