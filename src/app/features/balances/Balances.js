import React, { useEffect, useState } from 'react';
import {
  fetchData,
  fetchMoreData,
  getLastDoc,
  selectAllBalances,
} from './balancesSlice';
import { useDispatch, useSelector } from 'react-redux';
import TableListSmall from './TableListSmall';
import { Table, Button, Input } from 'semantic-ui-react';
import TilesChoose from '../../../components/TilesChoose';

export default function Balances() {
  const dispatch = useDispatch();
  // const rows = useSelector((state) => state.balances);
  let rows = useSelector(selectAllBalances);
  // 搜尋包含關鍵字的資料
  const [search, setSearch] = useState('');
  // includes 的功能為只要字串有包含(不用整個字串符合)就傳回 true
  // rows = rows.filter(row=>row.title.includes(search))

  // 搜尋包含類別的資料
  const [cateSearch, setCateSearch] = useState('');


  // 每次載入筆數
  const limit = 20

  let rowsCopy = rows.slice();


  // 處理二個欄位同時搜尋
  // 判斷輸入了那個欄位
  if (search !== '') {
    rowsCopy = rowsCopy.filter((row) => row.title.includes(search));
    console.log('search');
  }

  if (cateSearch !== '') {
    // 有的資料沒有類別,加上 cate? 可過濾掉
    rowsCopy = rowsCopy.filter((row) => row.cate?.includes(cateSearch));
  }

  const lastDoc = useSelector(getLastDoc);
  useEffect(() => {
    dispatch(fetchData({ limit }));
  }, []);

  return (
    <>
      原始{rows.length}
      篩選結果{rowsCopy.length}
      {/* <TilesChoose item={cateSearch} setItem={setCateSearch} /> */}
      <Input
        value={cateSearch}
        placeholder="類別"
        onChange={(e) => setCateSearch(e.target.value)}
      />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button
        onClick={() => dispatch(fetchMoreData({ limit, lastDoc: lastDoc }))}
      >
        More
      </Button>
      <TableListSmall rows={rowsCopy} />
    </>
  );

  // return <div>{rows.map((row) => <TableListSmall row={row}/>)}</div>;
  // return <div></div>;
}
