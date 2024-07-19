import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function EditForm({ row, setRow }) {
  // 欄位改變值時 , 設定 row 值
  const handleChange = (e) => {
    setRow({ ...row, qty: e.target.value });    
  };
  return (
    <div>
      <Form>
        <Form.Field>
          <label>日期</label>
          <input type="date" name="date" defaultValue="" />
        </Form.Field>
        <Form.Field>
          <label>數量</label>
          <input
            type="number"
            name="qty"
            value={row.qty}
            onChange={handleChange}
          />
        </Form.Field>
        {/* <Form.Field>
          <label>單價</label>
          <input type="number" name="price" value={row.price} />
        </Form.Field>
        <Form.Field>
          <label>備註</label>
          <input type="text" name="price" value={row.note} />
        </Form.Field> */}
        <Button primary fluid type="submit">
          儲存
        </Button>
      </Form>
    </div>
  );
}
