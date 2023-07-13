import React from 'react';
import DataRow from './DataRow';
import { List, Table } from 'semantic-ui-react';

export default function DataView({  rows,  rowsDispatch }) {
  function handleSort() {
    rowsDispatch({ type: 'SORT_ROW', payload: 'asc' });
  }
  return (
    <Table unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>名稱</Table.HeaderCell>
          <Table.HeaderCell>順序</Table.HeaderCell>
          <Table.HeaderCell onClick={handleSort}>餘額</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map((row, index) => {
          return (
            <DataRow  
              key={row.id}
              row={row}
              index={index}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
}
