import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArrDone, selectArrDone, selectWorkById } from './worksSlice';
import { List, Table, Label } from 'semantic-ui-react';
import WorkCard from './WorkCard';

export default function SingleWorkPage() {
  const dispatch = useDispatch();
  const arrdones = useSelector(selectArrDone);
  const { workId } = useParams();
  // const work = useSelector((state)=>selectWorkById(state,Number(workId)));
  const work = useSelector((state) => selectWorkById(state, workId));
  // const post = useSelector((state) => selectPostById(state, Number(postId)))
  useEffect(() => {
    dispatch(fetchArrDone(workId));
  }, []);

  return (
    <div>
      <WorkCard row={work} />
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
