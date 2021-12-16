import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

// Styling out the Activity List in the View.Items SemanticUI format.
export default observer(function ActivityList() {
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  const { deleteActivity, activitiesByDate, loading } = activityStore;

  // Grab the id for the activty that is to be deleted.
  const [target, setTarget] = useState('');
  // Delete click event handler.
  function deleteActivityHandler(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    // Get the target's name.
    setTarget(e.currentTarget.name);
    // Delete it.
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => activityStore.selectActivity(activity.id)} floated="right" content="View" color="blue"></Button>
                <Button
                  name={activity.id}
                  loading={loading && target === activity.id}
                  onClick={(e) => deleteActivityHandler(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"></Button>
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
