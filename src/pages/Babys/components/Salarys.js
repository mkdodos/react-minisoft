import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import Salary from './Salary';
export default function Salarys({ rows }) {
  
  return (
    <div>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>birth</Table.HeaderCell>
            <Table.HeaderCell>最後發放月</Table.HeaderCell>
            <Table.HeaderCell>可領</Table.HeaderCell>
            
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => {
            return (
              <Salary key={row.id} row={row} />
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
