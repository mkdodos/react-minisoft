export function pickupNumber(min, max, exclude) {
  // 範圍(要產生的個數)
  const range = max - min + 1;
  // console.log(range)
  let arr = Array.from({ length: range }, (_, i) => i+min );

  arr = arr.filter((num) => (num = !exclude.includes(num)));

  // return arr;
  // 長度為0表示,已全部都選過了
  if (arr.length === 0) {
    return null;
  }

  console.log(arr)
  // 隨機挑選數字
  let num = Math.floor(Math.random() * arr.length);

  // 將挑出的數字加到陣列中
  // pickedNumbers.push(arr[num]);
  //  setPickedNumbers([...pickedNumbers, arr[num]]);

  return arr[num];
}
