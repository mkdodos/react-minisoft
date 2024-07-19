import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import { nanoid } from '@reduxjs/toolkit';
import { db_money2022 as db } from '../../utils/firebase';
export default function Index() {
  // 預設物件
  const defaultRow = {
    date: '2024-07-15',
    qty: '',
    price: '',
  };
  // 物件資料集合
  const [rows, setRows] = useState([]);

  // 編輯列
  const [row, setRow] = useState(defaultRow);

  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(-1);

  useEffect(() => {
    readDocs();
  }, []);

  // 按下編輯鈕
  const handleEdit = (editedRow, index) => {
    setRow(editedRow);
    setRowIndex(index);
  };

  // 修改欄位值
  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  // 儲存(新增或修改)
  const handleSave = () => {
    // 依照有編輯列索引值決定做新增或修改
    if (rowIndex == -1) {
      addDoc();
    } else {
      updateDoc();
    }

    // 將編輯列資料設定回預設值
    setRow(defaultRow);
  };

   // 刪除
   const handleDelete = (id) => {
    deleteDoc(id);
  };

  // firebase
  const readDocs = async () => {
    const snapshot = await db.collection('stocks').orderBy('date','desc').get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setRows(data);
  };

  const addDoc = () => {
    db.collection('stocks')
      .add(row)
      .then((docRef) => {
        // 將編輯列加入資料陣列
        setRows([...rows, { ...row, id: docRef.id }]);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  const deleteDoc = (id) => {
    db.collection('stocks')
      .doc(id)
      .delete()
      .then(() => {
        setRows(rows.filter((row) => row.id != id));
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  const updateDoc = () => {
    db.collection('stocks')
      .doc(row.id)
      .update(row)
      .then(() => {
        // 修改表格中編輯列的值
        const tempRows = rows.slice();
        Object.assign(tempRows[rowIndex], row);
        setRows(tempRows);
        setRowIndex(-1);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

 

  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>id</Table.HeaderCell>
            <Table.HeaderCell width={2}>日期</Table.HeaderCell>
            <Table.HeaderCell width={2}>數量</Table.HeaderCell>
            <Table.HeaderCell width={2}>單價</Table.HeaderCell>
            <Table.HeaderCell width={2}>#</Table.HeaderCell>
            <Table.HeaderCell width={2}>#</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell>{row.id}</Table.Cell>
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>{row.qty}</Table.Cell>
                <Table.Cell>{row.price}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleDelete(row.id)}>刪除</Button>
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
