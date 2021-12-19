import { useEffect, RefObject } from 'react';
import { store } from '../../store/store';
import { verify } from '../../utils/permisions';

export function useStateBlock(
  blockId: string,
  block: RefObject<HTMLElement>,
  setSelectedBlock: (id: string) => void,
  resetSelectedBlock: () => void,
): void {

  function handleMousedownBlock(): void {
    if (store.getState().selectBlock !== blockId) {
      setTimeout(() => {
        setSelectedBlock(blockId);
      });
    }
  }

  function handleClickDocument(event: Event): void {
    const isDefPrev: boolean = event.defaultPrevented;
    const isSelectedID: boolean = store.getState().selectBlock === blockId;
    if (!isDefPrev && isSelectedID && (event.target !== block.current)) {
      resetSelectedBlock();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickDocument);
    verify(block.current).addEventListener("mousedown", handleMousedownBlock);

    return () => {
      if (block.current) {
        block.current.removeEventListener("mousedown", handleMousedownBlock);
      }
      document.removeEventListener("click", handleClickDocument);
    };
  }, []);
}