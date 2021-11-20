import { RefObject, useEffect } from 'react';
import { shiftUpBlock, shiftDownBlock, deleteComponent } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';

export function useObject(
  buttonUp: RefObject<HTMLButtonElement>,
  buttonDown: RefObject<HTMLButtonElement>,
  buttonDelete: RefObject<HTMLButtonElement>): void {

  function handlerClickShiftUp(event: Event): void {
    event.preventDefault();
    dispatch(shiftUpBlock);
  }

  function handlerClickShiftDown(event: Event): void {
    event.preventDefault();
    dispatch(shiftDownBlock);
  }

  function handlerClickDelete(): void {
    dispatch(deleteComponent);
  }

  useEffect(() => {
    if (buttonUp.current) {
      buttonUp.current.addEventListener("click", handlerClickShiftUp);
    }
    if (buttonDown.current) {
      buttonDown.current.addEventListener("click", handlerClickShiftDown);
    }
    if (buttonDelete.current) {
      buttonDelete.current.addEventListener("click", handlerClickDelete);
    }
    return () => {
      if (buttonUp.current) {
        buttonUp.current.removeEventListener("click", handlerClickShiftUp);
      }
      if (buttonDown.current) {
        buttonDown.current.removeEventListener("click", handlerClickShiftDown);
      }
      if (buttonDelete.current) {
        buttonDelete.current.removeEventListener("click", handlerClickDelete);
      }
    };
  }, []);
}


