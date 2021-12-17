import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
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
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by MySpaceTom</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here.</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  );
}
