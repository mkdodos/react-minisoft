import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockChart from './components/StockChart';
import TableView from './components/TableView';
import EditForm from './components/EditForm';
import { db_money2022 } from '../../utils/firebase';

export default function Index() {
  // 用 useState 存放資料
  const [rows, setRows] = useState([]);

  const [data1, setData1] = useState([]);

  // 總成本
  const [totalCost, setTotalCost] = useState(0);

  // 平均成本
  const [avgCost, setAvgCost] = useState(0);

  const [series, setSeries] = useState([
    {
      name: '成交價',
      data: [],
    },
    {
      name: '平均成本',
      data: [],
    },
  ]);

  const [categories, setCategories] = useState([]);

  const fetchData = () => {
    db_money2022
      .collection('stocks')
      .get()
      .then((snapshot) => {
        let sum = 0;

        // 成交價數列
        let tempCost = [];

        const data = snapshot.docs.map((doc) => {
          const obj = doc.data();
          sum += Number(obj.cost);
          tempCost.push(Number(obj.cost));
          return { ...obj, id: doc.id };
        });

        let tempSeries = series.slice();
        // 成交價數列
        tempSeries[0].data = tempCost;

        //  將取得的資料存放到 state 變數
        setRows(data);
        setTotalCost(sum);
        // console.log(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [row, setRow] = useState({
    date: '2022-02-02',
    qty: 25,
    price: 35.22,
    note: '這是備註',
  });

  // 在 TableView 按下編輯鈕時, 將該列的值用 row 存放
  // 在 EditForm 欄位值設定為 row
  const editRow = (row, index) => {
    // console.log(row);
    // setEditRowIndex(index);
    setRow(row);
    // setOpen(true);
  };

  return (
    <div>
      {/* <StockChart series={series} categories={categories} /> */}
      <EditForm row={row} setRow={setRow} />
      <TableView rows={rows} editRow={editRow} totalCost={totalCost} />
    </div>
  );
}
