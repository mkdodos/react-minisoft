import React from 'react';
import DataRow from './DataRow';
import { List, Table } from 'semantic-ui-react';

export default function DataView({ rows, rowDispatch, rowsDispatch }) {
  function handleSort() {
    rowsDispatch({ type: 'SORT_ROW' });
    console.log('abc');
  }
  return (
    <div>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>帳戶名稱</Table.HeaderCell>
            <Table.HeaderCell>順序</Table.HeaderCell>
            <Table.HeaderCell onClick={handleSort}>餘額</Table.HeaderCell>

            <Table.HeaderCell>#</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row, index) => {
            return (
              <DataRow
                rowDispatch={rowDispatch}
                rowsDispatch={rowsDispatch}
                key={row.id}
                row={row}
                index={index}
              />
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
