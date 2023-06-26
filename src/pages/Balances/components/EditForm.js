import React from 'react';
import { Form, Button, Modal, Menu } from 'semantic-ui-react';
import AccSelect from './AccSelect';
// import CateSelect from './CateSelect';
import CateSelect from '../../../components/CateSelect';
export default function EditForm({
  open,
  setOpen,
  isIncome,
  setIsIncome,
  loading,
  saveItem,
  deleteItem,
  setItem,
  item,
  editedIndex,
  
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

  // 金額,項目輸入時,設定 item 的值
  const handleChange = (e) => {
    console.log(item);
    setItem({ ...item, [e.target.name]: e.target.value });
    // console.log(item)
  };

  // 餘額
  const handleBalanceChange = (e) => {
    setItem({ ...item, account: {...item.account, balance: e.target.value } });
    // console.log(item)
  };

  // 帳戶
  const handleAccChange = (e, obj) => {
    // 無法直接用 obj.text 取得下拉選項的文字
    // 改成從 options 篩選出選項的文字
    const name = obj.options.filter((row) => row.value == obj.value);
    setItem({ ...item, account: { id: obj.value, name: name[0].text } });
  };

  // 類別
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
      {/* 編輯時不修改帳戶和金額,若有記錯,使用沖回方式,例支出多記100,就新增一筆收入100沖銷,再新增一筆正確的資料
      這樣才能完整呈現整個記帳過程餘額的變化     
      */}
      <Modal.Header>編輯表單</Modal.Header>
      <Modal.Content>
        {editedIndex == -1 && (
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
        )}

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
            {editedIndex == -1 && (
              <AccSelect
                account={item.account?.id}
                onChange={handleAccChange}
               
              />
            )}
          </Form.Field>

          <Form.Field>
            <CateSelect cate={item.cate} onChange={handleCateChange} />
          </Form.Field>

          
          <Form.Field>
            <label>期數</label>
            <input
              name="section"             
              value={item.section}
              onChange={handleChange}
            />
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

          {editedIndex == -1 && (
            <Form.Field>
              <label>金額</label>
              <input
                name="amt"
                type="number"
                placeholder=""
                value={item.amt}
                onChange={handleChange}
              />
            </Form.Field>
          )}

          {editedIndex > -1 && (
            <Form.Field>
              <label>餘額</label>
              <input
                name="balance"
                type="number"
                value={item.account.balance}
                onChange={handleBalanceChange}
              />
            </Form.Field>
          )}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button loading={loading} floated="right" primary onClick={saveItem}>
          Save
        </Button>
        <Button
          loading={loading}
          floated="left"
          color="red"
          onClick={deleteItem}
        >
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
