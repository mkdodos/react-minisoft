
import {
  Icon,
  Label,
  Menu,
  Table,
  Container,
  Button,
  Header,
} from 'semantic-ui-react';

export default function List({rows,deleteRow,editRow}) { 

  return (
    <div>
     
      
       

        <Table celled selectable unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>消費日</Table.HeaderCell>
              <Table.HeaderCell width={2}>入帳日</Table.HeaderCell>
              <Table.HeaderCell>明細</Table.HeaderCell>
              <Table.HeaderCell>金額</Table.HeaderCell>
              <Table.HeaderCell>#</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows.map((row,index) => {
              return (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.consumeDate}</Table.Cell>
                  <Table.Cell>{row.accountDate}</Table.Cell>
                  <Table.Cell>{row.note}</Table.Cell>
                  <Table.Cell>{row.amt}</Table.Cell>
                  <Table.Cell>
                    <Button color='green' basic onClick={() => editRow(row,index)}>Edit</Button>
                    <Button color='red' basic onClick={() => deleteRow(row,index)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
     
    </div>
  );
}
