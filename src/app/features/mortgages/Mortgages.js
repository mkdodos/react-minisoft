import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectData, addNewRow, rowAdded } from './mortgagesSlice';
import TableListSmall from './TableListSmall';
import { Button, Input, Grid } from 'semantic-ui-react';
import EditForm from './components/EditForm';

export default function Mortgages() {
  const dispatch = useDispatch();
  const rows = useSelector(selectData);

  const [basic, setBasic] = useState(0);

  const [open, setOpen] = useState(false);

  const defaultRow = {
    date: '',
    basic:'', //本金
    interest:'', //利息

  };
  const [editedRow, setEditedRow] = useState(defaultRow);

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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedRow(defaultRow);

    // console.log('close')
  };

  const handleSave = () => {
  //  console.log(row)
    dispatch(addNewRow(editedRow))
    setOpen(false)

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
