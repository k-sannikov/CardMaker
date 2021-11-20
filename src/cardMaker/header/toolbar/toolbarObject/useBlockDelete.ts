import { RefObject, useEffect } from 'react';
import { deleteComponent } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';

export function useBlockDelete(
  buttonDelete: RefObject<HTMLButtonElement>): void {

  function handlerClickDelete(): void {
    dispatch(deleteComponent);
  }

  useEffect(() => {
    if (buttonDelete.current) {
      buttonDelete.current.addEventListener("click", handlerClickDelete);
    }
    return () => {
      if (buttonDelete.current) {
        buttonDelete.current.removeEventListener("click", handlerClickDelete);
      }
    };
  }, []);
}


