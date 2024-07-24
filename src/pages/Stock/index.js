import React,{useEffect, useState} from 'react'
import Stat from './stat/index'
import Transaction from './transaction'

export default function Index() {

  const [loading, setLoading] = useState(false);


  // 資料
  const [rows, setRows] = useState([]);


  useEffect(()=>{
    
  },[])

  return (
    <div>
      <Stat transactionRows={rows}/>
      <Transaction rows={rows} setRows={setRows} loading={loading} setLoading={setLoading}/>
    </div>
  )
}
