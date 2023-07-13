import React from 'react';
import { Button } from 'semantic-ui-react';
export default function AddButton({rowDispatch,row}) {
  const handleAdd = () => {
    rowDispatch({type:'OPEN_MODAL'})
    // setModalOpen(true)
  };
  return (
    <Button onClick={handleAdd} color="olive">
      ADD
    </Button>
  );
}
