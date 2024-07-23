import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import EditForm from './components/EditForm';
import GroupCostsView from './components/GroupCostsView';

export default function Index({ data }) {
  // 編輯表單顯示隱藏
  const [open, setOpen] = useState(false);
  const defaultRow = {
    name: '',
    // cost: '',
    // qty: '',
    price: '',
  };
  const [row, setRow] = useState(defaultRow);
  const [stocks, setStocks] = useState([]);

  // const stocks = [];

  const [rowIndex, setRowIndex] = useState(-1);
  const handleAdd = () => {
    setOpen(true);
    // setRowIndex(-1);
  };

  const handleStockEdit = (obj, index) => {
    setRow(obj);
    setOpen(true);
    // console.log(row)
  };

  // 儲存(新增或修改)
  const handleSave = () => {
    // 依照有編輯列索引值決定做新增或修改
    if (rowIndex == -1) {
      // 將編輯列加入資料陣列
      // setRows([...rows, { ...row, id: nanoid() }]);
    } else {
      // 修改表格中編輯列的值
      const tempRows = rows.slice();
      Object.assign(tempRows[rowIndex], row);
      setRows(tempRows);
      setRowIndex(-1);
    }

    // 將編輯列資料設定回預設值
    setRow(defaultRow);
  };

  return (
    <div>
      <GroupCostsView data={data} handleStockEdit={handleStockEdit} />
      <Button primary onClick={handleAdd}>
        新增
      </Button>
      <EditForm open={open} setOpen={setOpen} row={row} />
    </div>
  );
}
