import React from 'react';
import { Modal,Button } from 'semantic-ui-react';
import EditForm from './EditForm';
export default function ModalView({
  setModalOpen,
  row,
  rowDispatch,
  rowsDispatch,
}) {
  const { modalOpen } = row;

  function handleDelete() {
    rowsDispatch({ type: 'DELETE_ROW', payload: row.id });
    rowDispatch({ type: 'INIT_ROW'});
  }


  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={() => {
        rowDispatch({ type: 'CLOSE_MODAL' });
        // setModalOpen(false);
      }}
    >
      <Modal.Header>編輯帳戶</Modal.Header>
      <Modal.Content>
        <EditForm
          rowDispatch={rowDispatch}
          rowsDispatch={rowsDispatch}
          row={row}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" basic onClick={handleDelete}>
          Del
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
