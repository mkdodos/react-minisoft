import React, { useEffect, useReducer, useState } from 'react';
import { state as defalutState } from './json/state.js';
import reducer from './reducers/reducer';
import data from './json/data.json';
import Babys from './components/Babys';
import AddButton from './components/AddButton';
import ModalView from './components/ModalView';
import { actions } from './constants/actions';
import Salarys from './components/Salarys.js';
import SearchBar from './components/SearchBar.js';
import { API_HOST } from './constants/hosts.js';
import axios from 'axios';

export default function Index() {
  const [state, dispatch] = useReducer(reducer, defalutState);

  const [baseYM, setBaseYM] = useState({ y: 2026, m: 11 });

  useEffect(() => {
    let url = `${API_HOST}/salary/read.php`;
    // 載入  babies 和 salaries
    axios.get(url, { params: { y: 2023, m: 6 } }).then((sala) => {
      const API_PATH = 'http://server2000:8888/react-minisoft/api/babys';
      url = `${API_PATH}/read.php`;

      axios.get(url).then((ba) => {
        dispatch({
          type: actions.INIT_DATA,
          // payload: { babies: data.babies, salaries: data.salaries },
          payload: { babies: ba.data, salaries: sala.data },
        });
        // 顯示可領並更新薪資
        dispatch({ type: actions.COMPARE, payload: { baseYM } });
      });
    });
  }, []);
  return (
    <div>
      <SearchBar
        dispatch={dispatch}
        baseYM={baseYM}
        setBaseYM={setBaseYM}
        state={state}
      />
      <ModalView dispatch={dispatch} state={state} />
      <AddButton dispatch={dispatch} />
      <Babys rows={state.babies} dispatch={dispatch} />
      <Salarys rows={state.salaries} />
    </div>
  );
}
