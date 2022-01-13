import { Dispatch, SetStateAction, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { random } from '../utils';

interface Props {
  round: number;
  setRound: Dispatch<SetStateAction<number>>;
  sadCount: number;
  setSadCount: Dispatch<SetStateAction<number>>;
}

const TOTAL_ROUND = 10;

export default function Status({ round, setRound, sadCount, setSadCount }: Props) {
  const context = useContext(GlobalContext);

  if (!context) {
    return null;
  }

  const { total, smilePoint, sadPoint, setSmilePoint, setSadPoint } = context;

  const onClickComplete = () => {
    if (round >= TOTAL_ROUND) {
      alert(
        `게임이 종료되었습니다. 총 이익은 ${context?.total.toLocaleString()}!\n${
          context?.total < 0 ? '위험을 즐기시네요~' : 'wow~'
        }`,
      );
      return;
    }

    setRound((prev) => prev + 1);
    setSmilePoint(random(100));
    setSadPoint(random(300));
    setSadCount(random(16));
  };

  return (
    <>
      <ul className='status'>
        <li>스마일카드 이익: {smilePoint}</li>
        <li>불행카드 손해: {sadPoint}</li>
        <li>불행카드 개수: {sadCount}</li>
        <li>총 이익: {total}</li>
      </ul>
      <button className='next' onClick={onClickComplete}>
        선택완료 (다음 라운드로 gogo)
      </button>
    </>
  );
}
