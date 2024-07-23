import React from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';

export default function EditForm({
  open,
  setOpen,
  handleNameChange,
  handleChange,
  row,
  options,
  handleSave,
  handleDelete,
}) {
  return (
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
            <Form.Select
              placeholder="名稱"
              fluid
              value={row.name}
              options={options}
              onChange={handleNameChange}
            />
          </Form.Field>
          <Form.Field>
            <label>數量</label>
            <input
              type="number"
              name="qty"
              value={row.qty}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>單價</label>
            <input
              type="number"
              name="price"
              value={row.price}
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
  );
}
