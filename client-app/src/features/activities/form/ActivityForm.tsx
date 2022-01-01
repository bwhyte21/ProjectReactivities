import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

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
  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required.'),
    description: Yup.string().required('The activity description is required.'),
    category: Yup.string().required(),
    date: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
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
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={(values) => console.log(values)}>
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextInput placeholder="Description" name="description" />
            <MyTextInput placeholder="Category" name="category" />
            <MyTextInput placeholder="Date" name="date" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button loading={loading} floated="right" positive type="submit" content="Submit" />
            <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
