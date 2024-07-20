import React from 'react';
import { Grid,Form,Button } from 'semantic-ui-react';

export default function SearchForm({options,handleSearchChange,readDocs,search}) {
  return (
    <div>
      <Grid >
        <Grid.Row>
          <Grid.Column width={2} >
            <Form.Select
              placeholder="名稱"
              fluid
              options={options}
              onChange={handleSearchChange}
            />
          </Grid.Column>
          <Grid.Column width={2} >
            <Button onClick={() => readDocs(search)}>查詢</Button>
          </Grid.Column>
          
        </Grid.Row>
      </Grid>
    </div>
  );
}
