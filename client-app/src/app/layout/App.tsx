import React, { Fragment, useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  //#region Consts
  // New: Temp location for ActivityStore react hook.
  const { activityStore } = useStore();

  // Use the useState hook to help import Activities and set the response to 'activities'.
  // Now the useState is a type of Activity[], which means the ": any" can be removed from activities.map(...) due to it now having Type Safety.
  const [activities, setActivities] = useState<Activity[]>([]);
  // New: Adding " | undefined" to state that the incoming activity can be an activity OR undefined.
  const [selectedActivity, setSelctedActivity] = useState<Activity | undefined>(undefined);
  // New: Display the status of form whether creating or editing.
  const [editMode, setEditMode] = useState(false);
  // New: Display loading animation from semanticUI.
  const [loading, setLoading] = useState(true);
  // New: Display when an activity is being submitted to the API.
  const [submitFlag, setSubmitFlag] = useState(false);

  //#endregion

  // Use the useEffect hook to use Axios to make our API call.
  // Added Activity[] for TypeSafety for the response.
  // New: Using the newly added "agent" from the axios configuration in agent.ts
  useEffect(() => {
    agent.Activities.list().then((response) => {
      // New: Update the date property before setting the activity.
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0]; // temp fix for date formatting.
        activities.push(activity);
      });
      // Set the response data to activities.
      setActivities(activities);
      // Kill loading anim once activities have "loaded".
      setLoading(false);
    });
  }, []);

  //#region Functions

  // Handle the selection of activitities via "View" button click.
  function selectActivityHandler(id: string) {
    // As soon as an activity ("a") is matched with the incoming activity ("id"), select activity.
    setSelctedActivity(activities.find((a) => a.id === id));
  }

  // Handle the deselection of an activity via "Cancel" button click in the form.
  function cancelSelectActivityHandler() {
    // Set selected activity to undefined.
    setSelctedActivity(undefined);
  }

  // Handle the activity form being displayed when the user wishes to create/edit an activity.
  function formOpenHandler(id?: string) {
    // If "id" is populated, select activity, else cancel.
    id ? selectActivityHandler(id) : cancelSelectActivityHandler();
    // Set edit mode to true.
    setEditMode(true);
  }

  // Handle the activity form being hidden when the user wishes to cancel activity creation/edition.
  function formCloseHandler() {
    // If an activity is being created/edited and the user clicks "cancel", close the form.
    setEditMode(false);
  }

  // Handle the create/edit functionality for a new or existing activity.
  function upsertActivityHandler(activity: Activity) {
    // Set submit to true to trigger the loading indicator.
    setSubmitFlag(true);
    // Check whether we are updating or creating an activity.
    if (activity.id) {
      // If updating Activity.
      agent.Activities.update(activity).then(() => {
        // Update activity.
        setActivities([...activities.filter((x) => x.id !== activity.id), activity]);
        // Show updated activity.
        setSelctedActivity(activity);
        // Kill Edit mode.
        setEditMode(false);
        // Kill loading anim.
        setSubmitFlag(false);
      });
    } else {
      // If creating an Activity.
      // Generate a GUID for the new activity.
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        // THEN create activity.
        setActivities([...activities, activity]); // "..." = spread operator.
        // Show created activity.
        setSelctedActivity(activity);
        // Kill Edit mode.
        setEditMode(false);
        // Kill loading anim.
        setSubmitFlag(false);
      });
    }
  }

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
  if (loading) return <LoadingComponent content="Loading Reactivities..." />;

  return (
    <Fragment>
      <NavBar openForm={formOpenHandler} />
      <Container style={{ marginTop: '6.97385rem' }}>
        <h2>{activityStore.title}</h2>
        <Button content="Add exclamation!" positive onClick={activityStore.setTitle} />
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
          deleteActivity={deleteActivityHandler}
          submitFlag={submitFlag}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App); // 'observer' allows 'App' to be an observer for the Activity Store.
