import { createStore, applyMiddleware, Store, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { cardMakerReducer } from './reducers/CardMakerReducer';
import { testCardMaker as initialState } from './initialState';
import { CardMaker } from './types';

import { addHistory, afterChangeHistory } from './actionCreators/historyActionCreators';


const exceptions: string[] = [
  'ADD_HISTORY',
  'AFTER_CHANGE_HISTORY',
  'UNDO',
  'REDO',
  'SET_SELECTED_BLOCK',
  'RESET_SELECTED_BLOCK',
];

const storeHistory = (store: MiddlewareAPI<Dispatch<AnyAction>, CardMaker>) => (next: any) => (action: AnyAction) => {
  const oldState = store.getState();
  const result = next(action)
  const newState = store.getState();

  if (!exceptions.includes(action.type)) {
    if (JSON.stringify(oldState.canvas) !== JSON.stringify(newState.canvas)) {
      console.log('сохранение истории');
      store.dispatch(addHistory(newState.canvas));
    }
  }
  return result
}

const valid: string[] = [
  'UNDO',
  'REDO',
];
// подписка на изменение истории команд
const movingHistory = (store: any) => (next: any) => (action: any) => {
  const result = next(action)

  if ((valid.includes(action.type)) && (action.type !== 'AFTER_CHANGE_HISTORY')) {
    const canvas = store.getState().history.listState[store.getState().history.currentIndex];
    const newState = {
      ...store.getState(),
      canvas,
    }
    store.dispatch(afterChangeHistory(newState));
  }

  return result
}

export const store: Store<CardMaker> = createStore(
  cardMakerReducer,
  initialState,
  applyMiddleware(storeHistory, movingHistory)
);