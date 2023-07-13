import { initRow } from '../initRow';

export default function rowReducer(row, action) {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return { ...row, [action.payload.name]: action.payload.value };
    case 'INIT_ROW':
      return initRow;
    case 'EDIT_ROW':
      const index = action.payload.index;
      return { ...action.payload.row, index };

    case 'OPEN_MODAL':
      // console.log('open')
      return { modalOpen: true };
      case 'CLOSE_MODAL':
        // console.log('open')
        return { modalOpen: false };  
    default:
      return row;
  }
}
