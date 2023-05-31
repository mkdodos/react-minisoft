import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table,Container } from 'semantic-ui-react';
import { db } from '../utils/firebase';

export default function Notebook() {
  const [rows,setRows]=useState([]);
  const url = 'http://localhost:8888/react-minisoft/mysql/select.php';
  
  useEffect(()=>{
    // axios.get(url).then((res) => {
    //   console.log(res.data)
    //   setRows(res.data)   
     
    // });
    db.collection("notebook").orderBy('note_date').limit(1).get().then(snapshot=>{
      const data = snapshot.docs.map(doc=>{
        return doc.data();
      })
      setRows(data)
    })
  },[])
  
  return (
    <Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>id</Table.HeaderCell> */}
            <Table.HeaderCell>note_date</Table.HeaderCell>
            <Table.HeaderCell>title</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map(row=>{
            return  (
              <Table.Row key={row.id}>
              {/* <Table.Cell>{row.id}</Table.Cell> */}
              <Table.Cell>{row.note_date}</Table.Cell>
              <Table.Cell>{row.title}</Table.Cell>
            </Table.Row>
            )
          })}
         
        </Table.Body>
      </Table>
    </Container>
  );
}
