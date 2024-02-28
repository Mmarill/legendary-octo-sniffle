import { Button, Form, H3, NumberInputField, TextField } from "@northlight/ui";
import React, { FC, Fragment } from "react";
import { AddUserFormProps } from "./interfaces";

const AddUserForm: FC<AddUserFormProps> = ({ onAddUser }) => {
  const validation = (values: { score: number }) => {
    const errors: any = {};
    if (values.score.toString().startsWith("0")) {
      errors.score = {
        message: "Score must be a positive number",
      };
    }
    return errors;
  };

  return (
    <Fragment>
      <H3 mt={8}>Add user</H3>
      <Form
        initialValues={{ name: "", score: 0 }}
        onSubmit={(values) => {
          onAddUser(values.name, values.score);
        }}
        validate={validation}
        enableReinitialize={true}
        formSettings={{
          mode: "onSubmit",
        }}
      >
        <TextField
          w={52}
          name="name"
          label="First Name"
          placeholder="Enter user name"
          isRequired={true}
        />
        <NumberInputField w={52} name="score" label="Score" />
        <Button mt={4} type="submit">
          Add user
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddUserForm;
