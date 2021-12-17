import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;

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
          <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue"></Button>
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
  );
}
