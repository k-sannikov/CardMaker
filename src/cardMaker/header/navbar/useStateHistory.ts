import { RefObject, useEffect } from 'react';
import { dispatch } from '../../../CardMaker';
import { undo, redo } from '../../../CardMakerFunctions';

export function useStateHistory(
  buttonUndo: RefObject<HTMLButtonElement>,
  buttonRedo: RefObject<HTMLButtonElement>
): void {

  function handlerClickUndo(): void {
    dispatch(undo);
  }
  function handlerClickRedo(): void {
    dispatch(redo);
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