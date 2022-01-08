import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import {CardStatus} from "./types";
import {random} from "./utils";

interface Context {
  total: number;
  smilePoint: number;
  sadPoint: number;
  sadCount: number;
  setTotal: Dispatch<SetStateAction<number>>;
  setSmilePoint: Dispatch<SetStateAction<number>>;
  setSadPoint: Dispatch<SetStateAction<number>>;
  setSadCount: Dispatch<SetStateAction<number>>;
  caculateTotal: (_: CardStatus) => void;
}

export const GlobalContext = createContext<Context | null>(null);

const GlobalContextProvider: FunctionComponent = ({children}) => {
  const [total, setTotal] = useState(0);
  const [smilePoint, setSmilePoint] = useState(random(100));
  const [sadPoint, setSadPoint] = useState(random(300));
  const [sadCount, setSadCount] = useState(random(16));

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
        sadCount,
        setSadCount,
        caculateTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
