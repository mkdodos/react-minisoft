import React from 'react';
// import { addRow } from '../api';
import { Form, Button } from 'semantic-ui-react';
import { actions } from '../constants/actions';
export default function EditForm({ dispatch, state }) {
  const { baby, editedIndex } = state;
  function handleChange(e) {
    dispatch({
      type: actions.INPUT_CHANGE,
      payload: { baby: { name: e.target.name, value: e.target.value } },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(baby);
    dispatch({ type: actions.ADD_BABY, payload: { baby, editedIndex: -1 } });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>姓名</label>
        <input
          type="text"
          name="name"
          value={baby.name}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>生日</label>
        <input
          type="text"
          name="birth"
          value={baby.birth}
          onChange={handleChange}
        />
      </Form.Field>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
