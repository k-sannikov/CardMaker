export type WidthAction = {
  type: 'NEW_CARD_MAKER',
} | {
  type: 'SET_CANVAS_SIZE',
  width: number,
}

function widthCanvas(width: number, action: WidthAction): number {
  switch (action.type) {

    case 'NEW_CARD_MAKER':
      return 800;

    case 'SET_CANVAS_SIZE':
      return action.width;

    default:
      return width;
  }
}
export default widthCanvas;