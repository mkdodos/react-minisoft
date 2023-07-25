import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_HOST } from '../global/constants';
import { Form } from 'semantic-ui-react';
export default function EmpSelect({ onChange }) {
  const url = `${API_HOST}/employee/read.php`;
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      // console.log(res.data);

      const data = res.data.map((emp) => {
        return { key: emp.name, text: emp.name, value: emp.name };
      });

      setOptions(data);
    });
  }, []);
  return <Form.Select  clearable options={options} onChange={onChange} />;
}
