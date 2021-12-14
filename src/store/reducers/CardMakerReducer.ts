import { CardMaker } from '../types';
import canvas, { CanvasAction } from './CanvasReducer';
import selectBlock, { SelectBlockAction } from './SelectBlockReducer';
import history, { HistoryAction } from './HistoryReducer';
import viewModel, { ViewModelAction } from './ViewModelReducer';

export type CardMakerReducerAction = {
  type: 'AFTER_CHANGE_HISTORY',
  cardMaker: CardMaker,
} | {
  type: 'APPLY_FILE_PROJECT',
  project: CardMaker,
} | CanvasAction | SelectBlockAction | HistoryAction | ViewModelAction;

export function cardMakerReducer(cardMaker: CardMaker = {} as CardMaker, action: CardMakerReducerAction): CardMaker {
  switch (action.type) {

    case 'AFTER_CHANGE_HISTORY':
      return action.cardMaker;

    case 'APPLY_FILE_PROJECT':
      return action.project;

    default:
      return {
        canvas: canvas(cardMaker.canvas, action as CanvasAction),
        selectBlock: selectBlock(cardMaker.selectBlock, action as SelectBlockAction),
        history: history(cardMaker.history, action as HistoryAction),
        templates: [],
        viewModel: viewModel(cardMaker, action as ViewModelAction)
      }
  }
}

