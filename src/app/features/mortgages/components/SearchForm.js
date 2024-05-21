import React from 'react';

export default function SearchForm() {
  return (
    <div>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={3}>
            {/* <Input fluid onChange={(e) => setBasic(e.target.value)} /> */}
          </Grid.Column>
          <Grid.Column width={3}>
            {/* <Button color="pink" onClick={() => dispatch(addNewRow(row))}>
              ADD
            </Button> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
