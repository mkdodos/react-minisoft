import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import TableView from './components/TableView';
import EditForm from './components/EditForm';

export default function Index({rows,setRows}) {
  
  
  /********** 變數 ************/
  // 欄位
  const defaultRow = {
    date:new Date().toISOString().substring(0,10),//交易日期
    name: '', // 股票名稱
    cost: '', // 購入單價
    qty:'',//股數
  };
  
  // 編輯列
  const [row, setRow] = useState(defaultRow);
  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(defaultRow);
  // 表單開關
  const [open, setOpen] = useState(false);

  /********** 方法 ************/
  const handleAdd = () => {
    setOpen(true);
    setRowIndex(-1);
    setRow(defaultRow)
  };

  // 儲存(新增或修改)
  const handleSave = () => {
    // 依照有編輯列索引值決定做新增或修改
    if (rowIndex == -1) {
      // 將編輯列加入資料陣列
      setRows([...rows, { ...row, id: nanoid() }]);
    } else {
      // 修改表格中編輯列的值
      const tempRows = rows.slice();
      Object.assign(tempRows[rowIndex], row);
      setRows(tempRows);
      setRowIndex(-1);
    }

    // 關閉編輯視窗
    setOpen(false)
    // 將編輯列資料設定回預設值
    setRow(defaultRow);
  };

  // 刪除
  const handleDelete = () => {   
    setRows(rows.filter((obj) => obj.id != row.id));
    setOpen(false);
  };

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


  return (
    <div>
      <TableView rows={rows} handleEdit={handleEdit} handleAdd={handleAdd} />
      <EditForm
        open={open}
        setOpen={setOpen}
        row={row}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleChange={handleChange}
      />
    </div>
  );
}
