import React, { useEffect, useState } from 'react';
import { db_money2022 as db } from '../utils/firebase';
import { Button, Table } from 'semantic-ui-react';
import AccSelect from '../components/AccSelect';

export default function Balance() {
  const [rows, setRows] = useState([]);
  const [acc, setAcc] = useState('');
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
  const handleUpdateBalance = () => {
    // console.log(acc)
    // 取得目前帳戶餘額
    db.collection('accounts')
      .doc(acc)
      .get()
      .then((doc) => {
        const currentAmt = doc.data().balance;
        // 收入或支出
        const isExpense = false;
        let newAmt = 15;
        newAmt = isExpense ? newAmt * -1 : newAmt;

        // 更新後餘額
        const updatedAmt = currentAmt + newAmt;
        console.log(updatedAmt);

        const row = { balance: updatedAmt };
        db.collection('accounts').doc(acc).update(row);
        // console.log(doc.data().balance)
      });

    
  };

  return (
    <div>
      <Button onClick={handleUpdateBalance}>新增</Button>
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
