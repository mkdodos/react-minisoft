import React from 'react';
import { Table, Icon, Header } from 'semantic-ui-react';
import { deleteRow } from './mortgagesSlice';
import { useDispatch } from 'react-redux';

export default function TableListSmall({ rows }) {
  const dispatch = useDispatch()
  return (
    <div>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
          {/* <Table.HeaderCell>id</Table.HeaderCell> */}
            <Table.HeaderCell>date</Table.HeaderCell>
            <Table.HeaderCell>basic</Table.HeaderCell>
            <Table.HeaderCell>interest</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                {/* <Table.Cell>{row.id}</Table.Cell> */}
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>{row.basic}</Table.Cell>
                <Table.Cell>{row.interest}</Table.Cell>
                <Table.Cell><Icon onClick={()=>dispatch(deleteRow(row.id))} color='red' name="close"/>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
