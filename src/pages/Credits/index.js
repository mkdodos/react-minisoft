import React, { useEffect, useState } from 'react';
import { db_money2022 as db } from '../../utils/firebase';
import List from './components/List';
import EditForm from './components/EditForm';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import DataList from './components/DataList';
import ModalForm from './components/ModalForm';

import {
  Container,
  Button,
  Divider,
  Icon,
  Input,
  Segment,
} from 'semantic-ui-react';

export default function Index() {
  // 編輯表單開關
  const [open, setOpen] = useState(false);

  // 篩選表單開關
  const [openSearch, setOpenSearch] = useState(false);

  // 載入中
  const [loading, setLoading] = useState(false);

  // 資料集合
  const [rows, setRows] = useState([]);

  const [rowsCopy, setRowsCopy] = useState([]);

  // 編輯列索引
  const [editRowIndex, setEditRowIndex] = useState(-1);

  // 當期數
  const [activeSection, setActiveSection] = useState('');

  // 表單預設值
  const defalutItem = {
    consumeDate: new Date().toISOString().slice(0, 10),
    note: '',
    amt: '',
    section: activeSection,
  };

  // 編輯列
  const [row, setRow] = useState(defalutItem);

  // firebase 集合
  const dbCol = db.collection('credits');

  // 排序
  const [direction, setDirection] = useState('acending');
  const [column, setColumn] = useState('');

  // 篩選
  const [filterText, setFilterText] = useState('');
  const [filterSection, setFilterSection] = useState(activeSection);

  const [filter, setFilter] = useState({
    section: activeSection,
  });

  // 尋找期數資料表,若無和目前日期相符的期數,就自動新增
  const autoAddSection = () => {
    // 目前民國年月
    const date = new Date();
    const year = date.getFullYear() - 1911;
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    const section = year + month;

    db.collection('sections')
      .orderBy('section', 'desc')
      .get()
      .then((snapshot) => {
        const currentSection = snapshot.docs[0].data().section;
        if (currentSection != section) {
          db.collection('sections').add({ section });
        }
      });   
  };
  // 取得資料
  useEffect(() => {
    autoAddSection();
    // 取得最新期數
    db.collection('sections')
      .orderBy('section', 'desc')
      .get()
      .then((snapshot) => {
        const section = snapshot.docs[0].data().section;
        setActiveSection(section);

        dbCol.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setRows(data);
          setRowsCopy(data);

          // 預設載入當期資料
          const newData = data.slice().filter((row) => row.section == section);
          setRows(newData);
        });
      });
  }, []);

  // 排序
  const sortData = (data, column) => {
    data = data.slice().sort(function (a, b) {
      if (column == 'date') return a.consumeDate > b.consumeDate ? 1 : -1;
      if (column == 'amt') return a.amt * 1 > b.amt * 1 ? 1 : -1;
    });
    if (direction == 'decending') data.reverse();
    setRows(data);
    // 遞增遞減
    if (direction == 'acending') setDirection('decending');
    if (direction == 'decending') setDirection('acending');
  };

  // 每筆資料和條件比對,只要不符合就排除
  // 參考https://stackoverflow.com/questions/31831651/javascript-filter-array-multiple-conditions

  // 篩選
  const handleInputChange = (e) => {
    // const key = e.target.name;

    // setFilter({ ...filter, [e.target.name]: e.target.value });
    if (e.target.value == '') {
      setFilter((current) => {
        // remove cost key from object
        // const { 某個屬性值 : 新的變數名, ...其餘的屬性 } = current
        // 將目前 current 物件中的某個屬性值獨立為一個變數
        // 然後物件其他的屬性值指派給新的物件變數
        const { [e.target.name]: noUse, ...rest } = current;
        // 傳回 rest ,就沒有包含 section 屬性
        return rest;
      });
    } else {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    }
  };

  const handleSectionChange = (e, obj) => {
    setFilter({ ...filter, section: obj.value });
  };

  const handleFilter = () => {
    let newData = rowsCopy;

    newData = newData.filter((row) => {
      for (let key in filter) {
        // 值有可能空,加上?判斷
        if (!row[key]?.includes(filter[key])) return false;
      }
      return true;
    });
    setRows(newData);

    // 關閉篩選表單
    setOpenSearch(false);

    console.log(filter);
    console.log(newData);
  };

  // 儲存(新增或更新)
  const saveRow = () => {
    setLoading(true);
    // 更新
    if (editRowIndex > -1) {
      dbCol
        .doc(row.id)
        .update(row)
        .then(() => {
          const newRows = rows.slice();
          Object.assign(newRows[editRowIndex], row);
          setRows(newRows);
          setRowsCopy(newRows);
          // 設為初始值
          setRow(defalutItem);
          setEditRowIndex(-1);
          setOpen(false);
          setLoading(false);
        });
    } else {
      // 新增
      dbCol.add(row).then((doc) => {
        const newRows = rows.slice();
        newRows.unshift({ ...row, id: doc.id });
        // 將資料加到表格中,包含剛新增的id,做為刪除之用
        // setRows([...rows, { ...row, id: doc.id }]);
        setRows(newRows);
        // setRowsCopy(newRows);
        // console.log(rowsCopy)
        // 設為初始值
        setRow(defalutItem);
        setEditRowIndex(-1);
        setOpen(false);
        setLoading(false);
        // console.log(newRows)
      });
    }
  };

  // 刪除
  const deleteRow = (row) => {
    setLoading(true);
    dbCol
      .doc(row.id)
      .delete()
      .then(() => {
        const newRows = rows.slice();
        newRows.splice(editRowIndex, 1);
        setRows(newRows);
        setRowsCopy(newRows);
        setOpen(false);
        setLoading(false);
      });
  };

  // 編輯(設定索引和編輯列)
  const editRow = (row, index) => {
    setEditRowIndex(index);
    setRow(row);
    setOpen(true);
  };

  // 新增一筆
  const newRow = () => {
    setEditRowIndex(-1);
    setRow(defalutItem);
    setOpen(true);
  };

  return (
    <div>
      <Container>
        <Divider horizontal>
          信用卡 {filter.section ? filter.section : activeSection}
        </Divider>
        <Button onClick={newRow} color="teal">
          <Icon name="plus" />
          新增
        </Button>

        <Button onClick={() => setOpenSearch(true)}>
          <Icon name="search" />
          搜尋
        </Button>

        <SearchBar
          open={openSearch}
          setOpen={setOpenSearch}
          handleFilter={handleFilter}
          handleInputChange={handleInputChange}
          handleSectionChange={handleSectionChange}
          filter={filter}
        />

        <ModalForm
          open={open}
          setOpen={setOpen}
          rows={rows}
          setRows={setRows}
          row={row}
          setRow={setRow}
          saveRow={saveRow}
          deleteRow={deleteRow}
          loading={loading}
        />

        <Dashboard rows={rows} />

        <Segment>
          <Button
            icon
            onClick={() => {
              setColumn('date');
              sortData(rows, 'date');
            }}
          >
            日期
            {direction == 'decending' && column == 'date' && (
              <Icon name="angle up" />
            )}
            {direction == 'acending' && column == 'date' && (
              <Icon name="angle down" />
            )}
          </Button>

          <Button
            icon
            onClick={() => {
              setColumn('amt');
              sortData(rows, 'amt');
            }}
          >
            金額
            {direction == 'decending' && column == 'amt' && (
              <Icon name="angle up" />
            )}
            {direction == 'acending' && column == 'amt' && (
              <Icon name="angle down" />
            )}
          </Button>
        </Segment>

        <DataList rows={rows} editRow={editRow} />
      </Container>
    </div>
  );
}
