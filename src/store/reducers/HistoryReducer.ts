import { Canvas, ActionHistory } from '../types';
import { isUndoAvailable, isRedoAvailable } from '../../utils/permisions'

export type HistoryAction = {
  type: 'NEW_CARD_MAKER',
} | {
  type: 'ADD_HISTORY',
  newCanvas: Canvas,
} | {
  type: 'UNDO',
} | {
  type: 'REDO',
}

function history(history: ActionHistory, action: HistoryAction): ActionHistory {
  switch (action.type) {

    case 'NEW_CARD_MAKER':
      return {
        listState: [],
        currentIndex: 0,
      };

    case 'ADD_HISTORY':
      {
        const listState: Canvas[] = history.listState;
        const currentIndex: number = history.currentIndex;
        let newListState: Canvas[] = [...history.listState];
        if (currentIndex !== listState.length - 1) {
          newListState.splice(currentIndex + 1, listState.length - currentIndex + 1);
        }
        newListState.push(action.newCanvas);
        return {
          currentIndex: currentIndex + 1,
          listState: newListState,
        };
      }

    case 'UNDO':
      {
        const currentIndex: number = history.currentIndex;
        const newCurrentIndex: number = isUndoAvailable(history) ? currentIndex - 1 : currentIndex;
        return {
          ...history,
          currentIndex: newCurrentIndex,
        }
      }

    case 'REDO':
      {
        const currentIndex: number = history.currentIndex;
        const newCurrentIndex: number = isRedoAvailable(history) ? currentIndex + 1 : currentIndex;
        return {
          ...history,
          currentIndex: newCurrentIndex,
        }
      }

    default:
      return history;
  }
}

export default history;