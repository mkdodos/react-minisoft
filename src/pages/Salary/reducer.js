import { actions } from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    // 載入資料開始
    case actions.FETCH_DATA_BEGIN:
      return { ...state, isLoading: true };
    // 載入資料成功
    case actions.FETCH_DATA_SUCCESS:
      return { ...state, rows: action.payload.rows, isLoading: false };

    case actions.EDIT_ROW:
     
      return {
        ...state,
        isModalOpen: true,
        editedIndex: state.rows.indexOf(action.payload.row),
        row: action.payload.row,
      };

    case actions.INPUT_CHANGE:
      return {
        ...state,
        row: { ...state.row, [action.payload.name]: action.payload.value },
      };
    // setOpen(true);
    // setEditedIndex(rows.indexOf(row));
    // setRow(row);
    default:
      return state;
  }
}
