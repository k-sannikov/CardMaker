import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CardMaker from './cardMaker/CardMaker';
import { store } from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CardMaker />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
