import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function ActivityDetails() {
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;

  // If we don't have an activity, just return.
  if (!activity) return <LoadingComponent content={''} />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button onClick={() => openForm(activity.id)} basic color="blue" content="Edit" />
          <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
