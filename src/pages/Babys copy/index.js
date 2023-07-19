import data from './data.json';
import {
  Table,
  Input,
  Button,
  Grid,
  GridRow,
  GridColumn,
} from 'semantic-ui-react';
import React, { useEffect, useReducer, useState } from 'react';
import 'datejs';
import Salary from './components/Salary';
import Babys from './components/Babys';
import EditForm from './components/EditForm';


const reducer = (state,action)=>{

  
  return {...state,editIndex:action.payload.editIndex};
}

export default function Index() {
  // 發薪年月
  const [ym, setYm] = useState({ y: 2026, m: 12 });
  // 員工資料
  const [babys, setBabys] = useState(data.babys);
  // 薪資
  const [salary, setSalary] = useState(data.salary);
  // 符合資格
  const [eligibleBabys, setEligibleBabys] = useState([]);

  // 預設值
  const defaultValue = {
    name: '馬克',
    birth: '2023-07-18',
  };

  const [state, dispatch] = useReducer(reducer, {
    row:  defaultValue ,
    isLoading: false,
    editIndex: -1,
  });

  useEffect(() => {
    console.log(salary);
  }, []);

  // 是否到期
  function calIsExpire(date) {
    // 比對在發薪年月是否小於等於到期日
    const salaryYM = ym.y * 12 + ym.m * 1;

    // 到期日(最後一次發放日=生日+49個月)
    const expireDate = calExpire(date);
    // 取得年月
    const expireY = expireDate.getFullYear();
    const expireM = expireDate.getMonth() + 1;
    //
    const expireYM = expireY * 12 + expireM;

    return salaryYM <= expireYM;
  }

  // 到期日
  function calExpire(date) {
    return new Date(date).addMonths(49);
  }

  function handleInputChange(e) {
    setYm({ ...ym, [e.target.name]: e.target.value });
  }
  function handleQuery() {
    const rows = babys.slice();
    const data = rows.map((row) => {
      return {
        ...row,
        expireYM: calExpire(row.birth).toISOString().slice(0, 7),
        salaryYM: ym,
        isExpire: calIsExpire(row.birth),
      };
    });
    setBabys(data);
    setEligibleBabys(data.filter((row) => row.isExpire == true));
  }
  return (
    <>
    {console.log(state)}
      <EditForm row={state.row} dispatch={dispatch} />
      <Grid columns={2}>
        <GridRow>
          <GridColumn>
            發薪年月
            <Input value={ym.y} name="y" onChange={handleInputChange} />
            <Input value={ym.m} name="m" onChange={handleInputChange} />
            <Button onClick={handleQuery}>查詢</Button>
            <Babys rows={babys} />
          </GridColumn>
          <GridColumn>
            {' '}
            <Salary rows={salary} setRows={setSalary} babys={eligibleBabys} />
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  );
}
