import { RefObject, useEffect } from 'react';

export function useStateHistory(
  buttonUndo: RefObject<HTMLButtonElement>,
  buttonRedo: RefObject<HTMLButtonElement>,
  undo: () => void,
  redo: () => void,
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