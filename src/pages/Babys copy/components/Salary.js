import React from 'react';
import { Button, Table } from 'semantic-ui-react';

export default function Salary({ rows, setRows, babys }) {
  function handleClick() {
    const count = babys.filter((baby) => baby.name == '楊政宏').length;

    console.log(count);
    const newRows = rows.slice();
    const data = newRows.map((row) => {
      if (babys.filter((baby) => baby.name == row.name).length > 0)
        return { ...row, bonus: 5000 };
      else {
        return { ...row, bonus: 0 };
      }
    });
    setRows(data);
    // console.log(data)
  }
  return (
    <div>
      <Button onClick={handleClick}>更新</Button>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>年</Table.HeaderCell>
            <Table.HeaderCell>月</Table.HeaderCell>
            <Table.HeaderCell>本薪</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.y}</Table.Cell>
                <Table.Cell>{row.m}</Table.Cell>
                <Table.Cell>{row.basic}</Table.Cell>
                <Table.Cell>{row.bonus}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
