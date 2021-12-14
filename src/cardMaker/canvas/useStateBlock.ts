import { useEffect, RefObject } from 'react';

export function useStateBlock(
  blockId: string,
  block: RefObject<HTMLElement>,
  setSelectedBlock: (id: string) => void
  ): void {

  function handleMousedownBlock(event: Event): void {
    setSelectedBlock(blockId);
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
}