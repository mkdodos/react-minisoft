import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import DataView from './components/DataView';
import { API_HOST } from '../../global/constants';
import axios from 'axios';
import EditForm from './components/EditForm';

export default function Index() {
  const url = `${API_HOST}/salary/read.php`;
  let m = new Date().getMonth();

  // 薪資
  const [rows, setRows] = useState([]);


  const defaultItem = {
    basic: '',
    job: '',
    tech: '',
    food: '',
    bigM: '',
  };

  const [row, setRow] = useState(defaultItem);

  // 載入中
  const [loading,setLoading]=useState(false)

  // 開啟編輯視窗
  const [open,setOpen]=useState(false)

  // getMonth(),1月時會取得0
  const [search, setSearch] = useState({
    y: new Date().getFullYear(),
    m: m == 0 ? 1 : m,
    emp: '',
  });

  //
  useEffect(() => {
    handleQuery();
  }, []);

  // 查詢薪資
  const handleQuery = () => {
    axios.get(url, { params: { y: search.y, m: search.m } }).then((res) => {
      // 有選員工,做進一步篩選
      if (search.emp !== '') {
        const data = res.data.filter((row) => row.name == search.emp);
        setRows(data);
      } else {
        setRows(res.data);
      }
    });
  };

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleQuery={handleQuery}
      />
      <DataView search={search} rows={rows} row={row} setRow={setRow} setOpen={setOpen} />

      <EditForm row={row} open={open} setOpen={setOpen} setRow={setRow} loading={loading} />
    </div>
  );
}
