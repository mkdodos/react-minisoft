import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default function EditForm({
  open,
  setOpen,
  editedRow,
  setEditedRow,
  handleSave,
  handleDelete,
  handleClose,
}) {
  return (
    <>
      <Modal open={open} onClose={handleClose} closeIcon>
        <Modal.Header>房貸編輯</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Input
                label="日期"
                width={8}
                value={editedRow.date}
                onChange={(e) =>
                  setEditedRow({ ...editedRow, date: e.target.value })
                }
              />

              <Form.Input
                label="本金"
                width={8}
                value={editedRow.basic}
                onChange={(e) =>
                  setEditedRow({ ...editedRow, basic: e.target.value })
                }
              />

              <Form.Input
                label="利息"
                width={8}
                value={editedRow.interest}
                onChange={(e) =>
                  setEditedRow({ ...editedRow, interest: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleSave} primary>
            儲存
          </Button>
          {editedRow.ID && (
            <Button floated="left" onClick={handleDelete}>
              刪除
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    </>
  );
}
