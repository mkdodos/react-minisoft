import { useEffect, useState } from 'react';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import CateSelect from '../../../components/CateSelect';

export default function EditForm({ row, setRow, saveRow, loading }) {
  useEffect(() => {}, []);

  // 輸入資料時同時設定 row
  const inputChange = (e) => {    
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const handleCateChange = (e,{value}) => {
    setRow({ ...row, cate: value });
  };

  return (
    <div>
      <Form>
      <Form.Field>
          <label>期數</label>
          <input
            type="number"
            value={row.section}
            onChange={inputChange}
            name="section"
          />
        </Form.Field>
        <Form.Field>
          <label>日期</label>
          <input
            type="date"
            value={row.date}           
            onChange={inputChange}
            name="date"
          />
        </Form.Field>
        <Form.Field>
          <label>類別</label>
          <CateSelect cate={row.cate} onChange={handleCateChange} />
        </Form.Field>
        
      
        <Form.Field>
          <label>項目</label>
          <input
            placeholder=""
            value={row.title}
            onChange={inputChange}
            name="title"
          />
        </Form.Field>

        <Form.Field>
          <label>金額</label>
          <input
            type="number"            
            value={row.expense}
            onChange={inputChange}
            name="expense"
          />
        </Form.Field>

        <Button primary fluid loading={loading} type="submit" onClick={saveRow}>
          儲存
        </Button>
      </Form>
    </div>
  );
}
