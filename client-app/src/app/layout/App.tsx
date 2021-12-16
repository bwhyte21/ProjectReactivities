import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';

function App() {
    return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '6.97385rem' }}>
        {/* Component navigation via Routes */}
        <Route exact path="/" component={HomePage} />
        <Route path="/activities" component={ActivityDashboard} />
        <Route path="/createActivity" component={ActivityForm} />
      </Container>
    </Fragment>
  );
}

export default observer(App); // 'observer' allows 'App' to be an observer for the Activity Store.
