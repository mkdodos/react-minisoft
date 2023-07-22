// 所有和後端資料處理都在此檔,資料處理完用 dispatch 處理相對應陣列變化
import { API_HOST } from '../constants/hosts.js';
import axios from 'axios';
import { actions } from '../constants/actions';

const API_PATH = 'http://server2000:8888/react-minisoft/api/babys';

function fetchData(baseYM, dispatch) {
  let url = `${API_HOST}/salary/read.php`;
  // 載入  babies 和 salaries
  axios.get(url, { params: { y: 2023, m: 6 } }).then((sala) => {
    url = `${API_PATH}/read.php`;

    axios.get(url).then((ba) => {
      dispatch({
        type: actions.INIT_DATA,
        payload: { babies: ba.data, salaries: sala.data },
      });
      // 顯示可領並更新薪資
      dispatch({ type: actions.COMPARE, payload: { baseYM } });
    });
  });
}

// 新增 baby
const addBaby = (row, dispatch) => {
  const headers = {
    'Content-Type': 'text/plain',
  };

  const url = `${API_PATH}/create.php`;

  axios.post(url, row, { headers }).then((res) => {
    dispatch({ type: actions.ADD_BABY, payload: { baby: row, id: res.data } });
    // console.log(res.data);
  });
};

// 更新 baby
const updateBaby = (row, editedIndex, dispatch) => {
  const headers = {
    'Content-Type': 'text/plain',
  };

 
  const url = `${API_PATH}/update.php`;

  axios.post(url, row, { headers }).then((res) => {
    dispatch({ type: actions.UPDATE_ROW, payload: { baby: row, editedIndex } });
    // console.log(res.data)
  });
};


// 刪除 baby
const deleteBaby = (id,dispatch) => {
  const headers = {
    'Content-Type': 'text/plain',
  };

  
  const url = `${API_PATH}/delete.php`;

  axios.post(url, {id:id}, { headers }).then((res) => {
    dispatch({ type: actions.DELETE_ROW, id });
    console.log(res.data);
  });
};

export { fetchData, addBaby, updateBaby,deleteBaby };
