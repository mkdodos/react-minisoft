import React, { useEffect } from 'react';
import { fetchData,fetchMoreData,getLastDoc,selectAllBalances } from './balancesSlice';
import { useDispatch, useSelector } from 'react-redux';
import TableListSmall from './TableListSmall';
import { Table, Button, Header } from 'semantic-ui-react';

export default function Balances() {
  const dispatch = useDispatch();
  // const rows = useSelector((state) => state.balances);
  const rows = useSelector(selectAllBalances);
  const lastDoc = useSelector(getLastDoc)
  useEffect(() => {
    dispatch(fetchData({limit:8}));
    
  }, []);

  return (

    <>
    <Button onClick={()=>dispatch(fetchMoreData({limit:8,lastDoc:lastDoc}))}>More</Button>
    <TableListSmall rows={rows}/>
    </>
    
  )
  
  
  // return <div>{rows.map((row) => <TableListSmall row={row}/>)}</div>;
  // return <div></div>;
}
