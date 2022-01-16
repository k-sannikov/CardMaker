import { useEffect, RefObject } from "react";
import { store } from "../../store/store";
import { verify } from "../../utils/permisions";

export function useStateBlock(
  blockId: string,
  block: RefObject<HTMLElement>,
  setSelectedBlock: (id: string) => void,
  resetSelectedBlock: () => void,
): void {

  useEffect(() => {

    const currentBlock: HTMLElement | null = block.current;

    let mouseDownCurrentBlock: boolean = false;

    function handleMousedownBlock(): void {
      mouseDownCurrentBlock = true;
      if (store.getState().selectBlock !== blockId) {
        setTimeout(() => {
          setSelectedBlock(blockId);
        });
      }
    }

    function handleClickDocument(event: Event): void {
      const isDefPrev: boolean = event.defaultPrevented;
      const isSelectedID: boolean = store.getState().selectBlock === blockId;
      if (!isDefPrev && isSelectedID && (event.target !== currentBlock) && !mouseDownCurrentBlock) {
        resetSelectedBlock();
      }
      mouseDownCurrentBlock = false;
    }


    document.addEventListener("click", handleClickDocument);
    verify(currentBlock).addEventListener("mousedown", handleMousedownBlock);
    return () => {
      if (currentBlock) currentBlock.removeEventListener("mousedown", handleMousedownBlock);
      document.removeEventListener("click", handleClickDocument);
    };
  }, [blockId, block, setSelectedBlock, resetSelectedBlock]);
}