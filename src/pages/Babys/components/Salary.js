import React from 'react';
import { Table, Icon,Button } from 'semantic-ui-react';
import { actions } from '../constants/actions';

export default function Salary({row}) {
  console.log(row)

  return (
    <Table.Row>
      <Table.Cell>{row.name}</Table.Cell>
      <Table.Cell>{row.y}</Table.Cell>
      <Table.Cell>{row.m}</Table.Cell>
      <Table.Cell>{row.basic}</Table.Cell>
      <Table.Cell>{row.bonus}</Table.Cell>
     
    </Table.Row>
  );
}
