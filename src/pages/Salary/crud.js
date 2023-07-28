// 所有和後端資料處理都在此檔,資料處理完用 dispatch 處理相對應陣列變化
import { API_HOST } from '../../global/constants';
import axios from 'axios';
import { actions } from './actions';

// const API_PATH = 'http://server2000:8888/react-minisoft/api/babys';

const API_PATH = `${API_HOST}/salary`;

// 載入資料
function fetchData(search, dispatch) {
  let url = `${API_HOST}/salary/read.php`;
  dispatch({
    type: actions.FETCH_DATA_BEGIN,
  });
  axios.get(url, { params: { y: search.y, m: search.m } }).then((res) => {
    let data = [];
    // 有選員工,做進一步篩選
    if (search.emp !== '') {
      data = res.data.filter((row) => row.name == search.emp);
    } else {
      data = res.data;
    }
    dispatch({
      type: actions.FETCH_DATA_SUCCESS,
      payload: { rows: data },
    });
  });
}

// 更新
const updateRow = (row, editedIndex, dispatch) => {
  const headers = {
    'Content-Type': 'text/plain',
  };

  const url = `${API_PATH}/update.php`;

  // 配合後端將 others 改成 other_bonus
  row = { ...row, other_bonus: row.others };

  axios.post(url, row, { headers }).then((res) => {
    // dispatch({ type: actions.UPDATE_ROW, payload: { baby: row, editedIndex } });
    console.log(res.data);
  });
};

// 轉人員薪資
const insertEmpSalary = (search, dispatch) => {
  const { y, m } = search;
  if (!window.confirm('確定轉薪資嗎?')) return;

  const headers = {
    'Content-Type': 'text/plain',
  };

  axios
    .post(`${API_HOST}/salary/insertEmpSalary.php`, { y, m }, { headers })
    .then((res) => {
      fetchData(search, dispatch);
    });
};

// 刪除整月薪資
const deleteEmpSalary = (search, dispatch) => {
  const { y, m } = search;
  if (!window.confirm('確定刪除嗎?')) return;
  const headers = {
    'Content-Type': 'text/plain',
  };
  axios
    .post(`${API_HOST}/salary/deleteEmpSalary.php`, { y, m }, { headers })
    .then((res) => {
      fetchData(search, dispatch);
    });
};

// 刪除 baby
const deleteBaby = (id, dispatch) => {
  const headers = {
    'Content-Type': 'text/plain',
  };

  const url = `${API_PATH}/delete.php`;

  axios.post(url, { id: id }, { headers }).then((res) => {
    dispatch({ type: actions.DELETE_ROW, id });
    console.log(res.data);
  });
};

export { fetchData, insertEmpSalary, deleteEmpSalary, updateRow, deleteBaby };
