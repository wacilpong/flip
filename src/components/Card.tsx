import {MouseEvent, useContext} from "react";
import {GlobalContext} from "../GlobalContext";
import {CardStatus} from "../types";

interface Props {
  status: CardStatus;
}

export default function Card({status}: Props) {
  const context = useContext(GlobalContext);
  const onClickCard = ({currentTarget}: MouseEvent<HTMLButtonElement>) => {
    const {
      dataset: {status},
    } = currentTarget;

    if (!status) {
      return;
    }

    currentTarget.classList.remove("unselected");
    currentTarget.classList.add("fliped");

    context?.caculateTotal(status as CardStatus);
  };

  return (
    <button
      className="card unselected"
      data-status={status}
      onClick={onClickCard}
    >
      {status === "sad" ? "🤢" : "😊"}
    </button>
  );
}
