import { Canvas } from '../types';
import background from './BackgroundReducer';
import filter from './FilterReducer';
import heightCanvas from './HeightCanvasReducer';
import listBlock from './ListBlockReducer';
import widthCanvas from './WidthCanvasReducer';

// type CanvasAction = {
//   type: 'APPLY_FILE_PROJECT',
//   newCanvas: Canvas,
// }

function canvas(canvas: Canvas, action: any): Canvas {
  switch (action.type) {

    case 'APPLY_FILE_PROJECT':
      return action.newCanvas;

    default:
      return {
        width: widthCanvas(canvas.width, action),
        height: heightCanvas(canvas.height, action),
        filter: filter(canvas.filter, action),
        listBlock: listBlock(canvas.listBlock, action),
        background: background(canvas.background, action),
        deleteArea: canvas.deleteArea,
      };
  }
}

export default canvas;