import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { API_HOST } from '../../../global/constants';
import { insertEmpSalary, deleteEmpSalary } from '../crud';
export default function ActionBar({ search,dispatch }) {
  // const { y, m } = search;
  // 轉人員薪資
  const handleInsertEmpSalary = () => {
    insertEmpSalary(search,dispatch);
  };

  // 刪除整月
  const handleDeleteEmpSalary = () => {
    deleteEmpSalary(search,dispatch);
  };

  return (
    <div>
      <Button basic color="teal" onClick={handleInsertEmpSalary}>
        <Icon name="plus" />
        轉人員薪資
      </Button>
      <Button basic color="red" floated="right" onClick={handleDeleteEmpSalary}>
        刪除整月
      </Button>
    </div>
  );
}
