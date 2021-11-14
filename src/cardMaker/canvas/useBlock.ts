import { useEffect, useContext, MouseEvent } from 'react';
import { CardMakerContext } from '../../CardMakerContext';
import { CardMaker as CardMakerType } from '../../CardMakerTypes';
import { dispatch } from '../../CardMaker';
import { setSelectedComponent, resetSelectedComponent } from '../../CardMakerFunctions';

export function useBlock(blockId: number, block: any): number | null {
  const cardMaker: CardMakerType = useContext(CardMakerContext);
  const selectId: number | null = cardMaker.selectBlock;

  useEffect(() => {
    function handleClickBlock(event: MouseEvent<HTMLElement>) {
      dispatch(setSelectedComponent, blockId);
      event.stopPropagation();
    }
    function handleClickDocument() {
      if (blockId == selectId) {
        dispatch(resetSelectedComponent);
      }
    }
    block.current.addEventListener("click", handleClickBlock);
    document.addEventListener("click", handleClickDocument);
    return () => {
      // block.current.removeEventListener("click", handleClickBlock);
      document.removeEventListener("click", handleClickDocument);
    };
  }, []);

  return selectId;
}