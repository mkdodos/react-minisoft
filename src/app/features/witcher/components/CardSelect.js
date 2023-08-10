import React from 'react';
import { Button } from 'semantic-ui-react';
export default function CardSelect({chooseNumber,isEnd}) {
  // const handleCityClick = () => {chooseNumber};
  const handleCountryClick = () => {};

  return (
    <div>
      <Button.Group widths="2">
        <Button color="instagram" disabled={isEnd} onClick={chooseNumber}>
          城市
        </Button>
        <Button color="green" onClick={handleCountryClick}>
          鄉村
        </Button>
      </Button.Group>
    </div>
  );
}
