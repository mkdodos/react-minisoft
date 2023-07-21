import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import { actions } from '../constants/actions';
export default function SearchBar({ baseYM, setBaseYM, state, dispatch }) {
  const { babies } = state;
  function handleQuery() {
    dispatch({ type: actions.COMPARE, payload: { baseYM } });
    
  }

  function handleChange(e) {
    setBaseYM({ ...baseYM, [e.target.name]: e.target.value });
    // console.log(e.target.value)
  }
  return (
    <div>
      <Input
        name="y"
        placeholder="年"
        value={baseYM.y}
        onChange={handleChange}
      />
      <Input
        name="m"
        placeholder="月"
        value={baseYM.m}
        onChange={handleChange}
      />
      <Button onClick={handleQuery}>查詢</Button>
    </div>
  );
}
