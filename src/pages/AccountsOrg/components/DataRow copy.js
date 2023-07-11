import React from 'react';
import {
  Label,
  Button,
  Header,
  ListItem,
  ListContent,
} from 'semantic-ui-react';

export default function DataRow({ row, index, rowDispatch, rowsDispatch }) {
  return (
    <ListItem>
      {row.name}
      
      <ListContent floated="right">
        <Button primary
          onClick={() => {
            rowDispatch({ type: 'EDIT_ROW', payload: { row, index } });
          }}
        >
          Edit
        </Button>
        <Button color='red'
          onClick={() => {
            rowsDispatch({ type: 'DELETE_ROW', payload: row.id });
            rowDispatch({ type: 'INIT_ROW'});
          }}
        >
          del
        </Button>
      </ListContent>

      <ListContent floated="right">
        {' '}
        <Label>{row.prior}</Label>
      </ListContent>
      <Label circular>{row.balance}</Label>
    </ListItem>
  );
}
