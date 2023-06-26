import React from 'react';
import { Table, Header, Label } from 'semantic-ui-react';
export default function DataList({ rows, editRow }) {
  return (
    <div>
      <Table unstackable>
        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row key={row.id} onClick={() => editRow(row, index)}>
                <Table.Cell>
                  <Header as="h4">{row.title}</Header>
                  <span>{row.date} </span>
                  <Label>{row.cate}</Label>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Label  basic color='teal'>
                    {row.section}
                  </Label>
               
                </Table.Cell>
                <Table.Cell>
            
                ${row.expense}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
