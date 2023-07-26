import React from 'react'
import { Table } from 'semantic-ui-react'

export default function TableHeader() {
  return (
   
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>姓名</Table.HeaderCell>
          <Table.HeaderCell width={1}>年</Table.HeaderCell>
          <Table.HeaderCell>月</Table.HeaderCell>
          <Table.HeaderCell>本薪</Table.HeaderCell>
          <Table.HeaderCell>職務</Table.HeaderCell>
          <Table.HeaderCell>技術</Table.HeaderCell>
          <Table.HeaderCell>伙食</Table.HeaderCell>
          <Table.HeaderCell>全勤</Table.HeaderCell>
          <Table.HeaderCell>無過失</Table.HeaderCell>
          <Table.HeaderCell>績效</Table.HeaderCell>
          <Table.HeaderCell>加班分鐘</Table.HeaderCell>
          <Table.HeaderCell>加班金額</Table.HeaderCell>
          <Table.HeaderCell>請假</Table.HeaderCell>
          <Table.HeaderCell>請假扣</Table.HeaderCell>
          <Table.HeaderCell>其他扣</Table.HeaderCell>
          <Table.HeaderCell width={1}>育嬰津貼</Table.HeaderCell>
          <Table.HeaderCell width={1}>合計</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
   
  )
}
