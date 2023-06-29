import React, { useEffect, useState } from 'react';
import { Button, Input, Divider, Statistic, Segment } from 'semantic-ui-react';
import { db_money2022 as db } from '../../utils/firebase';
import numberFormat from '../../utils/numberFormat';
import DataList from './components/DataList';
import SectionDropdown from './components/Section/components/SectionDropdown';
import ModalForm from './components/ModalForm';

export default function Index() {
  // *************資料************
  // 篩選用期數
  const [section, setSection] = useState('');
  // 最新期數
  const [newestSection, setNewestSection] = useState('');
  // 本地資料(顯示用)
  const [localData, setLocalData] = useState([]);
  // 本地資料(篩選用)
  const [localDataCopy, setLocalDataCopy] = useState([]);
  // 使用者
  const user = localStorage.getItem('user');
  // 帳戶(新增消費時會用到)
  const [account, setAccount] = useState('');
  // 當期總金額
  const [total, SetTotal] = useState(0);

  // 表單預設值
  const defalutItem = {
    date: new Date().toISOString().slice(0, 10),
    title: '',
    expense: '',
    section,
  };
  // 編輯列
  const [row, setRow] = useState(defalutItem);
  // 編輯列索引
  const [editRowIndex, setEditRowIndex] = useState(-1);
  // 編輯表單開關
  const [open, setOpen] = useState(false);
  // 載入中
  const [loading, setLoading] = useState(false);

  // *************方法************
  // 取得信用卡帳戶(type=credits)
  const getCreditAcc = () => {
    db.collection('accounts')
      .where('user', '==', user)
      .where('type', '==', 'credits')
      .get()
      .then((snapshot) => {
        if (snapshot.size == 0) return;
        const acc = snapshot.docs[0];
        setAccount({ ...acc.data(), id: acc.id });
      });
  };

  // 取得遠端資料
  const fetchRemoteData = (section) => {
    db.collection('balances')
      .where('user', '==', user)
      .where('section', '==', section)
      .get()
      .then((snapshot) => {
        // 無資料
        if (snapshot.size == 0) {
          console.log('no');
          SetTotal(0);
          setLocalData([{ id: '1', title: '查無資料' }]);
          return;
        }
        // 有資料
        let total = 0;
        let data = snapshot.docs.map((doc) => {
          let d = doc.data();
          total += Number(d.expense);
          return { ...d, id: doc.id };
        });

        // 排序
        data = data.sort((a, b) => {
          return a.expense * 1 < b.expense * 1 ? 1 : -1;
        });

        console.log(data);

        // 設定顯示的資料
        setLocalData(data);
        // 將資料加入本地
        setLocalDataCopy([...localDataCopy, ...data]);
        // 設定加總
        SetTotal(total);
      });
    // });
  };

  // 查詢
  const handleFilter = (e, { value }) => {
    const section = value;
    setSection(section);
    // 本地篩選
    let rows = localDataCopy.filter((item) => item.section.includes(section));
    // 有查到本地資料
    if (rows.length > 0) {
      let total = 0;
      rows.map((row) => {
        total += Number(row.expense);
      });
      SetTotal(total);
      setLocalData(rows);
      console.log('local');
    } else {
      // 沒查到本地資料,再從遠端查詢
      fetchRemoteData(section);
    }
  };

  // add
  const newRow = () => {
    setEditRowIndex(-1)
    setOpen(true);
    setRow(defalutItem);
    // const item = { ...row, user, account, createdAt: Date.now() };
    // console.log(item);
  };

  // 編輯(設定索引和編輯列)
  const editRow = (row, index) => {

    setOpen(true);
    setEditRowIndex(index)
    setRow(row);
  };

  // 儲存(新增或更新)
  const saveRow = () => {
    setLoading(true);
    // 更新
    if (editRowIndex > -1) {
     
      
    } else {
      // 新增
      const item = { ...row, user, account, createdAt: Date.now() };
      // console.log(item)
      db.collection('balances').add(item).then((doc) => {   
        setRow(defalutItem);
        setEditRowIndex(-1);
        setOpen(false);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    console.clear();
    getCreditAcc();

    db.collection('sections')
      .orderBy('section', 'desc')
      .get()
      .then((snapshot) => {
        const section = snapshot.docs[0].data().section;
        setNewestSection(section)
        console.log(section)
        setSection(section);
        fetchRemoteData(section);
      });
  }, []);
  return (
    <div>
      <SectionDropdown value={section} onChange={handleFilter} />
      <Segment textAlign="center">
        <Statistic color="blue">
          <Statistic.Value>{numberFormat(total)}</Statistic.Value>
        </Statistic>
      </Segment>

      <Button onClick={newRow}>新增</Button>

      <ModalForm
        open={open}
        setOpen={setOpen}
        // rows={rows}
        // setRows={setRows}
        row={row}
        setRow={setRow}
        saveRow={saveRow}
        // deleteRow={deleteRow}
        loading={loading}
      />

      <Divider />
      <DataList rows={localData} editRow={editRow} />
    </div>
  );
}
