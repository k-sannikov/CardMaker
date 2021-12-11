import { Background } from '../types';

type BackgroundAction = {
  type: 'NEW_CARD_MAKER',
} | {
  type: 'RESET_BACKGROUND',
} | {
  type: 'SET_BACKGROUND_COLOR',
  color: string,
} | {
  type: 'SET_BACKGROUND_IMG',
  src: string,
}

function background(background: Background, action: BackgroundAction): Background {
  switch (action.type) {

    case 'NEW_CARD_MAKER':
      return {
        color: '#ffffff',
        src: null,
      };

    case 'RESET_BACKGROUND':
      return {
        color: '#ffffff',
        src: null,
      };

    case 'SET_BACKGROUND_COLOR':
      return {
        color: action.color,
        src: null,
      };

    case 'SET_BACKGROUND_IMG':
      return {
        color: null,
        src: action.src,
      };

    default:
      return background;
  }
}

export default background;