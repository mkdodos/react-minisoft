import React from 'react';
import { Button } from 'semantic-ui-react';
export default function AddButton({setModalOpen}) {
  const handleAdd = () => {
    setModalOpen(true)
  };
  return (
    <Button onClick={handleAdd} color="olive">
      ADD
    </Button>
  );
}
