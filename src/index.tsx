import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CardMaker from './cardMaker/CardMaker';
import { store } from './store/store';
import { Provider } from 'react-redux';

let unsubscribe = store.subscribe(() => {
  render();
});

function render(): void {

  console.log(store.getState());

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <CardMaker />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();
