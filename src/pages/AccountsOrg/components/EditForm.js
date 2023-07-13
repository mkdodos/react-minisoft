import React from 'react';
import { addRow } from '../api';
import { Form, Button } from 'semantic-ui-react';

export default function EditForm({ rowDispatch, row, rowsDispatch }) {
  function handleChange(e) {
    rowDispatch({
      type: 'INPUT_CHANGE',
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (row.index > -1) {
      rowsDispatch({ type: 'UPDATE_ROW', payload: { row, index: row.index } });
    } else {
      const fetchRow = async () => {
        const [data] = await Promise.all([addRow(row)]);
        rowsDispatch({ type: 'ADD_ROW', payload: { ...row, id: data } });
      };
      fetchRow();
    }

    rowDispatch({ type: 'INIT_ROW' });
    
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
              <label>順序</label>
              <input
                type="number"
                name="prior"
                value={row.prior}
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
