import React, { useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import { nanoid } from '@reduxjs/toolkit';

export default function Index() {
  // 預設物件
  const defaultRow = {
    id: 1,
    date: '2024-07-15',
    qty: '',
    price: '',
  };
  // 物件資料集合
  const [rows, setRows] = useState([]);

  // 編輯列
  const [row, setRow] = useState(defaultRow);

  // 按下編輯鈕
  const handleEdit = (editedRow) => {
    // console.log(editedRow)
    setRow(editedRow);
  };

  // 修改欄位值
  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  // 儲存
  const handleSave = () => {
    // 將編輯列加入資料陣列
    setRows([...rows, row]);
    // 將編輯列資料設定回預設值
    setRow(defaultRow);
  };
  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>日期</Table.HeaderCell>
            <Table.HeaderCell width={2}>數量</Table.HeaderCell>
            <Table.HeaderCell width={2}>單價</Table.HeaderCell>
            <Table.HeaderCell width={2}>#</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row key={nanoid()}>
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>{row.qty}</Table.Cell>
                <Table.Cell>{row.price}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEdit(row)}>編輯</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Form>
        <Form.Field>
          <label>日期</label>
          <input
            type="date"
            name="date"
            value={row.date}
            onChange={handleChange}
          />
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
        <Form.Field>
          <label>單價</label>
          <input
            type="number"
            name="price"
            value={row.price}
            onChange={handleChange}
          />
        </Form.Field>
        <Button primary fluid type="submit" onClick={handleSave}>
          儲存
        </Button>
      </Form>
    </div>
  );
}
