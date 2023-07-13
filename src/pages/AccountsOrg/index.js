import React, { useEffect, useReducer, useState, createContext } from 'react';
import DataView from './components/DataView';
import EditForm from './components/EditForm';

import { fetchData } from './api';
import rowsReducer from './reducer/rowsReducer';
import rowReducer from './reducer/rowReducer';
import { Divider } from 'semantic-ui-react';
import { initRow } from './initRow';
import BalanceTotal from './components/BalanceTotal';
import AddButton from './components/AddButton';
import ModalView from './components/ModalView';

export const RowContext = createContext();

export default function Index() {
  // const [rows, rowsDispatch] = useReducer(rowsReducer, []);
  const [state, rowsDispatch] = useReducer(rowsReducer, {
    rows: [],
    direction: null,
  });

  const [row, rowDispatch] = useReducer(rowReducer, initRow);

  // const RowContext = createContext();

  useEffect(() => {
    const fetchAccounts = async () => {
      const [data] = await Promise.all([fetchData()]);
      rowsDispatch({ type: 'INIT_ROWS', payload: data });
    };

    fetchAccounts();
  }, []);

  const { rows, direction } = state;

  return (
    <RowContext.Provider value={{ row, rowDispatch }}>
      <ModalView
        row={row}
        rowDispatch={rowDispatch}
        rowsDispatch={rowsDispatch}
      />

      <Divider />
      <BalanceTotal rows={rows} />
      <Divider />

      <AddButton rowDispatch={rowDispatch} row={row} />

      <DataView
        // row={row}
        rows={rows}
        // rowDispatch={rowDispatch}
        rowsDispatch={rowsDispatch}
      />
    </RowContext.Provider>
  );
}
