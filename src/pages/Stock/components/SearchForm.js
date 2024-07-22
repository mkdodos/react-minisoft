import React from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';

export default function SearchForm({
  options,
  handleSearchChange,  
  search,
  handleSearch
}) {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Form.Select
              clearable
              placeholder="名稱"
              fluid
              options={options}
              onChange={handleSearchChange}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Button onClick={handleSearch}>查詢</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
