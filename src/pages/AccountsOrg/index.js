import React, { useEffect, useReducer } from 'react';
import DataView from './components/DataView';
import EditForm from './components/EditForm';

import { fetchData } from './api';
import rowsReducer from './reducer/rowsReducer';
import rowReducer from './reducer/rowReducer';

export default function Index() {
  const [rows, rowsDispatch] = useReducer(rowsReducer, []);
  const initRow = { name: '', prior: '' };
  const [row, rowDispatch] = useReducer(rowReducer, initRow);
  useEffect(() => {
    const fetchAccounts = async () => {
      const [data] = await Promise.all([fetchData()]);
      rowsDispatch({ type: 'INIT_ROWS', payload: data });
    };
    fetchAccounts();
  }, []);

  return (
    <div>
      <EditForm
        rowDispatch={rowDispatch}
        rowsDispatch={rowsDispatch}
        row={row}
      />
      <DataView rows={rows} rowDispatch={rowDispatch}
      rowsDispatch={rowsDispatch}
      />
    </div>
  );
}
