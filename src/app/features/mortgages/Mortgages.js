import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectData, addNewRow, rowAdded } from './mortgagesSlice';

export default function Mortgages() {
  const dispatch = useDispatch();
  const rows = useSelector(selectData);

  const [basic, setBasic] = useState(0);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const row = {
    account: '房貸A',
    date: '2023-08-24',
    basic, //本金
    interest: 5, //利息
  };

  return (
    <div>
      <input onChange={(e) => setBasic(e.target.value)} />
      <button onClick={() => dispatch(addNewRow(row))}>ADd</button>
      {rows.map((row) => {
        return <span key={row.id}>{row.basic}-</span>;
      })}
    </div>
  );
}
