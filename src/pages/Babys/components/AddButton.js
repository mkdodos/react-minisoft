import React from 'react';
import { Button } from 'semantic-ui-react';
import { actions } from '../constants/actions';

export default function AddButton({dispatch}) {
  const handleAdd = () => {
    dispatch({type:actions.OPEN_MODAL})    
  };
  return (
    <Button onClick={handleAdd} color="olive">
      ADD
    </Button>
  );
}
