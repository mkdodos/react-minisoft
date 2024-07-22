import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import { nanoid } from '@reduxjs/toolkit';
import { db_money2022 as db } from '../../utils/firebase';
import SearchForm from './components/SearchForm';

export default function Index() {
  // 預設物件
  const defaultRow = {
    date: '2024-07-15',
    name: '',
    qty: '',
    price: '',
  };
  // 物件資料集合
  const [rows, setRows] = useState([]);

  // 物件資料複本(搜尋完回復至原資料用)
  const [rowsCopy, setRowsCopy] = useState([]);

  // 編輯列
  const [row, setRow] = useState(defaultRow);

  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(-1);

  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

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

  // 下拉選項
  const options = [
    { text: '長榮航', value: '長榮航', key: '長榮航' },
    { text: '元大50', value: '元大50', key: '元大50' },
    { text: '元大高股息', value: '元大高股息', key: '元大高股息' },
    { text: '鴻海', value: '鴻海', key: '鴻海' },
  ];

  const handleNameChange = (e, { value }) => {
    setRow({ ...row, name: value });
  };

  // 搜尋
  const handleSearchChange = (e, { value }) => {
    // let temp = rows.slice();
    // temp = temp.filter(row=>row.name==value);
    // setRowsCopy(temp)
    // readDocs(value);
    setSearch(value);
  };

  const handleSearch = () => {
    console.log(search);
    if (search) {
      let temp = rowsCopy.slice();
      temp = temp.filter((row) => row.name == search);
      setRows(temp);
    } else {
      setRows(rowsCopy);
    }
  };

  const [groupSum, setGroupSum] = useState([]);

  // 計算個股成本
  const calCostByStock = (stock) => {
    let temp = rowsCopy.slice();
    temp = temp.filter((row) => row.name == stock);

    let sum = 0;
    temp.map((row) => {
      sum += row.price * row.qty;
    });

   

    setGroupSum([...groupSum,{ stock, sum }])
    return sum;
  };

  // firebase
  const readDocs = async () => {
    const snapshot = await db
      .collection('stocks')
      // .where('name', '==', search)
      .orderBy('date', 'desc')
      .get();

    let sum = 0;
    const data = snapshot.docs.map((doc) => {
      sum += Number(doc.data().qty * doc.data().price);
      return { ...doc.data(), id: doc.id };
    });
    setRows(data);
    setRowsCopy(data);
    setTotal(sum);
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
    console.log(row);
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
      <Button onClick={()=>calCostByStock('長榮航')}>ABC</Button>
      {groupSum[0]?.sum}
      {/* 搜尋 */}
      <SearchForm
        options={options}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        readDocs={readDocs}
      />

      {/* 表格 */}
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>id</Table.HeaderCell>
            <Table.HeaderCell width={2}>日期</Table.HeaderCell>
            <Table.HeaderCell width={2}>名稱</Table.HeaderCell>
            <Table.HeaderCell width={1}>股數</Table.HeaderCell>
            <Table.HeaderCell width={1}>單價</Table.HeaderCell>
            <Table.HeaderCell width={2}>
              小計<br></br>
              {Math.round(total)}
            </Table.HeaderCell>
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
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.qty}</Table.Cell>
                <Table.Cell>{row.price}</Table.Cell>
                <Table.Cell>{Math.round(row.qty * row.price)}</Table.Cell>
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
          <Form.Select
            placeholder="名稱"
            fluid
            value={row.name}
            options={options}
            onChange={handleNameChange}
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
