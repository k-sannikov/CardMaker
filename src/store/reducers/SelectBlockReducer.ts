export type SelectBlockAction = {
  type: "NEW_CARD_MAKER",
} | {
  type: "RESET_SELECTED_BLOCK",
  width: number,
} | {
  type: "SET_SELECTED_BLOCK",
  id: string,
} | {
  type: "DELETE_BLOCK",
}

function selectBlock(selectBlock: null | string, action: SelectBlockAction): string | null {
  switch (action.type) {

    case "NEW_CARD_MAKER":
      return null;

    case "RESET_SELECTED_BLOCK":
      return null;

    case "SET_SELECTED_BLOCK":
      return action.id;

    case "DELETE_BLOCK":
      return null;

    default:
      return selectBlock;
  }
}

export default selectBlock;