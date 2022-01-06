import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

export default observer(function ActivityForm() {
  //#region Consts
  // History to push states to.
  const history = useHistory();
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
  // We will use the useState hooks here to populate the initialState.
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: '',
  });
  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required.'),
    description: Yup.string().required('The activity description is required.'),
    category: Yup.string().required(),
    date: Yup.string().required('The activity date is required.').nullable(),
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

  function handleFormSubmit(activity: Activity) {
    // Submit Create or Edit activity form.
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      // Go to new activity.
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      // Else the updated one.
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
  }

  //#endregion

  // Check if we're loading.
  if (loadingInitial) {
    return <LoadingComponent content={'Loading...'} />;
  }

  return (
    // "clearing" clears any previous floats inside this html. Gives the buttons at the bottom space to breathe.
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={(values) => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
            <MyDateInput placeholderText="Date" name="date" showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" />

            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated="right" positive type="submit" content="Submit" />
            <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
