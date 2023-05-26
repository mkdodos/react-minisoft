import { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
export default function YearSelect({onChange,year}) {
  // const [month, setMonth] = useState();
  const options = [];
  for (let i = 2023; i >= 2012; i--) {
    let num = i;
  
    options.push({
      key: num,
      text: num,
      value: num,
    });
  }
  return (
    <div>
      <Dropdown
        selection
        value={year}
        placeholder="年份"
        options={options}
        onChange={onChange}
      ></Dropdown>
    </div>
  );
}
