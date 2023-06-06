import { useState, useEffect } from 'react';
import { db_money2022 as db } from '../../../utils/firebase';
import { Dropdown, Form } from 'semantic-ui-react';

export default function AccSelect({ account, name, onChange, label }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem('user');

    db.collection('accounts')
      // .limit(10)
      .where('user', '==', currentUser)
      .orderBy('prior')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return { text: doc.data().name, value: doc.id, key: doc.id };
        });
        // console.log(data);
        setRows(data);
        // setRowsCopy(data);
      });
  }, []);
  return (
    <Form.Select
    placeholder='帳戶'
      label={label}
      value={account}
      name={name}
      fluid
      options={rows}
      onChange={onChange}
    />
  );
}
