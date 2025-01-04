import React from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button } from "rsuite";

const DynamicForm = ({ fields, onSubmit }) => {
  return (
    <Form fluid onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <FormGroup key={index}>
          <ControlLabel>{field.label}</ControlLabel>
          <FormControl
            name={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            {...field.props}
          />
        </FormGroup>
      ))}
      <Button appearance="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DynamicForm;
