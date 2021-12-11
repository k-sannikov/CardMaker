import { CardMaker } from "../../CardMakerTypes";

function viewModel(cardMaker: CardMaker = {} as CardMaker, action: any) {

  switch (action.type) {
    case 'INPUT_BACKGROUND_COLOR':
      return {
        bgColor: action.color,
      }
    case 'UNDO':
      return {
        bgColor: null,
      }
    case 'REDO':
      return {
        bgColor: null,
      }
  
    default:
      return {
        bgColor: cardMaker.canvas.background.color,
      }
  }
}

export default viewModel;