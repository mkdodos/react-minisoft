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
  const user = localStorage.getItem('user');

  // 編輯表單開關
  const [open, setOpen] = useState(false);

  // 篩選表單開關
  const [openSearch, setOpenSearch] = useState(false);

  // 載入中
  const [loading, setLoading] = useState(false);

  // 原始資料,顯示於表格
  const [rows, setRows] = useState([]);

  // 篩選用
  const [rowsCopy, setRowsCopy] = useState([]);

  // 編輯列索引
  const [editRowIndex, setEditRowIndex] = useState(-1);

  // 當期數
  const [activeSection, setActiveSection] = useState('');

  // 表單預設值
  const defalutItem = {
    date: new Date().toISOString().slice(0, 10),
    title: '',
    expense: '',
    section: activeSection,
  };

  // 編輯列
  const [row, setRow] = useState(defalutItem);

  // firebase 集合
  // const dbCol = db.collection('credits');
  const dbCol = db.collection('balances');

  // 排序
  const [direction, setDirection] = useState('acending');
  const [column, setColumn] = useState('');

  // 篩選
  const [filterText, setFilterText] = useState('');
  const [filterSection, setFilterSection] = useState(activeSection);

  const [filter, setFilter] = useState({
    section: activeSection,
  });

  // 帳戶
  const [account, setAccount] = useState({});

  // const account = { id: 'W501yDlEge8dFiitskVj', name: '信用卡' };

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

  //
  const importData = () => {
    db.collection('credits')
      .where('section', '==', '11206')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          let row = {
            date: d.consumeDate,
            // cate: d.cate,
            title: d.note,
            section: d.section,
            expense: d.amt,
            user,
            account: { id: account.id, name: account.name },
            createdAt: Date.now(),
          };

          if(d.cate!=undefined){
            row={...row,cate:d.cate}
          }

          db.collection('balances').add(row)

          // console.log(row)

          // return row;
        });

        // db.collection('balances').add({
        //   createdAt: Date.now(),
        //   date: '2023-05-13',
        //   cate: '旅遊',
        //   title: '良人煮鍋',
        //   section: '11205',
        //   expense: '6060',
        //   user: 'mkdodos@gmail.com',
        //   account: {
        //     id: 'W501yDlEge8dFiitskVj',
        //     name: '信用卡',
        //   },
        // });

        // console.log(data);
        // console.log(snapshot.size)
      });
  };

  //

  //

  // 取得資料
  useEffect(() => {
    // importData();

    autoAddSection();
    db.collection('accounts')
      .where('type', '==', 'credits')
      .get()
      .then((snapshot) => {
        // 信用卡帳戶
        const acc = snapshot.docs[0];
        setAccount({ ...acc.data(), id: acc.id });
        db.collection('sections')
          .orderBy('section', 'desc')
          .get()
          .then((snapshot) => {
            // 最新期數
            const section = snapshot.docs[0].data().section;
            setActiveSection(section);
            // console.log(acc.id);
            // 信用卡消費資料
            dbCol
            // 加了 limit 條件,會讓 where 可篩資料變少 
            // .limit(12) 
            .orderBy('date', 'desc') 
            .orderBy('createdAt', 'desc')
             
              .where('account.id', '==', acc.id)
              // .where('account.id', '==', acc.id)
           
              .get()
              .then((snapshot) => {
                const data = snapshot.docs.map((doc) => {
                  return { ...doc.data(), id: doc.id };
                });
                // console.log(data);
                setRows(data);
                setRowsCopy(data);

                // 預設載入當期資料
                const newData = data
                  .slice()
                  .filter((row) => row.section == section);
                setRows(newData);

                console.log(section);
              });
          });
      });
  }, []);

  // 排序
  const sortData = (data, column) => {
    data = data.slice().sort(function (a, b) {
      if (column == 'date') return a.consumeDate > b.consumeDate ? 1 : -1;
      if (column == 'expense') return a.expense * 1 > b.expense * 1 ? 1 : -1;
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

  // 篩選
  const handleFilter = () => {
    let newData = rowsCopy;
    console.log(newData);

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
      // console.log(row)
      // return;
      dbCol
        .doc(row.id)
        .update(row)
        .then(() => {
          // 原本寫 rows.slice(), 資料會少
          // 改成 rowsCopy.slice()
          const newRows = rowsCopy.slice();
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

      const item = { ...row, user, account, createdAt: Date.now() };

      dbCol.add(item).then((doc) => {
        const newRows = rowsCopy.slice();
        // 將資料加到表格中,包含剛新增的id,做為刪除之用
        newRows.unshift({ ...item, id: doc.id });
     
        setRowsCopy(newRows);
      
       
        // 新增完做篩選為當期
        const newData = newRows
        .slice()
        .filter((row) => row.section == activeSection);


     
        setRows(newData);
      
          
  
       
      //  });

       
        // 設為初始值
        setRow(defalutItem);
        setEditRowIndex(-1);
        setOpen(false);
        setLoading(false);
      });
    }
  };

  // 刪除
  const deleteRow = (row) => {
    if (!window.confirm('確定刪除嗎?')) return;
    setLoading(true);
    dbCol
      .doc(row.id)
      .delete()
      .then(() => {
        const newRows = rowsCopy.slice();
        newRows.splice(editRowIndex, 1);
        setRowsCopy(newRows);

          // 刪除完做篩選為當期
          const newData = newRows
          .slice()
          .filter((row) => row.section == activeSection);


        setRows(newData);
        
        setOpen(false);
        setLoading(false);
      });
  };

  // 編輯(設定索引和編輯列)
  const editRow = (row, index) => {
    console.log(row);
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
              setColumn('expense');
              sortData(rows, 'expense');
            }}
          >
            金額
            {direction == 'decending' && column == 'expense' && (
              <Icon name="angle up" />
            )}
            {direction == 'acending' && column == 'expense' && (
              <Icon name="angle down" />
            )}
          </Button>
        </Segment>

        <DataList rows={rows} editRow={editRow} />
      </Container>
    </div>
  );
}
