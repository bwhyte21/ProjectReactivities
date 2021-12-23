import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img id="navLogo" src="/assets/logo.png" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name="Activities" />
        <Menu.Item as={NavLink} to='/errors' name="Error Testing" />
        <Menu.Item>
          {/* Because openForm takes an id, and Create does not provide one that exists, we pass in an empty param. */}
          <Button as={NavLink} to='/createActivity' positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
