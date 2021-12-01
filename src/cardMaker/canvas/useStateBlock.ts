import { useEffect, RefObject, useContext } from 'react';
import { CardMaker as CardMakerType } from '../../CardMakerTypes';
import StoreContext from '../../StoreContext';
import { setSelectedBlock } from '../../store/actionCreators/actionCreators';

export function useStateBlock(blockId: string, block: RefObject<HTMLElement>): string | null {
  const store = useContext(StoreContext);
  const cardMaker: CardMakerType = store.getState();
  const selectId: string | null = cardMaker.selectBlock;

  function handleMousedownBlock(event: Event): void {
    store.dispatch(setSelectedBlock(blockId));
    event.preventDefault();
  }

  useEffect(() => {
    if (block.current) {
      block.current.addEventListener("mousedown", handleMousedownBlock);
    }
     
    return () => {
      if (block.current) {
        block.current.removeEventListener("mousedown", handleMousedownBlock);
      }
    };
  }, []);
  return selectId;
}