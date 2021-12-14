import { store } from "../store"
export function createImgBlock(src: string, width: number, height: number) {
  return {
    type: 'CREATE_IMG_BLOCK',
    src: src,
    width: width,
    height: height,
    x: (store.getState().canvas.width / 2) - (width / 2),
    y: (store.getState().canvas.height / 2) - (height / 2),
  }
}