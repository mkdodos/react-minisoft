import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

export default function GroupCostsView({ data }) {
  const [rows, setRows] = useState([]);

  const stocks = [
    { id: 1, name: '長榮航', value: '長榮航', price: 30 },
    { id: 2, name: '元大50', value: '元大50', price: 180 },
    { id: 3, name: '元大高股息', value: '元大高股息', price: 35 },
    { id: 4, name: '鴻海', value: '鴻海', price: 190 },
  ];

  useEffect(() => {
    stocks.map((stock, index) => {
      let sum = 0;
      let sumQty = 0;//股數
      let tempRows = data.filter((obj) => obj.name == stock.name);
      tempRows.map((row) => {
        sum += Number(row.price) * Number(row.qty);
        sumQty +=  Number(row.qty);
      });

      // 平均成本
      const avgCost = sum/sumQty;
      // 損益
      const bouns = (stock.price-avgCost)*sumQty;

      stocks[index] = { ...stock, value: sum,qty:sumQty,avgCost:avgCost,bouns:bouns };
    });

    console.log(stocks);
    setRows(stocks);
  }, [data]);

  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>id</Table.HeaderCell>
            <Table.HeaderCell width={2}>名稱</Table.HeaderCell>
            <Table.HeaderCell width={2}>金額</Table.HeaderCell>
            <Table.HeaderCell width={2}>股數</Table.HeaderCell>
            <Table.HeaderCell width={2}>平均成本</Table.HeaderCell>
            <Table.HeaderCell width={2}>現價</Table.HeaderCell>
            <Table.HeaderCell width={2}>損益</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell>{row.id}</Table.Cell>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{Math.round(row.value)}</Table.Cell>
                <Table.Cell>{row.qty}</Table.Cell>
                <Table.Cell>{Math.round(row?.avgCost*100)/100}</Table.Cell>
                <Table.Cell>{row.price}</Table.Cell>
                <Table.Cell>{Math.round(row?.bouns)}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
