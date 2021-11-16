import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CardMaker from './cardMaker/CardMaker';
import { addCardMakerChangeHandler, getCardMaker } from './CardMaker';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <CardMaker cardMaker={getCardMaker()} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

addCardMakerChangeHandler(render);
render();
