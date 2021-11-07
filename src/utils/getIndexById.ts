import { Block } from '../CardMakerTypes';

export function getIndexById(listBlock: Block[], id: number): number {
  let foundIndex: number = -1;
  listBlock.forEach((block: Block, index: number) => {
    if (block.id === id) {
      foundIndex = index;
    }
  });
  return foundIndex;
}