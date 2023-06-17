import { db_money2022 as db } from '../../utils/firebase';
import {
  Table,
  Form,
  Button,
  Modal,
  Tab,
  Segment,
  Statistic,
} from 'semantic-ui-react';
import DataTable from './components/DataTable';
import DataRow from './components/DataRow';
import React, { useState } from 'react';
import EditForm from './components/EditForm';
// import { useAuth } from '../contexts/AuthContext';
import numberFormat from '../../utils/numberFormat';

import _ from 'lodash';

export default function Accounts() {
  const currentUser = localStorage.getItem('user');
  const schema = [
    // { text: '名稱', value: 'id', type: 'string' },
    { text: '名稱', value: 'name', type: 'string' },
    { text: '順序', value: 'prior', type: 'number' },
    { text: '餘額', value: 'balance', type: 'number' },
  ];
  const defalutItem = { name: '', prior: '', balance: '' };
  const [rows, setRows] = React.useState([]);
  const [row, setRow] = React.useState(defalutItem);

  const [total, setTotal] = React.useState(0);

  // 用來判斷新增或修改,還有修改後將資料更新回該列
  const [editedIndex, setEditedIndex] = useState(-1);

  // 控制 Modal 顯示
  const [modalOpen, setModalOpen] = useState(false);

  const dbCol = db.collection('accounts');
  React.useEffect(() => {
    dbCol

      .orderBy('prior')

      .where('user', '==', currentUser)
      .get()
      .then((snapshot) => {
        let temp = 0;
        let data = snapshot.docs.map((doc) => {
          const d = doc.data();
          if (d.name != '房貸A' && d.name != '房貸B') temp += d.balance * 1;
          return {
            ...doc.data(),
            id: doc.id,
            // 將金額字串轉為數字才能正確做排序
            balance: parseInt(d.balance),
          };
        });
        // data = _.sortBy(data, 'balance');
        // data = data.slice().reverse();
        data = data.filter(row=>row.name!='房貸A')
        data = data.filter(row=>row.name!='房貸B')
        setRows(data);
        setTotal(temp);
      });
  }, []);

  // 儲存
  function handleSave() {
    const { name, balance, prior } = row;
    if (editedIndex > -1) {
      dbCol
        // 順序要存成數字,方便排序
        .doc(row.id)
        .update({ name, balance, prior: Number(prior) })
        .then(() => {
          let newItemList = rows.slice();
          Object.assign(newItemList[editedIndex], row);
          setRows(newItemList);
          setModalOpen(false);
          setRow(defalutItem);
          console.log(row.id);
        });
    } else {
      dbCol.add({ name, balance, prior, user: currentUser }).then((doc) => {
        setModalOpen(false);
        setRow(defalutItem);
        setRows([...rows, { ...row, id: doc.id }]);
      });
    }
  }

  function handleClick(row) {
    setEditedIndex(rows.indexOf(row));
    setRow(row);
    setModalOpen(true);
    // console.log(row);
  }

  function renderRow(row, i) {
    return (
      <DataRow key={i} row={row} value={i} onClick={() => handleClick(row)} />
    );
  }

  function handleChange(e) {
    setRow({ ...row, [e.target.name]: e.target.value });
    // setRow({ [event.target.name]: event.target.value });
  }

  function handleAdd() {
    setEditedIndex(-1);
    setModalOpen(true);
  }

  function handleDelete() {
    if (!window.confirm('確定刪除嗎?')) return;
    dbCol.doc(row.id).delete();
    setRows(rows.filter((obj) => obj.id !== row.id));
    setModalOpen(false);
  }

  function sortByBalance() {
    let data = _.sortBy(rows, 'balance');    
    data = data.slice().reverse();
    setRows(data);   
  }

  return (
    <>
      <Modal
        open={modalOpen}
        closeIcon
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Modal.Header>編輯帳戶</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>名稱</label>
              <input name="name" value={row.name} onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>順序</label>
              <input
                type="number"
                name="prior"
                value={row.prior}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>餘額</label>
              <input
                type="number"
                name="balance"
                // placeholder="Last Name"
                value={row.balance}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button floated="left" color="red" onClick={handleDelete}>
            Delete
          </Button>
          <Button primary onClick={handleSave}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>

      <Segment textAlign="center">
        <Statistic inverted color="red">
          <Statistic.Value>{numberFormat(total)}</Statistic.Value>
        </Statistic>
      </Segment>

      <Button onClick={handleAdd} color="olive">
        ADD
      </Button>

      <Table unstackable>
        <Table.Header>
          <Table.Row>
            {schema.map((obj, i) => (
              <Table.HeaderCell onClick={sortByBalance} key={i}>
                {obj.text}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, i) => {
            return (
              <Table.Row
                onClick={() => {
                  handleClick(row);
                }}
                key={row.id}
              >
                {/* <Table.Cell>{row.id}</Table.Cell> */}
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.prior}</Table.Cell>
                <Table.Cell>{numberFormat(row.balance)}</Table.Cell>
              </Table.Row>
            );
            // )

            // return renderRow(row, i);
          })}
        </Table.Body>
      </Table>

      {/* <DataTable rows={rows} schema={schema} onRowClick={handleRowClick} /> */}
    </>
  );
}
