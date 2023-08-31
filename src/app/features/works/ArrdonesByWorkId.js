import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArrDone, selectArrDone, selectWorkById } from './worksSlice';
import { Table } from 'semantic-ui-react';
export default function ArrdonesByWorkId({ workId }) {
  const dispatch = useDispatch();
  const arrdones = useSelector(selectArrDone);
  useEffect(() => {
    dispatch(fetchArrDone(workId));
  }, []);
  return (
    <div>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>姓名</Table.HeaderCell>
            <Table.HeaderCell>開始時間</Table.HeaderCell>
            <Table.HeaderCell>完工數</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {arrdones.map((arr) => {
            return (
              <Table.Row key={arr.id}>
                <Table.Cell>{arr.empName}</Table.Cell>
                <Table.Cell>{arr.sTime}</Table.Cell>
                <Table.Cell>{arr.doneQty}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
