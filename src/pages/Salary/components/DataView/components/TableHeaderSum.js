import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
export default function TableHeaderSum({ rows }) {
  const [total, setTotal] = useState({
    foods: 1,
    minus: 2,
    ovAmounts: 3,
  });
  useEffect(() => {
    let foods = 0;
    let minus = 0;
    let ovAmounts = 0;
    rows.map((row) => {
      foods += row.food * 1;
      minus += row.minus * 1;
      ovAmounts += row.ovAmt * 1;
    });
    setTotal({ foods, minus, ovAmounts });
  }, [rows]);
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={1}></Table.HeaderCell>
        <Table.HeaderCell width={1}></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>{total.foods}</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>{total.ovAmounts}</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>{total.minus}</Table.HeaderCell>
        <Table.HeaderCell width={1}></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}
