import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import { deleteRow } from '../mortgagesSlice';
import { useDispatch } from 'react-redux';

export default function TableView({
  rows,
  setOpen,
  setEditedRow,
  setEditedRowIndex,
  handleAdd
}) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // if (window.confirm('Are you sure?'))
    dispatch(deleteRow(id));
  };

  const handleEdit = (row, index) => {
    setOpen(true);
    setEditedRow(row);
    setEditedRowIndex(index);
    // console.log(row,index)
  };

  return (
    <>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>日期</Table.HeaderCell>
            <Table.HeaderCell>本金</Table.HeaderCell>
            <Table.HeaderCell>利息</Table.HeaderCell>
            <Table.HeaderCell>小計</Table.HeaderCell>
            <Table.HeaderCell>
            <Button color="pink" onClick={handleAdd}>
                ADD
              </Button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell>{row.id}</Table.Cell>
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>{row.basic}</Table.Cell>
                <Table.Cell>{row.interest}</Table.Cell>
                <Table.Cell>
                  {Number(row.basic) + Number(row.interest)}
                </Table.Cell>

                <Table.Cell>
                  <Icon
                    onClick={() => handleEdit(row, index)}
                    color="green"
                    name="pencil"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Icon
                    onClick={() => handleDelete(row.id)}
                    color="red"
                    name="close"
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
