import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CardMaker from './cardMaker/CardMaker';
import { addCardMakerChangeHandler, getCardMaker } from './CardMaker';
import { CardMakerContext } from './CardMakerContext';
import { CardMaker as CardMakerType } from './CardMakerTypes';

function render() {
  const cardMaker: CardMakerType = getCardMaker();
  ReactDOM.render(
    <React.StrictMode>
      <CardMakerContext.Provider value={cardMaker}>
        <CardMaker cardMaker={cardMaker} />
      </CardMakerContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

addCardMakerChangeHandler(render);
render();
