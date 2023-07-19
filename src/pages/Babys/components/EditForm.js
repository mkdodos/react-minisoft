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
    console.log(editedIndex);
    // 用 editedIndex 判斷新增或編輯
    if(editedIndex==-1){
      dispatch({ type: actions.ADD_BABY, payload: { baby } });
    }else{
      dispatch({ type: actions.UPDATE_ROW, payload: { baby,editedIndex } });
    }
    
    
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
          type="date"
          name="birth"
          value={baby.birth}
          onChange={handleChange}
        />
      </Form.Field>

      <Form.Field>
        <label>到期日</label>
        <input
          type="date"
          name="expireDate"
          value={baby.expireDate}
          onChange={handleChange}
        />
      </Form.Field>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
