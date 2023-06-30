import React, { useEffect, useState } from 'react';
import {
  Button,
  Icon,
  Divider,
  Statistic,
  Segment,
  Grid,
} from 'semantic-ui-react';
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

  // 排序
  const [sortDirection, setSortDirection] = useState('acending');
  const [sortColumn, setSortColumn] = useState('');

  // *************useEffect************
  useEffect(() => {
    console.clear();
    getCreditAcc();

    db.collection('sections')
      .orderBy('section', 'desc')
      .get()
      .then((snapshot) => {
        const section = snapshot.docs[0].data().section;
        setNewestSection(section);
        console.log(section);
        setSection(section);
        fetchRemoteData(section);
      });
  }, []);

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
      // .orderBy('date', 'desc')
      .where('user', '==', user)
      .where('section', '==', section)
      .get()
      .then((snapshot) => {
        // 無資料
        if (snapshot.size == 0) {
          console.log('no');
          SetTotal(0);
          // setLocalData([{ id: '1', title: '查無資料' }]);
          setLocalData([]);
          return;
        }
        // 有資料
        let total = 0;
        let data = snapshot.docs.map((doc) => {
          let d = doc.data();
          total += Number(d.expense);
          return { ...d, id: doc.id };
        });

        data.sort((a, b) => {
          return a.date < b.date ? 1 : -1;
        });

        // 設定顯示的資料
        setLocalData(data);
        // handleSortDataByDate()
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
    setEditRowIndex(-1);
    setOpen(true);
    setRow(defalutItem);
    // const item = { ...row, user, account, createdAt: Date.now() };
    // console.log(item);
  };

  // 編輯(設定索引和編輯列)
  const editRow = (row, index) => {
    setOpen(true);
    setEditRowIndex(index);
    setRow(row);
  };

  // 儲存(新增或更新)
  const saveRow = () => {
    setLoading(true);
    // 更新

    if (editRowIndex > -1) {
      db.collection('balances')
        .doc(row.id)
        .update(row)
        .then(() => {
          let newRows = localData.slice();
          Object.assign(newRows[editRowIndex], row);
          setLocalData(newRows);

          // 下面3行會導致資料列有多新增的情況
          // newRows = localDataCopy.slice();
          // Object.assign(newRows[editRowIndex], row);
          // setLocalDataCopy(newRows);

          // 更新加總
          let total = 0;
          newRows.map((row) => {
            total = total + row.expense * 1;
          });
          SetTotal(total);

          // 設為初始值
          setRow(defalutItem);
          setEditRowIndex(-1);
          setOpen(false);
          setLoading(false);
        });
    } else {
      // 新增
      let item = { ...row, user, account, createdAt: Date.now() };
      // console.log(item)
      db.collection('balances')
        .add(item)
        .then((doc) => {
          // const newRows = localDataCopy.slice();
          // 將資料加到表格中,包含剛新增的id,做為刪除之用
          // newRows.unshift({ ...item, id: doc.id });
          item = { ...item, id: doc.id };
          setLocalDataCopy([item, ...localDataCopy]);
          setLocalData([item, ...localData]);
          SetTotal(total + item.expense * 1);
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
    db.collection('balances')
      .doc(row.id)
      .delete()
      .then(() => {
        let newData = localData.slice();
        newData.splice(editRowIndex, 1);
        setLocalData(newData);

        const isLargeNumber = (element) => element.id === row.id;
        const index = localDataCopy.findIndex(isLargeNumber);
        // console.log();

        let newData2 = localDataCopy.slice();
        newData2.splice(index, 1);
        setLocalDataCopy(newData2);

        SetTotal(total - localData[editRowIndex].expense * 1);

        setOpen(false);
        setLoading(false);
      });
  };

  const handleSortData = () => {
    // 排序
    setSortColumn('expense');
    // localData.sort() 不能這樣寫,要加 slice
    let data = localData.slice();
    if (sortDirection == 'acending') {
      data.sort((a, b) => {
        return a.expense * 1 > b.expense * 1 ? 1 : -1;
      });
      setSortDirection('decending');
    } else {
      data.sort((a, b) => {
        return a.expense * 1 < b.expense * 1 ? 1 : -1;
      });
      setSortDirection('acending');
    }

    setLocalData(data);
  };

  const handleSortDataByDate = () => {
    setSortColumn('date');
    let data = localData.slice();
    if (sortDirection == 'acending') {
      data.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
      setSortDirection('decending');
    } else {
      data.sort((a, b) => {
        return a.date < b.date ? 1 : -1;
      });
      setSortDirection('acending');
    }

    setLocalData(data);
  };

  return (
    <div>
      <SectionDropdown value={section} onChange={handleFilter} />
      <Segment textAlign="center">
        <Statistic color="blue">
          <Statistic.Value>{numberFormat(total)}</Statistic.Value>
        </Statistic>
      </Segment>

      <Button onClick={newRow} color="teal">新增</Button>

      <Button onClick={handleSortDataByDate}>
        日期排序{" "} 
        {sortColumn == 'date' && sortDirection == 'acending' && (
          <Icon name="angle down" />
        )}
        {sortColumn == 'date' && sortDirection == 'decending' && (
          <Icon name="angle up" />
        )}
      </Button>
      <Button onClick={handleSortData}>
        金額排序{" "} 
        {sortColumn == 'expense' && sortDirection == 'acending' && (
          <Icon name="angle down" />
        )}
        {sortColumn == 'expense' && sortDirection == 'decending' && (
          <Icon name="angle up" />
        )}
      </Button>

      <ModalForm
        open={open}
        setOpen={setOpen}
        // rows={rows}
        // setRows={setRows}
        row={row}
        setRow={setRow}
        saveRow={saveRow}
        deleteRow={deleteRow}
        loading={loading}
      />

      <Divider />
      <DataList rows={localData} editRow={editRow} />
      {/* <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <DataList rows={localData} editRow={editRow} />
          </Grid.Column>
          <Grid.Column>           
            <DataList rows={localDataCopy} editRow={editRow} />
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
    </div>
  );
}
