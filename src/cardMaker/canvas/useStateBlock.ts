import { useEffect, RefObject } from 'react';
import { CardMaker as CardMakerType } from '../../CardMakerTypes';
import { dispatch } from '../../CardMaker';
import { setSelectedComponent } from '../../CardMakerFunctions';
import { getCardMaker } from '../../CardMaker';

export function useStateBlock(blockId: number, block: RefObject<HTMLElement>): number | null {
  const cardMaker: CardMakerType = getCardMaker();
  const selectId: number | null = cardMaker.selectBlock;

  function handleClickBlock(event: Event): void {
    dispatch(setSelectedComponent, blockId);
    event.preventDefault();
  }

  useEffect(() => {
    if (block.current) {
      block.current.addEventListener("click", handleClickBlock);
    }
     
    return () => {
      // block.current.removeEventListener("click", handleClickBlock);
    };
  }, []);
  return selectId;
}