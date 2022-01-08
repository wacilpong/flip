import { MouseEvent, useContext, useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import Bad from '../images/bad.png';
import Good from '../images/good.png';
import { CardStatus } from '../types';

interface Props {
  status: CardStatus;
}

export default function Card({ status }: Props) {
  const context = useContext(GlobalContext);
  const [open, isOpen] = useState(false);
  const onClickCard = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    const {
      dataset: { status },
    } = currentTarget;

    if (!status) {
      return;
    }
    isOpen(true);

    context?.caculateTotal(status as CardStatus);
  };

  return (
    <button className={`card ${open ? 'fliped' : ''}`} data-status={status} onClick={onClickCard}>
      <div className={`back ${open ? 'open' : ''}`}></div>
      <div className={`front ${open ? 'open' : ''} ${status === 'sad' ? 'bad' : 'good'}`}>
        {<img src={status === 'sad' ? Bad : Good} alt='' />}
      </div>
    </button>
  );
}
