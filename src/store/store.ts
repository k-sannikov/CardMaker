import { createStore, applyMiddleware, Store, MiddlewareAPI, Dispatch, AnyAction } from "redux";
import { cardMakerReducer } from "./reducers/CardMakerReducer";
import { testCardMaker } from "./initialState";
import { Canvas, CardMaker } from "./types";

import { addHistory, afterChangeHistory } from "./actionCreators/historyActionCreators";


const exceptions: string[] = [
  "UNDO",
  "REDO",
  "ADD_HISTORY",
  "AFTER_CHANGE_HISTORY",
  "SET_SELECTED_BLOCK",
  "SET_POSITION_AREA_SELECTION",
  "RESET_SELECTED_BLOCK",
  "RESET_AREA_SELECTION",
  "APPLY_FILE_PROJECT",
  "NEW_CARD_MAKER",
  "AREA_SELECTION",
  "CLICK_ON_TEXT",
  "INPUT_SIZE_TEXT",
  "INPUT_COLOR_TEXT",
  "INPUT_FILTER",
  "INPUT_CANVAS_SIZE",
  "INPUT_BACKGROUND_IMG",
  "INPUT_BACKGROUND_COLOR",
];

const storeHistory = (store: MiddlewareAPI<Dispatch<AnyAction>, CardMaker>) =>
  (next: AppDispatch) => (action: AnyAction) => {

    const oldState: CardMaker = store.getState();
    const result: AnyAction = next(action)
    
    if (!exceptions.includes(action.type)) {
      const newState: CardMaker = store.getState();
      if (JSON.stringify(oldState.canvas) !== JSON.stringify(newState.canvas)) {
        store.dispatch(addHistory(newState.canvas));
      }
    }
    return result
  }

const movingHistory = (store: MiddlewareAPI<Dispatch<AnyAction>, CardMaker>) =>
  (next: AppDispatch) => (action: AnyAction) => {

    const result: AnyAction = next(action)

    if (["UNDO", "REDO"].includes(action.type)) {
      const currentIndex: number = store.getState().history.currentIndex;
      const canvas: Canvas = store.getState().history.listState[currentIndex];
      const newState: CardMaker = {
        ...store.getState(),
        canvas,
      }
      store.dispatch(afterChangeHistory(newState));
    }
    return result
  }

export const store: Store<CardMaker> = createStore(
  cardMakerReducer,
  testCardMaker,
  applyMiddleware(storeHistory, movingHistory)
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch