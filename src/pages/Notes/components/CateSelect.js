import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown, Form } from 'semantic-ui-react';
import { db_money2022 as db } from '../../../utils/firebase';


export default function CateSelect({ width, cate, onChange }) {
  // const url = 'http://localhost:8888/react-minisoft/mysql/cate.php';
  const [options, setOptions] = useState([]);
  const user = localStorage.getItem('user');
  useEffect(() => {
    db.collection('catesNote')
      .where('user', '==', user)
      // .orderBy('cate_sort')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const row = doc.data();
          return { key: doc.id, text: row.name, value: row.name };
        });
        setOptions(data);
      });
  }, []);

  return (
    <Form.Select
      width={width}
      fluid
      onChange={onChange}
      placeholder="類別"
      options={options}
      value={cate}
    ></Form.Select>
  );
}
