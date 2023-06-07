import React, { useEffect, useState } from 'react';
import { db_money2022 as db } from '../../utils/firebase';
import { Button, Grid, Table } from 'semantic-ui-react';
import AccSelect from './components/AccSelect';
import EditForm from './components/EditForm';

export default function Balance() {
  const [rows, setRows] = useState([]);
  const [acc, setAcc] = useState('');
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
  useEffect(() => {
    get10();
  }, []);


  useEffect(() => {
    console.log(isIncome)
  }, [isIncome]);


  // 最近10筆資料
  const get10 = () => {
    db.collection('balances')
      .limit(10)
      .where('user', '==', user)
      .orderBy('date', 'desc')
      .orderBy('createdAt', 'desc')
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        console.log(snapshot.size);
        let total = 0;
        let total2 = 0;
        data.forEach((row) => {
          if (row.expense) total += row.expense * 1;
          if (row.income) total2 += row.income * 1;
        });

        setRows(data);
      });
  };

  // 帳戶下拉選取(篩選用)
  const handleAccChange = (e, obj) => {
    db.collection('balances')
      .where('user', '==', user)
      .where('account.id', '==', obj.value)
      .orderBy('date', 'desc')
      .limit(10)
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setRows(data);
        // setAcc(obj.value);
        // console.log(obj)
      });

    // setAcc(obj.value);
  };

  // 儲存
  const handleSaveItem = () => {
    if (editedIndex > -1) {
      // 更新收支資料
      db.collection('balances')
        .doc(item.id)
        .update(item)
        .then(() => {
          console.log(item);
          setOpen(false);
        });
    } else {
      setLoading(true);
      // 取得目前帳戶餘額
      const acc = item.account.id;
      db.collection('accounts')
        .doc(acc)
        .get()
        .then((doc) => {
          // 目前帳戶餘額
          const currentAmt = doc.data().balance * 1;
          // 收入或支出
          let newAmt = item.amt;
          newAmt = isIncome ? newAmt * 1 : newAmt * -1;

          // 計算更新後餘額
          const updatedAmt = currentAmt + newAmt;
          console.log(updatedAmt);

          // 更新帳戶餘額
          const row = { balance: updatedAmt };
          db.collection('accounts').doc(acc).update(row);

          let newItem = {
            createdAt: Date.now(),
            date: item.date,
            user: user,
            title: item.title,
            account: { ...item.account, balance: updatedAmt },
            cate: item.cate,
          };

          // 判斷收入或支出給不同欄位名稱
          if (isIncome) {
            newItem = {
              ...newItem,
              income: item.amt,
            };
          } else {
            newItem = {
              ...newItem,
              expense: item.amt,
            };
          }

          // 新增一筆收支
          db.collection('balances')
            .add(newItem)
            .then((doc) => {
              console.log(doc.id);
              setItem(defaultItem);
              setOpen(false);
              get10();
              setLoading(false);
            });
        });
    }
  };

  // 編輯儲存

  // 新增
  const handleNewItem = () => {
    setOpen(true);
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
    console.log(item);
  };

  return (
    <div>
      <EditForm
        open={open}
        setItem={setItem}
        saveItem={handleSaveItem}
        setOpen={setOpen}
        isIncome={isIncome}
        setIsIncome={setIsIncome}
        item={item}
        loading={loading}
      />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            {' '}
            <AccSelect onChange={handleAccChange} />
          </Grid.Column>
          <Grid.Column>
            {' '}
            <Button onClick={handleNewItem}>新增</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {/* <Button onClick={handleSaveItem}>儲存</Button> */}

      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>id</Table.HeaderCell> */}
            <Table.HeaderCell width={2}>日期</Table.HeaderCell>
            <Table.HeaderCell>帳戶</Table.HeaderCell>
            <Table.HeaderCell>類別</Table.HeaderCell>
            <Table.HeaderCell>項目</Table.HeaderCell>
            <Table.HeaderCell>收入</Table.HeaderCell>
            <Table.HeaderCell>支出</Table.HeaderCell>
            <Table.HeaderCell>餘額</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row
                key={row.id}
                onClick={() => handleRowClick(row, index)}
              >
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>{row.account?.name}</Table.Cell>
                <Table.Cell>{row.cate}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.income}</Table.Cell>
                <Table.Cell>{row.expense}</Table.Cell>
                <Table.Cell positive>{row.account?.balance}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
