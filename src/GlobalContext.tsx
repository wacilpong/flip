import {createContext, Dispatch, FunctionComponent, useState} from "react";
import {CardStatus} from "./types";
import {random} from "./utils";

interface Context {
  total: number;
  smilePoint: number;
  sadPoint: number;
  setTotal: Dispatch<React.SetStateAction<number>>;
  setSmilePoint: Dispatch<React.SetStateAction<number>>;
  setSadPoint: Dispatch<React.SetStateAction<number>>;
  caculateTotal: (_: CardStatus) => void;
}

export const GlobalContext = createContext<Context | null>(null);

const GlobalContextProvider: FunctionComponent = ({children}) => {
  const [total, setTotal] = useState(0);
  const [smilePoint, setSmilePoint] = useState(random(100));
  const [sadPoint, setSadPoint] = useState(random(300));

  const caculateTotal = (status: CardStatus) => {
    setTotal((prev) =>
      status === "sad" ? prev - sadPoint : prev + smilePoint
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        total,
        setTotal,
        smilePoint,
        setSmilePoint,
        sadPoint,
        setSadPoint,
        caculateTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
