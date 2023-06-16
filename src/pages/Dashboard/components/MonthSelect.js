import {
  Container,
  Grid,
  Segment,
  Statistic,
  Dropdown,
  Menu,
  Button,
} from 'semantic-ui-react';
import React from 'react';
function MonthSelect(props) {
  const [month, setMonth] = React.useState();
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
    <Dropdown
      selection
      value={month}
      placeholder="順位"
      options={months}
      onChange={props.onChange}
    ></Dropdown>
  );
}

const yearOptions = [
  { text: 2023, value: 2023, key: 2023 },
  { text: 2022, value: 2022, key: 2022 },
];

function MonthButton(props) {
  return (
    <Menu widths={4}>
      <Menu.Item>
        <Dropdown
          options={yearOptions}
          value={props.year}
          onChange={props.onYearChange}
        />
      </Menu.Item>
      <Menu.Item>
        <Button onClick={props.onMinusClick}>-</Button>
      </Menu.Item>

      <Menu.Item>
        <Button
          primary
          onDoubleClick={props.onDoubleClick}
          onClick={props.onClick}
        >
          {props.text}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={props.onPlusClick}>+</Button>
      </Menu.Item>
    </Menu>
  );
}

export default MonthSelect;
export { MonthButton };
