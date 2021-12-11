export function createImgBlock(src: string, width: number, height: number) {
  return {
    type: 'CREATE_IMG_BLOCK',
    src: src,
    width: width,
    height: height,
  }
}