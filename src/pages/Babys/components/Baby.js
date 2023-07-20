import React from 'react';
import { Table, Icon,Button } from 'semantic-ui-react';
import { actions } from '../constants/actions';

export default function Baby({row,dispatch,index}) {
  function handleEdit() {
    dispatch({type:actions.EDIT_ROW,row,index})
  }
  return (
    <Table.Row>
      <Table.Cell>{row.name}</Table.Cell>
      <Table.Cell>{row.birth}</Table.Cell>
      <Table.Cell>{row.expireDate}</Table.Cell>
      <Table.Cell>{!row.isExpire && <Icon name="check" />}</Table.Cell>
      {/* <Table.Cell>{row.isExpire ? 'N' :'Y'}</Table.Cell> */}
      <Table.Cell>
        <Button  onClick={handleEdit}>編輯</Button>
      </Table.Cell>
    </Table.Row>
  );
}
