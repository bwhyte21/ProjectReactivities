import { Fragment } from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function ActivityFilters() {
  return (
    <Fragment>
      <Menu vertical size="large" style={{ width: '100%', marginTop: 27}}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm Going" />
        <Menu.Item content="I'm Hosting" />
      </Menu>
      <Header />
      <Calendar />
    </Fragment>
  );
}
