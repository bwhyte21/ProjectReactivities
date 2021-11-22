import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined; // Match the type of props being passed in.
  selectActivity: (id: string) => void; // Since this function returns nothing, just add "=> void".
  cancelSelectActivity: () => void; // Takes no params, returns void.
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  upsertActivity: (activity: Activity) => void;
  deleteActivity: (id:string) => void;
}

// Destructuring the properties that we're passing into the dashboard rather than using "props: Props".
// TL;DR: {activities}: Prop > props: Props.
export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  upsertActivity,
  deleteActivity
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList 
        activities={activities} 
        selectActivity={selectActivity} 
        deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {/* Check if activities exist before trying to access them. */}
        {/* Check if any activities have been selected before trying to access them. */}
        {selectedActivity && !editMode && (
          <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm} />
        )}
        {/* We only want the current activity form component to show unless edit mode is active. */}
        {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} upsertActivity={upsertActivity}/>}
      </Grid.Column>
    </Grid>
  );
}
