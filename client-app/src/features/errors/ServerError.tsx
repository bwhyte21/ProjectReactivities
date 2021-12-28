import { observer } from 'mobx-react-lite';
import { Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer(function ServerError() {
  const { commonStore } = useStore();
  return (
    <Container>
      <Header as="h1" content="Server Error" />
      {/* optional chaining => "property?.property" */}
      <Header sub as="h5" color="red" content={commonStore.error?.message} />
      {commonStore.error?.details && (
        <Segment>
          <Header as="h4" content="Stack trace" color="teal" />
          <code className="serverErrorCodeBlock">{commonStore.error.details}</code>
        </Segment>
      )}
    </Container>
  );
});
