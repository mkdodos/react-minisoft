import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import { nanoid } from '@reduxjs/toolkit';
import { db_money2022 as db } from '../../utils/firebase';
import SearchForm from './components/SearchForm';
import GroupCostsView from './components/GroupCostsView';
import TableView from './components/TableView';
import EditForm from './components/EditForm';
import Stat from './components/stat';

export default function Index() {
  // 編輯表單顯示隱藏
  const [open, setOpen] = useState(false);
  // 載入中
  const [loading, setLoading] = useState(false);
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
    setOpen(true);
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
    // 關閉編輯視窗
    setOpen(false);
  };

  // 刪除
  const handleDelete = () => {
    deleteDoc();
    // 關閉編輯視窗
    setOpen(false);
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

    setGroupSum([...groupSum, { stock, sum }]);
    return sum;
  };

  //
  const handleAdd = () => {
    setOpen(true);
    setRowIndex(-1);
  };

  // firebase
  const readDocs = async () => {
    setLoading(true);
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
    setLoading(false);
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

  const deleteDoc = () => {
    db.collection('stocks')
      .doc(row.id)
      .delete()
      .then(() => {
        setRows(rows.filter((obj) => obj.id != row.id));
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
      <Stat/>
      {!loading && <GroupCostsView data={rows} />}

      <EditForm
        open={open}
        setOpen={setOpen}
        handleChange={handleChange}
        handleNameChange={handleNameChange}
        row={row}
        options={options}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />

      {/* 搜尋 */}
      <SearchForm
        options={options}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        readDocs={readDocs}
      />

      {/* 表格 */}
      <TableView rows={rows} handleEdit={handleEdit} handleAdd={handleAdd} />
    </div>
  );
}
