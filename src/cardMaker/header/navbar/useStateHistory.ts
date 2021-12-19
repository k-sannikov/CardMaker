import { RefObject, useEffect } from 'react';
import { verify } from '../../../utils/permisions';

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

  function handlerKeydown(event: KeyboardEvent): void {
    if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
      undo();
    }
    if (event.code === 'KeyY' && (event.ctrlKey || event.metaKey)) {
      redo();
    }
  }

  useEffect(() => {
    verify(buttonUndo.current).addEventListener("click", handlerClickUndo);
    verify(buttonRedo.current).addEventListener("click", handlerClickRedo);
    document.addEventListener("keydown", handlerKeydown);
    return () => {
      if (buttonUndo.current) {
        buttonUndo.current.removeEventListener("click", handlerClickUndo);
      }
      if (buttonRedo.current) {
        buttonRedo.current.removeEventListener("click", handlerClickRedo);
      }
      document.removeEventListener("keydown", handlerKeydown);
    };
  }, []);
}