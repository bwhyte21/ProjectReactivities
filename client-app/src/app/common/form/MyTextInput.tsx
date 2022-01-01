import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}
// The purpose of this function is for the use of reusable text input to replace the hefty form code block in ActivityForm.
export default function MyTextInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    // "!!"" casts object into a boolean
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input title={props.label} {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
