import React, { useState, useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import TableView from './components/TableView';
import EditForm from './components/EditForm';

export default function Index({ transactionRows }) {
  useEffect(() => {
    setRows(cals());
  }, [transactionRows]);

  // 計算各項數值
  const cals = () => {
    // setLoading(false);
    let temp = rows.slice();
    rows.map((stock, index) => {
      let sum = 0;
      let sumQty = 0; //股數
      let tempRows = transactionRows.filter((obj) => obj.name == stock.name);
      tempRows.map((row) => {
        sum += Number(row.cost) * Number(row.qty);
        sumQty += Number(row.qty);
      });

      // 平均成本
      const avgCost = sum / sumQty;
      // 損益
      const bouns = (stock.price - avgCost) * sumQty;

      // 有個股交易記錄再更新數值
      if (tempRows.length > 0)
        temp[index] = {
          ...stock,
          totalCost: sum,
          qtys: sumQty,
          avgCost: avgCost,
          bouns: bouns,
        };

      // setLoading(true);
    });
    return temp;
  };

  // 相對應的交易記錄
  const stockTransaction = (stockName) => {
    let tempRows = transactionRows.filter((obj) => obj.name == stockName);
    return tempRows;
  };

  /********** 變數 ************/
  // 欄位
  const defaultRow = {
    name: '', // 股票名稱
    price: '', // 現價
    qtys: '', //總股數
    totalCost: '', //總成本
    avgCost: '', //平均成本
    bouns: '', //損益
  };
  // 資料
  const [rows, setRows] = useState([]);
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
    setRow(defaultRow);
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
    setOpen(false);
    // 將編輯列資料設定回預設值
    setRow(defaultRow);

    // 有該股的交易記錄,再做數值計算更新
    if (stockTransaction(row.name).length > 0) {
      setRows(cals());
    }
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
