import React from 'react';
import { Grid, Button, Input } from 'semantic-ui-react';
import MortgageAccSelect from '../../../../components/MortgageAccSelect';

export default function SearchForm({ handleSearch, search, setSearch }) {
  const handleAccChange = (e, { value }) => {
    console.log(value)
    setSearch({ ...search, account: value });
  };
  return (
    <>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={3}>
            <Input
              type="date"
              value={search?.date}
              onChange={(e) => setSearch({ ...search, date: e.target.value })}
            />
          </Grid.Column>
          {/* <Grid.Column width={4}>
            <Input
              label="帳戶"
              type="text"
              value={search.account}
              onChange={(e) =>
                setSearch({ ...search, account: e.target.value })
              }
            />
          </Grid.Column> */}
          <Grid.Column width={4}>
            <MortgageAccSelect
            // label="帳戶"
              account={search.account}
              onChange={handleAccChange}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input
              label="本金"
              type="number"
              value={search.basic}
              onChange={(e) => setSearch({ ...search, basic: e.target.value })}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <Button color="olive" onClick={handleSearch}>
              Search
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
