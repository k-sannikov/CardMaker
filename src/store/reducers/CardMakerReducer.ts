import { CardMaker } from '../../CardMakerTypes';
import canvas from './CanvasReducer';
import selectBlock from './SelectBlockReducer';
import history from './HistoryReducer';
import viewModel from './ViewModelReducer';

export function cardMakerReducer(cardMaker: CardMaker = {} as CardMaker, action: any): CardMaker {
  switch (action.type) {

    case 'AFTER_CHANGE_HISTORY':
      return action.cardMaker;

    default:
      return {
        canvas: canvas(cardMaker.canvas, action),
        selectBlock: selectBlock(cardMaker.selectBlock, action),
        history: history(cardMaker.history, action),
        templates: [],
        viewModel: viewModel(cardMaker, action)
      }
  }
}

