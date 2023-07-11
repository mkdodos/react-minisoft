import React, { useEffect, useReducer } from 'react';
import DataView from './components/DataView';
import EditForm from './components/EditForm';

import { fetchData } from './api';
import rowsReducer from './reducer/rowsReducer';
import rowReducer from './reducer/rowReducer';
import { Divider } from 'semantic-ui-react';
import { initRow } from './initRow';

export default function Index() {
  const [rows, rowsDispatch] = useReducer(rowsReducer, []);
  // const initRow = { name: '', prior: '',balance:'' };
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
      <Divider/>
      <DataView rows={rows} rowDispatch={rowDispatch}
      rowsDispatch={rowsDispatch}
      />
    </div>
  );
}
