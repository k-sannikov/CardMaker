import { useEffect, MouseEvent, MutableRefObject } from 'react';
import { CardMaker as CardMakerType } from '../../CardMakerTypes';
import { dispatch } from '../../CardMaker';
import { setSelectedComponent } from '../../CardMakerFunctions';
import { getCardMaker } from '../../CardMaker';

export function useBlock(blockId: number, block: MutableRefObject<any>): number | null {
  const cardMaker: CardMakerType = getCardMaker();
  const selectId: number | null = cardMaker.selectBlock;

  useEffect(() => {
    block.current.addEventListener("click", handleClickBlock);
    function handleClickBlock(event: MouseEvent<HTMLElement>) {
      dispatch(setSelectedComponent, blockId);
      event.stopPropagation();
    }
    return () => {
      // block.current.removeEventListener("click", handleClickBlock);
    };
  }, []);
  return selectId;
}