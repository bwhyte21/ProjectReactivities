import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

// The purpose of this function is for the use of reusable text input to replace the hefty form code block in ActivityForm.
// "Partial" is to make every option in the props optional and we do'nt need to pass "onchange" as a prop, we have it in here already.
// It will also shutup the "onchange" error in ActivityForm.
export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
  // We know "!" it will have a name property, so relax the null constraint rule for this moment.
  // "helpers": to set the field itself, manually, using the helpers.
  const [field, meta, helpers] = useField(props.name!);
  return (
    // "!!"" casts object into a boolean
    <Form.Field error={meta.touched && !!meta.error}>
      {/* We use JS Date object as to make the Datepicker uniform across all browsers */}
      <DatePicker {...field} {...props} selected={(field.value && new Date(field.value)) || null} onChange={(value) => helpers.setValue(value)} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
