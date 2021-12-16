import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm() {
  //#region Const vars
  // Use the newly created activityStore to replace the previous handler functionality.
  const { activityStore } = useStore();
  const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

  // This will either be the selected activity or (??) the props in an activity object.
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  };

  // We will use the useState hooks here to populate the initialState.
  const [activity, setActivity] = useState(initialState);

  //#endregion

  //#region Functions

  function submitHandler() {
    // Submit Create or Edit activity form.
    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    // Destructure the name and value to event.target. (The two props in the input element)
    const { name, value } = event.target;
    // "spread" the existing properties of the activity, target the property (name) to set the new value.
    setActivity({ ...activity, [name]: value });
  }

  //#endregion

  return (
    // "clearing" clears any previous floats inside this html. Gives the buttons at the bottom space to breathe.
    <Segment clearing>
      <Form onSubmit={submitHandler} autoComplete="off">
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={inputChangeHandler} />
        <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={inputChangeHandler} />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={inputChangeHandler} />
        <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={inputChangeHandler} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={inputChangeHandler} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={inputChangeHandler} />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
