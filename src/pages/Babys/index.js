import data from './data.json';
import { Table, Input, Button, Icon } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import 'datejs';
import Salary from './components/Salary';

export default function Index() {
  // const { babys } = data;

  // const salaryY = '2026';
  // const salaryM = 12;
  // 發薪年月
  const [ym, setYm] = useState({ y: 2026, m: 12 });
  // 員工資料
  const [babys, setBabys] = useState(data.babys);
  // 薪資
  const [salary, setSalary] = useState(data.salary);

  // 符合資格
  const [eligibleBabys, setEligibleBabys] = useState([]);

  useEffect(() => {

    console.log(salary)
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
    <Salary rows={salary} setRows={setSalary} babys={eligibleBabys}/>
      發薪年月
      <Input value={ym.y} name="y" onChange={handleInputChange} />
      <Input value={ym.m} name="m" onChange={handleInputChange} />
      <Button onClick={handleQuery}>查詢</Button>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>birth</Table.HeaderCell>
            <Table.HeaderCell>最後發放月</Table.HeaderCell>     
            <Table.HeaderCell>可領</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {babys.map((baby) => {
            return (
              <Table.Row key={baby.id}>
                <Table.Cell>{baby.name}</Table.Cell>
                <Table.Cell>{baby.birth}</Table.Cell>
                <Table.Cell>{baby.expireYM}</Table.Cell>
                <Table.Cell>
                  {baby.isExpire && <Icon name="check" />}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>birth</Table.HeaderCell>
            <Table.HeaderCell>最後發放月</Table.HeaderCell>     
            <Table.HeaderCell>可領</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {eligibleBabys.map((baby) => {
            return (
              <Table.Row key={baby.id}>
                <Table.Cell>{baby.name}</Table.Cell>
                <Table.Cell>{baby.birth}</Table.Cell>
                <Table.Cell>{baby.expireYM}</Table.Cell>
                <Table.Cell>
                  {baby.isExpire && <Icon name="check" />}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
