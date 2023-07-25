import React, { useEffect, useState } from 'react';
import { API_HOST } from '../../../global/constants';
import axios from 'axios';
import { Tab, Table, TableHeader, TableHeaderCell } from 'semantic-ui-react';

export default function DataView({ search }) {
  const url = `${API_HOST}/salary/read.php`;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get(url, { params: { y: search.y, m: search.m } }).then((res) => {
      console.log(res.data);

      setRows(res.data);
      // const data = res.data.map((emp) => {
      //   return { key: emp.name, text: emp.name, value: emp.name };
      // });

      // setOptions(data);
    });
  }, []);

  return (
    <Table unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>姓名</Table.HeaderCell>
          <Table.HeaderCell width={1}>年</Table.HeaderCell>
          <Table.HeaderCell>月</Table.HeaderCell>
          <Table.HeaderCell>本薪</Table.HeaderCell>
          <Table.HeaderCell>職務</Table.HeaderCell>
          <Table.HeaderCell>技術</Table.HeaderCell>
          <Table.HeaderCell>伙食</Table.HeaderCell>
          <Table.HeaderCell>全勤</Table.HeaderCell>
          <Table.HeaderCell>無過失</Table.HeaderCell>
          <Table.HeaderCell>績效</Table.HeaderCell>
          <Table.HeaderCell>加班分鐘</Table.HeaderCell>
          <Table.HeaderCell>加班金額</Table.HeaderCell>
          <Table.HeaderCell>請假</Table.HeaderCell>
          <Table.HeaderCell>請假扣</Table.HeaderCell>
          <Table.HeaderCell>其他扣</Table.HeaderCell>
          <Table.HeaderCell width={1}>育嬰津貼</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((item) => {
          return (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.y}</Table.Cell>
              <Table.Cell>{item.m}</Table.Cell>
              <Table.Cell>{item.basic}</Table.Cell>
              <Table.Cell>{item.job}</Table.Cell>
              <Table.Cell>{item.tech}</Table.Cell>
              <Table.Cell>{item.food}</Table.Cell>
              <Table.Cell>{item.full}</Table.Cell>
              <Table.Cell>{item.error}</Table.Cell>
              <Table.Cell>{item.effect}</Table.Cell>
              <Table.Cell>{item.mins}</Table.Cell>
              <Table.Cell>{item.ovAmt}</Table.Cell>
              <Table.Cell>{item.offHours}</Table.Cell>
              <Table.Cell>{item.offHoursAmt}</Table.Cell>
              <Table.Cell>{item.minus}</Table.Cell>
              <Table.Cell>{item.others}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
