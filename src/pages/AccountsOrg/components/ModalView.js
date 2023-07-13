import React from 'react';
import { Modal } from 'semantic-ui-react';
import EditForm from './EditForm';
export default function ModalView({ modalOpen, setModalOpen,row,rowDispatch,rowsDispatch }) {
  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <Modal.Header>編輯帳戶</Modal.Header>
      <Modal.Content>
        <EditForm
          rowDispatch={rowDispatch}
          rowsDispatch={rowsDispatch}
          row={row}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </Modal.Content>
    </Modal>
  );
}
