import { useEffect, RefObject } from 'react';
import { CardMaker as CardMakerType } from '../../CardMakerTypes';
import { dispatch } from '../../CardMaker';
import { setSelectedComponent } from '../../CardMakerFunctions';
import { getCardMaker } from '../../CardMaker';

export function useStateBlock(blockId: string, block: RefObject<HTMLElement>): string | null {
  const cardMaker: CardMakerType = getCardMaker();
  const selectId: string | null = cardMaker.selectBlock;

  function handleBlock(event: Event): void {
    dispatch(setSelectedComponent, blockId);
    event.preventDefault();
  }

  useEffect(() => {
    if (block.current) {
      block.current.addEventListener("click", handleBlock);
      block.current.addEventListener("mousedown", handleBlock);
    }
     
    return () => {
      if (block.current) {
        block.current.removeEventListener("click", handleBlock);
        block.current.removeEventListener("mousedown", handleBlock);
      }
    };
  }, []);
  return selectId;
}