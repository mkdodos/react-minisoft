import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../utils/firebase';
import { Table, Container, Input, 
  Button, Divider, Form, Grid, Segment

} from 'semantic-ui-react';

import YearSelect from '../components/YearSelect';
import MonthSelect from '../components/MonthSelect';
import CateSelect from '../components/CateSelect';

export default function Notebook() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);
  const [rowsCopy, setRowsCopy] = useState([]);
  const url = 'http://localhost:8888/react-minisoft/mysql/spending.php';
  const urlCate = 'http://localhost:8888/react-minisoft/mysql/cate.php';
  // 條件
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState('02');
  const [cate, setCate] = useState('');

  useEffect(() => {
    db.collection('spending')
      .orderBy('spend_date', 'desc')
      .where('spend_date', '>=', `${year}-${month}-01`)
      .where('spend_date', '<=', `${year}-${month}-31`)
      // .where('account', '<=', `${year}-${month}-31`)

      .limit(100)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        // console.log(snapshot.size);
        setRows(data);
        // 使用前端查詢,需要複製一份資料做為查詢用
        setRowsCopy(data);
      });
  }, [year, month]);

  useEffect(() => {
    db.collection('spending')
      .orderBy('spend_date', 'desc')

      .where('cate', '==', cate)
      .limit(100)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        // console.log(snapshot.size);
        setRows(data);
        // 使用前端查詢,需要複製一份資料做為查詢用
        setRowsCopy(data);
      });
  }, [cate]);

  // 轉資料(目前2023,2022,2021,2020,2019,2018已轉)
  const transData = (e) => {
    // 將 mysql 資料新增到 firebase, 每次一年份
    axios.get(url).then((res) => {      
      res.data.map((row) => {       
        db.collection('spending').add(row);
      });
    });
    
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filterData = rowsCopy.filter((row) =>
      row.note.includes(e.target.value)
    );
    setRows(filterData);
  };

  const handleYearChange = (e, obj) => {
    setYear(obj.value);
    // console.log(month)
  };

  const handleMonthChange = (e, obj) => {
    setMonth(obj.value);
    // console.log(month)
  };

  const handleCateChange = (e, obj) => {
    console.log(obj.value);
    setCate(obj.value);
  };

  return (
    <Container>


<Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form>
        <YearSelect year={year} onChange={handleYearChange} />

<MonthSelect month={month} onChange={handleMonthChange} />
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
      <CateSelect cate={cate} onChange={handleCateChange} />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>



    
     
      <Button onClick={transData}>轉資料</Button>
      <Input value={search} onChange={handleSearch} />
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>id</Table.HeaderCell> */}
            <Table.HeaderCell width={3}>spend_date</Table.HeaderCell>
            <Table.HeaderCell width={5}>note</Table.HeaderCell>
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
