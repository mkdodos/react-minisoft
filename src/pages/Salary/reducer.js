import { actions } from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    // 載入資料
    case actions.FETCH_DATA:
      return { ...state, rows: action.payload.rows };

    case actions.EDIT_ROW:
      return {
        ...state,
        open: true,
        editedIndex: state.rows.indexOf(action.payload.row),
        row: action.payload.row,
      };
    // setOpen(true);
    // setEditedIndex(rows.indexOf(row));
    // setRow(row);
    default:
      return state;
  }
}
