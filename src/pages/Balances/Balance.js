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
  Label
} from 'semantic-ui-react';
import AccSelect from './components/AccSelect';
import CateSelect from './components/CateSelect';
import EditForm from './components/EditForm';

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

  const defaultItem = {
    title: '',
    amt: '',
    date: new Date().toISOString().slice(0, 10),
  };
  const [item, setItem] = useState(defaultItem);

  const user = localStorage.getItem('user');

  // 記錄最後一筆 id
  const lastDocRef = useRef();

  useEffect(() => {
    // 取得排序最前面的帳戶
    db.collection('accounts')
      .where('prior', '==', 1)
      .get()
      .then((snapshot) => {
        const doc = snapshot.docs[0];
        console.log(doc.id);
        console.log(doc.data().name);
        setItem({ ...item, account: { id: doc.id, name: doc.data().name } });
        get10(doc.id);
      });
  }, []);

  useEffect(() => {
    // console.log(item);
  }, [item]);

  // 最近10筆資料
  const get10 = (acc) => {
    db.collection('balances')
      .limit(2)
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

  // 類別下拉選取(篩選用)
  const handleCateChange = (e, obj) => {
    // 篩選資料
    db.collection('balances')
      .where('user', '==', user)
      .where('cate', '==', obj.value)
      .orderBy('date', 'desc')
      .limit(15)
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setRows(data);
      });

    // 下拉的value設定item.cate
    // 選取後要設定值才能正常顯示選取的項目
    setItem({ ...item, cate: obj.value });
    console.log(obj.value);
  };

  // 帳戶下拉選取(篩選用)
  const handleAccChange = (e, obj) => {
    db.collection('balances')
      .where('user', '==', user)
      .where('account.id', '==', obj.value)
      .orderBy('date', 'desc')
      // .orderBy('createdAt', 'desc')
      .limit(2)
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
        setAccBalance(data[0].account.balance);

        const name = obj.options.filter((row) => row.value == obj.value);
        setItem({ ...item, account: { id: obj.value, name: name[0].text } });
        // console.log(data[0].account.balance);
      });

    // setAcc(obj.value);
  };

  // 刪除
  const handleDeleteItem = () => {
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
      setLoading(true);
      // 取得目前帳戶餘額
      const acc = item.account.id;
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

  // 取得星期幾
  const getWeekDay = (date) => {
    const dt = new Date(date);

    let day = '';
    switch (dt.getDay()) {
      case 0:
        day = '日';
        break;
      case 1:
        day = '一';
        break;
      case 2:
        day = '二';
        break;
      case 3:
        day = '三';
        break;
      case 4:
        day = '四';
        break;
      case 5:
        day = '五';
        break;
      case 6:
        day = '六';
        break;
    }

    return day;
  };

  const handleMoreData = () => {
    // 從最後一筆再取出資料

    const acc = item.account.id;
    db.collection('balances')
      .limit(2)
      .where('user', '==', user)
      .where('account.id', '==', acc)
      .orderBy('date', 'desc')
      .startAfter(lastDocRef.current)
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
        // 載入更多的資料加入到原陣列
        setRows([...rows, ...data]);
      });

    console.log(acc);
  };

  // 日期非當年才顯示年份
  const dateExcludeCurrentYear = (date) => {
    // 當年
    const currentYear = new Date().getFullYear();
    // 每一筆日期的年
    const dataYear = date.slice(0, 4);
    // 省略年的日期
    const excludedDate = date.slice(5);

    // 日期為當年回傳省略年的日期
    if (currentYear == dataYear) {
      return excludedDate;
    }

    // 非當年日期正常顯示
    return date;
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
      <Grid columns={4}>
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
          <Grid.Column>
            {' '}
            <Button onClick={handleNewItem}>新增</Button>
            {/* <Button onClick={handleMoreData}>載入更多</Button> */}
          </Grid.Column>
          <Grid.Column>
            <Statistic>
              <StatisticValue>{accBalance}</StatisticValue>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {/* <Button onClick={handleSaveItem}>儲存</Button> */}

      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>id</Table.HeaderCell> */}
            <Table.HeaderCell width={3}>日期</Table.HeaderCell>
            {/* <Table.HeaderCell width={2}>at</Table.HeaderCell> */}
            {/* <Table.HeaderCell>帳戶</Table.HeaderCell> */}
            <Table.HeaderCell>類別</Table.HeaderCell>
            <Table.HeaderCell>項目</Table.HeaderCell>
            <Table.HeaderCell>收入</Table.HeaderCell>
            <Table.HeaderCell>支出</Table.HeaderCell>
            <Table.HeaderCell>餘額</Table.HeaderCell>
            <Table.HeaderCell>類型</Table.HeaderCell>
            {/* <Table.HeaderCell></Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row
                key={row.id}
                onClick={() => handleRowClick(row, index)}
              >
                <Table.Cell>
                  {dateExcludeCurrentYear(row.date)} ({getWeekDay(row.date)})
                  {/* <Label>2022</Label> */}
                </Table.Cell>
                {/* <Table.Cell>{timeStampToDT(row.createdAt)}</Table.Cell> */}
                {/* <Table.Cell>{row.account?.name}</Table.Cell> */}
                <Table.Cell>{row.cate}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.income}</Table.Cell>
                <Table.Cell>{row.expense}</Table.Cell>
                <Table.Cell positive>{row.account?.balance}</Table.Cell>
                <Table.Cell>{row.type}</Table.Cell>
                {/* <Table.Cell>{}</Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Divider horizontal>
        <Header as="h4" onClick={handleMoreData}>
          More
        </Header>
      </Divider>
    </div>
  );
}
