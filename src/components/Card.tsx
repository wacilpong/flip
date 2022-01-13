import { MouseEvent, useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import Bad from '../images/bad.png';
import Good from '../images/good.png';
import { CardStatus } from '../types';

interface Props {
  status: CardStatus;
  cardNumber: number;
}

export default function Card({ status, cardNumber }: Props) {
  const context = useContext(GlobalContext);
  const [open, isOpen] = useState(false);
  const [showAnimation, isShowAnimation] = useState(false);
  const frontClassNames = useMemo(
    () => ['front', open ? 'open' : '', status === 'sad' ? 'bad' : 'good'].join(' '),
    [status, open],
  );

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

  useEffect(() => {
    setTimeout(() => isShowAnimation(true), cardNumber * 100);
  });

  return (
    <button
      className={`card ${open ? 'fliped' : ''} ${showAnimation ? 'showCard' : ''}`}
      data-status={status}
      onClick={onClickCard}>
      <div className={`back ${open ? 'open' : ''}`}></div>
      <div className={frontClassNames}>{<img src={status === 'sad' ? Bad : Good} alt='' />}</div>
    </button>
  );
}
