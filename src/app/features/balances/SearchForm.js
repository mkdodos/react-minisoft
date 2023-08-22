import React from 'react';
import { Form, Input } from 'semantic-ui-react';
export default function SearchForm({setSearch,search,cateSearch,setCateSearch}) {
  return (
    <div>
      <Form>
        <Form.Group unstackable widths="2">
          <Form.Field>
            <label>類別</label>
            <Input
              value={cateSearch}
              placeholder="類別"
              onChange={(e) => setCateSearch(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>項目</label>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
}
