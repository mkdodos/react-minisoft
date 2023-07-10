export default function rowReducer(row, action) {
  switch (action.type) {
    case 'input-change':
      return { ...row, [action.payload.name]: action.payload.value };
    case 'submit':
      return { name: '', prior: '' };

    case 'INIT_ROW':
      return { name: '', prior: '' };

    case 'EDIT_ROW':
      const index = action.payload.index;
      return { ...action.payload.row, index };

    default:
      return row;
  }
}
