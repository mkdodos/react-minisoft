import { actions } from '../constants/actions';
import { baby } from '../json/state';

export default function (state, action) {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return { ...state, isModalOpen: true, baby: baby };

    case actions.CLOSE_MODAL:
      return { ...state, isModalOpen: false };

    case actions.INIT_DATA:
      return {
        ...state,
        babies: action.payload.babies,
        salaries: action.payload.salaries,
      };

    case actions.ADD_BABY:
      return {
        ...state,
        babies: [...state.babies, { ...action.payload.baby, id: Date.now() }],
        isModalOpen: false,
        baby: baby,
        editedIndex:-1
      };

    case actions.UPDATE_ROW:
      const newRows = state.babies.slice();
      Object.assign(newRows[action.payload.editedIndex], action.payload.baby);

      return {
        ...state,
        babies: newRows,
        isModalOpen: false,
        baby: baby,
        editedIndex:-1
      };

    case actions.INPUT_CHANGE:
      return {
        ...state,
        baby: {
          ...state.baby,
          [action.payload.baby.name]: action.payload.baby.value,
        },
      };

    // 編輯
    case actions.EDIT_ROW:
      return {
        ...state,
        baby: action.row,
        isModalOpen: true,
        editedIndex: action.index,
      };

    default:
      return state;
  }
  const data = [action.payload.babies];
  return {
    ...state,
    babies: action.payload.babies,
    salaries: action.payload.salaries,
  };
  // console.log({
  //   ...state,
  //   babies: action.payload.babies,
  //   salaries: action.payload.salaries,
  // });
}
