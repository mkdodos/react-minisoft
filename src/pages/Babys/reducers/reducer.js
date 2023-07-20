import { actions } from '../constants/actions';
import { baby } from '../json/state';

export default function (state, action) {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return { ...state, isModalOpen: true, baby: baby };

    case actions.CLOSE_MODAL:
      return { ...state, isModalOpen: false };

    // 比對符合條件
    case actions.COMPARE:
      const newRowsForCompare = state.babies.slice();

      // babies.map((baby) => {
      //   const date = new Date(baby.expireDate);
      //   const expireNum = date.getFullYear() * 12 + (date.getMonth() + 1);
      //   const baseNum = baseYM.y * 12 + baseYM.m * 1;
      //   console.log(expireNum - baseNum);
      // });

      const baseYM = action.payload.baseYM;
      const data = newRowsForCompare.map((row) => {
        const date = new Date(row.expireDate);

        const expireNum = date.getFullYear() * 12 + (date.getMonth() + 1);
        const baseNum = baseYM.y * 12 + baseYM.m * 1;

        console.log(expireNum, baseNum);
        console.log(expireNum >= baseNum);

        // 到期日大於發薪日代表可領
        // 到期日小於發薪日代表過期
        return { ...row, isExpire: expireNum < baseNum };
      });
      return { ...state, babies: data };

    // 初始資料
    case actions.INIT_DATA:
      return {
        ...state,
        babies: action.payload.babies,
        salaries: action.payload.salaries,
      };

    // 新增列
    case actions.ADD_BABY:
      return {
        ...state,
        babies: [...state.babies, { ...action.payload.baby, id: Date.now() }],
        isModalOpen: false,
        baby: baby,
        editedIndex: -1,
      };

    // 更新列
    case actions.UPDATE_ROW:
      const newRows = state.babies.slice();
      Object.assign(newRows[action.payload.editedIndex], action.payload.baby);

      return {
        ...state,
        babies: newRows,
        isModalOpen: false,
        baby: baby,
        editedIndex: -1,
      };

    // 資料輸入
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

    // 刪除
    case actions.DELETE_ROW:
      return {
        ...state,
        babies: state.babies.filter((row) => row.id !== action.id),
        baby: baby,
        isModalOpen: false,
        editedIndex: -1,
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
