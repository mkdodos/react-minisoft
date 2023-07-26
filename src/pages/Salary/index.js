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
    search:{y:2023,m:6,emp:''}
  };

  const [state, dispatch] = useReducer(reducer, initState);



  const {rows,search}=state;


  useEffect(() => {
    
    fetchData(search, dispatch);
  }, []);

  
  return <div>
    {/* {JSON.stringify(rows)} */}
    <DataView state={state} dispatch={dispatch} />
    </div>;
}
