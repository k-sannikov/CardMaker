import React from 'react';
import ReactDOM from 'react-dom';
import CardMaker from './components/CardMakerBlock';
import { addCardMakerChangeHandler, getCardMaker } from './CardMaker'

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
