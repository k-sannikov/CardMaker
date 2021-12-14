import { Canvas } from '../types';
import background, { BackgroundAction } from './BackgroundReducer';
import filter, { FilterAction } from './FilterReducer';
import heightCanvas, { HeightAction } from './HeightCanvasReducer';
import listBlock, { ListBlockAction } from './ListBlockReducer';
import widthCanvas, { WidthAction } from './WidthCanvasReducer';

export type CanvasAction =  WidthAction | HeightAction | FilterAction | ListBlockAction | BackgroundAction;

function canvas(canvas: Canvas, action: CanvasAction): Canvas {
  return {
    width: widthCanvas(canvas.width, action as WidthAction),
    height: heightCanvas(canvas.height, action as HeightAction),
    filter: filter(canvas.filter, action as FilterAction),
    listBlock: listBlock(canvas.listBlock, action as ListBlockAction),
    background: background(canvas.background, action as BackgroundAction),
    deleteArea: canvas.deleteArea,
  };
}

export default canvas;