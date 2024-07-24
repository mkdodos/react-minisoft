import React from 'react';
import { Table,Button } from 'semantic-ui-react';

export default function TableView({ rows, handleAdd, handleEdit }) {
  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>股票名稱</Table.HeaderCell>
           
            <Table.HeaderCell width={2}>總成本</Table.HeaderCell>
            <Table.HeaderCell width={2}>總股數</Table.HeaderCell>
            <Table.HeaderCell width={2}>平均成本</Table.HeaderCell>
            <Table.HeaderCell width={2}>現價</Table.HeaderCell>
            <Table.HeaderCell width={2}>損益</Table.HeaderCell>
            <Table.HeaderCell width={2}>
              <Button primary onClick={handleAdd}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell>{row.name}</Table.Cell>
                
                <Table.Cell>{row.totalCost}</Table.Cell>
                <Table.Cell>{row.qtys}</Table.Cell>
                <Table.Cell>{Math.round(row.avgCost*100)/100}</Table.Cell>
                <Table.Cell>{row.price}</Table.Cell>
                <Table.Cell>{Math.round(row.bouns)}</Table.Cell>
               
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
