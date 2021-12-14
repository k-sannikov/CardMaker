import { RefObject, useEffect } from 'react';

export function useBlockDelete(buttonDelete: RefObject<HTMLButtonElement>, deleteBlock: () => void,): void {

  function handlerMousedownDelete(): void {
    deleteBlock();
  }

  useEffect(() => {
    if (buttonDelete.current) {
      buttonDelete.current.addEventListener("mousedown", handlerMousedownDelete);
    }
    return () => {
      if (buttonDelete.current) {
        buttonDelete.current.removeEventListener("mousedown", handlerMousedownDelete);
      }
    };
  }, []);
}


