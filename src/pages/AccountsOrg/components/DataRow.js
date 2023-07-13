import React,{useContext} from 'react';
import {
  Label,
  Button,
  Header,
  ListItem,
  ListContent,
  TableRow,
  TableCell,
} from 'semantic-ui-react';

import { RowContext } from '..';

export default function DataRow({ row, index }) {
  const rowContext = useContext(RowContext);
  const { rowDispatch } = rowContext;
  function handleEdit() {
    rowDispatch({ type: 'EDIT_ROW', payload: { row, index } });
  }

  return (
    <TableRow onClick={handleEdit}>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.prior}</TableCell>
      <TableCell>{row.balance}</TableCell>     
    </TableRow>
  );
}
