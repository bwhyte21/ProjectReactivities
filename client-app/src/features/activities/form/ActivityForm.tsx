import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';

export default observer(function ActivityForm() {
  //#region Consts
  // History to push states to.
  const history = useHistory();
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
  // We will use the useState hooks here to populate the initialState.
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  //#endregion

  //#region Functions

  //   function submitHandler() {
  //     // Submit Create or Edit activity form.
  //     if (activity.id.length === 0) {
  //       let newActivity = {
  //         ...activity,
  //         id: uuid(),
  //       };
  //       // Go to new activity.
  //       createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
  //     } else {
  //       // Else the updated one.
  //       updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
  //     }
  //   }

  //   function inputChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //     // Destructure the name and value to event.target. (The two props in the input element)
  //     const { name, value } = event.target;
  //     // "spread" the existing properties of the activity, target the property (name) to set the new value.
  //     setActivity({ ...activity, [name]: value });
  //   }

  //#endregion

  // Check if we're loading.
  if (loadingInitial) {
    return <LoadingComponent content={'Loading...'} />;
  }

  return (
    // "clearing" clears any previous floats inside this html. Gives the buttons at the bottom space to breathe.
    <Segment clearing>
      <Formik enableReinitialize initialValues={activity} onSubmit={(values) => console.log(values)}>
        {({ values: activity, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleChange} />
            <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleChange} />
            <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleChange} />
            <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleChange} />
            <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleChange} />
            <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleChange} />
            <Button loading={loading} floated="right" positive type="submit" content="Submit" />
            <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
