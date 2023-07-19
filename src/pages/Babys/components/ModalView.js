import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import EditForm from './EditForm';
import { actions } from '../constants/actions';

export default function ModalView({ dispatch,state }) {
  

  function handleDelete() {
    dispatch({ type: actions.DELETE_ROW, id: state.baby.id });
    
  }

  return (
    <Modal
      open={state.isModalOpen}
      closeIcon
      onClose={() => {
        dispatch({ type: actions.CLOSE_MODAL });       
      }}
    >
      <Modal.Header>編輯帳戶</Modal.Header>
      <Modal.Content>
        <EditForm dispatch={dispatch} state={state}/>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" basic onClick={handleDelete}>
          Del
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
