import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar() {
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img id="navLogo" src="/assets/logo.png" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          {/* Because openForm takes an id, and Create does not provide one that exists, we pass in an empty param. */}
          <Button onClick={() => activityStore.openForm()} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
