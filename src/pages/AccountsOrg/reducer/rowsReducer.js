import { deleteRow, updateRow } from '../api';

export default function rowsReducer(state, action) {
  const { rows } = state;
  switch (action.type) {
    case 'INIT_ROWS':
      return { rows: action.payload };
    case 'ADD_ROW':
      return { rows: [...rows, action.payload] };

    case 'DELETE_ROW':
      const id = action.payload;
      deleteRow(id);
      return { rows: rows.filter((row) => row.id !== action.payload) };
    case 'UPDATE_ROW':
      updateRow(action.payload.row, action.payload.row.id);
      const newRows = rows.slice();
      Object.assign(newRows[action.payload.index], action.payload.row);
      return { rows: newRows };

    case 'SORT_ROW':
      let sortRows = state.rows.slice();
      if (state.direction) {
        sortRows = sortRows.reverse();
        let direction = state.direction == 'asc' ? 'desc' : 'asc';
        return { rows: sortRows, direction: direction };
      } else {
        sortRows = sortRows.sort((a, b) => {
          return Number(a.balance) > Number(b.balance) ? 1 : -1;
        });
        return { rows: sortRows, direction: 'asc' };
      }

    default:
      return state;
  }
}
