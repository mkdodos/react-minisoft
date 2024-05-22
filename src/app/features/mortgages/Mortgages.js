import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectData, addNewRow, updateRow } from './mortgagesSlice';
import TableListSmall from './TableListSmall';
import { Button, Input, Grid } from 'semantic-ui-react';
import EditForm from './components/EditForm';

export default function Mortgages() {
  const dispatch = useDispatch();
  const rows = useSelector(selectData);

  const [basic, setBasic] = useState(0);

  const [open, setOpen] = useState(false);

  const defaultRow = {
    date: new Date().toISOString().substring(0, 10),
    basic: '', //本金
    interest: '', //利息
  };
  const [editedRow, setEditedRow] = useState(defaultRow);

  const [editedRowIndex, setEditedRowIndex] = useState(-1);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const row = {
    account: '房貸A',
    date: '2023-08-24',
    basic, //本金
    interest: 5, //利息
  };

  const handleAdd = () => {
    setEditedRow(defaultRow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedRow(defaultRow);

    // console.log('close')
  };

  // 儲存
  const handleSave = () => {
    if (!editedRow.id) {
      dispatch(addNewRow(editedRow));
    } else {
      const data = { row: editedRow, index: editedRowIndex };
      dispatch(updateRow(data));
    }
    setOpen(false);
  };

  return (
    <>
      <Button color="pink" onClick={handleAdd}>
        ADD
      </Button>

      <TableListSmall
        rows={rows}
        setOpen={setOpen}
        setEditedRow={setEditedRow}
        setEditedRowIndex={setEditedRowIndex}
      />

      <EditForm
        open={open}
        editedRow={editedRow}
        handleSave={handleSave}
        setEditedRow={setEditedRow}
        handleClose={handleClose}
        // handleDelete={handleDelete}
      />
    </>
  );
}
