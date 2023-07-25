import React, { useState,useEffect } from 'react';
import SearchBar from './components/SearchBar';
import DataView from './components/DataView';
import { API_HOST } from '../../global/constants';
import axios from 'axios';

export default function Index() {
  const url = `${API_HOST}/salary/read.php`;
  let m = new Date().getMonth();

  // 薪資
  const [rows, setRows] = useState([]);
  
  // getMonth(),1月時會取得0  
  const [search, setSearch] = useState({
    y: new Date().getFullYear(),
    m: m == 0 ? 1 : m,
    emp: '',
  });


  useEffect(() => {handleQuery()}, []);


  // 查詢薪資
  const handleQuery = () => {
    axios.get(url, { params: { y: search.y, m: search.m } }).then((res) => {
      setRows(res.data);
    });
  };

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleQuery={handleQuery}
      />
      <DataView search={search} rows={rows} />
    </div>
  );
}
