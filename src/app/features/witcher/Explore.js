import React, { useEffect, useState } from 'react';
import CardSelect from './components/CardSelect';
import Story from './components/Story';
import { useSelector } from 'react-redux';
import { pickupNumber } from './funtions/pickupNumber';
import Choice from './components/Choice';

export default function Explore() {
  // 初始資料
  const state = useSelector((state) => state.witcher);
  // 選擇卡片索引
  const [storyIndex, setStoryIndex] = useState(-1);
  // 卡片已全部選完
  const [isEnd, setIsEnd] = useState(false);
  // 已選卡片數字
  const [pickedNumbers, setPickedNumbers] = useState([]);
  // 選擇選項 a b
  const [answer, setAnswer] = useState('');

  const chooseNumber = () => {
    let num = pickupNumber(1, state.length, pickedNumbers);

    if (pickedNumbers.length + 1 == state.length) {
      setIsEnd(true);
    }
    // return;

    // console.log(num - 1);
    setPickedNumbers([...pickedNumbers, num]);
    // 取出的數字從1開始,索引是從0開始,所以-1
    if (num > 0) {
      setStoryIndex(num - 1);
    }

    setAnswer('');
    // console.log(num,pickedNumbers);
  };
  return (
    <div>
      {/* <CardSelect pickupNumber={() => console.log(pickupNumber(1, 2, []))} /> */}
      <CardSelect chooseNumber={chooseNumber} isEnd={isEnd} />
      {storyIndex !== -1 && (
        <>
          <Story story={state[storyIndex].story} />
          <Choice
            setAnswer={setAnswer}
            answer={answer}
            choice={state[storyIndex].choice}
            result={state[storyIndex].result}
          />
        </>
      )}
    </div>
  );
}
