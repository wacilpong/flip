import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Status from './components/Status';
import GlobalContextProvider from './GlobalContext';
import { CardStatus } from './types';
import { random } from './utils';

const DISPLAY_COUNT = 32;

function App() {
  const [sadCount, setSadCount] = useState(random(16));
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState<CardStatus[]>([]);

  useEffect(() => {
    setCards(
      Array(DISPLAY_COUNT)
        .fill(null)
        .map((_, i) => {
          if (i < sadCount) {
            return 'sad';
          }

          return 'smile';
        })
        .sort(() => Math.random() - 0.5),
    );
  }, [sadCount]);

  return (
    <GlobalContextProvider>
      <div className='App'>
        <header>
          <h2>현재 라운드: {round}</h2>
          <h3>가능한 한 많은 스마일카드를 선택해서 큰 이익을 만들어보세요!</h3>
        </header>
        <main className='board'>
          <ul className='list'>
            {cards.map((v, i) => (
              <li key={Math.random() + i}>
                <Card status={v} cardNumber={i} />
              </li>
            ))}
          </ul>
          <Status round={round} setRound={setRound} sadCount={sadCount} setSadCount={setSadCount} />
        </main>
      </div>
    </GlobalContextProvider>
  );
}

export default App;
