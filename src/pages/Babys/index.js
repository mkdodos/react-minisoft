import data from './data.json';
import { Table } from 'semantic-ui-react';
import React from 'react';
import 'datejs';
export default function index() {
  const { babys } = data;

  // 發薪年月
  const salaryY = '2026';
  const salaryM = 12;

  // 是否到期
  function calIsExpire(date) {
    // 比對在發薪年月是否小於等於到期日

    const salaryYM = salaryY * 12 + salaryM;

    const expireDate = calExpire(date);
    const expireY = expireDate.getFullYear();
    const expireM = expireDate.getMonth() + 1;
    const expireYM = expireY * 12 + expireM;
    // return expireY*12 ;
    // return salaryY*12 ;
    return salaryYM <= expireYM ? '是' : '否';
  }

  // 到期日
  function calExpire(date) {
    // var newDate = new Date(date.setMonth(date.getMonth()+8));
    // var newDate = new Date(date);
    //  console.log(Date.today())

    // return new Date(date).addMonths(49).toISOString().slice(0,7)
    return new Date(date).addMonths(49);
    // newDate  = newDate.setMonth(newDate.getMonth()+8)
    // return newDate.setMonth(5)
  }
  // calExpire()
  return (
    <Table unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>name</Table.HeaderCell>
          <Table.HeaderCell>birth</Table.HeaderCell>
          <Table.HeaderCell>最後發放月</Table.HeaderCell>
          <Table.HeaderCell>發薪年月</Table.HeaderCell>

          <Table.HeaderCell>可領</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {babys.map((baby) => {
          return (
            <Table.Row key={baby.id}>
              <Table.Cell>{baby.name}</Table.Cell>
              <Table.Cell>{baby.birth}</Table.Cell>

              <Table.Cell>
                {calExpire(baby.birth).toISOString().slice(0, 7)}
              </Table.Cell>
              <Table.Cell>
                {salaryY}-{salaryM}
              </Table.Cell>
              <Table.Cell>{calIsExpire(baby.birth)}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
