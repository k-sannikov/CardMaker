import { Filter } from '../types';

export type FilterAction = {
  type: 'NEW_CARD_MAKER',
} | {
  type: 'SET_FILTER',
  color: string,
  opacity: number,
}

function filter(filter: Filter, action: FilterAction): Filter {
  switch (action.type) {

    case 'NEW_CARD_MAKER':
      return {
        color: '#ffffff',
        opacity: 0,
      };

    case 'SET_FILTER':
      return {
        color: action.color,
        opacity: action.opacity,
      };

    default:
      return filter;
  }
}

export default filter;