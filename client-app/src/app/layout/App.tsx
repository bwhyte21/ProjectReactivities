import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  return (
    <Fragment>
      {/* Render home button separate from navbar */}
      <Route exact path="/" component={HomePage} />
      {/* (.+) means that any Route that matches the "/" + something else is going to match this particular Route */}
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '6.97385rem' }}>
              {/* Component navigation via Routes */}
              {/* Exact makes it so if a url shares a character, ignore the others that share that character. */}
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              {/* Create OR Edit an activity */}
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default observer(App); // 'observer' allows 'App' to be an observer for the Activity Store.
