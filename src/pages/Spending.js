import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table,Container } from 'semantic-ui-react';
import { db } from '../utils/firebase';

export default function Notebook() {
  const [rows,setRows]=useState([]);
  const url = 'http://localhost:8888/react-minisoft/mysql/spending.php';
  
  useEffect(()=>{
    axios.get(url).then((res) => {
      console.log(res.data)
      setRows(res.data)   
     
    });
  
  },[])
  
  return (
    <Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>id</Table.HeaderCell> */}
            <Table.HeaderCell>spend_date</Table.HeaderCell>
            <Table.HeaderCell>note</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map(row=>{
            return  (
              <Table.Row key={row.id}>
              {/* <Table.Cell>{row.id}</Table.Cell> */}
              <Table.Cell>{row.spend_date}</Table.Cell>
              <Table.Cell>{row.note}</Table.Cell>
            </Table.Row>
            )
          })}
         
        </Table.Body>
      </Table>
    </Container>
  );
}
