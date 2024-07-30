import React, { useEffect, useState } from 'react';
import { db_money2022 as db } from '../../utils/firebase';
import Stat from './stat/index';
import Transaction from './transaction';

export default function Index() {
  const [loading, setLoading] = useState(false);

  // 個股資料
  const [statRows, setStatRows] = useState([]);

  // 交易資料
  const [transactionRows, setTransactionRows] = useState([]);
  // 交易資料複本(篩選用)
  const [transactionRowsCopy, setTransactionRowsCopy] = useState([]);

  useEffect(() => {
    fetchStatData();
    fetchTransactionData();
  }, []);

  const fetchStatData = async () => {
    const snapshot = await db.collection('stockStat').get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setStatRows(data);
    console.log(data);
  };

  const fetchTransactionData = async () => {
    setLoading(false);
    const snapshot = await db.collection('stockTransaction').get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setTransactionRows(data);
    setTransactionRowsCopy(data)
    setLoading(true);
    // console.log(data);
  };

  // stat 股票列 , 取得該列的股票名稱
  // 篩選出該股票交易明細 
  const handleStatRowClick = (row)=>{
    // console.log(row.name)
    setTransactionRows(transactionRowsCopy.filter(obj=>obj.name==row.name))
    // console.log(transactionRowsCopy)
  }

  return (
    <div>
      <Stat
        statRows={statRows}
        setStatRows={setStatRows}
        transactionRows={transactionRows}
        handleRowClick={handleStatRowClick}
      />

      <Transaction
        statRows={statRows}
        transactionRows={transactionRows}
        setTransactionRows={setTransactionRows}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
