import { RefObject, useContext, useEffect } from 'react';
import StoreContext from '../../../StoreContext';

export function useStateHistory(
  buttonUndo: RefObject<HTMLButtonElement>,
  buttonRedo: RefObject<HTMLButtonElement>,
  undo: () => any,
  redo: () => any,
): void {

  function handlerClickUndo(): void {
    undo();
  }
  function handlerClickRedo(): void {
    redo();
  }

  useEffect(() => {
    if (buttonUndo.current) {
      buttonUndo.current.addEventListener("click", handlerClickUndo);
    }
    if (buttonRedo.current) {
      buttonRedo.current.addEventListener("click", handlerClickRedo);
    }
    return () => {
      if (buttonUndo.current) {
        buttonUndo.current.removeEventListener("click", handlerClickUndo);
      }
      if (buttonRedo.current) {
        buttonRedo.current.removeEventListener("click", handlerClickRedo);
      }
    };
  }, []);
}