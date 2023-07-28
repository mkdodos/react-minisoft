import React, { useState, useEffect, useReducer } from 'react';
import SearchBar from './components/SearchBar';
import DataView from './components/DataView';
import { API_HOST } from '../../global/constants';
import axios from 'axios';
import EditForm from './components/EditForm';
import reducer from './reducer';
import crud, { fetchData } from './crud';
import ActionBar from './components/ActionBar';

export default function Index() {
  // 初始值
  const initState = {
    rows: [],
    row: { name: '' },
    isLoading: false,
    editedIndex: -1,
    isModalOpen: false,
    // search:{y:2022,m:7,emp:''}
  };

  // 薪資資料
  const [state, dispatch] = useReducer(reducer, initState);

  // 查詢參數(預設為當月)
  let m = new Date().getMonth();
  m = m == 0 ? m : m + 1;
  const [search, setSearch] = useState({
    y: new Date().getFullYear(),
    m: m,
    emp: '',
  });

  // 編輯表單
  const [form, setForm] = useState({
    row: { name: '' },
    isOpen: false,
    isLoading: false,
  });

  // 載入資料
  useEffect(() => {
    fetchData(search, dispatch);
  }, []);

  return (
    <div>
      {/* {JSON.stringify(rows)} */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        loading={state.isLoading}
        dispatch={dispatch}
      />
      <ActionBar search={search} dispatch={dispatch} />
      <DataView
        form={form}
        setForm={setForm}
        state={state}
        dispatch={dispatch}
        search={search}
      />
      <EditForm form={form} setForm={setForm} dispatch={dispatch} />
    </div>
  );
}
