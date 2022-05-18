import { useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}
// The purpose of this function is for the use of reusable text input to replace the hefty form code block in ActivityForm.
export default function MySelectInput(props: Props) {
  // Helpers allows us to manually set the touchStatus of our input componenet
  const [field, meta, helpers] = useField(props.name);
  return (
    // "!!"" casts object into a boolean
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
