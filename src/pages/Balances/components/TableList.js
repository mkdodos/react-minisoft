import React from 'react';
import { Table } from 'semantic-ui-react';

export default function TableList({ rows, onRowClick }) {
  // 取得星期幾
  const getWeekDay = (date) => {
    const dt = new Date(date);

    let day = '';
    switch (dt.getDay()) {
      case 0:
        day = '日';
        break;
      case 1:
        day = '一';
        break;
      case 2:
        day = '二';
        break;
      case 3:
        day = '三';
        break;
      case 4:
        day = '四';
        break;
      case 5:
        day = '五';
        break;
      case 6:
        day = '六';
        break;
    }

    return day;
  };

  // 日期非當年才顯示年份
  const dateExcludeCurrentYear = (date) => {
    // 當年
    const currentYear = new Date().getFullYear();
    // 每一筆日期的年
    const dataYear = date.slice(0, 4);
    // 省略年的日期
    const excludedDate = date.slice(5);

    // 日期為當年回傳省略年的日期
    if (currentYear == dataYear) {
      return excludedDate;
    }

    // 非當年日期正常顯示
    return date;
  };
  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>日期</Table.HeaderCell>
            <Table.HeaderCell>帳戶</Table.HeaderCell>
            <Table.HeaderCell>類別</Table.HeaderCell>
            <Table.HeaderCell>項目</Table.HeaderCell>
            <Table.HeaderCell>收入</Table.HeaderCell>
            <Table.HeaderCell>支出</Table.HeaderCell>
            <Table.HeaderCell>餘額</Table.HeaderCell>
            <Table.HeaderCell>類型</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row key={row.id} onClick={() => onRowClick(row, index)}>
                <Table.Cell>
                  {dateExcludeCurrentYear(row.date)} ({getWeekDay(row.date)})
                </Table.Cell>
                <Table.Cell>{row.account.name}</Table.Cell>
                <Table.Cell>{row.cate}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.income}</Table.Cell>
                <Table.Cell>{row.expense}</Table.Cell>
                <Table.Cell positive>{row.account?.balance}</Table.Cell>
                <Table.Cell>{row.type}</Table.Cell>
                {/* <Table.Cell>{}</Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
