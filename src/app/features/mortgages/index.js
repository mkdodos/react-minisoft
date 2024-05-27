import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  searchData,
  fetchData,
  selectData,
  addNewRow,
  updateRow,
  deleteRow
} from './mortgagesSlice';
import TableView from './components/TableView';
import { Button, Input, Grid } from 'semantic-ui-react';
import EditForm from './components/EditForm';
import SearchForm from './components/SearchForm';

export default function Index() {
  const dispatch = useDispatch();
  // 資料
  const rows = useSelector(selectData);
  // 搜尋參數預設值
  const defaultSearch = {
    date: new Date().toISOString().substring(0, 10),
    basic:''
  };
  // 搜尋參數
  const [search, setSearch] = useState(defaultSearch);
  // 表單開關
  const [open, setOpen] = useState(false);
  // 編輯參數預設值
  const defaultRow = {
    date: new Date().toISOString().substring(0, 10),
    basic: '', //本金
    interest: '', //利息
  };
  // 編輯列參數
  const [editedRow, setEditedRow] = useState(defaultRow);
  // 編輯列索引
  const [editedRowIndex, setEditedRowIndex] = useState(-1);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

 

  const handleDelete = (id) => {
    // if (window.confirm('Are you sure?'))
    dispatch(deleteRow(id));
    setOpen(false)
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

  // 搜尋
  const handleSearch = () => {
    dispatch(searchData(search));
    // console.log(search);
  };

  return (
    <>
      <SearchForm
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      />

      <TableView
        rows={rows}
        setOpen={setOpen}
        setEditedRow={setEditedRow}
        setEditedRowIndex={setEditedRowIndex}
        handleAdd={handleAdd}
      />

      <EditForm
        open={open}
        editedRow={editedRow}
        handleSave={handleSave}
        setEditedRow={setEditedRow}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
}
