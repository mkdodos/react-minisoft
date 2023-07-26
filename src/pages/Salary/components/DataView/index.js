import React, { useEffect, useState } from 'react';

import { Table } from 'semantic-ui-react';
import TableHeader from './components/TableHeader';
import TableHeaderSum from './components/TableHeaderSum';
import { actions } from '../../actions';

export default function DataView({state,dispatch,search,form,setForm}) {
  const {rows,isModalOpen,row}=state;
  // 此值傳給子元件做為是否顯示大小月欄位依據
  const [isShowBigM, setIsShowBigM] = useState(false);
  useEffect(() => {
    // 月份有變動時,重新計算大小月
    const bigM = [1, 3, 5, 7, 8, 10, 12];
    if (bigM.indexOf(search.m) > -1) setIsShowBigM(true);
    else setIsShowBigM(false);
    
  }, [search]);


  

  const handleEdit = (row) => {
    // 索引做為儲存後將資料寫回陣列之用
    const index = rows.indexOf(row);
    
    setForm({...form,row:row,isOpen:true,index})    
  };

  return (
    <Table unstackable>
      <TableHeader isShowBigM={isShowBigM} />
      <TableHeaderSum rows={rows} isShowBigM={isShowBigM} />
      <Table.Body>
        {rows.map((item) => {
          return (
            <Table.Row key={item.id}>
               <Table.Cell
                  onClick={() => {
                    handleEdit(item);
                  }}
                >
                  <a href="#">編輯</a>
                </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.y}</Table.Cell>
              <Table.Cell>{item.m}</Table.Cell>
              <Table.Cell>{item.basic}</Table.Cell>
              <Table.Cell>{item.job}</Table.Cell>
              <Table.Cell>{item.tech}</Table.Cell>
              <Table.Cell>{item.food}</Table.Cell>
              <Table.Cell>{item.full}</Table.Cell>
              <Table.Cell>{item.error}</Table.Cell>
              <Table.Cell>{item.effect}</Table.Cell>
              <Table.Cell>{item.mins}</Table.Cell>
              <Table.Cell>{item.ovAmt}</Table.Cell>
              <Table.Cell>{item.offHours}</Table.Cell>
              <Table.Cell>{item.offHoursAmt}</Table.Cell>
              {/* 大小月 */}
              {isShowBigM && <Table.Cell>{item.bigM}</Table.Cell>}
              <Table.Cell>{item.minus}</Table.Cell>
              <Table.Cell>{item.others}</Table.Cell>
              <Table.Cell>{item.total}</Table.Cell>
             
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
