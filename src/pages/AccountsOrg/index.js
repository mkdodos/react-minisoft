import React, { useEffect, useReducer, useState } from 'react';
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

export default function Index() {
  // const [rows, rowsDispatch] = useReducer(rowsReducer, []);
  const [state, rowsDispatch] = useReducer(rowsReducer, {
    rows: [],
    direction: null,
  });

  const [row, rowDispatch] = useReducer(rowReducer, initRow);

  // const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      const [data] = await Promise.all([fetchData()]);
      rowsDispatch({ type: 'INIT_ROWS', payload: data });
    };

    fetchAccounts();
  }, []);

  const { rows, direction } = state;

  return (
    <div>
      {/* <EditForm
        rowDispatch={rowDispatch}
        rowsDispatch={rowsDispatch}
        row={row}
      /> */}
      <ModalView
        row={row}
        rowDispatch={rowDispatch}
        // rowsDispatch={rowsDispatch}
        // modalOpen={modalOpen}
        // setModalOpen={setModalOpen}
      />

      {row.modalOpen}
      <Divider />
      <BalanceTotal rows={rows} />
      <Divider />

      {/* <AddButton setModalOpen={setModalOpen} /> */}

      <AddButton rowDispatch={rowDispatch} row={row} />

      {/* <DataView
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        rows={rows}
        rowDispatch={rowDispatch}
        rowsDispatch={rowsDispatch}
      /> */}
    </div>
  );
}
