import React, { useEffect, useState } from 'react';
import {
  fetchData,
  fetchMoreData,
  getLastDoc,
  selectAllBalances,
  getStatus,
  fetchDataByCate,
  setIsEnd,
} from './balancesSlice';
import { useDispatch, useSelector } from 'react-redux';
import TableListSmall from './TableListSmall';
import { Table, Button, Input, Grid, Divider } from 'semantic-ui-react';
import TilesChoose from '../../../components/TilesChoose';
import RowsCountBanner from './RowsCountBanner';
import SearchForm from './SearchForm';

export default function Balances() {
  const dispatch = useDispatch();
  // const rows = useSelector((state) => state.balances);
  let rows = useSelector(selectAllBalances);
  // 搜尋包含關鍵字的資料
  const [search, setSearch] = useState('');
  // includes 的功能為只要字串有包含(不用整個字串符合)就傳回 true
  // rows = rows.filter(row=>row.title.includes(search))

  const status = useSelector(getStatus);

  // 搜尋包含類別的資料
  const [cateSearch, setCateSearch] = useState('');

  // 每次載入筆數
  const limit = 20;

  let rowsCopy = rows.slice();

  // 處理二個欄位同時搜尋
  // 判斷輸入了那個欄位
  if (search !== '') {
    rowsCopy = rowsCopy.filter((row) => row.title.includes(search));
  }

  if (cateSearch !== '') {
    // console.log(cateSearch)
    // dispatch(fetchData(cateSearch))
    // 有的資料沒有類別,加上 cate? 可過濾掉
    // rowsCopy = rowsCopy.filter((row) => row.cate?.includes(cateSearch));
  }

  const lastDoc = useSelector(getLastDoc);
  useEffect(() => {
    dispatch(fetchData({ limit }));
  }, []);

  const handleCateChange = (e, { value }) => {
    // 使用者按X清除類別時

    if (value == '') {
      dispatch(fetchData({ limit }));
    } else {
      dispatch(fetchDataByCate({ cate: value, limit }));
    }

    setCateSearch(value);
    dispatch(setIsEnd());

    // console.log(value)
  };

  return (
    <>
      {/* {status} */}
      <RowsCountBanner
        rows={rows}
        rowsCopy={rowsCopy}
        limit={limit}
        lastDoc={lastDoc}
        status={status}
        cate={cateSearch}
      />

      <Divider />
      <SearchForm
        cateChange={handleCateChange}
        cateSearch={cateSearch}
        setCateSearch={setCateSearch}
        search={search}
        setSearch={setSearch}
      />
      <Divider />
      <TableListSmall rows={rowsCopy} />
    </>
  );
}
