import React, { useEffect, useState } from 'react';
import { Label, Icon, Button, Menu, Modal, Segment, Item } from 'semantic-ui-react';
import { useSelector, dispatch, useDispatch } from 'react-redux';

import {
  fetchCates,
  getAllCates,
} from '../app/features/cates/catesSlice';

// 方塊式選取
export default function TilesChoose({ setItem,item }) {
  const dispatch = useDispatch();
  const cates = useSelector(getAllCates);
  // const [cate, setCate] = useState('');
  const [open, setOpen] = useState(false);

  // 取得資料
  useEffect(() => {
    dispatch(fetchCates());
  }, []);

  let groupArr = [];
  let temp = [];
  cates.map((cate, i) => {
    temp.push(cate);
    if ((i + 1) % 4 == 0) {
      groupArr.push(temp);
      temp = [];
    }
  });

  const menuCates = groupArr.map((g, i) => {
    return (
      <Menu widths={4} key={i}>
        {g.map((cate) => (
          <Menu.Item onClick={() =>{

            setItem({...item,cate:cate.name})
            setOpen(false)

          } } key={cate.id}>
            {cate.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  });

  //   const usersOptions = users.map(user => (
  //     <option key={user.id} value={user.id}>
  //         {user.name}
  //     </option>
  // ))

  return (
    <div>
     
      <Button onClick={() => setOpen(true)}>OPEN</Button>
      <Modal closeIcon onClose={() => setOpen(false)} open={open}>
        <Modal.Header>選取類別</Modal.Header>
        <Modal.Content>{menuCates}</Modal.Content>
      </Modal>
    </div>
  );
}
