import React,{useState} from 'react';
import SearchBar from './components/SearchBar';
import DataView from './components/DataView';

export default function Index() {
  let m = new Date().getMonth();

  // getMonth(),1月時會取得0
  if (m == 0) {
    m = 1;
  }
  const [search, setSearch] = useState({
    y: new Date().getFullYear(),
    m: m,
    emp: '',
  });
  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      <DataView search={search}/>
    </div>
  );
}
