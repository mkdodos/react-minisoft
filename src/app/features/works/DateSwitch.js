import React, { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

export default function DateSwitch() {
  const [activeItem, setActiveItem] = useState('');
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  return (
    <div>
      <Menu color="teal" widths={3}>
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
          active={activeItem == 'd'}
          name="d"
          onClick={handleItemClick}
        >
          日
        </Menu.Item>
      </Menu>
    </div>
  );
}
