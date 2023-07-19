import { actions } from '../constants/actions';
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
