import {useState, Dispatch, SetStateAction, useContext} from "react";
import {GlobalContext} from "../GlobalContext";
import {random} from "../utils";

interface Props {
  round: number;
  setRound: Dispatch<SetStateAction<number>>;
}

const TOTAL_ROUND = 10;

export default function Status({round, setRound}: Props) {
  const [sadCount, setSadCount] = useState(random(10));
  const context = useContext(GlobalContext);

  if (!context) {
    return null;
  }

  const {total, smilePoint, sadPoint, setSmilePoint, setSadPoint} = context;

  const onClickComplete = () => {
    if (round >= TOTAL_ROUND) {
      alert(
        `게임이 종료되었습니다. 총 이익은 ${context?.total.toLocaleString()}!`
      );
      return;
    }

    setRound((prev) => prev + 1);
    setSmilePoint(random(100));
    setSadPoint(random(300));
    setSadCount(random(10));
  };

  return (
    <>
      <ul className="status">
        <li>스마일카드 이익: {smilePoint}</li>
        <li>불행카드 손해: {sadPoint}</li>
        <li>불행카드 개수: {sadCount}</li>
        <li>총 이익: {total}</li>
      </ul>
      <button onClick={onClickComplete}>선택완료 (다음 라운드로 gogo)</button>
    </>
  );
}
