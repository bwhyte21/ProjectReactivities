import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

// Styling out the Activity List in the View.Items SemanticUI format.
export default observer(function ActivityList() {
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <Fragment>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>

          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </Fragment>
  );
});
