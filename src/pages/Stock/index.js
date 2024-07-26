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
    setLoading(true);
    console.log(data);
  };

  return (
    <div>
      <Stat
        statRows={statRows}
        setStatRows={setStatRows}
        transactionRows={transactionRows}
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
