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

  // 新增 baby
  const handleSave = () => {
    const headers = {
      'Content-Type': 'text/plain',
    };

    const API_PATH = 'http://server2000:8888/react-minisoft/src/pages/Babys/api';
    const url = `${API_PATH}/create.php`;
    const objRow = {
      empName:'馬克',
      birth: '2023-07-21',
      expireDate: '2027-01-05',
    };
    axios.post(url, objRow, { headers }).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    handleSave();
    const url = `${API_HOST}/salary/read.php`;
    axios.get(url, { params: { y: 2023, m: 6 } }).then((res) => {
      console.log(res.data);

      // 載入  babies 和 salaries
      dispatch({
        type: actions.INIT_DATA,
        // payload: { babies: data.babies, salaries: data.salaries },
        payload: { babies: data.babies, salaries: res.data },
      });
    });

    // 顯示可領並更新薪資
    dispatch({ type: actions.COMPARE, payload: { baseYM } });
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
