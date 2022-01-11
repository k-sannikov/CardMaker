export type HeightAction = {
  type: "NEW_CARD_MAKER",
} | {
  type: "SET_CANVAS_SIZE",
  height: number,
}

function heightCanvas(height: number, action: HeightAction): number {
  switch (action.type) {

    case "NEW_CARD_MAKER":
      return 600;

    case "SET_CANVAS_SIZE":
      return action.height;

    default:
      return height;
  }
}

export default heightCanvas;