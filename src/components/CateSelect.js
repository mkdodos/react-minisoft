import React, { useEffect, useState } from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import { db_money2022 as db } from '../utils/firebase';

export default function CateSelect({ width, cate, onChange }) {
  const [options, setOptions] = useState([]);
  const user = localStorage.getItem('user');
  useEffect(() => {
    db.collection('cates')
      .where('user', '==', user)
      .orderBy('prior')
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
