import React, { useEffect, useReducer } from 'react';
import {state as defalutState} from './json/state.js';
import reducer from './reducers/reducer';
import data from './json/data.json'
import Babys from './components/Babys';
import AddButton from './components/AddButton';
import EditForm from './components/EditForm'
import ModalView from './components/ModalView';
import { actions } from './constants/actions';

export default function Index() {
  const [state, dispatch] = useReducer(reducer, defalutState);

  useEffect(() => {
    dispatch({
      type: actions.INIT_DATA,
      payload: { babies: data.babies, salaries: data.salaries },
    });
  }, []);
  return (
    <div>
      <ModalView dispatch={dispatch} state={state} />

      {/* <EditForm/> */}
      <AddButton dispatch={dispatch}/>
      <Babys rows={state.babies} dispatch={dispatch} />
    </div>
  );
}
