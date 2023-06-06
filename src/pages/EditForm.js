import React from 'react';
import { Form, Button, Modal, Menu } from 'semantic-ui-react';
import AccSelect from '../components/AccSelect';

export default function EditForm({
  open,
  setOpen,
  isIncome,
  setIsIncome,
  loading,
  saveItem,
  setItem,
  item,
}) {
  // 設定作用中項目樣式
  // 設定金額為收入或支出
  function handleItemClick(e, { name }) {
    if (name === 'income') {
      setIsIncome(true);
    } else {
      setIsIncome(false);
    }
  }

  // 表單輸入時,設定 item 的值
  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    // console.log(item)
  };

  const handleAccChange = (e,obj) => {
    // console.log(obj.options)
    const name = obj.options.filter(row=>row.value==obj.value)
    // console.log(name[0].text)
    setItem({ ...item, account: {id:obj.value,name:name[0].text} });
    // console.log(item)
  };

  return (
    <Modal
      open={open}
      closeIcon
      onClose={() => {
        setOpen(false);
      }}
    >
      <Modal.Header>編輯表單</Modal.Header>
      <Modal.Content>
        <Menu fluid widths={2} pointing secondary>
          <Menu.Item
            color="teal"
            name="income"
            active={isIncome}
            onClick={handleItemClick}
          >
            收入
          </Menu.Item>
          <Menu.Item
            color="orange"
            name="expense"
            active={!isIncome}
            onClick={handleItemClick}
          >
            支出
          </Menu.Item>
        </Menu>

        <Form>
          <Form.Field>
            <AccSelect onChange={handleAccChange} />
          </Form.Field>

          <Form.Field>
            <label>日期</label>
            <input
              name="date"
              type="date"
              placeholder=""
              value={item.date}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>項目</label>
            <input
              name="title"
              placeholder=""
              // value={item.title}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>金額</label>
            <input
              name="amt"
              type="number"
              placeholder=""
              // value={item.amt}
              // value={isIncome?item.income:item.expense}
              onChange={handleChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button loading={loading} floated="right" primary onClick={saveItem}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
