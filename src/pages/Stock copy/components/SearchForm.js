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
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Form.Select
              clearable
              placeholder="名稱"
              fluid
              options={options}
              onChange={handleSearchChange}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Button onClick={handleSearch}>查詢</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
