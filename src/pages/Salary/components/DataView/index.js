import React, { useEffect, useState } from 'react';

import { Table } from 'semantic-ui-react';
import TableHeader from './components/TableHeader';
import TableHeaderSum from './components/TableHeaderSum';

export default function DataView({ rows }) {
  useEffect(() => {}, []);

  return (
    <Table unstackable>
      <TableHeader />
      <TableHeaderSum rows={rows}/>
      

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
