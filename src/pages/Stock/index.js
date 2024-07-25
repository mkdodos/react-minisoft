import React,{useEffect, useState} from 'react'
import Stat from './stat/index'
import Transaction from './transaction'

export default function Index() {

  const [loading, setLoading] = useState(false);


  // 交易資料
  const [rows, setRows] = useState([]);

  // 個股資料
  const [stockRows,setStockRows]=useState([])

  useEffect(()=>{
    
  },[])

  return (
    <div>
      <Stat stockRows={stockRows} setStockRows={setStockRows} transactionRows={rows}/>
      <Transaction  stockRows={stockRows} rows={rows} setRows={setRows} loading={loading} setLoading={setLoading}/>
    </div>
  )
}
