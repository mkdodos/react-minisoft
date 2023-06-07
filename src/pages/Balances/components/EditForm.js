import React from 'react';
import { Form, Button, Modal, Menu } from 'semantic-ui-react';
import AccSelect from './AccSelect';
import CateSelect from './CateSelect';
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

  const handleAccChange = (e, obj) => {
    // 無法直接用 obj.text 取得下拉選項的文字
    // 改成從 options 篩選出選項的文字
    const name = obj.options.filter((row) => row.value == obj.value);
    setItem({ ...item, account: { id: obj.value, name: name[0].text } });
  };

  const handleCateChange = (e, obj) => {
    setItem({ ...item, cate: obj.value });
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
            <AccSelect account={item.account?.id} onChange={handleAccChange} />
          </Form.Field>

          <Form.Field>
            <CateSelect cate={item.cate} onChange={handleCateChange} />
          </Form.Field>

          <Form.Field>
            <label>項目</label>
            <input
              name="title"
              placeholder=""
              value={item.title}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>金額</label>
            <input
              name={isIncome ? 'income' : 'expense'}
              type="number"
              placeholder=""
              // value={item.amt}
              value={isIncome ? item.income : item.expense}
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
