import { useState, useEffect } from 'react';
import { db_money2022 as db } from '../utils/firebase';
import { Form } from 'semantic-ui-react';

export default function MortgageAccSelect({ account, name, onChange, label }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
   
    

    db.collection('mortgageAccounts')       
    .orderBy('name')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const name = doc.data().name;
          
          return { text: name, value: name, key: doc.id };
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
      clearable
      // fluid
      options={rows}
      onChange={onChange}
    />
  );
}
