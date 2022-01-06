import { Canvas, Area } from '../types';
import background, { BackgroundAction } from './BackgroundReducer';
import filter, { FilterAction } from './FilterReducer';
import heightCanvas, { HeightAction } from './HeightCanvasReducer';
import listBlock, { ListBlockAction } from './ListBlockReducer';
import widthCanvas, { WidthAction } from './WidthCanvasReducer';

export type CanvasAction = WidthAction | HeightAction | FilterAction | ListBlockAction | BackgroundAction | DeleteAreaAction;

function canvas(canvas: Canvas, action: CanvasAction): Canvas {
  return {
    width: widthCanvas(canvas.width, action as WidthAction),
    height: heightCanvas(canvas.height, action as HeightAction),
    filter: filter(canvas.filter, action as FilterAction),
    listBlock: listBlock(canvas.listBlock, action as ListBlockAction),
    background: background(canvas.background, action as BackgroundAction),
    deleteArea: deleteArea(canvas.deleteArea, action as DeleteAreaAction),
  };
}

export default canvas;

type DeleteAreaAction = {
  type: 'DELETE_AREA_SELECTION',
  area: Area | null
} | {
  type: 'NEW_CARD_MAKER',
}

function deleteArea(deleteArea: Area[], action: DeleteAreaAction): Area[] {
  switch (action.type) {
    case 'DELETE_AREA_SELECTION':
      if (action.area) {
        return [
          ...deleteArea,
          action.area as Area,
        ];
      } else {
        return deleteArea;
      }
    case 'NEW_CARD_MAKER':
      return [];
  
    default:
      return deleteArea;
  }
}