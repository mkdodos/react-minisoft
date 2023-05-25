import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Input } from 'semantic-ui-react';
import { db } from '../utils/firebase';

export default function Notebook() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);
  const [rowsCopy, setRowsCopy] = useState([]);
  const url = 'http://localhost:8888/react-minisoft/mysql/spending.php';

  useEffect(() => {
    // 將 mysql 資料新增到 firebase, 每次一年份,目前已做了2023
    // axios.get(url).then((res) => {
    // console.log(res.data)
    // setRows(res.data)
    // const data = res.data;
    // data.map(row=>{
    //   db.collection('spending').add(row)
    // })
    // });

    db.collection('spending')
      .orderBy('spend_date', 'desc')
      .limit(100)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        console.log(snapshot.size);
        setRows(data);
        // 使用前端查詢,需要複製一份資料做為查詢用
        setRowsCopy(data);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filterData = rowsCopy.filter((row) =>
      row.note.includes(e.target.value)
    );
    setRows(filterData);
  };

  return (
    <Container>
      <Input value={search} onChange={handleSearch} />
      <Table celled>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>id</Table.HeaderCell> */}
            <Table.HeaderCell>spend_date</Table.HeaderCell>
            <Table.HeaderCell>note</Table.HeaderCell>
            <Table.HeaderCell>收入</Table.HeaderCell>
            <Table.HeaderCell>支出</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row) => {
            return (
              <Table.Row key={row.id}>
                {/* <Table.Cell>{row.id}</Table.Cell> */}
                <Table.Cell>{row.spend_date}</Table.Cell>
                <Table.Cell>{row.note}</Table.Cell>
                <Table.Cell>{row.income}</Table.Cell>
                <Table.Cell>{row.expense}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
}
