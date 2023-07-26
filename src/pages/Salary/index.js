import React, { useState, useEffect, useReducer } from 'react';
import SearchBar from './components/SearchBar';
import DataView from './components/DataView';
import { API_HOST } from '../../global/constants';
import axios from 'axios';
import EditForm from './components/EditForm';
import reducer from './reducer';
import crud, { fetchData } from './crud';


export default function Index() {
  // 初始值
  const initState = {
    rows: [],
    row: null,
    isLoading: false,
    editedIndex: -1,
    isModalOpen: false,
    // search:{y:2022,m:7,emp:''}
  };

  // 薪資資料
  const [state, dispatch] = useReducer(reducer, initState);


  // 參數
  const [search,setSearch]=useState({y:2022,m:7,emp:''})
  

  const {rows}=state;


  useEffect(() => {
    
    fetchData(search, dispatch);
  }, []);

  
  return <div>
    {/* {JSON.stringify(rows)} */}
    <SearchBar search={search} setSearch={setSearch} dispatch={dispatch}/>
    <DataView state={state} dispatch={dispatch} search={search}/>
    </div>;
}
