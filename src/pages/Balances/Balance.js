import React, { useEffect, useRef, useState } from 'react';
import { db_money2022 as db } from '../../utils/firebase';
import {
  Button,
  Grid,
  Statistic,
  StatisticValue,
  Table,
  Divider,
  Header,
  Icon,
  Label,
} from 'semantic-ui-react';
import AccSelect from './components/AccSelect';
// import CateSelect from './components/CateSelect';
import SearchBar from './components/SearchBar';
import EditForm from './components/EditForm';

import CateSelect from '../../components/CateSelect';
import TableList from './components/TableList';
import TableListSmall from './components/TableListSmall';

export default function Balance() {
  const [rows, setRows] = useState([]);
  const [acc, setAcc] = useState('');
  // 帳戶餘額
  const [accBalance, setAccBalance] = useState(0);
  // 帳戶下拉選項
  const [accOptions, setAccOptions] = useState([]);

  const [open, setOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const [loading, setLoading] = useState(false);
  // 判斷新增或編輯(-1為新增)
  const [editedIndex, setEditedIndex] = useState(-1);

  // 判斷資料是否到最後一筆(more data 就改成 end)
  const [isEnd, setIsEnd] = useState(false);

  const defaultItem = {
    title: '',
    amt: '',
    date: new Date().toISOString().slice(0, 10),
  };
  const [item, setItem] = useState(defaultItem);

  const user = localStorage.getItem('user');

  // 每次顯示幾筆
  const perRecords = 5;
  // 記錄最後一筆 id
  const lastDocRef = useRef();

  // 依螢幕寬度設定版面(小於360設為true)
  const [isMobile, setIsMobile] = useState(true);


  // 依螢幕大小,改變顯示版面
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);



  useEffect(() => {

    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }


    // 取得排序最前面的帳戶
    db.collection('accounts')
      .where('prior', '==', 1)
      .get()
      .then((snapshot) => {
        const doc = snapshot.docs[0];
        const acc = snapshot.docs[0].data();
        setItem({ ...item, account: { id: doc.id, name: acc.name } });
        get10(doc.id);
        setAccBalance(acc.balance);
        // console.log(detectScreenSize());
      });
  }, []);

  
  // 最近數筆資料
  const get10 = (acc) => {
    db.collection('balances')
      .limit(perRecords)
      .where('user', '==', user)
      .where('account.id', '==', acc)
      .orderBy('date', 'desc')
      // .orderBy('createdAt', 'desc')
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        // console.log(snapshot.size);
        let total = 0;
        let total2 = 0;
        data.forEach((row) => {
          if (row.expense) total += row.expense * 1;
          if (row.income) total2 += row.income * 1;
        });

        // 使用本地排序,避免舊資料沒有 createAt 值,使用 firebase orderBy 會無法顯示
        data = data.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });

        lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
        setRows(data);
      });
  };

  // 從最後一筆再取出資料
  const handleMoreData = () => {
    if (!lastDocRef.current) {
      return;
    }
    // 有可能是帳戶或類別篩選
    // 做不同條件設定
    const acc = item.account.id;
    if (acc) {
      db.collection('balances')
        .limit(perRecords)
        .where('user', '==', user)
        .where('account.id', '==', acc)
        .orderBy('date', 'desc')
        .startAfter(lastDocRef.current)
        .get()
        .then((snapshot) => {
          let data = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });

          // console.log(snapshot.size)
          if (snapshot.size == 0 || snapshot.size < perRecords) {
            setIsEnd(true);
          }

          lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
          // 載入更多的資料加入到原陣列
          setRows([...rows, ...data]);
        });
    } else {
      db.collection('balances')
        .limit(perRecords)
        .where('user', '==', user)
        .where('cate', '==', item.cate)
        .orderBy('date', 'desc')
        .startAfter(lastDocRef.current)
        .get()
        .then((snapshot) => {
          let data = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });

          if (snapshot.size == 0 || snapshot.size < perRecords) {
            setIsEnd(true);
          }

          lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
          // 載入更多的資料加入到原陣列
          setRows([...rows, ...data]);
        });
    }
  };

  // 類別下拉選取(篩選用)
  const handleCateChange = (e, obj) => {
    setIsEnd(false);
    setItem({ ...item, cate: obj.value, account: { ...item.account, id: '' } });
    // console.log(rows)
    // setRows([])
    // return
    // 篩選資料
    db.collection('balances')
      .where('user', '==', user)
      .where('cate', '==', obj.value)
      .orderBy('date', 'desc')
      .limit(perRecords)
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setRows(data);
        lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
      });

    // 下拉的value設定item.cate
    // 選取後要設定值才能正常顯示選取的項目
    // setItem({ ...item, cate: obj.value });

    console.log(obj.value);
  };

  // 帳戶下拉選取(篩選用)
  const handleAccChange = (e, obj) => {
    setIsEnd(false);
    db.collection('balances')
      .where('user', '==', user)
      .where('account.id', '==', obj.value)
      .orderBy('date', 'desc')
      // .orderBy('createdAt', 'desc')
      .limit(perRecords)
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        // 使用本地排序,避免舊資料沒有 createAt 值,使用 firebase orderBy 會無法顯示
        data = data.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });

        setRows(data);
        setAcc(obj.value);
        setAccBalance(data[0]?.account.balance);

        const name = obj.options.filter((row) => row.value == obj.value);
        setItem({
          ...item,
          cate: '',
          account: { id: obj.value, name: name[0].text },
        });

        lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
        // console.log(data[0].account.balance);
      });

    // setAcc(obj.value);
  };

  // 刪除
  const handleDeleteItem = () => {
    if (!window.confirm('確定刪除嗎?')) return;
    db.collection('balances')
      .doc(item.id)
      .delete()
      .then(() => {
        setOpen(false);
        get10(item.account.id);
        // setItem(defaultItem);
        setEditedIndex(-1);
      });
  };

  // 儲存
  const handleSaveItem = () => {
    if (editedIndex > -1) {
      // 要修改的資料
      let newItem = {
        updatedAt: Date.now(),
        date: item.date,
        // user: user,
        title: item.title,
        account: { ...item.account, balance: item.account.balance },
        // cate: item.cate,
      };

      // 類別有資料才寫入
      if (item.cate) {
        newItem = { ...newItem, cate: item.cate };
      }
      // console.log(item);
      // console.log(newItem);
      // return;
      // 更新收支資料
      db.collection('balances')
        .doc(item.id)
        .update(newItem)
        .then(() => {
          setOpen(false);
          get10(item.account.id);
          setEditedIndex(-1);
          setItem(defaultItem);
          console.log(acc);
        });
    } else {
      // 新增資料
      console.log(item);
      // return

      // 取得目前帳戶
      const acc = item.account.id;
      // 如果沒有acc在後面更新帳戶餘額會發生錯誤
      // 在此做檢查
      if (!acc) {
        window.alert('請選擇帳戶');
        return;
      }

      setLoading(true);
      // const balance = accOptions
      db.collection('accounts')
        .doc(acc)
        .get()
        .then((doc) => {
          // 目前帳戶餘額
          const currentAmt = doc.data().balance * 1;
          console.log(currentAmt);

          let amt = isIncome ? item.amt * 1 : item.amt * -1;

          // 計算更新後餘額
          const updatedAmt = currentAmt + amt;
          console.log(updatedAmt);

          // 更新帳戶餘額
          const row = { balance: updatedAmt };
          db.collection('accounts')
            .doc(acc)
            .update(row)
            .then(() => {
              setAccBalance(updatedAmt);
            });

          // 要新增的資料
          let newItem = {
            createdAt: Date.now(),
            date: item.date,
            user: user,
            title: item.title,
            account: { ...item.account, balance: updatedAmt },
            // cate: item.cate,
          };

          // 類別有資料才寫入
          if (item.cate) {
            newItem = { ...newItem, cate: item.cate };
          }

          // 判斷收入或支出給不同欄位名稱
          if (isIncome) {
            newItem = {
              ...newItem,
              // income: item.income,
              income: item.amt,
            };
          } else {
            newItem = {
              ...newItem,
              // expense: item.expense,
              expense: item.amt,
            };
          }

          console.log(newItem);

          // return;
          // 新增一筆收支
          db.collection('balances')
            .add(newItem)
            .then((doc) => {
              // console.log(doc.id);
              // setItem(defaultItem);
              // setItem(defaultItem);
              setOpen(false);
              get10(acc);
              setLoading(false);
            });
        });
    }
  };

  // 編輯儲存

  // 新增
  const handleNewItem = () => {
    // 設定編輯表單的帳戶為查詢下拉選中的帳戶,金額項目設定預設值
    setItem({ ...item, ...defaultItem });
    setOpen(true);
    setEditedIndex(-1);

    console.log(acc);
  };

  // 點選列
  const handleRowClick = (row, index) => {
    // console.log(index);
    setEditedIndex(index);
    // 記錄 row
    setItem(row);
    // 開啟表單
    setOpen(true);
    // 依收入或支出顯示相對應頁
    if (row.income) {
      setIsIncome(true);
    } else {
      setIsIncome(false);
    }
    // console.log(item);
  };

  //
  const timeStampToDT = (ts) => {
    if (ts) {
      let dt = new Date(ts);
      let minutes = dt.getMinutes();
      let seconds = dt.getSeconds();
      if (seconds < 10) seconds = '0' + seconds;
      if (minutes < 10) minutes = '0' + minutes;
      return `${dt.getHours()}:${minutes}:${seconds}`;
    }
    return '';
  };

  return (
    <div>
      <EditForm
        editedIndex={editedIndex}
        open={open}
        setItem={setItem}
        saveItem={handleSaveItem}
        deleteItem={handleDeleteItem}
        setOpen={setOpen}
        isIncome={isIncome}
        setIsIncome={setIsIncome}
        item={item}
        loading={loading}
      />

      {/* <Grid columns={4}>
        <Grid.Row>
          <Grid.Column>
            <AccSelect
              account={item.account?.id}
              onChange={handleAccChange}
              options={accOptions}
            />
          </Grid.Column>
          <Grid.Column>
            <CateSelect
              cate={item.cate}
              onChange={handleCateChange}
              options={accOptions}
            />
          </Grid.Column>
          <Grid.Column>
            <Button onClick={handleNewItem}>新增</Button>
          </Grid.Column>
          <Grid.Column>
            <Statistic>
              <StatisticValue>{accBalance}</StatisticValue>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
      </Grid> */}

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            {' '}
            <AccSelect
              account={item.account?.id}
              onChange={handleAccChange}
              options={accOptions}
            />
          </Grid.Column>
          <Grid.Column>
            <CateSelect
              cate={item.cate}
              onChange={handleCateChange}
              options={accOptions}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            {/* <Header>{rows.length}</Header> */}

            <Statistic horizontal color="teal">
              <Statistic.Value>{accBalance}</Statistic.Value>
            </Statistic>
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Button onClick={handleNewItem} floated="right" color="yellow">
              ADD
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />

      {isMobile ? (
        <TableListSmall onRowClick={handleRowClick} rows={rows} />
      ) : (
        <TableList onRowClick={handleRowClick} rows={rows} />
      )}

      <Divider horizontal>
        <Header as="h4">
          {isEnd ? (
            'End'
          ) : (
            <Button basic primary onClick={handleMoreData}>
              More
            </Button>
          )}
        </Header>
      </Divider>
    </div>
  );
}
