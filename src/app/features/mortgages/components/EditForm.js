import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import MortgageAccSelect from '../../../../components/MortgageAccSelect';

export default function EditForm({
  open,
  setOpen,
  editedRow,
  setEditedRow,
  handleSave,
  handleDelete,
  handleClose,
}) {

  const handleAccChange = (e, { value }) => {
    setEditedRow({ ...editedRow, account: value })
  };


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
                type="date"
                value={editedRow.date}
                onChange={(e) =>
                  setEditedRow({ ...editedRow, date: e.target.value })
                }
              />
              <MortgageAccSelect label="帳戶" onChange={handleAccChange} account={editedRow.account}/>
            {/* <Form.Input
                label="帳戶"
                width={8}
                type="text"
                value={editedRow.account}
                onChange={(e) =>
                  setEditedRow({ ...editedRow, account: e.target.value })
                }
              /> */}

             

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
          {editedRow.id && (
            <Button floated="left" onClick={()=>handleDelete(editedRow.id)}>
              刪除
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    </>
  );
}
