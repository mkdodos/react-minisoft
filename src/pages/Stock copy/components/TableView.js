import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default function TableView({ rows, handleEdit, editRow,handleAdd }) {
  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={2}>id</Table.HeaderCell>
          <Table.HeaderCell width={2}>日期</Table.HeaderCell>
          <Table.HeaderCell width={2}>名稱</Table.HeaderCell>
          <Table.HeaderCell width={1}>股數</Table.HeaderCell>
          <Table.HeaderCell width={1}>單價</Table.HeaderCell>

          {/* <Table.HeaderCell width={2}>#</Table.HeaderCell> */}
          <Table.HeaderCell width={2}><Button primary onClick={handleAdd}>新增</Button></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map((row, index) => {
          return (
            <Table.Row key={row.id}>
              <Table.Cell>{row.id}</Table.Cell>
              <Table.Cell>{row.date}</Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.qty}</Table.Cell>
              <Table.Cell>{row.price}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleEdit(row, index)}>編輯</Button>
              </Table.Cell>
              {/* <Table.Cell>
                <Button onClick={() => handleDelete(row.id)}>刪除</Button>
              </Table.Cell> */}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
