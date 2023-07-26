import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
export default function TableHeaderSum({ rows, isShowBigM }) {
  // 欄位加總
  const [total, setTotal] = useState({
    foods: 0,
    minus: 0,
    ovAmounts: 0,
    babyBonus: 0,
    rowTotal: 0,
  });
  useEffect(() => {
    let foods = 0;
    let minus = 0;
    let ovAmounts = 0;
    let babyBonus = 0;
    let rowTotal = 0;
    rows.map((row) => {
      foods += row.food * 1;
      minus += row.minus * 1;
      ovAmounts += row.ovAmt * 1;
      babyBonus += row.others * 1;
      rowTotal += row.total * 1;
    });
    setTotal({ foods, minus, ovAmounts, babyBonus, rowTotal });
  }, [rows]);
  return (
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell width={1}></Table.HeaderCell>
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
        {/* 大小月 */}
        {isShowBigM && <Table.HeaderCell></Table.HeaderCell>}

        <Table.HeaderCell>{total.minus}</Table.HeaderCell>
        <Table.HeaderCell width={1}>{total.babyBonus}</Table.HeaderCell>
        <Table.HeaderCell width={1}>{total.rowTotal}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}
