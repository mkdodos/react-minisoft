import React from 'react'
import { Table,Icon } from 'semantic-ui-react';

export default function Babys({rows}) {
  function handleEdit(){
    console.log('edit')
  }
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
          {rows.map((baby) => {
            return (
              <Table.Row key={baby.id}>
                <Table.Cell>{baby.name}</Table.Cell>
                <Table.Cell>{baby.birth}</Table.Cell>
                <Table.Cell>{baby.expireYM}</Table.Cell>
                <Table.Cell>
                  {baby.isExpire && <Icon name="check" />}
                </Table.Cell>
                <Table.Cell onClick={handleEdit}>Edit</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
