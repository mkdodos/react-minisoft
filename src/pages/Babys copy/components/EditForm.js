import React from 'react';
// import { addRow } from '../api';
import { Form, Button } from 'semantic-ui-react';

export default function EditForm({ dispatch, row }) {
  function handleChange(e) {
    dispatch({
      type: 'INPUT_CHANGE',
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: 'INIT_ROW', payload: { row, editIndex: 0 } });
  }
  return (
    <Form onSubmit={handleSubmit}>
      {/* <Form.Group> */}
      <Form.Field>
        <label>名稱</label>
        <input
          type="text"
          name="name"
          value={row.name}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>生日</label>
        <input
          type="text"
          name="birth"
          value={row.birth}
          onChange={handleChange}
        />
      </Form.Field>

      <Form.Field>
        <label>餘額</label>
        <input
          type="number"
          name="balance"
          value={row.balance}
          onChange={handleChange}
        />
      </Form.Field>
      {/* </Form.Group> */}
      <Button type="submit">Submit</Button>
    </Form>
  );
}
