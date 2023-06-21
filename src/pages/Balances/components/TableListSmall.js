import React from 'react';
import { Table, Label, Header } from 'semantic-ui-react';

export default function TableListSmall({ rows, onRowClick }) {
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
      <Table unstackable>
        <Table.Body>
          {rows.map((row,index) => {
            return (
              <Table.Row
                key={row.id}
                onClick={() => {
                  onRowClick(row,index);
                }}
              >
                <Table.Cell>
                  <Header as="h4">{row.title}</Header>
                  <span>
                    {dateExcludeCurrentYear(row.date)} ({getWeekDay(row.date)}){' '}
                  </span>
                  {/* {!activeAccount && (
                    <Label color="teal">{row.account?.name}</Label>
                  )} */}
                  {row.cate && <Label>{row.cate}</Label>}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {row.income ? (
                    <Label color="teal" circular>
                      存
                    </Label>
                  ) : (
                    <Label color="orange" circular>
                      提
                    </Label>
                  )}
                  <br></br>$ {row.income ? row.income : row.expense + ''}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
