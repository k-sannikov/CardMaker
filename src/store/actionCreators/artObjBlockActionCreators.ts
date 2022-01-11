import { store } from "../store";

export function createArtObjBlock(src: string) {
  return {
    type: "CREATE_ART_OBJ_BLOCK",
    src: src,
    x: (store.getState().canvas.width / 2) - 75,
    y: (store.getState().canvas.height / 2) - 75,
  }
}
