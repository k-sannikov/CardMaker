import { RefObject, useEffect } from 'react';
import { verify } from '../../../../utils/permisions';

export function useBlockDelete(buttonDelete: RefObject<HTMLButtonElement>, deleteBlock: () => void): void {

  useEffect(() => {

    const button = buttonDelete.current;

    function handlerClickDelete(): void {
      deleteBlock();
    }

    function handlerKeydown(event: KeyboardEvent): void {
      if (event.code === 'Delete') {
        if (!event.defaultPrevented) {
          deleteBlock();
        }

      }
    }

    
    verify(button).addEventListener("click", handlerClickDelete);
    document.addEventListener("keydown", handlerKeydown);
    return () => {
      if (button) button.removeEventListener("click", handlerClickDelete);
      document.removeEventListener("keydown", handlerKeydown);
    };
  }, [buttonDelete, deleteBlock]);
}


