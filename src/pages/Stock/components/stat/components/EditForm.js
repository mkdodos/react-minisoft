import React from 'react';
import { Modal } from 'semantic-ui-react';

export default function EditForm({open,setOpen}) {
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>表單內容</Modal.Content>
        <Modal.Actions>
          {/* <Button primary onClick={handleSave}>
            儲存
          </Button>
          <Button floated="left" color="red" onClick={handleDelete}>
            刪除
          </Button> */}
        </Modal.Actions>
      </Modal>
    </div>
  );
}
