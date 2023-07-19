import { actions } from '../constants/actions';
import baby from '../json/baby.json';

export default function (state, action) {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return { ...state, isModalOpen: true };

    case actions.CLOSE_MODAL:
      return { ...state, isModalOpen: false };

    case actions.INIT_DATA:
      return {
        ...state,
        babies: action.payload.babies,
        salaries: action.payload.salaries,
      };

    case actions.ADD_BABY:
      console.log(action.payload.baby);
      return {
        ...state,
        babies: [...state.babies, { ...action.payload.baby, id: Date.now() }],
        isModalOpen: false,
        baby: baby,
      };

    case actions.INPUT_CHANGE:
      return {
        ...state,
        baby: {
          ...state.baby,
          [action.payload.baby.name]: action.payload.baby.value,
        },
      };

    case actions.EDIT_ROW:
      return {
        ...state,
        baby: action.row,
        isModalOpen:true
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
