import { Message } from 'semantic-ui-react';

interface Props {
  errors: string[] | null;
}

export default function ValidationErrors({ errors }: Props) {
  // List out the validation errors from the api in a separate component.
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: any, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
