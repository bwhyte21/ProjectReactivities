import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

interface Props {
  activities: Activity[];
  deleteActivity: (id: string) => void;
  submitFlag: boolean;
}

// Styling out the Activity List in the View.Items SemanticUI format.
export default function ActivityList({ activities, deleteActivity, submitFlag }: Props) {
  // Grab the id for the activty that is to be deleted.
  const [target, setTarget] = useState('');
  // Delete click event handler.
  function deleteActivityHandler(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    // Get the target's name.
    setTarget(e.currentTarget.name);
    // Delete it.
    deleteActivity(id);
  }
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
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
                  loading={submitFlag && target === activity.id}
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
}
