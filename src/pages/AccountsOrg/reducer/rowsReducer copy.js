import { deleteRow, updateRow } from '../api';

export default function rowsReducer(rows, action) {
  switch (action.type) {
    case 'INIT_ROWS':
      return action.payload;
    case 'ADD_ROW':
      return [...rows, action.payload];
    case 'DELETE_ROW':
      const id = action.payload;
      deleteRow(id);
      return rows.filter((row) => row.id !== action.payload);
    case 'UPDATE_ROW':
      updateRow(action.payload.row, action.payload.row.id);
      const newRows = rows.slice();
      Object.assign(newRows[action.payload.index], action.payload.row);
      return newRows;

    case 'SORT_ROW':
      let sortRows = rows.slice().sort((a, b) => {
        return Number(a.balance) > Number(b.balance) ? 1 : -1;
      });
      return sortRows;

    default:
      return rows;
  }
}
