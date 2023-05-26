import { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
export default function MonthSelect({onChange,month}) {
  // const [month, setMonth] = useState();
  const months = [];
  for (let i = 1; i <= 12; i++) {
    let num = i;
    if (i <= 9) num = '0' + i;
    months.push({
      key: num,
      text: num,
      value: num,
    });
  }
  return (
    <div>
      <Dropdown
        selection
        value={month}
        placeholder="順位"
        options={months}
        onChange={onChange}
      ></Dropdown>
    </div>
  );
}
