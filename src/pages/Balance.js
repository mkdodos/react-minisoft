import React, { useEffect, useState } from 'react';
import { db_money2022 as db } from '../utils/firebase';
import { Button, Table } from 'semantic-ui-react';
import AccSelect from '../components/AccSelect';
import EditForm from './EditForm';

export default function Balance() {
  const [rows, setRows] = useState([]);
  const [acc, setAcc] = useState('');
  const [open, setOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(false);

  const [item, setItem] = useState({ title: '', amt: '',date:'' });

  const user = localStorage.getItem('user');
  useEffect(() => {
    db.collection('balances')
      // .where('type', '==', '轉帳')
      .limit(10)
      .where('user', '==', user)
      .orderBy('date', 'desc')
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        let total = 0;
        let total2 = 0;
        data.forEach((row) => {
          if (row.expense) total += row.expense * 1;
          if (row.income) total2 += row.income * 1;
        });
        // console.log(total, total2);
        setRows(data);
      });
  }, []);

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
        setAcc(obj.value);
        // console.log(obj)
      });

    // setAcc(obj.value);
  };

  // 更新帳戶餘額
  const handleSaveItem = () => {
    // console.log(acc)
    // 取得目前帳戶餘額
    db.collection('accounts')
      .doc(acc)
      .get()
      .then((doc) => {
        const currentAmt = doc.data().balance;
        // 收入或支出
        // const isExpense = false;
        let newAmt = item.amt;
        newAmt = isIncome ? newAmt : newAmt * -1;

        // 更新後餘額
        const updatedAmt = currentAmt + newAmt;
        console.log(updatedAmt);

        const row = { balance: updatedAmt };
        db.collection('accounts').doc(acc).update(row);
        setOpen(false);
      });

    console.log(item);

    // 新增一筆收支
    // db.collection('balances').add(item).then(doc=>{
    //   console.log(doc.id);
    // })
  };

  // 新增
  const handleNewItem = () => {
    setOpen(true);
    console.log(isIncome);
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
      />
      <Button onClick={handleNewItem}>新增</Button>
      {/* <Button onClick={handleSaveItem}>儲存</Button> */}
      <AccSelect onChange={handleAccChange} />
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>id</Table.HeaderCell> */}
            <Table.HeaderCell>date</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>title</Table.HeaderCell>
            <Table.HeaderCell>收入</Table.HeaderCell>
            <Table.HeaderCell>支出</Table.HeaderCell>
            <Table.HeaderCell>餘額</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row) => {
            return (
              <Table.Row key={row.id}>
                {/* <Table.Cell>{row.id}</Table.Cell> */}
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>{row.account.name}</Table.Cell>
                <Table.Cell>{row.type}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.income}</Table.Cell>
                <Table.Cell>{row.expense}</Table.Cell>
                <Table.Cell>{row.account.balance}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
