import { useState, useEffect } from 'react';
import { db_money2022 as db } from '../../../utils/firebase';
import { Dropdown, Form } from 'semantic-ui-react';

export default function AccSelect({ account, name, onChange, label }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
   
    const currentUser = localStorage.getItem('user');

    db.collection('accounts')    
      .where('user', '==', currentUser)
      .orderBy('prior')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const name = doc.data().name;
          // value 存放 id 在儲存時才能用 id 去取得帳戶餘額
          return { text: name, value: doc.id, key: doc.id };
        });
        
        setRows(data);
       
      });

  }, []);
  return (
    <Form.Select
      placeholder="帳戶"
      label={label}
      value={account}
      name={name}
      fluid
      options={rows}
      onChange={onChange}
    />
  );
}
