export default function rowReducer(row, action) {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return { ...row, [action.payload.name]: action.payload.value };
    case 'INIT_ROW':
      return { name: '', prior: '' };
    case 'EDIT_ROW':
      const index = action.payload.index;
      return { ...action.payload.row, index };
    default:
      return row;
  }
}
