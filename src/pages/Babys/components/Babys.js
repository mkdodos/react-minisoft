import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import  Baby  from './Baby';
export default function Babys({ rows,dispatch }) {
  
  return (
    <div>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>birth</Table.HeaderCell>
            <Table.HeaderCell>最後發放月</Table.HeaderCell>
            <Table.HeaderCell>可領</Table.HeaderCell>
            <Table.HeaderCell>#</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((baby,index) => {
            return <Baby dispatch={dispatch} index={index} row={baby} key={baby.id} />;
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
