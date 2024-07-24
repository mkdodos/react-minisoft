import React from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';

export default function EditForm({
  open,
  setOpen,  
  handleChange,
  row, 
  handleSave,
  handleDelete,
}) {
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Form>
          <Form.Field>
              <label>日期</label>
              <input
                type="date"
                name="date"
                value={row.date}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>股票名稱</label>
              <input
                type="text"
                name="name"
                value={row.name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>購入單價</label>
              <input
                type="number"
                name="cost"
                value={row.cost}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>股數</label>
              <input
                type="number"
                name="qty"
                value={row.qty}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleSave}>
            儲存
          </Button>
          <Button floated="left" color="red" onClick={handleDelete}>
            刪除
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
