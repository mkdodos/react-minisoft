import React, { useState } from 'react';
import { Menu, Icon, Input, Form } from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectData, getStatus } from './worksSlice';

export default function DateSwitch() {
  const dispatch = useDispatch();

  const [activeItem, setActiveItem] = useState('');
  const today = new Date().toISOString().substring(0, 10);
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  let date = new Date();

  let date1;
  let date2;

  function getDate(days) {
    return date.addDays(days).toISOString().substring(0, 10);
  }

  const handleItemClick = (e, { name }) => {
    switch (name) {
      case 'y':
        date1 = getDate(-10);
        date2 = getDate(0);

        break;
      case 'm':
        date1 = getDate(-20);
        date2 = getDate(-11);

        break;
      case 'week':
        date1 = getDate(-30);
        date2 = getDate(-21);
        break;
      case 'd':
        date1 = getDate(-40);
        date2 = getDate(-30);
        break;
    }
    setDateFrom(date1);
    setDateTo(date2);
    dispatch(fetchData({ dateFrom: date1, dateTo: date2 }));
    setActiveItem(name);
    // dispatch(fetchData({ dateFrom, dateTo }));
  };
  return (
    <div>
      <Menu color="teal" widths={4}>
        <Menu.Item
          active={activeItem == 'y'}
          name="y"
          onClick={handleItemClick}
        >
          年
        </Menu.Item>
        <Menu.Item
          active={activeItem == 'm'}
          name="m"
          onClick={handleItemClick}
        >
          月
        </Menu.Item>
        <Menu.Item
          active={activeItem == 'week'}
          name="week"
          onClick={handleItemClick}
        >
          周
        </Menu.Item>
        <Menu.Item
          active={activeItem == 'd'}
          name="d"
          onClick={handleItemClick}
        >
          日
        </Menu.Item>
      </Menu>
      <Form>
        <Form.Group widths="2" unstackable>
          <Form.Field>
            <Input type="date" value={dateFrom} />
          </Form.Field>
          <Form.Field>
            <Input type="date" value={dateTo} />
          </Form.Field>
        </Form.Group>
      </Form>

      {/* <Input type="date" value={dateFrom}/> */}
    </div>
  );
}
