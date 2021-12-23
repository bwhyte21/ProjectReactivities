import React, { Fragment } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';

export default function TestErrors() {
  const baseUrl = 'https://localhost:5001/api/';

  function handleNotFound() {
    axios.get(baseUrl + 'ApiErrorTesting/not-found').catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios.get(baseUrl + 'ApiErrorTesting/bad-request').catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios.get(baseUrl + 'ApiErrorTesting/server-error').catch((err) => console.log(err.response));
  }

  function handleUnauthorized() {
    axios.get(baseUrl + 'ApiErrorTesting/unauthorized').catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios.get(baseUrl + 'activities/notaguid').catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios.post(baseUrl + 'activities', {}).catch((err) => console.log(err.response));
  }

  return (
    <Fragment>
      <Header as="h1" content="Test Error component" />
      <Segment>
        <Button.Group widths="7">
          <Button onClick={handleNotFound} content="Not Found" basic primary />
          <Button onClick={handleBadRequest} content="Bad Request" basic primary />
          <Button onClick={handleValidationError} content="Validation Error" basic primary />
          <Button onClick={handleServerError} content="Server Error" basic primary />
          <Button onClick={handleUnauthorized} content="Unauthorized" basic primary />
          <Button onClick={handleBadGuid} content="Bad Guid" basic primary />
        </Button.Group>
      </Segment>
    </Fragment>
  );
}
