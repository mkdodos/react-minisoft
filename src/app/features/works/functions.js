export const test = () => {
  const filterObj = {
    name: 'ab',
    birth: '2020-01-02',
  };

  const data = [
    {
      name: 'ab',
      birth: '2020-01-02',
    },
    {
      name: 'ab',
      birth: '2020-01-02',
    },
  ];

  data.filter((row) => {
    for (var key in filterObj) {
      if (row[key] != filterObj[key]){
        console.log('n')
        return false;
      } 
    }
    console.log('y')
    return true;
  });
};
