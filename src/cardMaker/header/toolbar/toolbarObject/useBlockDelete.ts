import { RefObject, useEffect } from 'react';
import { verify } from '../../../../utils/permisions';

export function useBlockDelete(buttonDelete: RefObject<HTMLButtonElement>, deleteBlock: () => void,): void {

  function handlerClickDelete(): void {
    deleteBlock();
  }

  function handlerKeydown(event: KeyboardEvent): void {
    if (event.code == 'Delete') {
      deleteBlock();
    }
  }

  useEffect(() => {
    verify(buttonDelete.current).addEventListener("click", handlerClickDelete);
    document.addEventListener("keydown", handlerKeydown);
    return () => {
      if (buttonDelete.current) {
        buttonDelete.current.removeEventListener("click", handlerClickDelete);
      }
      document.removeEventListener("keydown", handlerKeydown);
    };
  }, []);
}


