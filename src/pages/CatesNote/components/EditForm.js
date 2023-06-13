import { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
// import CateSelect from './CateSelect';

export default function EditForm({
  rows,
  setRows,
  row,
  setRow,
  saveRow,
  loading,
  setOpen,
  deleteRow,
  open,
}) {
  useEffect(() => {}, []);

  // 輸入資料時同時設定 row
  const inputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const handleCateChange = (e,obj) => {
    setRow({ ...row, cate: obj.value });
  };

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
      >
        <Modal.Header>編輯</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>名稱</label>
              <input
                type="text"
                value={row.name}
                onChange={inputChange}
                name="name"
              />
            </Form.Field>

          
            <Form.Field>
              <label>順序</label>
              <input
                type="text"
                value={row.prior}
                onChange={inputChange}
                name="content"
              />
            </Form.Field>

            <Button
              primary
              fluid
              loading={loading}
              type="submit"
              onClick={saveRow}
            >
              儲存
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            floated="left"
            color="black"
            loading={loading}
            onClick={() => deleteRow(row)}
          >
            刪除
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
