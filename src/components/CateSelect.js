import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';

export default function CateSelect({ cate, onChange }) {
  const url = 'http://localhost:8888/react-minisoft/mysql/cate.php';
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      console.log(res.data);
      res.data.map((row) => {
        options.push({
          key: row.cate_id,
          text: row.cate_name,
          value: row.cate_id,
        });
      });
    });
  }, []);

  return (
    <div>
      <Dropdown
        selection
        onChange={onChange}
        placeholder="順位"
        options={options}
        value={cate}
      ></Dropdown>
    </div>
  );
}
