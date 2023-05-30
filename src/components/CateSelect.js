import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown, Form } from 'semantic-ui-react';
import { db } from '../utils/firebase';

export default function CateSelect({ width, cate, onChange }) {
  // const url = 'http://localhost:8888/react-minisoft/mysql/cate.php';
  const [options, setOptions] = useState([]);
  const user_sn = '4' ;
  useEffect(() => {
    db.collection('spend_cate')
      .where('user_sn', '==', user_sn)
      .orderBy('cate_sort')
      .get()
      .then((snapshot) => {
        // snapshot.docs.map((doc) => {

        //   const row=doc.data()
        //   options.push({
        //     key: row.cate_id,
        //     text: row.cate_name,
        //     value: row.cate_id,
        //   });
        // });
        const data = snapshot.docs.map((doc) => {
          const row = doc.data();
          return { key: row.cate_id, text: row.cate_name, value: row.cate_id };
        });
        setOptions(data);
      });
    // axios.get(url).then((res) => {
    //   console.log(res.data);
    //   res.data.map((row) => {
    //     options.push({
    //       key: row.cate_id,
    //       text: row.cate_name,
    //       value: row.cate_id,
    //     });
    //   });
    // });
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
