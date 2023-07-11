import React from 'react';
import {
  Label,
  Button,
  Header,
  ListItem,
  ListContent,
  TableRow,
  TableCell,
} from 'semantic-ui-react';

export default function DataRow({ row, index, rowDispatch, rowsDispatch }) {
  function handleEdit() {
    rowDispatch({ type: 'EDIT_ROW', payload: { row, index } });
  }

  function handleDelete() {
    rowsDispatch({ type: 'DELETE_ROW', payload: row.id });
    rowDispatch({ type: 'INIT_ROW'});
  }

  return (
    <TableRow>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.prior}</TableCell>
      <TableCell>{row.balance}</TableCell>
      
      <TableCell>
        <Button primary onClick={handleEdit}>
          Edit
        </Button>
        <Button color="red" basic onClick={handleDelete}>
          Del
        </Button>
      </TableCell>
    </TableRow>
  );
}
