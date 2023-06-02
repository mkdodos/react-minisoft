import React, { useEffect, useState } from 'react';
import { db_money2022 } from '../utils/firebase';
import { Table } from 'semantic-ui-react';

export default function Balance() {
  const [rows,setRows]=useState([])
  useEffect(() => {
    db_money2022
      .collection('balances')
      // .where()
      .where('type', '==', '轉帳')
      // .where('account.name', '==', '暫付款')
      .where('user', '==', 'dada@gmail.com')
      // .orderBy('date','desc')
      // .orderBy('createdAt','desc')
      // .limit(300)
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          return {...doc.data(),id:doc.id};
        });
        // data = data.sort((a,b)=>{
        //   return a.date>b.date
        // })
        // data = data.filter(row=>row.account.name=='暫付款')
        let total = 0;
        let total2 = 0;
        data.forEach(row=>{
          if(row.expense)
          total+=row.expense*1
          if(row.income)
          total2+=row.income*1
        })
        console.log(total,total2);
        setRows(data)
      });
  }, []);

  return (
    <div>

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
            {/* <Table.HeaderCell>餘額</Table.HeaderCell> */}
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
                {/* <Table.Cell>{row.account.balance}</Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
