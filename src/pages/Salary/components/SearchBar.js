import React, { useState, useEffect } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import { API_HOST } from '../../../global/constants';
import axios from 'axios';
import EmpSelect from '../../../components/EmpSelect';

export default function SearchBar({ search, setSearch,handleQuery }) {
  const [options, setOptions] = useState([]);
  
 
  
  useEffect(() => {}, []);

  const loading = false;

  const optionsY = [];

  // 年份由新到舊,2004為資料庫中最舊年份
  for (let i = new Date().getFullYear(); i >= 2004; i--) {
    optionsY.push({ key: i, text: i, value: i });
  }

  const optionsM = [];
  for (let i = 1; i <= 12; i++) {
    optionsM.push({ key: i, text: i, value: i });
  }

 

  const handleEmpChange = (e, obj) => {
    setSearch({ ...search, emp: obj.value });
  };
  return (
    <Form>
      <Form.Group>
        <Form.Select
          clearable
          width={3}
          fluid
          value={search.y}
          options={optionsY}
          placeholder="年"
          onChange={(e, obj) => {
            setSearch({ ...search, y: obj.value });
          }}
        />
        <Form.Select
          clearable
          width={3}
          fluid
          value={search.m}
          options={optionsM}
          placeholder="月"
          onChange={(e, obj) => {
            setSearch({ ...search, m: obj.value });
          }}
        />

        <EmpSelect onChange={handleEmpChange}  />

        <Form.Button loading={loading} color="teal" onClick={handleQuery}>
          查詢
        </Form.Button>
      </Form.Group>
    </Form>
  );
}
