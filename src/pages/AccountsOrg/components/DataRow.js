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

  

  return (
    <TableRow onClick={handleEdit}>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.prior}</TableCell>
      <TableCell>{row.balance}</TableCell>
      
      {/* <TableCell>
        <Button primary onClick={handleEdit}>
          Edit
        </Button>
       
      </TableCell> */}
    </TableRow>
  );
}
